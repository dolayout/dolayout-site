const WHATSAPP_NUMBER = '5511998679980';
const products = [
  {id:'pizza-queijos',cat:'pizza',tag:'Pizza individual · 30 cm',name:'Tomate & queijos',desc:'Molho da casa, muçarela e borda dourada no azeite.',price:36,image:'assets/menu/pizza-tomate-queijos.png'},
  {id:'pizza-linguica',cat:'pizza',tag:'Pizza individual · 30 cm',name:'Linguiça Blumenau',desc:'Linguiça Blumenau, muçarela e cebola roxa.',price:42,image:'assets/menu/pizza-linguica.png'},
  {id:'pizza-frango',cat:'pizza',tag:'Pizza individual · 30 cm',name:'Frango & Catupiry',desc:'Frango desfiado, Catupiry e ervas frescas.',price:39,image:'assets/menu/pizza-frango.png'},
  {id:'cafe-pao',cat:'cafe',tag:'Café & manhã',name:'Café + pão de queijo',desc:'Café passado e pão de queijo quentinho.',price:12},
  {id:'cafe-espresso',cat:'cafe',tag:'Café & manhã',name:'Café espresso',desc:'Curto e intenso.',price:7},
  {id:'almoco-nhoque',cat:'almoco',tag:'Encomenda · quinta',name:'Nhoque da semana',desc:'Reserve até o dia anterior.',price:29},
  {id:'almoco-picadinho',cat:'almoco',tag:'Encomenda · sexta',name:'Picadinho + farofa',desc:'Picadinho com farofa de banana.',price:32},
  {id:'almoco-feijoada',cat:'almoco',tag:'Encomenda · sábado',name:'Feijoada leve',desc:'Feita em pequena produção.',price:32},
  {id:'brahma',cat:'bebidas',tag:'Ambev · 350 ml',name:'Brahma Chopp',desc:'Lata gelada.',price:9},
  {id:'original',cat:'bebidas',tag:'Ambev · 600 ml',name:'Original',desc:'Garrafa retornável.',price:14},
  {id:'budweiser',cat:'bebidas',tag:'Ambev · 350 ml',name:'Budweiser',desc:'Lata gelada.',price:12},
  {id:'guarana',cat:'bebidas',tag:'Ambev · 350 ml',name:'Guaraná Antarctica',desc:'Lata gelada.',price:7},
  {id:'agua',cat:'bebidas',tag:'AMA · 500 ml',name:'Água mineral',desc:'Para levar à praia.',price:5},
  {id:'fusion',cat:'bebidas',tag:'Ambev · 250 ml',name:'Fusion Energy',desc:'Lata gelada.',price:12}
];
const $ = selector => document.querySelector(selector);
const money = value => value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const cart = {};
const categoryNames = {todos:'Tudo da casa',pizza:'Pizzas da casa',cafe:'Café & manhã',almoco:'Almoço por encomenda',bebidas:'Para beber'};
let activeFilter = 'todos';
let toastTimer;

function showToast(message){const toast=$('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
function renderProducts(){
  $('#productsTitle').textContent=categoryNames[activeFilter];
  $('#menuGrid').innerHTML=products.filter(p=>activeFilter==='todos'||p.cat===activeFilter).map(p=>`<article class="menu-card"><div class="menu-card-copy"><span class="card-tag">${p.tag}</span><h4>${p.name}</h4><p>${p.desc}</p><div class="card-foot"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}" type="button" aria-label="Adicionar ${p.name} ao pedido">+</button></div></div>${p.image?`<img class="pizza-thumb" src="${p.image}" alt="${p.name}" loading="lazy" />`:''}</article>`).join('');
  document.querySelectorAll('[data-add]').forEach(button=>button.addEventListener('click',()=>add(button.dataset.add)));
  document.querySelectorAll('[data-filter]').forEach(button=>button.classList.toggle('active',button.dataset.filter===activeFilter));
  document.querySelectorAll('[data-category]').forEach(button=>button.classList.toggle('selected',button.dataset.category===activeFilter));
}
function setFilter(filter,scroll=false){activeFilter=filter;renderProducts();if(scroll)$('#productsTitle').scrollIntoView({behavior:'smooth',block:'start'})}
function add(id){cart[id]=(cart[id]||0)+1;renderCart();showToast('Adicionado ao pedido')}
function remove(id){if(!cart[id])return;cart[id]--;if(cart[id]===0)delete cart[id];renderCart()}
function renderCart(){
  const ids=Object.keys(cart),count=ids.reduce((sum,id)=>sum+cart[id],0),total=ids.reduce((sum,id)=>sum+cart[id]*products.find(p=>p.id===id).price,0);
  $('#cartCount').textContent=count;$('#cartTitle').textContent=count?`${count} ${count===1?'item':'itens'} no pedido`:'Nada por aqui ainda';$('#cartTotal').textContent=money(total);
  $('#cartItems').innerHTML=ids.length?ids.map(id=>{const p=products.find(item=>item.id===id);return `<div class="cart-line"><div><h4>${p.name}</h4><p>${money(p.price)} cada</p></div><div class="line-controls"><button type="button" data-remove="${id}" aria-label="Remover uma unidade de ${p.name}">−</button><b>${cart[id]}</b><button type="button" data-add-cart="${id}" aria-label="Adicionar uma unidade de ${p.name}">+</button></div></div>`}).join(''):'<p class="cart-empty">Adicione uma pizza, um café ou uma bebida para começar.</p>';
  document.querySelectorAll('[data-remove]').forEach(button=>button.addEventListener('click',()=>remove(button.dataset.remove)));
  document.querySelectorAll('[data-add-cart]').forEach(button=>button.addEventListener('click',()=>add(button.dataset.addCart)));
}
function setCart(open){$('#cart').classList.toggle('open',open);$('#cart').setAttribute('aria-hidden',String(!open));$('#cart').inert=!open;$('#cartBackdrop').hidden=!open;document.body.classList.toggle('locked',open||$('#fullMenu').classList.contains('open'));if(open)$('#cartClose').focus();else $('#floatingCart').focus()}
function setMenu(open){$('#fullMenu').classList.toggle('open',open);$('#fullMenu').inert=!open;$('#menuToggle').setAttribute('aria-expanded',String(open));$('#menuToggle').querySelector('span').textContent=open?'Fechar':'Menu';document.body.classList.toggle('locked',open||$('#cart').classList.contains('open'));if(open)$('#fullMenu').querySelector('a').focus();else $('#menuToggle').focus()}
function setTheme(dark){document.documentElement.dataset.theme=dark?'dark':'light';localStorage.setItem('casa58-theme',dark?'dark':'light');$('#themeToggle').setAttribute('aria-label',dark?'Ativar modo claro':'Ativar modo escuro');$('.theme-label').textContent=dark?'Modo claro':'Modo escuro';$('meta[name="theme-color"]').content=dark?'#1d2116':'#faf4ea'}

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>setFilter(button.dataset.filter)));
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>setFilter(button.dataset.category,true)));
document.querySelectorAll('[data-filter-link]').forEach(link=>link.addEventListener('click',()=>setFilter(link.dataset.filterLink)));
$('#floatingCart').addEventListener('click',()=>setCart(true));$('#cartClose').addEventListener('click',()=>setCart(false));$('#cartBackdrop').addEventListener('click',()=>setCart(false));
$('#menuToggle').addEventListener('click',()=>setMenu(!$('#fullMenu').classList.contains('open')));
$('#menuCart').addEventListener('click',()=>{setMenu(false);setCart(true)});
document.querySelectorAll('[data-menu-link]').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
$('#themeToggle').addEventListener('click',()=>setTheme(document.documentElement.dataset.theme!=='dark'));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if($('#cart').classList.contains('open'))setCart(false);else if($('#fullMenu').classList.contains('open'))setMenu(false)}});
$('#whatsappButton').addEventListener('click',()=>{
  const ids=Object.keys(cart);if(!ids.length){showToast('Escolha pelo menos um item');return}
  if(!WHATSAPP_NUMBER){showToast('O WhatsApp da Casa 58 ainda não foi configurado');return}
  const total=ids.reduce((sum,id)=>sum+cart[id]*products.find(p=>p.id===id).price,0);
  const message=`Olá, Casa 58! Quero fazer este pedido:\n\n${ids.map(id=>`${cart[id]}x ${products.find(p=>p.id===id).name}`).join('\n')}\n\nTotal estimado: ${money(total)}\n\nNome: \nRetirada: balcão`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,'_blank','noopener');
});

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion){let scheduled=false;const updateParallax=()=>{const hero=$('.hero');const progress=Math.min(Math.max(-hero.getBoundingClientRect().top,0),hero.offsetHeight);hero.style.setProperty('--parallax',`${Math.round(progress*.08)}px`);scheduled=false};window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateParallax)}},{passive:true});updateParallax()}
setTheme(localStorage.getItem('casa58-theme')==='dark');renderProducts();renderCart();
