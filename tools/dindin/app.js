const defaultCategories = ['Casa', 'Mercado', 'Saúde', 'Transporte', 'Contas', 'Lazer', 'Renda', 'Renda extra', 'Outros'];
const iconPaths = {
  sheet: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  paper: '<path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 12h7M8 16h7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  income: '<path d="M7 17 17 7M8 7h9v9"/><path d="M4 20h16"/>',
  camera: '<path d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11H3V8a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.5"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"/>',
  market: '<path d="M4 9h16l-1.5 11h-13L4 9Z"/><path d="M8 9a4 4 0 0 1 8 0M8 13v3m4-3v3m4-3v3"/>',
  health: '<path d="M12 5v14M5 12h14"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6m-6 4h6"/>',
  transfer: '<path d="M7 7h13m0 0-4-4m4 4-4 4M17 17H4m0 0 4-4m-4 4 4 4"/>',
};
function iconMarkup(name) { return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.receipt}</svg>`; }
const chartColors = ['#d7ff3f', '#7bdff2', '#ff6f3c', '#f2b5d4', '#89d8bd', '#aaa0d5'];
const GOOGLE_OAUTH_CLIENT_ID = '215401091425-3qec03kr78a1dl57frk8tab3bo7dgl4s.apps.googleusercontent.com';
const GOOGLE_DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
const GOOGLE_DRIVE_BACKUP_QUERY = "appProperties has { key='dindinBackup' and value='v1' } and trashed = false";
const driveSession = { accessToken: null, fileId: null, syncTimer: null, syncing: false, queued: false };
let transactions = JSON.parse(localStorage.getItem('dindin.transactions') || '[]');
let categories = JSON.parse(localStorage.getItem('dindin.categories') || 'null') || defaultCategories;
let photoUrl = '';
let ocrWorkerPromise = null;
let photoRowCounter = 0;
const backdrop = document.querySelector('#modal-backdrop');
const modalContent = document.querySelector('#modal-content');

function save(syncDrive = true) {
  localStorage.setItem('dindin.transactions', JSON.stringify(transactions));
  localStorage.setItem('dindin.categories', JSON.stringify(categories));
  if (syncDrive) scheduleDriveBackup();
}
function money(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}
function dateLabel(iso) {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }).replace('.', '');
}
function openModal(html) {
  modalContent.innerHTML = html;
  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';
  document.querySelector('#modal-close').focus();
}
function closeModal() {
  backdrop.hidden = true;
  document.body.style.overflow = '';
  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = '';
}
function toast(message) {
  document.querySelector('.toast')?.remove();
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  document.body.append(node);
  setTimeout(() => node.remove(), 3000);
}
function navigate(view) {
  document.querySelectorAll('.view').forEach((el) => el.classList.toggle('active', el.id === `view-${view}`));
  document.querySelectorAll('[data-view]').forEach((el) => el.classList.toggle('active', el.dataset.view === view));
  const names = { overview: 'Visão geral', transactions: 'Lançamentos', categories: 'Categorias' };
  document.querySelector('#page-name').textContent = names[view] || 'Visão geral';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (view === 'transactions') renderTransactions();
  if (view === 'categories') renderCategories();
}
function monthKey(date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; }
function selectedMonth() { return document.querySelector('#month-select').value || monthKey(new Date()); }
function monthTransactions(key = selectedMonth()) { return transactions.filter((item) => item.date.startsWith(key)); }
function setupMonthSelect() {
  const select = document.querySelector('#month-select');
  const current = new Date();
  const dates = transactions.map((item) => new Date(`${item.date}T12:00:00`)).filter((date) => !Number.isNaN(date.valueOf()));
  const earliest = dates.length ? new Date(Math.min(...dates.map((date) => new Date(date.getFullYear(), date.getMonth(), 1).valueOf()))) : new Date(current.getFullYear(), current.getMonth() - 11, 1);
  const start = earliest < new Date(current.getFullYear(), current.getMonth() - 11, 1) ? earliest : new Date(current.getFullYear(), current.getMonth() - 11, 1);
  const months = [];
  for (let date = new Date(start); date <= current; date = new Date(date.getFullYear(), date.getMonth() + 1, 1)) months.push(new Date(date));
  const previous = select.value;
  select.innerHTML = months.reverse().map((date) => `<option value="${monthKey(date)}">${date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</option>`).join('');
  select.value = months.some((date) => monthKey(date) === previous) ? previous : monthKey(current);
  document.querySelector('#overview-date').textContent = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(current).toUpperCase();
}
function totals() {
  return monthTransactions().reduce((acc, item) => {
    acc[item.type] += Number(item.amount) || 0;
    return acc;
  }, { income: 0, expense: 0 });
}
function renderTotals() {
  const totalsNow = totals();
  document.querySelector('#available-total').innerHTML = money(totalsNow.income - totalsNow.expense).replace(',00', '<span>,00</span>');
  document.querySelector('#income-total').innerHTML = money(totalsNow.income).replace(',00', '<span>,00</span>');
  document.querySelector('#expense-total').innerHTML = money(totalsNow.expense).replace(',00', '<span>,00</span>');
  const currentRows = monthTransactions();
  const incomeCount = currentRows.filter((item) => item.type === 'income').length;
  const expenseCount = currentRows.filter((item) => item.type === 'expense').length;
  document.querySelector('#income-count').textContent = `${incomeCount} ${incomeCount === 1 ? 'entrada' : 'entradas'} no período`;
  document.querySelector('#expense-count').textContent = `${expenseCount} ${expenseCount === 1 ? 'gasto' : 'gastos'} no período`;
  document.querySelector('#nav-count').textContent = transactions.length;
  const spentPercent = totalsNow.income > 0 ? Math.min(100, totalsNow.expense / totalsNow.income * 100) : 0;
  document.querySelector('#income-progress').style.width = `${spentPercent}%`;
  document.querySelector('#spent-label').textContent = totalsNow.income > 0 ? `${Math.round(spentPercent)}% das entradas usadas` : totalsNow.expense > 0 ? 'Ainda sem entradas no período' : 'Ainda sem movimentação';
  document.querySelector('#remaining-label').textContent = totalsNow.income > 0 ? `${Math.max(0, 100 - Math.round(spentPercent))}% restante` : '';
  document.querySelector('.demo-pill').innerHTML = `<span></span> ${transactions.length ? 'Salvo neste dispositivo' : 'Comece por aqui'}`;
}
function transactionMarkup(item) {
  const iconClass = item.category.toLowerCase().includes('mercado') ? 'food' : item.category.toLowerCase().includes('saúde') ? 'care' : item.category.toLowerCase().includes('casa') ? 'home' : '';
  const iconName = item.type === 'income' ? 'income' : iconClass === 'food' ? 'market' : iconClass === 'care' ? 'health' : iconClass === 'home' ? 'home' : 'receipt';
  const dateText = item.monthlyAggregate ? new Date(`${item.date}T12:00:00`).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : dateLabel(item.date);
  return `<div class="transaction-row"><span class="transaction-icon ${iconClass}">${iconMarkup(iconName)}</span><span class="transaction-main"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(dateText)} · ${escapeHtml(item.category)}</small></span><span class="transaction-category">${escapeHtml(item.category)}</span><span class="transaction-amount ${item.type === 'income' ? 'in' : 'out'}">${item.type === 'income' ? '+' : '−'} ${money(item.amount)}</span></div>`;
}
function renderRecent() {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  document.querySelector('#recent-transactions').innerHTML = sorted.length ? sorted.map(transactionMarkup).join('') : '<div class="empty-state"><strong>Seus lançamentos vão aparecer aqui.</strong>Experimente adicionar um gasto ou uma receita.</div>';
}
function renderCharts() {
  const [year, month] = selectedMonth().split('-').map(Number);
  const base = new Date(year, month - 1, 1, 12);
  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(base.getFullYear(), base.getMonth() - 5 + index, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const rows = transactions.filter((item) => item.date.startsWith(key));
    return { month: date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''), income: rows.filter((item) => item.type === 'income').reduce((sum, item) => sum + Number(item.amount), 0), expense: rows.filter((item) => item.type === 'expense').reduce((sum, item) => sum + Number(item.amount), 0) };
  });
  const rawMax = Math.max(...months.flatMap((item) => [item.income, item.expense]));
  const roughStep = rawMax > 0 ? rawMax / 4 : 250;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const relativeStep = roughStep / magnitude;
  const step = (relativeStep <= 1 ? 1 : relativeStep <= 2 ? 2 : relativeStep <= 5 ? 5 : 10) * magnitude;
  const axisMax = rawMax > 0 ? step * 4 : 1000;
  const max = axisMax;
  document.querySelectorAll('.y-labels span').forEach((label, index) => {
    const value = axisMax * (4 - index) / 4;
    label.textContent = value >= 1000 ? `R$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(value / 1000)} mil` : money(value).replace(',00', '');
  });
  const chart = document.querySelector('#monthly-chart');
  chart.innerHTML = '<div class="grid-lines"><i></i><i></i><i></i><i></i><i></i></div>' + months.map((item, index) => {
    const incomeHeight = item.income ? Math.max(3, item.income / max * 88) : 0;
    const expenseHeight = item.expense ? Math.max(3, item.expense / max * 88) : 0;
    const amountTip = index === months.length - 1 && item.income > 0 ? `<span>${money(item.income)}</span>` : '';
    const highlight = index === months.length - 1 && (item.income > 0 || item.expense > 0) ? 'current' : '';
    return `<div class="bar-group ${highlight}"><div class="bar income" style="height:${incomeHeight}%">${amountTip}</div><div class="bar expense" style="height:${expenseHeight}%"></div><small>${item.month}</small></div>`;
  }).join('');
  const current = months.at(-1);
  document.querySelector('#chart-insight-text').innerHTML = current.income === 0 && current.expense === 0
    ? 'Adicione uma entrada ou um gasto para ver o período ganhar forma.'
    : current.income >= current.expense ? 'No período, entrou <strong>mais do que saiu</strong>.' : 'No período, saiu <strong>mais do que entrou</strong>.';

  const expenses = categories.map((category) => [category, monthTransactions().filter((item) => item.type === 'expense' && item.category === category).reduce((sum, item) => sum + Number(item.amount), 0)]).filter(([, amount]) => amount > 0).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const total = expenses.reduce((sum, [, amount]) => sum + amount, 0);
  document.querySelector('#donut-total').textContent = money(total);
  const donut = document.querySelector('#expense-donut');
  if (total > 0) {
    let cursor = 0;
    const parts = expenses.map(([, amount], index) => {
      const start = cursor;
      cursor += amount / total * 100;
      return `${chartColors[index % chartColors.length]} ${start}% ${cursor}%`;
    });
    donut.style.background = `conic-gradient(${parts.join(', ')})`;
  } else donut.style.background = '#e9ede9';
  document.querySelector('#expense-legend').innerHTML = expenses.length ? expenses.map(([category, amount], index) => `<div><i class="cat-dot" style="background:${chartColors[index % chartColors.length]}"></i><span>${escapeHtml(category)}</span><strong>${money(amount)}</strong></div>`).join('') : '<div class="category-empty">Seus gastos por categoria vão aparecer aqui.</div>';
}
function renderTransactions() {
  const search = (document.querySelector('#transaction-search')?.value || '').toLowerCase();
  const type = document.querySelector('#type-filter')?.value || 'all';
  const category = document.querySelector('#category-filter')?.value || 'all';
  const categorySelect = document.querySelector('#category-filter');
  if (categorySelect && categorySelect.options.length < categories.length + 1) {
    categorySelect.innerHTML = '<option value="all">Todas as categorias</option>' + categories.map((cat) => `<option>${escapeHtml(cat)}</option>`).join('');
    categorySelect.value = category;
  }
  const filtered = [...transactions].sort((a,b) => b.date.localeCompare(a.date)).filter((item) => (type === 'all' || item.type === type) && (category === 'all' || item.category === category) && `${item.name} ${item.category}`.toLowerCase().includes(search));
  document.querySelector('#all-transactions').innerHTML = filtered.length ? filtered.map(transactionMarkup).join('') : '<div class="empty-state"><strong>Nenhum lançamento encontrado.</strong>Tente mudar a busca ou o filtro.</div>';
  renderRecent();
}
function renderCategories() {
  const current = monthTransactions();
  const total = (type) => current.filter((item) => item.type === type).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totals = { expense: total('expense'), income: total('income') };
  const categoryColor = (category) => {
    const key = normalizeImportText(category);
    const colors = [
      [/casa|moradia/, '#b69af6'], [/mercado|aliment/, '#f2aa4c'], [/saude|farm/, '#f17b91'],
      [/transporte|carro/, '#51b7d7'], [/contas|internet|energia/, '#7195f4'], [/lazer/, '#d480df'],
      [/renda|receita/, '#71c797'], [/outros/, '#b2bdc6'],
    ];
    const match = colors.find(([pattern]) => pattern.test(key));
    if (match) return match[1];
    let hash = 0;
    for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return ['#7fc8b4', '#d39be4', '#f3a66b', '#76a9ef', '#c3a6f1'][hash % 5];
  };
  const categoryIcon = (category, type) => {
    const name = normalizeImportText(category);
    if (type === 'income') return 'income';
    if (/mercado|aliment/.test(name)) return 'market';
    if (/saude|farm/.test(name)) return 'health';
    if (/casa|moradia/.test(name)) return 'home';
    return 'receipt';
  };
  const card = (category, type) => {
    const items = current.filter((item) => item.type === type && item.category === category);
    const amount = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const share = totals[type] ? Math.round(amount / totals[type] * 100) : 0;
    const color = categoryColor(category);
    const kind = type === 'income' ? 'Entrada' : 'Gasto';
    const countLabel = `${items.length} ${items.length === 1 ? 'lançamento' : 'lançamentos'}`;
    return `<article class="category-card" style="--category-accent:${color}"><div class="category-card-head"><span class="category-card-icon">${iconMarkup(categoryIcon(category, type))}</span><div class="category-card-title"><h3>${escapeHtml(category)}</h3><p>${kind} no mês</p></div></div><div class="category-card-value"><strong>${money(amount)}</strong><span>${items.length ? countLabel : 'Sem lançamentos'}</span></div><div class="category-progress" role="progressbar" aria-label="${escapeHtml(category)}: ${share}% do total de ${kind.toLowerCase()}" aria-valuenow="${share}" aria-valuemin="0" aria-valuemax="100"><span style="width:${share}%"></span></div><div class="category-card-foot"><span>${items.length ? `${share}% do total no mês` : 'Ainda sem registros neste mês'}</span></div></article>`;
  };
  const expenseCategories = categories.filter((category) => !normalizeImportText(category).includes('renda'));
  const incomeCategories = categories.filter((category) => normalizeImportText(category).includes('renda'));
  const activeExpenses = expenseCategories.filter((category) => current.some((item) => item.type === 'expense' && item.category === category)).length;
  const activeIncome = incomeCategories.filter((category) => current.some((item) => item.type === 'income' && item.category === category)).length;
  document.querySelector('#category-dashboard').innerHTML = `<div class="category-overview"><article class="category-stat expense-stat"><span>Gastos no mês</span><strong>${money(totals.expense)}</strong><small>${activeExpenses} ${activeExpenses === 1 ? 'categoria com gastos' : 'categorias com gastos'}</small></article><article class="category-stat income-stat"><span>Entradas no mês</span><strong>${money(totals.income)}</strong><small>${activeIncome} ${activeIncome === 1 ? 'categoria com entrada' : 'categorias com entradas'}</small></article></div><section class="category-section"><div class="category-section-head"><h2>Gastos</h2><span>${expenseCategories.length} categorias</span></div><div class="category-cards">${expenseCategories.map((category) => card(category, 'expense')).join('')}</div></section><section class="category-section"><div class="category-section-head"><h2>Entradas</h2><span>${incomeCategories.length} categorias</span></div><div class="category-cards">${incomeCategories.map((category) => card(category, 'income')).join('')}</div></section>`;
}
function refresh() { setupMonthSelect(); renderTotals(); renderRecent(); renderTransactions(); renderCharts(); if (document.querySelector('#view-categories').classList.contains('active')) renderCategories(); }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[char])); }
function openOnboarding() {
  openModal(`<p class="modal-kicker">UM COMEÇO LEVE</p><h2 id="modal-title">Como prefere começar?</h2><p class="modal-lead">Escolha o jeito mais fácil para você. Antes de salvar, vamos mostrar tudo para conferir.</p><div class="choice-grid"><button class="choice-card" data-method="spreadsheet"><span class="choice-icon">${iconMarkup('sheet')}</span><span class="choice-copy"><strong>Tenho uma planilha</strong><small>Importe Excel ou CSV e confira os lançamentos antes de salvar.</small></span><span class="choice-arrow">→</span></button><button class="choice-card" data-method="receipt"><span class="choice-icon">${iconMarkup('receipt')}</span><span class="choice-copy"><strong>Tenho uma nota ou recibo</strong><small>Fotografe e confira valor, data e categoria sugeridos.</small></span><span class="choice-arrow">→</span></button><button class="choice-card" data-method="paper"><span class="choice-icon">${iconMarkup('paper')}</span><span class="choice-copy"><strong>Anoto no papel</strong><small>Fotografe a página para tentar reconhecer cada anotação.</small></span><span class="choice-arrow">→</span></button><button class="choice-card" data-method="blank"><span class="choice-icon">${iconMarkup('plus')}</span><span class="choice-copy"><strong>Quero começar do zero</strong><small>Adicione seu primeiro gasto ou sua primeira receita.</small></span><span class="choice-arrow">→</span></button></div><p class="modal-footnote">Os lançamentos ficam neste aparelho. Planilhas e fotos são lidas localmente; confira tudo antes de salvar.</p>`);
  modalContent.querySelectorAll('[data-method]').forEach((button) => button.addEventListener('click', () => {
    const method = button.dataset.method;
    if (method === 'spreadsheet') document.querySelector('#spreadsheet-file').click();
    if (method === 'paper') document.querySelector('#paper-file').click();
    if (method === 'receipt') document.querySelector('#receipt-file').click();
    if (method === 'blank') { closeModal(); openTransactionForm(); }
  }));
}
function openImport() {
  openModal(`<p class="modal-kicker">IMPORTAR DADOS</p><h2 id="modal-title">Traga o que você já anotou.</h2><p class="modal-lead">Pode ser uma planilha, uma nota ou uma folha do seu caderno. Confira tudo antes de adicionar aos seus registros.</p><div class="choice-grid"><button class="choice-card" data-method="spreadsheet"><span class="choice-icon">${iconMarkup('sheet')}</span><span class="choice-copy"><strong>Selecionar uma planilha</strong><small>Excel e CSV são lidos neste aparelho, sem enviar o arquivo.</small></span><span class="choice-arrow">→</span></button><button class="choice-card" data-method="receipt"><span class="choice-icon">${iconMarkup('receipt')}</span><span class="choice-copy"><strong>Fotografar nota ou recibo</strong><small>O app tenta encontrar estabelecimento, valor e data.</small></span><span class="choice-arrow">→</span></button><button class="choice-card" data-method="paper"><span class="choice-icon">${iconMarkup('paper')}</span><span class="choice-copy"><strong>Fotografar anotações no papel</strong><small>O app tenta separar os valores anotados na página.</small></span><span class="choice-arrow">→</span></button></div><p class="modal-footnote">A foto e os dados reconhecidos ficam neste aparelho. Nada será salvo antes de você revisar e confirmar.</p>`);
  modalContent.querySelectorAll('[data-method]').forEach((button) => button.addEventListener('click', () => document.querySelector(button.dataset.method === 'spreadsheet' ? '#spreadsheet-file' : button.dataset.method === 'receipt' ? '#receipt-file' : '#paper-file').click()));
}
function openDataSettings() {
  const count = transactions.length;
  const lastBackup = localStorage.getItem('dindin.lastBackup');
  const backupLabel = lastBackup ? new Date(lastBackup).toLocaleString('pt-BR') : 'Ainda não foi baixada';
  const driveSync = localStorage.getItem('dindin.lastDriveSync');
  const driveSyncLabel = driveSync ? new Date(driveSync).toLocaleString('pt-BR') : 'Ainda não sincronizado';
  openModal(`<p class="modal-kicker">PRIVACIDADE E CÓPIA</p><h2 id="modal-title">Seus dados ficam com você.</h2><p class="modal-lead">Não existe cadastro. Seus ${count} lançamentos e categorias ficam salvos neste navegador, no seu aparelho.</p><div class="review-note"><strong>Para não perder seus dados:</strong> baixe uma cópia de segurança e guarde o arquivo em um lugar seguro. A Dolayout não recebe seus lançamentos nem as fotos.</div><div class="privacy-backup-meta"><span>Última cópia baixada</span><strong>${escapeHtml(backupLabel)}</strong></div><div class="modal-actions privacy-actions"><button type="button" class="secondary-button" id="restore-backup">Restaurar cópia</button><button type="button" class="primary-button small" id="download-backup">Baixar cópia de segurança</button></div><section class="drive-card" aria-labelledby="drive-title"><div><p class="drive-kicker">CÓPIA NA SUA CONTA</p><h3 id="drive-title">Google Drive</h3><p class="drive-description">Guarde uma cópia privada no seu Drive para recuperar seus dados em outro aparelho.</p></div><p class="drive-status" id="drive-status" role="status" aria-live="polite"></p><div class="drive-actions"><button type="button" class="primary-button small" id="drive-connect">Conectar ao Google Drive</button><button type="button" class="primary-button small" id="drive-sync" hidden>Sincronizar agora</button><button type="button" class="secondary-button" id="drive-disconnect" hidden>Desconectar</button></div><p class="drive-privacy">Seus lançamentos vão do navegador diretamente ao Google Drive. A função da Dolayout troca o código de autorização sem guardar códigos, tokens ou registros. O token fica em memória durante esta sessão. O Google guarda um arquivo JSON sem senha na sua conta; será preciso conectar novamente quando abrir o app.</p><p class="drive-sync-meta">Última cópia no Drive: ${escapeHtml(driveSyncLabel)}</p></section><div class="review-note drive-note"><strong>Arquivo de segurança</strong><br>A cópia JSON não tem senha e pode ser lida por quem tiver acesso ao arquivo. Apagar os dados deste aparelho não apaga a cópia guardada no Drive.</div><button type="button" class="text-button erase-data" id="erase-data">Apagar todos os dados deste aparelho</button>`);
  modalContent.querySelector('#download-backup').addEventListener('click', downloadBackup);
  modalContent.querySelector('#restore-backup').addEventListener('click', () => document.querySelector('#backup-file').click());
  modalContent.querySelector('#erase-data').addEventListener('click', eraseData);
  modalContent.querySelector('#drive-connect').addEventListener('click', connectGoogleDrive);
  modalContent.querySelector('#drive-sync').addEventListener('click', () => syncDriveNow(true));
  modalContent.querySelector('#drive-disconnect').addEventListener('click', disconnectGoogleDrive);
  renderDriveStatus();
}
function downloadBackup() {
  const backup = { app: 'Dindin', version: 1, exportedAt: new Date().toISOString(), transactions, categories };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dindin-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  localStorage.setItem('dindin.lastBackup', new Date().toISOString());
  toast('Cópia de segurança baixada. Guarde esse arquivo em um lugar seguro.');
  openDataSettings();
}
function isValidBackup(data) {
  return data && data.app === 'Dindin' && Array.isArray(data.transactions) && Array.isArray(data.categories)
    && data.transactions.every((item) => item && typeof item.name === 'string' && typeof item.category === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.date) && Number.isFinite(Number(item.amount)) && Number(item.amount) >= 0 && ['income', 'expense'].includes(item.type))
    && data.categories.every((category) => typeof category === 'string' && category.trim());
}
async function restoreBackup(file) {
  try {
    const data = JSON.parse(await file.text());
    if (!isValidBackup(data)) throw new Error('invalid');
    const approved = window.confirm(`A cópia contém ${data.transactions.length} lançamentos e ${data.categories.length} categorias. Restaurá-la substituirá os dados atuais deste aparelho. Continuar?`);
    if (!approved) return;
    transactions = data.transactions.map((item) => ({ ...item, amount: Number(item.amount) }));
    categories = data.categories;
    save();
    refresh();
    closeModal();
    toast('Cópia restaurada neste aparelho.');
  } catch {
    window.alert('Não foi possível restaurar esse arquivo. Escolha uma cópia JSON criada pelo Dindin.');
  }
}
function currentBackup() {
  return { app: 'Dindin', version: 1, exportedAt: new Date().toISOString(), transactions, categories };
}
function sameBackupData(a, b) {
  return JSON.stringify([a.transactions, a.categories]) === JSON.stringify([b.transactions, b.categories]);
}
function renderDriveStatus(message = '') {
  const status = modalContent.querySelector('#drive-status');
  if (!status) return;
  const connected = Boolean(driveSession.accessToken && driveSession.fileId);
  const connect = modalContent.querySelector('#drive-connect');
  const sync = modalContent.querySelector('#drive-sync');
  const disconnect = modalContent.querySelector('#drive-disconnect');
  if (connect) connect.hidden = connected;
  if (sync) sync.hidden = !connected;
  if (disconnect) disconnect.hidden = !driveSession.accessToken;
  status.textContent = message || (connected
    ? 'Conectado nesta sessão. Alterações serão copiadas automaticamente enquanto a autorização estiver ativa.'
    : 'Não conectado nesta sessão. Seus dados continuam salvos neste aparelho.');
}
function driveErrorMessage(error) {
  if (error?.status === 401) return 'A autorização do Google expirou. Conecte novamente para continuar a cópia.';
  if (error?.status === 403) return 'O Google ainda não liberou o Drive para este app. Confira se a API do Drive está ativa e se sua conta está na lista de teste.';
  if (error?.status === 503) return 'A conexão do Google ainda não foi configurada no servidor Dolayout. Conclua a configuração antes de tentar novamente.';
  if (!navigator.onLine) return 'Sem conexão com a internet. Seus dados continuam salvos neste aparelho.';
  return 'Não foi possível acessar o Google Drive agora. Seus dados continuam salvos neste aparelho.';
}
async function driveRequest(url, options = {}) {
  if (!driveSession.accessToken) throw new Error('not-connected');
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${driveSession.accessToken}`);
  const response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
    driveSession.accessToken = null;
    driveSession.fileId = null;
    renderDriveStatus(driveErrorMessage({ status: 401 }));
  }
  if (!response.ok) {
    let detail = '';
    try { detail = (await response.json()).error?.message || ''; } catch { /* Keep the user-facing error concise. */ }
    const error = new Error(detail || `Drive API ${response.status}`);
    error.status = response.status;
    throw error;
  }
  if (response.status === 204) return null;
  const contentType = response.headers.get('content-type') || '';
  return contentType.includes('application/json') ? response.json() : response.text();
}
function requestDriveAccessToken() {
  const oauth = window.google?.accounts?.oauth2;
  if (!oauth) throw new Error('google-not-ready');
  return new Promise((resolve, reject) => {
    const client = oauth.initCodeClient({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      scope: GOOGLE_DRIVE_SCOPE,
      ux_mode: 'popup',
      callback: async (response) => {
        if (response.error || !response.code) { reject(new Error(response.error || 'authorization-failed')); return; }
        try {
          const exchange = await fetch('/api/dindin/google-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XmlHttpRequest' },
            body: JSON.stringify({ code: response.code, redirectUri: window.location.origin }),
          });
          const tokens = await exchange.json();
          if (!exchange.ok || !tokens.access_token) {
            const error = new Error(tokens.error || 'token-exchange-failed');
            error.status = exchange.status;
            throw error;
          }
          resolve(tokens.access_token);
        } catch (error) {
          reject(error);
        }
      },
      error_callback: (error) => reject(new Error(error?.type || 'authorization-failed')),
    });
    client.requestCode();
  });
}
async function findDriveBackup() {
  const params = new URLSearchParams({ q: GOOGLE_DRIVE_BACKUP_QUERY, spaces: 'drive', pageSize: '10', orderBy: 'modifiedTime desc', fields: 'files(id,name,mimeType,modifiedTime)' });
  const result = await driveRequest(`https://www.googleapis.com/drive/v3/files?${params}`);
  return result.files?.[0] || null;
}
async function readDriveBackup(fileId) {
  const data = await driveRequest(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}?alt=media`);
  if (!isValidBackup(data)) throw new Error('invalid-drive-backup');
  return data;
}
async function createDriveBackupFile() {
  const metadata = await driveRequest('https://www.googleapis.com/drive/v3/files?fields=id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Dindin - cópia de segurança.json', mimeType: 'application/json', appProperties: { dindinBackup: 'v1' } }),
  });
  driveSession.fileId = metadata.id;
}
async function uploadDriveBackup() {
  if (!driveSession.fileId) await createDriveBackupFile();
  await driveRequest(`https://www.googleapis.com/upload/drive/v3/files/${encodeURIComponent(driveSession.fileId)}?uploadType=media`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(currentBackup()),
  });
  localStorage.setItem('dindin.lastDriveSync', new Date().toISOString());
}
function applyBackupData(data) {
  transactions = data.transactions.map((item) => ({ ...item, amount: Number(item.amount) }));
  categories = [...data.categories];
  save(false);
  refresh();
}
function showDriveConflict(data, file) {
  const remoteDate = file.modifiedTime ? new Date(file.modifiedTime).toLocaleString('pt-BR') : 'data não informada';
  openModal(`<p class="modal-kicker">DUAS CÓPIAS ENCONTRADAS</p><h2 id="modal-title">Qual cópia você quer manter?</h2><p class="modal-lead">O Dindin encontrou dados diferentes neste aparelho e no Google Drive. Escolha com cuidado; a cópia escolhida substituirá a outra.</p><div class="drive-conflict-list"><div><strong>Neste aparelho</strong><span>${transactions.length} lançamentos</span></div><div><strong>Google Drive</strong><span>${data.transactions.length} lançamentos · ${escapeHtml(remoteDate)}</span></div></div><div class="drive-conflict-actions"><button type="button" class="primary-button small" id="drive-use-cloud">Usar a cópia do Drive neste aparelho</button><button type="button" class="secondary-button" id="drive-use-device">Manter este aparelho e atualizar o Drive</button><button type="button" class="text-button" id="drive-conflict-cancel">Cancelar por enquanto</button></div>`);
  modalContent.querySelector('#drive-use-cloud').addEventListener('click', () => {
    driveSession.fileId = file.id;
    applyBackupData(data);
    localStorage.setItem('dindin.lastDriveSync', file.modifiedTime || new Date().toISOString());
    closeModal();
    openDataSettings();
    toast('Cópia do Google Drive restaurada neste aparelho.');
  });
  modalContent.querySelector('#drive-use-device').addEventListener('click', async () => {
    driveSession.fileId = file.id;
    closeModal();
    openDataSettings();
    await syncDriveNow(true);
  });
  modalContent.querySelector('#drive-conflict-cancel').addEventListener('click', () => {
    driveSession.accessToken = null;
    driveSession.fileId = null;
    closeModal();
    openDataSettings();
    toast('Nenhuma cópia foi alterada.');
  });
}
async function connectGoogleDrive() {
  const button = modalContent.querySelector('#drive-connect');
  if (!button) return;
  if (!window.google?.accounts?.oauth2) {
    renderDriveStatus('A conexão segura do Google ainda está carregando. Aguarde um instante e tente novamente.');
    return;
  }
  button.disabled = true;
  renderDriveStatus('Aguardando sua autorização do Google…');
  try {
    driveSession.accessToken = await requestDriveAccessToken();
    const remoteFile = await findDriveBackup();
    if (!remoteFile) {
      driveSession.fileId = null;
      await uploadDriveBackup();
      renderDriveStatus('Conectado. Uma cópia foi criada no seu Google Drive.');
    } else {
      const remoteData = await readDriveBackup(remoteFile.id);
      const localData = currentBackup();
      driveSession.fileId = remoteFile.id;
      if (sameBackupData(remoteData, localData)) {
        localStorage.setItem('dindin.lastDriveSync', remoteFile.modifiedTime || new Date().toISOString());
        renderDriveStatus();
      } else if (transactions.length === 0 && JSON.stringify(categories) === JSON.stringify(defaultCategories)) {
        applyBackupData(remoteData);
        localStorage.setItem('dindin.lastDriveSync', remoteFile.modifiedTime || new Date().toISOString());
        renderDriveStatus('Conectado. A cópia do Google Drive foi restaurada neste aparelho.');
      } else {
        showDriveConflict(remoteData, remoteFile);
        return;
      }
    }
    const syncLabel = modalContent.querySelector('.drive-sync-meta');
    if (syncLabel) syncLabel.textContent = `Última cópia no Drive: ${new Date(localStorage.getItem('dindin.lastDriveSync')).toLocaleString('pt-BR')}`;
    toast('Google Drive conectado nesta sessão.');
  } catch (error) {
    renderDriveStatus(driveErrorMessage(error));
  } finally {
    const currentButton = modalContent.querySelector('#drive-connect');
    if (currentButton) currentButton.disabled = false;
  }
}
async function syncDriveNow(showMessage = false) {
  if (!driveSession.accessToken) {
    renderDriveStatus('Conecte sua conta Google para iniciar ou retomar a cópia.');
    if (showMessage) toast('Conecte ao Google Drive para sincronizar.');
    return;
  }
  if (driveSession.syncing) { driveSession.queued = true; return; }
  driveSession.syncing = true;
  renderDriveStatus('Atualizando sua cópia no Google Drive…');
  try {
    do {
      driveSession.queued = false;
      await uploadDriveBackup();
    } while (driveSession.queued && driveSession.accessToken);
    renderDriveStatus('Sua cópia do Google Drive está atualizada.');
    const syncLabel = modalContent.querySelector('.drive-sync-meta');
    if (syncLabel) syncLabel.textContent = `Última cópia no Drive: ${new Date(localStorage.getItem('dindin.lastDriveSync')).toLocaleString('pt-BR')}`;
    if (showMessage) toast('Cópia atualizada no Google Drive.');
  } catch (error) {
    renderDriveStatus(driveErrorMessage(error));
    if (showMessage) toast(driveErrorMessage(error));
  } finally {
    driveSession.syncing = false;
  }
}
function scheduleDriveBackup() {
  if (!driveSession.accessToken || !driveSession.fileId) return;
  clearTimeout(driveSession.syncTimer);
  driveSession.syncTimer = setTimeout(() => syncDriveNow(false), 900);
}
function disconnectGoogleDrive() {
  const token = driveSession.accessToken;
  driveSession.accessToken = null;
  driveSession.fileId = null;
  clearTimeout(driveSession.syncTimer);
  if (token && window.google?.accounts?.oauth2) window.google.accounts.oauth2.revoke(token, () => {});
  renderDriveStatus('Desconectado. A cópia existente continua na sua conta do Google Drive.');
  toast('Google Drive desconectado. A cópia guardada não foi apagada.');
}
function eraseData() {
  if (!window.confirm('Apagar todos os lançamentos e categorias personalizados deste aparelho? Esta ação não pode ser desfeita.')) return;
  transactions = [];
  categories = [...defaultCategories];
  localStorage.removeItem('dindin.transactions');
  localStorage.removeItem('dindin.categories');
  localStorage.removeItem('dindin.lastBackup');
  refresh();
  closeModal();
  toast('Os dados deste aparelho foram apagados.');
}
function normalizeImportText(value) { return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase().replace(/\s+/g, ' '); }
function importCategory(label, type) {
  const text = normalizeImportText(label);
  if (type === 'income') return /freela|extra|providencia|renda 3|renda 4/.test(text) ? 'Renda extra' : 'Renda';
  if (/mercado|supermercado|feira|acougue|padaria|alimentacao/.test(text)) return 'Mercado';
  if (/saude|farmacia|tratamento|medic|hospital|dent/.test(text)) return 'Saúde';
  if (/aluguel|condominio|moradia|casa/.test(text)) return 'Casa';
  if (/carro|combustivel|pedagio|transporte|ipva/.test(text)) return 'Transporte';
  if (/academia|salao|lazer|cinema|viagem/.test(text)) return 'Lazer';
  if (/internet|energia|agua|seguro|mei|das|emprestimo|consorcio|cartao|bank|banco|acordo|assinatura|conta/.test(text)) return 'Contas';
  return 'Outros';
}
function parseImportAmount(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  let text = String(value ?? '').trim().replace(/[R$\s]/g, '');
  if (!text) return NaN;
  if (text.includes(',') && text.lastIndexOf(',') > text.lastIndexOf('.')) text = text.replace(/\./g, '').replace(',', '.');
  else text = text.replace(/,/g, '');
  return Number(text);
}
function parseImportDate(value) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
  if (typeof value === 'number' && window.XLSX?.SSF) {
    const parts = XLSX.SSF.parse_date_code(value);
    if (parts?.y && parts?.m && parts?.d) return `${parts.y}-${String(parts.m).padStart(2, '0')}-${String(parts.d).padStart(2, '0')}`;
  }
  const text = String(value ?? '').trim();
  let match = text.match(/^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{2,4})$/);
  if (match) {
    let year = Number(match[3]);
    if (year < 100) year += year < 50 ? 2000 : 1900;
    return `${year}-${String(Number(match[2])).padStart(2, '0')}-${String(Number(match[1])).padStart(2, '0')}`;
  }
  match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  return match ? `${match[1]}-${String(Number(match[2])).padStart(2, '0')}-${String(Number(match[3])).padStart(2, '0')}` : '';
}
async function importFingerprint(bytes) {
  if (window.crypto?.subtle) {
    const digest = new Uint8Array(await window.crypto.subtle.digest('SHA-256', bytes));
    return Array.from(digest, (value) => value.toString(16).padStart(2, '0')).join('');
  }
  let hash = 2166136261;
  for (let index = 0; index < bytes.length; index++) hash = Math.imul(hash ^ bytes[index], 16777619);
  return `${(hash >>> 0).toString(16)}-${bytes.length}`;
}
function transactionFromRow({ name, amountValue, dateValue, typeValue, categoryValue, batchId, monthlyAggregate = false }) {
  const amount = parseImportAmount(amountValue);
  const date = parseImportDate(dateValue);
  if (!name || !date || !Number.isFinite(amount) || amount === 0) return null;
  const typeText = normalizeImportText(typeValue || categoryValue || name);
  const type = /renda|receita|entrada|income|credito/.test(typeText) ? 'income' : /gasto|despesa|saida|expense|debito/.test(typeText) ? 'expense' : amount < 0 ? 'income' : 'expense';
  return { id: `import-${batchId}-${Math.random().toString(36).slice(2, 8)}`, name: String(name).trim(), category: String(categoryValue || importCategory(name, type)).trim(), date, amount: Math.abs(amount), type, icon: type === 'income' ? '↙' : '•', importBatchId: batchId, monthlyAggregate };
}
const headerAliases = {
  date: ['data', 'data do lancamento', 'date'],
  name: ['descricao', 'nome', 'lancamento', 'estabelecimento', 'description'],
  amount: ['valor', 'valor total', 'quantia', 'amount', 'total'],
  type: ['tipo', 'tipo de lancamento', 'movimento', 'natureza'],
  category: ['categoria', 'grupo', 'category'],
};
function tableRowsToTransactions(rows, batchId) {
  const headerIndex = rows.slice(0, 25).findIndex((row) => {
    const text = row.map(normalizeImportText);
    return headerAliases.date.some((alias) => text.includes(alias)) && headerAliases.name.some((alias) => text.includes(alias)) && headerAliases.amount.some((alias) => text.includes(alias));
  });
  if (headerIndex < 0) return [];
  const header = rows[headerIndex].map(normalizeImportText);
  const column = (key) => header.findIndex((value) => headerAliases[key].includes(value));
  const dateCol = column('date'), nameCol = column('name'), amountCol = column('amount'), typeCol = column('type'), categoryCol = column('category');
  return rows.slice(headerIndex + 1).map((row, rowIndex) => transactionFromRow({
    name: row[nameCol], amountValue: row[amountCol], dateValue: row[dateCol], typeValue: typeCol >= 0 ? row[typeCol] : '', categoryValue: categoryCol >= 0 ? row[categoryCol] : '', batchId: `${batchId}:${rowIndex}`,
  })).filter(Boolean);
}
function monthlyMatrixRows(rows, sheetName, fingerprint) {
  const sheetText = normalizeImportText(sheetName);
  const year = Number(sheetText.match(/20\d{2}/)?.[0] || '');
  if (!year) return [];
  const columnCount = rows.reduce((maximum, row) => Math.max(maximum, row?.length || 0), 0);
  const labelColumn = Array.from({ length: columnCount }, (_, columnIndex) => columnIndex).find((columnIndex) => rows.some((row) => /^(saldo|despesas fixas|sobra quanto)/.test(normalizeImportText(row?.[columnIndex]))));
  if (labelColumn < 0) return [];
  const labelAt = (row) => normalizeImportText(row?.[labelColumn]);
  const incomeEnd = rows.findIndex((row) => labelAt(row).startsWith('saldo'));
  const expenseStart = rows.findIndex((row) => labelAt(row).startsWith('despesas fixas'));
  const expenseEnd = rows.findIndex((row) => labelAt(row).startsWith('sobra quanto'));
  if (incomeEnd < 0 || expenseStart <= incomeEnd || expenseEnd <= expenseStart) return [];
  const monthHeaderRow = rows.findIndex((row) => row.slice(labelColumn + 1, labelColumn + 13).filter((value) => value instanceof Date || (typeof value === 'number' && value > 30000 && value < 60000)).length >= 8);
  if (monthHeaderRow < 0) return [];
  const result = [];
  result.excludedFuture = 0;
  rows.forEach((row, rowIndex) => {
    const label = String(row?.[labelColumn] ?? '').trim();
    const type = rowIndex > monthHeaderRow && rowIndex < incomeEnd ? 'income' : rowIndex > expenseStart && rowIndex < expenseEnd ? 'expense' : '';
    if (!label || !type || /^(saldo|despesas fixas|sobra quanto)/i.test(normalizeImportText(label))) return;
    for (let month = 0; month < 12; month++) {
      const amount = parseImportAmount(row[month + labelColumn + 1]);
      if (!Number.isFinite(amount) || amount <= 0) continue;
      const date = `${year}-${String(month + 1).padStart(2, '0')}-01`;
      if (date.slice(0, 7) > monthKey(new Date())) { result.excludedFuture++; continue; }
      const batchId = `${fingerprint}:${sheetText}:${rowIndex}:${month}`;
      result.push({
        id: `import-${batchId}-${rowIndex}-${month}`,
        name: label,
        category: importCategory(label, type),
        date,
        amount,
        type,
        icon: type === 'income' ? '↙' : '•',
        importBatchId: batchId,
        monthlyAggregate: true,
      });
    }
  });
  return result;
}
function parseCsvRows(text) {
  const firstLine = text.split(/\r?\n/, 1)[0] || '';
  const delimiter = [',', ';', '\t'].sort((a, b) => firstLine.split(b).length - firstLine.split(a).length)[0];
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let index = 0; index < text.length; index++) {
    const character = text[index];
    if (character === '"' && quoted && text[index + 1] === '"') { cell += '"'; index++; }
    else if (character === '"') quoted = !quoted;
    else if (character === delimiter && !quoted) { row.push(cell); cell = ''; }
    else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && text[index + 1] === '\n') index++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += character;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((values) => values.some((value) => String(value).trim()));
}
function summarizeImport(rows) {
  const groups = new Map();
  rows.forEach((item) => {
    const key = item.date.slice(0, 4);
    const group = groups.get(key) || { year: key, count: 0, income: 0, expense: 0 };
    group.count++;
    group[item.type] += item.amount;
    groups.set(key, group);
  });
  return [...groups.values()].sort((a, b) => a.year.localeCompare(b.year));
}
function showSpreadsheetPreview(file, rows, alreadyImported = 0, excludedFuture = 0) {
  const years = summarizeImport(rows);
  const totalIncome = rows.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = rows.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
  const importRows = rows.map((item) => `<div class="import-preview-row"><span class="import-preview-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(new Date(`${item.date}T12:00:00`).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }))} · ${escapeHtml(item.category)} · ${item.type === 'income' ? 'Entrada' : 'Gasto'}</small></span><strong class="import-preview-amount ${item.type === 'income' ? 'in' : 'out'}">${item.type === 'income' ? '+' : '−'} ${money(item.amount)}</strong></div>`).join('');
  const yearSummary = years.map((group) => `<div class="import-year-card"><strong>${escapeHtml(group.year)}</strong><span>${group.count} registros</span><small>Entradas ${money(group.income)} · Gastos ${money(group.expense)}</small></div>`).join('');
  const duplicateNote = alreadyImported ? `<div class="review-note">${alreadyImported} registros de uma planilha já importada foram identificados e ficaram de fora para evitar duplicação.</div>` : '';
  const futureNote = excludedFuture ? `<div class="review-note">${excludedFuture} valores de meses futuros ficaram de fora para não aparecerem como movimentações já realizadas. Você pode importar esses meses quando chegarem.</div>` : '';
  const noRows = !rows.length;
  const noRowsTitle = alreadyImported ? 'Esta planilha já foi importada' : excludedFuture ? 'Só encontrei valores de meses futuros' : 'Não encontrei lançamentos';
  const noRowsMessage = alreadyImported
    ? `${alreadyImported} lançamentos já estão neste aparelho. Eles ficaram de fora para não duplicar seus registros.${excludedFuture ? ` ${excludedFuture} valores futuros também foram deixados de fora.` : ''}`
    : excludedFuture
      ? `${excludedFuture} valores são de meses futuros e foram deixados de fora para não aparecerem como movimentações realizadas. Tente novamente quando esses meses chegarem.`
      : 'Não encontrei uma tabela de lançamentos reconhecível. Use colunas como Data, Descrição e Valor, ou uma planilha mensal com receitas antes de “Saldo” e gastos entre “Despesas fixas” e “Sobra Quanto?”.';
  openModal(`<p class="modal-kicker">REVISÃO DA PLANILHA</p><h2 id="modal-title">${noRows ? noRowsTitle : 'Confira antes de importar.'}</h2><p class="modal-lead">${escapeHtml(file.name)} · lida neste aparelho. O arquivo não foi enviado à Dolayout.</p>${noRows ? `<div class="review-note">${escapeHtml(noRowsMessage)}</div>` : `<div class="import-summary"><strong>${rows.length} lançamentos prontos para revisão</strong><span>${money(totalIncome)} em entradas · ${money(totalExpense)} em gastos</span></div><div class="import-years">${yearSummary}</div><div class="review-note">Planilhas mensais entram como valores consolidados por categoria e mês, sem detalhes de compras individuais. Categorias são sugestões automáticas; você poderá ajustar os lançamentos depois.</div>${futureNote}${duplicateNote}<div class="import-preview" role="region" aria-label="Prévia de todos os lançamentos que serão importados" tabindex="0"><div class="import-preview-head"><span>Descrição · mês · categoria</span><span>Valor</span></div>${importRows}</div>`}<div class="modal-actions"><button class="secondary-button" id="file-cancel">${noRows ? 'Fechar' : 'Voltar'}</button>${noRows ? '' : `<button class="primary-button small" id="confirm-import">Importar ${rows.length} lançamentos</button>`}</div>`);
  modalContent.querySelector('#file-cancel').addEventListener('click', closeModal);
  if (!noRows) modalContent.querySelector('#confirm-import').addEventListener('click', () => {
    transactions.push(...rows);
    const mostRecent = rows.map((item) => item.date).sort().at(-1);
    save();
    if (mostRecent) document.querySelector('#month-select').value = mostRecent.slice(0, 7);
    refresh(); closeModal(); toast(`${rows.length} lançamentos importados. Confira o resumo e ajuste as categorias quando precisar.`);
  });
}
function currentIsoDate() { return new Date().toISOString().slice(0, 10); }
function createOcrWorker() {
  if (ocrWorkerPromise) return ocrWorkerPromise;
  if (!window.Tesseract?.createWorker) throw new Error('O leitor de fotos não carregou. Atualize o Dindin e tente novamente.');
  const localUrl = (path) => new URL(path, window.location.href).href;
  ocrWorkerPromise = window.Tesseract.createWorker('por', 1, {
    workerPath: localUrl('./vendor/ocr/worker.min.js'),
    corePath: localUrl('./vendor/ocr/core/'),
    langPath: localUrl('./vendor/ocr/lang'),
    cachePath: 'dindin-ocr-por-v1',
    workerBlobURL: false,
    logger: (event) => {
      const status = document.querySelector('#ocr-status');
      const progress = document.querySelector('#ocr-progress');
      if (!status || backdrop.hidden) return;
      const labels = { loadLanguage: 'Carregando português…', initialize: 'Preparando a leitura…', recognize: 'Lendo a foto…' };
      status.textContent = labels[event.status] || 'Preparando o reconhecimento…';
      if (progress && Number.isFinite(event.progress)) progress.value = Math.round(event.progress * 100);
    },
  });
  ocrWorkerPromise.catch(() => { ocrWorkerPromise = null; });
  return ocrWorkerPromise;
}
function imageCanvas(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, 2200 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.filter = 'grayscale(1) contrast(1.12)';
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(image.src);
      resolve(canvas);
    };
    image.onerror = () => { URL.revokeObjectURL(image.src); reject(new Error('Não consegui abrir essa imagem. Tente outra foto.')); };
    image.src = URL.createObjectURL(file);
  });
}
function ocrDate(text) {
  const match = String(text).match(/\b\d{1,2}[/.\-]\d{1,2}[/.\-]\d{2,4}\b/);
  if (!match) return currentIsoDate();
  const date = parseImportDate(match[0]);
  if (!date) return currentIsoDate();
  const year = Number(date.slice(0, 4));
  return year >= 1990 && year <= new Date().getFullYear() + 1 ? date : currentIsoDate();
}
function ocrMoneyValues(line) {
  const matches = String(line).match(/(?:R\$\s*)?(?:\d{1,3}(?:[. ]\d{3})+|\d+)(?:[,.]\d{2})/gi) || [];
  return matches.map((value) => parseImportAmount(value.replace(/\s/g, ''))).filter((value) => Number.isFinite(value) && value > 0 && value < 100000000);
}
function parsePhotoCandidates(text, kind) {
  const lines = String(text).split(/\r?\n/).map((line) => line.trim().replace(/\s{2,}/g, ' ')).filter(Boolean);
  const date = ocrDate(text);
  if (kind === 'receipt') {
    const totalLine = lines.find((line) => /total|a pagar|valor pago|valor final/i.test(normalizeImportText(line)) && ocrMoneyValues(line).length);
    const amount = totalLine ? ocrMoneyValues(totalLine).at(-1) : Math.max(0, ...lines.flatMap(ocrMoneyValues));
    const merchant = lines.find((line) => /[A-Za-zÀ-ÿ]{3}/.test(line) && !/cnpj|cpf|inscri|documento|consumidor|cupom|fiscal|endereco|telefone|operador|venda|caixa|data|hora/i.test(normalizeImportText(line))) || 'Compra no mercado';
    return [{ name: merchant.slice(0, 70), amount: amount || '', date, category: importCategory(`${merchant} ${text.slice(0, 500)}`, 'expense'), type: 'expense' }];
  }
  const amountPattern = /(?:R\$\s*)?(?:\d{1,3}(?:[. ]\d{3})+|\d+)(?:[,.]\d{2})/i;
  const ignored = /^(total|subtotal|saldo|sobra|troco|valor|despesas|receitas|anotacoes|observacoes)\b/i;
  const candidates = [];
  lines.forEach((line) => {
    if (ignored.test(normalizeImportText(line))) return;
    const amountMatch = line.match(amountPattern);
    if (!amountMatch) return;
    const amount = parseImportAmount(amountMatch[0].replace(/\s/g, ''));
    if (!Number.isFinite(amount) || amount <= 0 || amount >= 100000000) return;
    const label = line.replace(amountMatch[0], ' ').replace(/\b\d{1,2}[/.\-]\d{1,2}[/.\-]\d{2,4}\b/g, ' ').replace(/[|•·:;\-]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (label.length < 2 || !/[A-Za-zÀ-ÿ]/.test(label)) return;
    const type = /salario|recebi|recebido|renda|freela|entrada/.test(normalizeImportText(label)) ? 'income' : 'expense';
    candidates.push({ name: label.slice(0, 70), amount, date: ocrDate(line) || date, category: importCategory(label, type), type });
  });
  const unique = new Map();
  candidates.forEach((item) => unique.set(`${normalizeImportText(item.name)}|${item.amount}|${item.date}`, item));
  return [...unique.values()].slice(0, 30);
}
function photoCandidateMarkup(item = {}, index = 0) {
  const rowKey = `photo-entry-${++photoRowCounter}`;
  const expenseCategories = categories.filter((category) => !category.toLowerCase().includes('renda'));
  const options = [...new Set([...expenseCategories, ...(item.category && !expenseCategories.includes(item.category) ? [item.category] : [])])];
  return `<fieldset class="ocr-row" data-ocr-row><legend>Anotação ${index + 1}</legend><button class="ocr-remove" type="button" data-remove-ocr aria-label="Remover anotação ${index + 1}">×</button><div class="ocr-row-fields"><div class="field"><label for="${rowKey}-name">O que foi?</label><input id="${rowKey}-name" name="name" value="${escapeHtml(item.name || '')}" placeholder="Ex.: Mercado" required></div><div class="field"><label for="${rowKey}-amount">Valor (R$)</label><input id="${rowKey}-amount" name="amount" type="number" min="0.01" step="0.01" value="${item.amount || ''}" placeholder="0,00" required></div><div class="field"><label for="${rowKey}-date">Data</label><input id="${rowKey}-date" name="date" type="date" value="${item.date || currentIsoDate()}" required></div><div class="field"><label for="${rowKey}-type">Tipo</label><select id="${rowKey}-type" name="type"><option value="expense" ${item.type !== 'income' ? 'selected' : ''}>Gasto</option><option value="income" ${item.type === 'income' ? 'selected' : ''}>Entrada</option></select></div><div class="field"><label for="${rowKey}-category">Categoria</label><select id="${rowKey}-category" name="category">${options.map((category) => `<option ${category === (item.category || 'Outros') ? 'selected' : ''}>${escapeHtml(category)}</option>`).join('')}</select></div></div></fieldset>`;
}
function showPhotoCandidates(file, kind, text, confidence, candidates, warning = '') {
  const label = kind === 'receipt' ? 'nota ou recibo' : 'anotações';
  const confidenceLabel = Number.isFinite(confidence) ? ` · leitura ${Math.round(confidence)}%` : '';
  const initialRows = candidates.length ? candidates : [{ name: '', amount: '', date: currentIsoDate(), category: 'Outros', type: 'expense' }];
  const htmlRows = initialRows.map(photoCandidateMarkup).join('');
  openModal(`<p class="modal-kicker">REVISÃO DA FOTO</p><h2 id="modal-title">Confira o que encontramos.</h2><p class="modal-lead">${escapeHtml(file.name)} · imagem lida neste aparelho${confidenceLabel}.</p><div class="ocr-photo"><img class="photo-preview" src="${photoUrl}" alt="Prévia da foto"><div class="review-note">${warning ? `${escapeHtml(warning)} ` : ''}O reconhecimento pode errar, principalmente em escrita à mão. Confira cada campo. A foto não foi enviada à Dolayout.</div></div><form id="photo-form"><div id="ocr-rows">${htmlRows}</div><button class="secondary-button ocr-add" id="add-ocr-row" type="button">＋ Adicionar anotação</button><p class="modal-footnote">${candidates.length ? `${candidates.length} ${candidates.length === 1 ? 'lançamento sugerido' : 'lançamentos sugeridos'} a partir da foto de ${label}.` : 'Não consegui reconhecer os dados com segurança. Você pode preencher os campos abaixo.'}</p><details class="ocr-text"><summary>Ver texto reconhecido</summary><pre>${escapeHtml(text || 'Nenhum texto reconhecido.')}</pre></details><div class="modal-actions"><button type="button" class="secondary-button" id="review-cancel">Voltar</button><button class="primary-button small" type="submit">Salvar lançamentos</button></div></form>`);
  const rows = modalContent.querySelector('#ocr-rows');
  modalContent.querySelector('#add-ocr-row').addEventListener('click', () => rows.insertAdjacentHTML('beforeend', photoCandidateMarkup({ date: currentIsoDate(), category: 'Outros', type: 'expense' }, rows.children.length)));
  modalContent.querySelectorAll('[data-remove-ocr]').forEach((button) => button.addEventListener('click', () => {
    if (rows.children.length === 1) { rows.querySelectorAll('input').forEach((input) => { input.value = input.name === 'date' ? currentIsoDate() : ''; }); return; }
    button.closest('[data-ocr-row]').remove();
  }));
  modalContent.querySelector('#review-cancel').addEventListener('click', openImport);
  modalContent.querySelector('#photo-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const entries = [...rows.querySelectorAll('[data-ocr-row]')].map((row) => ({
      name: row.querySelector('[name="name"]').value.trim(),
      amount: Number(row.querySelector('[name="amount"]').value),
      date: row.querySelector('[name="date"]').value,
      type: row.querySelector('[name="type"]').value,
      category: row.querySelector('[name="category"]').value,
    })).filter((item) => item.name && item.date && Number.isFinite(item.amount) && item.amount > 0);
    if (!entries.length) { toast('Preencha ao menos uma anotação antes de salvar.'); return; }
    transactions.push(...entries.map((item) => ({ ...item, id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, icon: item.type === 'income' ? '↙' : '•' })));
    save(); refresh(); closeModal(); toast(`${entries.length} ${entries.length === 1 ? 'lançamento salvo' : 'lançamentos salvos'}.`);
  });
}
async function reviewPhoto(file, kind) {
  const activePhotoUrl = photoUrl;
  openModal(`<p class="modal-kicker">LEITURA NO APARELHO</p><h2 id="modal-title">Preparando a foto…</h2><p class="modal-lead">A primeira leitura pode demorar alguns segundos enquanto o leitor de português é preparado.</p><img class="photo-preview" src="${photoUrl}" alt="Prévia da foto"><progress id="ocr-progress" max="100" value="0"></progress><p class="ocr-status" id="ocr-status" role="status" aria-live="polite">Carregando o leitor. A imagem não sai deste aparelho.</p><div class="review-note">O reconhecimento roda no celular/computador. Nenhuma foto ou lançamento é enviado à Dolayout.</div>`);
  try {
    const worker = await createOcrWorker();
    const canvas = await imageCanvas(file);
    if (photoUrl !== activePhotoUrl || backdrop.hidden) return;
    const result = await worker.recognize(canvas);
    if (photoUrl !== activePhotoUrl || backdrop.hidden) return;
    const text = result.data?.text || '';
    showPhotoCandidates(file, kind, text, result.data?.confidence, parsePhotoCandidates(text, kind));
  } catch (error) {
    if (photoUrl !== activePhotoUrl || backdrop.hidden) return;
    showPhotoCandidates(file, kind, '', NaN, [], `Não consegui ler automaticamente (${error.message || 'leitura indisponível'}).`);
  }
}
async function processSpreadsheet(file) {
  const extension = file.name.split('.').pop().toLowerCase();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const fingerprint = await importFingerprint(bytes);
  let parsed = [];
  let excludedFuture = 0;
  if (extension === 'csv') {
    const text = new TextDecoder('utf-8').decode(bytes).replace(/^\uFEFF/, '');
    parsed = tableRowsToTransactions(parseCsvRows(text), `csv:${fingerprint}`);
  } else if (!window.XLSX?.read) {
    throw new Error('O leitor de Excel não carregou. Atualize o Dindin; sua planilha não foi enviada nem alterada.');
  } else {
    const workbook = XLSX.read(bytes, { cellDates: true, dense: true });
    workbook.SheetNames.forEach((sheetName) => {
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: true, defval: null });
      const sheetBatch = `${fingerprint}:${normalizeImportText(sheetName)}`;
      const tableRows = tableRowsToTransactions(rows, sheetBatch);
      if (tableRows.length) parsed.push(...tableRows);
      else {
        const matrixRows = monthlyMatrixRows(rows, sheetName, fingerprint);
        excludedFuture += matrixRows.excludedFuture || 0;
        parsed.push(...matrixRows);
      }
    });
  }
  const importedBatches = new Set(transactions.map((item) => item.importBatchId).filter(Boolean));
  const newRows = parsed.filter((item) => !importedBatches.has(item.importBatchId));
  showSpreadsheetPreview(file, newRows, parsed.length - newRows.length, excludedFuture);
}
function showFileError(file, message) {
  openModal(`<p class="modal-kicker">REVISÃO DA PLANILHA</p><h2 id="modal-title">Não consegui ler o arquivo.</h2><p class="modal-lead">${escapeHtml(file.name)} continua apenas no seu aparelho.</p><div class="review-note">${escapeHtml(message)}</div><div class="modal-actions"><button class="primary-button small" id="file-cancel">Fechar</button></div>`);
  modalContent.querySelector('#file-cancel').addEventListener('click', closeModal);
}
function showFileReview(file, kind) {
  closeModal();
  if (kind === 'paper' || kind === 'receipt') {
    photoUrl = URL.createObjectURL(file);
    reviewPhoto(file, kind);
    return;
  }
  openModal(`<p class="modal-kicker">IMPORTAÇÃO LOCAL</p><h2 id="modal-title">Lendo sua planilha…</h2><p class="modal-lead">${escapeHtml(file.name)} está sendo processada neste aparelho.</p><div class="review-note">O arquivo e os dados não são enviados à Dolayout. Nada será salvo antes da sua confirmação.</div>`);
  processSpreadsheet(file).catch((error) => showFileError(file, error.message || 'Verifique se o arquivo está em formato Excel ou CSV.'));
}
function openTransactionForm(defaultType = 'expense') {
  openModal(`<p class="modal-kicker">NOVO LANÇAMENTO</p><h2 id="modal-title">Anote em poucos passos.</h2><p class="modal-lead">Não precisa preencher tudo. Uma descrição, um valor e uma data já ajudam.</p><form id="transaction-form"><button class="photo-first-action" type="button" id="tx-photo-first" data-file-input="receipt-file"><span class="photo-first-icon">${iconMarkup('camera')}</span><span class="photo-first-copy"><strong>Fotografar nota ou recibo</strong><small>O app sugere valor e categoria para você conferir.</small></span><span class="photo-first-arrow" aria-hidden="true">→</span></button><p class="manual-entry-label">Ou preencha manualmente</p><div class="field"><label for="tx-type">Tipo</label><select id="tx-type"><option value="expense" ${defaultType === 'expense' ? 'selected' : ''}>Gasto</option><option value="income" ${defaultType === 'income' ? 'selected' : ''}>Receita</option></select></div><div class="field"><label for="tx-name">Descrição</label><input id="tx-name" placeholder="Ex.: Conta de luz" required></div><div class="review-fields"><div class="field"><label for="tx-amount">Valor</label><input id="tx-amount" type="number" step="0.01" min="0" placeholder="0,00" required></div><div class="field"><label for="tx-date">Data</label><input id="tx-date" type="date" value="${new Date().toISOString().slice(0,10)}" required></div><div class="field full"><label for="tx-category">Categoria</label><select id="tx-category"></select></div></div><div class="modal-actions"><button type="button" class="secondary-button" id="tx-cancel">Cancelar</button><button class="primary-button small" type="submit">Salvar lançamento</button></div></form>`);
  const updateCategoryOptions = () => {
    const type = modalContent.querySelector('#tx-type').value;
    const available = categories.filter((cat) => type === 'income' ? cat.toLowerCase().includes('renda') : !cat.toLowerCase().includes('renda'));
    modalContent.querySelector('#tx-category').innerHTML = available.map((cat) => `<option>${escapeHtml(cat)}</option>`).join('') || '<option>Outros</option>';
    const photoAction = modalContent.querySelector('#tx-photo-first');
    const copy = photoAction.querySelector('.photo-first-copy');
    const isIncome = type === 'income';
    photoAction.dataset.fileInput = isIncome ? 'paper-file' : 'receipt-file';
    copy.innerHTML = `<strong>${isIncome ? 'Fotografar anotações no papel' : 'Fotografar nota ou recibo'}</strong><small>${isIncome ? 'O app sugere suas entradas para você conferir.' : 'O app sugere valor e categoria para você conferir.'}</small>`;
  };
  updateCategoryOptions();
  modalContent.querySelector('#tx-type').addEventListener('change', updateCategoryOptions);
  modalContent.querySelector('#tx-photo-first').addEventListener('click', (event) => document.querySelector(`#${event.currentTarget.dataset.fileInput}`).click());
  modalContent.querySelector('#tx-cancel').addEventListener('click', closeModal);
  modalContent.querySelector('#transaction-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const type = modalContent.querySelector('#tx-type').value;
    transactions.push({ id: Date.now(), name: modalContent.querySelector('#tx-name').value, category: modalContent.querySelector('#tx-category').value, date: modalContent.querySelector('#tx-date').value, amount: Number(modalContent.querySelector('#tx-amount').value), type, icon: type === 'income' ? '↙' : '•' });
    save(); refresh(); closeModal(); toast('Lançamento salvo.');
  });
}
function addCategory() {
  const name = window.prompt('Qual nome você quer dar para a categoria?');
  if (name && name.trim() && !categories.includes(name.trim())) { categories.push(name.trim()); save(); renderCategories(); toast('Categoria adicionada.'); }
}
function setTheme(theme) {
  const light = theme === 'light';
  document.body.classList.toggle('light', light);
  localStorage.setItem('dindin.theme', light ? 'light' : 'dark');
  const toggle = document.querySelector('#theme-toggle');
  const label = document.querySelector('#theme-label');
  label.textContent = light ? 'Escuro' : 'Claro';
  toggle.setAttribute('aria-label', light ? 'Ativar tema escuro' : 'Ativar tema claro');
  toggle.title = light ? 'Ativar tema escuro' : 'Ativar tema claro';
  document.querySelector('#theme-icon').innerHTML = light
    ? '<path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.7 8.7 0 1 0 20.5 15.5Z"/>'
    : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>';
  document.querySelector('meta[name="theme-color"]').content = light ? '#f3f2ee' : '#050505';
}

document.addEventListener('click', (event) => {
  const view = event.target.closest('[data-view]');
  if (view) navigate(view.dataset.view);
  const viewLink = event.target.closest('[data-view-link]');
  if (viewLink) navigate(viewLink.dataset.viewLink);
  if (event.target.closest('[data-open-import]')) openImport();
  if (event.target.closest('[data-open-data]')) openDataSettings();
  if (event.target.closest('#start-button') || event.target.closest('#help-button') || event.target.closest('#top-help')) openOnboarding();
  if (event.target.closest('#dismiss-welcome')) document.querySelector('.welcome-strip').remove();
  if (event.target.closest('#tip-photo')) document.querySelector('#receipt-file').click();
  if (event.target.closest('#add-transaction') || event.target.closest('#mobile-capture')) openTransactionForm();
  if (event.target.closest('#add-category')) addCategory();
});
document.querySelector('#modal-close').addEventListener('click', closeModal);
backdrop.addEventListener('click', (event) => { if (event.target === backdrop) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !backdrop.hidden) closeModal(); });
document.querySelector('#spreadsheet-file').addEventListener('change', (event) => { const file = event.target.files[0]; if (file) showFileReview(file, 'spreadsheet'); event.target.value = ''; });
document.querySelector('#paper-file').addEventListener('change', (event) => { const file = event.target.files[0]; if (file) showFileReview(file, 'paper'); event.target.value = ''; });
document.querySelector('#receipt-file').addEventListener('change', (event) => { const file = event.target.files[0]; if (file) showFileReview(file, 'receipt'); event.target.value = ''; });
document.querySelector('#backup-file').addEventListener('change', (event) => { const file = event.target.files[0]; if (file) restoreBackup(file); event.target.value = ''; });
document.querySelector('#transaction-search').addEventListener('input', renderTransactions);
document.querySelector('#type-filter').addEventListener('change', renderTransactions);
document.querySelector('#category-filter').addEventListener('change', renderTransactions);
document.querySelector('#month-select').addEventListener('change', refresh);
const savedTheme = localStorage.getItem('dindin.theme') || localStorage.getItem('dolayout-theme') || 'dark';
setTheme(savedTheme);
document.querySelector('#theme-toggle').addEventListener('click', () => setTheme(document.body.classList.contains('light') ? 'dark' : 'light'));
refresh();
