const defaultCategories = ['Casa', 'Mercado', 'Saúde', 'Transporte', 'Contas', 'Lazer', 'Renda', 'Renda extra', 'Outros'];
const iconPaths = {
  sheet: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  paper: '<path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 12h7M8 16h7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  income: '<path d="M7 17 17 7M8 7h9v9"/><path d="M4 20h16"/>',
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
  return `<div class="transaction-row"><span class="transaction-icon ${iconClass}">${iconMarkup(iconName)}</span><span class="transaction-main"><strong>${escapeHtml(item.name)}</strong><small>${dateLabel(item.date)} · ${escapeHtml(item.category)}</small></span><span class="transaction-category">${escapeHtml(item.category)}</span><span class="transaction-amount ${item.type === 'income' ? 'in' : 'out'}">${item.type === 'income' ? '+' : '−'} ${money(item.amount)}</span></div>`;
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
  const spent = Object.fromEntries(categories.map((cat) => [cat, monthTransactions().filter((t) => t.type === 'expense' && t.category === cat).reduce((sum,t) => sum + Number(t.amount),0)]));
  document.querySelector('#category-cards').innerHTML = categories.map((cat) => {
    const name = cat.toLowerCase();
    const icon = name.includes('renda') ? 'income' : name.includes('mercado') ? 'market' : name.includes('saúde') ? 'health' : name.includes('casa') ? 'home' : 'receipt';
    return `<article class="category-card"><div class="category-card-head"><span class="category-card-icon">${iconMarkup(icon)}</span><div><h3>${escapeHtml(cat)}</h3><p>Gastos no período</p></div></div><div class="category-card-foot"><strong>${money(spent[cat] || 0)}</strong><span>${spent[cat] ? 'com lançamentos' : 'sem lançamentos'}</span></div></article>`;
  }).join('');
}
function refresh() { setupMonthSelect(); renderTotals(); renderRecent(); renderTransactions(); renderCharts(); if (document.querySelector('#view-categories').classList.contains('active')) renderCategories(); }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[char])); }
function openOnboarding() {
  openModal(`<p class="modal-kicker">UM COMEÇO LEVE</p><h2 id="modal-title">Como prefere começar?</h2><p class="modal-lead">Escolha o jeito mais fácil para você. Antes de salvar, vamos mostrar tudo para conferir.</p><div class="choice-grid"><button class="choice-card" data-method="spreadsheet"><span class="choice-icon">${iconMarkup('sheet')}</span><span class="choice-copy"><strong>Tenho uma planilha</strong><small>A importação automática de planilhas ainda está sendo preparada.</small></span><span class="choice-arrow">→</span></button><button class="choice-card" data-method="paper"><span class="choice-icon">${iconMarkup('paper')}</span><span class="choice-copy"><strong>Anoto no papel</strong><small>Fotografe para usar como referência e revise os dados manualmente.</small></span><span class="choice-arrow">→</span></button><button class="choice-card" data-method="blank"><span class="choice-icon">${iconMarkup('plus')}</span><span class="choice-copy"><strong>Quero começar do zero</strong><small>Adicione seu primeiro gasto ou sua primeira receita.</small></span><span class="choice-arrow">→</span></button></div><p class="modal-footnote">Os lançamentos são salvos neste aparelho. Qualquer futura importação ficará em rascunho para conferência antes de salvar.</p>`);
  modalContent.querySelectorAll('[data-method]').forEach((button) => button.addEventListener('click', () => {
    const method = button.dataset.method;
    if (method === 'spreadsheet') document.querySelector('#spreadsheet-file').click();
    if (method === 'paper') document.querySelector('#paper-file').click();
    if (method === 'blank') { closeModal(); openTransactionForm(); }
  }));
}
function openImport() {
  openModal(`<p class="modal-kicker">IMPORTAR DADOS</p><h2 id="modal-title">Traga o que você já anotou.</h2><p class="modal-lead">Pode ser uma planilha, uma nota ou uma folha do seu caderno. Tudo deve ser conferido antes de entrar nos seus registros.</p><div class="choice-grid"><button class="choice-card" data-method="spreadsheet"><span class="choice-icon">${iconMarkup('sheet')}</span><span class="choice-copy"><strong>Selecionar uma planilha</strong><small>Excel e CSV: o importador automático ainda está sendo preparado.</small></span><span class="choice-arrow">→</span></button><button class="choice-card" data-method="paper"><span class="choice-icon">${iconMarkup('paper')}</span><span class="choice-copy"><strong>Fotografar uma página</strong><small>A foto fica como referência; preencha e confira os dados manualmente.</small></span><span class="choice-arrow">→</span></button></div><p class="modal-footnote">Nenhum arquivo será enviado à Dolayout. Nesta etapa, planilhas ainda não são importadas automaticamente.</p>`);
  modalContent.querySelectorAll('[data-method]').forEach((button) => button.addEventListener('click', () => document.querySelector(button.dataset.method === 'spreadsheet' ? '#spreadsheet-file' : '#paper-file').click()));
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
function showFileReview(file, kind) {
  closeModal();
  if (kind === 'paper' || kind === 'receipt') {
    photoUrl = URL.createObjectURL(file);
    openModal(`<p class="modal-kicker">REVISÃO DA FOTO</p><h2 id="modal-title">Vamos registrar com calma.</h2><p class="modal-lead">A imagem fica no aparelho e serve como referência. Nesta versão, preencha os dados manualmente antes de salvar.</p><img class="photo-preview" src="${photoUrl}" alt="Prévia da imagem selecionada"><div class="review-note">O reconhecimento automático da nota ou da escrita à mão ainda não está ativo. Confira data, valor e categoria antes de salvar.</div><form id="review-form"><div class="review-fields"><div class="field"><label for="review-date">Data</label><input id="review-date" type="date" value="${new Date().toISOString().slice(0,10)}" required></div><div class="field"><label for="review-amount">Valor total</label><input id="review-amount" type="number" min="0" step="0.01" placeholder="0,00" required></div><div class="field full"><label for="review-name">O que foi?</label><input id="review-name" placeholder="Ex.: Mercado da semana" required></div><div class="field full"><label for="review-category">Categoria</label><select id="review-category">${categories.filter((c) => c !== 'Renda' && c !== 'Renda extra').map((c) => `<option>${escapeHtml(c)}</option>`).join('')}</select></div></div><div class="modal-actions"><button type="button" class="secondary-button" id="review-cancel">Voltar</button><button class="primary-button small" type="submit">Salvar lançamento</button></div></form>`);
    modalContent.querySelector('#review-cancel').addEventListener('click', openImport);
    modalContent.querySelector('#review-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const amount = Number(modalContent.querySelector('#review-amount').value);
      transactions.push({ id: Date.now(), name: modalContent.querySelector('#review-name').value, category: modalContent.querySelector('#review-category').value, date: modalContent.querySelector('#review-date').value, amount, type: 'expense', icon: '▧' });
      save(); refresh(); closeModal(); toast('Rascunho adicionado. Você pode editar em Lançamentos.');
    });
    return;
  }
  const isCsv = file.name.toLowerCase().endsWith('.csv');
  openModal(`<p class="modal-kicker">REVISÃO DA PLANILHA</p><h2 id="modal-title">Arquivo recebido.</h2><p class="modal-lead">${escapeHtml(file.name)} foi selecionado. Seus dados não foram enviados para a Dolayout.</p><div class="review-note">A importação automática de Excel e CSV ainda não está ativa. Nenhum dado desse arquivo foi adicionado ao app.</div>${isCsv ? '<div class="field"><label for="csv-preview">Prévia do arquivo CSV</label><textarea id="csv-preview" rows="5" readonly></textarea></div>' : ''}<div class="modal-actions"><button class="secondary-button" id="file-cancel">Fechar</button><button class="primary-button small" id="demo-import">Entendi</button></div>`);
  if (isCsv) file.text().then((text) => { const preview = modalContent.querySelector('#csv-preview'); if (preview) preview.value = text.split(/\r?\n/).slice(0,6).join('\n'); });
  modalContent.querySelector('#file-cancel').addEventListener('click', closeModal);
  modalContent.querySelector('#demo-import').addEventListener('click', closeModal);
}
function openTransactionForm(defaultType = 'expense') {
  openModal(`<p class="modal-kicker">NOVO LANÇAMENTO</p><h2 id="modal-title">Anote em poucos passos.</h2><p class="modal-lead">Não precisa preencher tudo. Uma descrição, um valor e uma data já ajudam.</p><form id="transaction-form"><div class="field"><label for="tx-type">Tipo</label><select id="tx-type"><option value="expense" ${defaultType === 'expense' ? 'selected' : ''}>Gasto</option><option value="income" ${defaultType === 'income' ? 'selected' : ''}>Receita</option></select></div><div class="field"><label for="tx-name">Descrição</label><input id="tx-name" placeholder="Ex.: Conta de luz" required></div><div class="review-fields"><div class="field"><label for="tx-amount">Valor</label><input id="tx-amount" type="number" step="0.01" min="0" placeholder="0,00" required></div><div class="field"><label for="tx-date">Data</label><input id="tx-date" type="date" value="${new Date().toISOString().slice(0,10)}" required></div><div class="field full"><label for="tx-category">Categoria</label><select id="tx-category"></select></div></div><div class="modal-actions"><button type="button" class="secondary-button" id="tx-cancel">Cancelar</button><button class="primary-button small" type="submit">Salvar lançamento</button></div></form>`);
  const updateCategoryOptions = () => {
    const type = modalContent.querySelector('#tx-type').value;
    const available = categories.filter((cat) => type === 'income' ? cat.toLowerCase().includes('renda') : !cat.toLowerCase().includes('renda'));
    modalContent.querySelector('#tx-category').innerHTML = available.map((cat) => `<option>${escapeHtml(cat)}</option>`).join('') || '<option>Outros</option>';
  };
  updateCategoryOptions();
  modalContent.querySelector('#tx-type').addEventListener('change', updateCategoryOptions);
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
