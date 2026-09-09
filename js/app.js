
/* =========================================================
   ICONS
========================================================= */
const ICONS = {
  dashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>`,
  box: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>`,
  plus: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>`,
  tag: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 12.5l-8-8H4v8.5l8 8a2 2 0 002.8 0l5.7-5.7a2 2 0 000-2.8z"/><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none"/></svg>`,
  chart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>`,
  logout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/><path d="M10 11v6M14 11v6"/></svg>`,
  menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  alert: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg>`,
  check: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  inboxEmpty: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>`,
  crate: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/></svg>`,
  users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`
};

/* =========================================================
   API CLIENT  (talks to the PHP + MySQL backend in /api)
========================================================= */
async function api(method, url, body){
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin'
  };
  if(body !== undefined) opts.body = JSON.stringify(body);

  let res;
  try{
    res = await fetch(url, opts);
  }catch(networkErr){
    return { ok:false, status:0, data:{ error:'Could not reach the server. Is it still running?' } };
  }

  let data = {};
  try{ data = await res.json(); }catch(e){ /* empty body, e.g. some 204s */ }
  return { ok: res.ok, status: res.status, data };
}


/* =========================================================
   APP STATE
========================================================= */
const LOW_STOCK_THRESHOLD = 10;
const PAGE_SIZE = 8;
const SORTABLE_COLUMNS = [
  { key:'id', label:'Product ID' },
  { key:'name', label:'Name' },
  { key:'category', label:'Category' },
  { key:'quantity', label:'Quantity' },
  { key:'price', label:'Price' },
  { key:'supplier', label:'Supplier' },
  { key:'status', label:'Status' }
];

const state = {
  booted: false,
  user: null,          // {username, email}
  page: 'dashboard',
  products: [],
  categories: [],
  search: '',
  editingId: null,      // product id being edited, or null for "add" mode
  sidebarOpen: false,
  loginError: '',
  authMode: 'login',    // 'login' or 'register'
  authNotice: '',       // one-time success message shown after registering
  inventoryFilter: 'all', // 'all' or 'attention' (low + out of stock, set via Dashboard card)
  sortColumn: null,       // one of SORTABLE_COLUMNS keys, or null for insertion order
  sortDirection: 'asc',   // 'asc' or 'desc'
  currentPage: 1
};

function uid(prefix){
  return prefix + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
}

async function boot(){
  // The server seeds the database on its first-ever run, so the client
  // no longer needs to seed anything itself — it just loads what's there.
  const sessionRes = await api('GET', 'api/auth_session.php');
  if(sessionRes.ok && sessionRes.data.user){
    state.user = sessionRes.data.user;
    await loadProductsAndCategories();
  }
  state.booted = true;
  render();
}

async function loadProductsAndCategories(){
  const [productsRes, categoriesRes] = await Promise.all([
    api('GET', 'api/products_list.php'),
    api('GET', 'api/categories_list.php')
  ]);
  if(productsRes.ok) state.products = productsRes.data.products;
  if(categoriesRes.ok) state.categories = categoriesRes.data.categories.map(c => c.name);
}

/* =========================================================
   TOAST
========================================================= */
function toast(message, type){
  const region = document.getElementById('toast-region');
  const el = document.createElement('div');
  el.className = 'toast ' + (type === 'success' ? 'toast-success' : type === 'danger' ? 'toast-danger' : '');
  el.innerHTML = (type === 'success' ? ICONS.check : type === 'danger' ? ICONS.alert : '') + `<span>${escapeHtml(message)}</span>`;
  region.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .2s'; setTimeout(() => el.remove(), 200); }, 2600);
}

function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str == null ? '' : String(str);
  return d.innerHTML;
}

/* =========================================================
   MODAL (confirm delete)
========================================================= */
function showConfirmModal({ title, message, confirmLabel, onConfirm }){
  const region = document.getElementById('modal-region');
  region.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal-box">
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(message)}</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
          <button class="btn btn-danger" id="modal-confirm">${escapeHtml(confirmLabel || 'Delete')}</button>
        </div>
      </div>
    </div>`;
  document.getElementById('modal-cancel').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => { if(e.target.id === 'modal-overlay') closeModal(); });
  document.getElementById('modal-confirm').addEventListener('click', () => { closeModal(); onConfirm(); });
}
function closeModal(){ document.getElementById('modal-region').innerHTML = ''; }

/* =========================================================
   DERIVED HELPERS
========================================================= */
function statusOf(qty){
  if(qty <= 0) return 'Out of Stock';
  if(qty < LOW_STOCK_THRESHOLD) return 'Low Stock';
  return 'In Stock';
}
function statusBadge(qty){
  const s = statusOf(qty);
  const cls = s === 'In Stock' ? 'badge-success' : s === 'Low Stock' ? 'badge-warn' : 'badge-danger';
  return `<span class="badge ${cls}"><span class="badge-dot"></span>${s}</span>`;
}
function money(n){
  return '₱' + Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function filteredProducts(){
  let list = state.products;
  if(state.inventoryFilter === 'attention'){
    list = list.filter(p => statusOf(p.quantity) !== 'In Stock');
  }
  const q = state.search.trim().toLowerCase();
  if(!q) return list;
  return list.filter(p =>
    p.id.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
}

function applySort(list){
  if(!state.sortColumn) return list;
  const col = state.sortColumn;
  const dir = state.sortDirection === 'desc' ? -1 : 1;
  const statusOrder = { 'Out of Stock':0, 'Low Stock':1, 'In Stock':2 };
  return [...list].sort((a, b) => {
    let av, bv;
    if(col === 'status'){ av = statusOrder[statusOf(a.quantity)]; bv = statusOrder[statusOf(b.quantity)]; }
    else if(col === 'quantity' || col === 'price'){ av = Number(a[col]); bv = Number(b[col]); }
    else { av = String(a[col]).toLowerCase(); bv = String(b[col]).toLowerCase(); }
    if(av < bv) return -1 * dir;
    if(av > bv) return 1 * dir;
    return 0;
  });
}

/* =========================================================
   NAVIGATION
========================================================= */
const NAV_ITEMS = [
  { key:'dashboard', label:'Dashboard', icon:'dashboard' },
  { key:'inventory', label:'Inventory', icon:'box' },
  { key:'add-product', label:'Add Product', icon:'plus' },
  { key:'categories', label:'Categories', icon:'tag' },
  { key:'reports', label:'Reports', icon:'chart' }
];

function getNavItems(){
  const items = NAV_ITEMS.slice();
  if(state.user && state.user.role === 'admin'){
    items.push({ key:'manage-users', label:'Manage Users', icon:'users' });
  }
  return items;
}

function navigate(page, options){
  options = options || {};
  state.page = page;
  state.sidebarOpen = false;
  if(page !== 'add-product') state.editingId = null;
  // Any normal navigation to Inventory shows all products, unless explicitly
  // told to keep the "needs attention" filter (see goToLowStock()).
  if(page === 'inventory'){
    state.currentPage = 1;
    if(!options.keepFilter){
      state.inventoryFilter = 'all';
      state.search = '';
    }
  }
  render();
  window.scrollTo(0,0);
}

function goToLowStock(){
  state.inventoryFilter = 'attention';
  state.search = '';
  navigate('inventory', { keepFilter: true });
}

async function logout(){
  await api('POST', 'api/auth_logout.php');
  state.user = null;
  state.authMode = 'login';
  state.authNotice = '';
  state.products = [];
  state.categories = [];
  state.page = 'dashboard';
  render();
}

/* =========================================================
   RENDER: ROOT
========================================================= */
function render(){
  const root = document.getElementById('root');
  if(!state.booted){
    root.innerHTML = `<div class="login-wrap"><p style="color:var(--text-muted)">Loading inventory…</p></div>`;
    return;
  }
  if(!state.user){
    root.innerHTML = renderLogin();
    attachLoginHandlers();
    return;
  }
  root.innerHTML = renderShell();
  attachShellHandlers();
  renderPageInto();
}

/* =========================================================
   LOGIN PAGE
========================================================= */
function renderLogin(){
  if(state.authMode === 'register') return renderRegister();

  return `
  <div class="login-wrap">
    <div class="card login-card">
      <div class="login-brand">
        <div class="brand-mark">${ICONS.crate}</div>
        <div class="brand-name">Stockroom</div>
      </div>
      <div class="login-title">Sign in to your account</div>
      <div class="login-sub">Manage your inventory in one simple place</div>
      ${state.authNotice ? `<div class="alert alert-success">${ICONS.check}<span>${escapeHtml(state.authNotice)}</span></div>` : ''}
      ${state.loginError ? `<div class="alert alert-danger">${ICONS.alert}<span>${escapeHtml(state.loginError)}</span></div>` : ''}
      <form id="login-form">
        <div class="form-field" style="margin-bottom:14px;">
          <label>Username or email <span class="req">*</span></label>
          <input type="text" id="login-username" placeholder="admin" autocomplete="username" />
          <div class="field-error" id="err-username"></div>
        </div>
        <div class="form-field" style="margin-bottom:6px;">
          <label>Password <span class="req">*</span></label>
          <input type="password" id="login-password" placeholder="••••••••" autocomplete="current-password" />
          <div class="field-error" id="err-password"></div>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%; margin-top:10px; padding:11px;">Sign in</button>
      </form>
      <div style="text-align:center; margin-top:16px; font-size:13px; color:var(--text-muted);">
        New here? <a href="#" id="go-register" style="color:var(--accent); font-weight:700;">Create an account</a>
      </div>
      <div class="login-demo">Demo credentials — username: <strong>admin</strong>, password: <strong>admin123</strong></div>
    </div>
  </div>`;
}

function renderRegister(){
  return `
  <div class="login-wrap">
    <div class="card login-card">
      <div class="login-brand">
        <div class="brand-mark">${ICONS.crate}</div>
        <div class="brand-name">Stockroom</div>
      </div>
      <div class="login-title">Create an account</div>
      <div class="login-sub">Set up access to the inventory system</div>
      ${state.loginError ? `<div class="alert alert-danger">${ICONS.alert}<span>${escapeHtml(state.loginError)}</span></div>` : ''}
      <form id="register-form">
        <div class="form-field" style="margin-bottom:14px;">
          <label>Username <span class="req">*</span></label>
          <input type="text" id="reg-username" placeholder="e.g. jsantos" autocomplete="username" />
          <div class="field-error" id="err-reg-username"></div>
        </div>
        <div class="form-field" style="margin-bottom:14px;">
          <label>Email <span class="req">*</span></label>
          <input type="email" id="reg-email" placeholder="e.g. jsantos@company.com" autocomplete="email" />
          <div class="field-error" id="err-reg-email"></div>
        </div>
        <div class="form-field" style="margin-bottom:14px;">
          <label>Password <span class="req">*</span></label>
          <input type="password" id="reg-password" placeholder="At least 6 characters" autocomplete="new-password" />
          <div class="field-error" id="err-reg-password"></div>
        </div>
        <div class="form-field" style="margin-bottom:6px;">
          <label>Confirm Password <span class="req">*</span></label>
          <input type="password" id="reg-confirm" placeholder="••••••••" autocomplete="new-password" />
          <div class="field-error" id="err-reg-confirm"></div>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%; margin-top:10px; padding:11px;">Create account</button>
      </form>
      <div style="text-align:center; margin-top:16px; font-size:13px; color:var(--text-muted);">
        Already have an account? <a href="#" id="go-login" style="color:var(--accent); font-weight:700;">Sign in</a>
      </div>
    </div>
  </div>`;
}

function attachLoginHandlers(){
  if(state.authMode === 'register'){ attachRegisterHandlers(); return; }

  document.getElementById('go-register').addEventListener('click', (e) => {
    e.preventDefault();
    state.authMode = 'register';
    state.loginError = '';
    state.authNotice = '';
    render();
  });

  const form = document.getElementById('login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    let hasError = false;
    document.getElementById('err-username').textContent = '';
    document.getElementById('err-password').textContent = '';
    if(!username){ document.getElementById('err-username').textContent = 'This field is required.'; hasError = true; }
    if(!password){ document.getElementById('err-password').textContent = 'This field is required.'; hasError = true; }
    if(hasError) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    const result = await api('POST', 'api/auth_login.php', { username, password });

    submitBtn.disabled = false;

    if(!result.ok){
      state.loginError = (result.data && result.data.error) || 'Something went wrong. Please try again.';
      state.authNotice = '';
      render();
      return;
    }
    state.loginError = '';
    state.authNotice = '';
    state.user = result.data.user;
    await loadProductsAndCategories();
    state.page = 'dashboard';
    render();
  });
}

function attachRegisterHandlers(){
  document.getElementById('go-login').addEventListener('click', (e) => {
    e.preventDefault();
    state.authMode = 'login';
    state.loginError = '';
    render();
  });

  const form = document.getElementById('register-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const usernameEl = document.getElementById('reg-username');
    const emailEl = document.getElementById('reg-email');
    const passwordEl = document.getElementById('reg-password');
    const confirmEl = document.getElementById('reg-confirm');

    ['err-reg-username','err-reg-email','err-reg-password','err-reg-confirm'].forEach(id => document.getElementById(id).textContent = '');
    [usernameEl, emailEl, passwordEl, confirmEl].forEach(el => el.classList.remove('err'));

    const username = usernameEl.value.trim();
    const email = emailEl.value.trim();
    const password = passwordEl.value;
    const confirm = confirmEl.value;

    let hasError = false;
    const setErr = (el, errId, msg) => { el.classList.add('err'); document.getElementById(errId).textContent = msg; hasError = true; };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Client-side checks first (fast feedback, no round trip needed for
    // obvious mistakes). Username/email uniqueness can only be confirmed
    // by the server, since that's where the real record of accounts lives.
    if(!username) setErr(usernameEl, 'err-reg-username', 'Username is required.');
    if(!email) setErr(emailEl, 'err-reg-email', 'Email is required.');
    else if(!emailPattern.test(email)) setErr(emailEl, 'err-reg-email', 'Enter a valid email address.');
    if(!password) setErr(passwordEl, 'err-reg-password', 'Password is required.');
    else if(password.length < 6) setErr(passwordEl, 'err-reg-password', 'Use at least 6 characters.');
    if(!confirm) setErr(confirmEl, 'err-reg-confirm', 'Please confirm your password.');
    else if(password && confirm !== password) setErr(confirmEl, 'err-reg-confirm', 'Passwords do not match.');

    if(hasError) return;

    const submitBtn = document.getElementById('register-form').querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    const result = await api('POST', 'api/auth_register.php', { username, email, password, confirmPassword: confirm });
    submitBtn.disabled = false;

    if(!result.ok){
      // Server-side validation is authoritative — surface whatever it found
      // (e.g. a username/email that became taken a moment ago) in the same
      // error slots the client-side pass uses.
      const fieldMap = { username:'err-reg-username', email:'err-reg-email', password:'err-reg-password', confirmPassword:'err-reg-confirm' };
      const errs = (result.data && result.data.errors) || {};
      Object.keys(errs).forEach(field => {
        const errId = fieldMap[field];
        if(errId) document.getElementById(errId).textContent = errs[field];
      });
      if(Object.keys(errs).length === 0){
        state.loginError = (result.data && result.data.error) || 'Something went wrong. Please try again.';
        render();
      }
      return;
    }

    state.authMode = 'login';
    state.loginError = '';
    state.authNotice = 'Account created. An administrator needs to approve it before you can sign in.';
    render();
  });
}

/* =========================================================
   APP SHELL (sidebar + topbar)
========================================================= */
function renderShell(){
  const initials = state.user.username.slice(0,2).toUpperCase();
  return `
  <div id="app-shell">
    <div class="sidebar-overlay ${state.sidebarOpen ? 'open' : ''}" id="sidebar-overlay"></div>
    <aside class="sidebar ${state.sidebarOpen ? 'open' : ''}" id="sidebar">
      <div class="sidebar-brand">
        <div class="brand-mark">${ICONS.crate}</div>
        <div class="brand-name">Stockroom</div>
      </div>
      <nav class="sidebar-nav">
        ${getNavItems().map(item => `
          <a href="#" class="nav-item ${state.page === item.key ? 'active' : ''}" data-page="${item.key}">
            ${ICONS[item.icon]}<span>${item.label}</span>
          </a>`).join('')}
      </nav>
      <div class="sidebar-footer">
        <a href="#" class="nav-item" id="logout-btn">${ICONS.logout}<span>Logout</span></a>
        <div class="sidebar-user">
          <div class="avatar">${initials}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${escapeHtml(state.user.username)}</div>
            <div class="sidebar-user-role">${state.user.role === 'admin' ? 'Administrator' : 'Inventory staff'}</div>
          </div>
        </div>
      </div>
    </aside>
    <div class="main">
      <div class="topbar">
        <div class="topbar-left">
          <button class="hamburger" id="hamburger-btn">${ICONS.menu}</button>
          <div class="page-title" id="page-title-slot">${pageTitle()}</div>
        </div>
      </div>
      <div class="page-content" id="page-content"></div>
    </div>
  </div>`;
}

function pageTitle(){
  const found = getNavItems().find(n => n.key === state.page);
  if(found) return found.label;
  return 'Dashboard';
}

function attachShellHandlers(){
  document.querySelectorAll('.nav-item[data-page]').forEach(el => {
    el.addEventListener('click', (e) => { e.preventDefault(); navigate(el.getAttribute('data-page')); });
  });
  document.getElementById('logout-btn').addEventListener('click', (e) => { e.preventDefault(); logout(); });
  document.getElementById('hamburger-btn').addEventListener('click', () => {
    state.sidebarOpen = !state.sidebarOpen;
    document.getElementById('sidebar').classList.toggle('open', state.sidebarOpen);
    document.getElementById('sidebar-overlay').classList.toggle('open', state.sidebarOpen);
  });
  document.getElementById('sidebar-overlay').addEventListener('click', () => {
    state.sidebarOpen = false;
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('open');
  });
}

/* =========================================================
   PAGE ROUTER
========================================================= */
function renderPageInto(){
  const el = document.getElementById('page-content');
  if(state.page === 'dashboard'){ el.innerHTML = renderDashboard(); attachDashboardHandlers(); }
  else if(state.page === 'inventory'){ el.innerHTML = renderInventory(); attachInventoryHandlers(); }
  else if(state.page === 'add-product'){ el.innerHTML = renderProductForm(); attachProductFormHandlers(); }
  else if(state.page === 'categories'){ el.innerHTML = renderCategories(); attachCategoriesHandlers(); }
  else if(state.page === 'reports'){ el.innerHTML = renderReports(); }
  else if(state.page === 'manage-users'){
    if(!state.user || state.user.role !== 'admin'){ navigate('dashboard'); return; }
    el.innerHTML = '<p style="color:var(--text-muted)">Loading users…</p>';
    loadAndRenderUsers();
  }
}

/* =========================================================
   MANAGE USERS (admin only)
========================================================= */
async function loadAndRenderUsers(){
  const result = await api('GET', 'api/users_list.php');
  if(state.page !== 'manage-users') return; // user navigated away before this resolved
  const users = result.ok ? result.data.users : [];
  const el = document.getElementById('page-content');
  el.innerHTML = renderManageUsers(users);
  attachManageUsersHandlers();
}

function renderManageUsers(users){
  const pendingCount = users.filter(u => !u.approved).length;
  return `
    <div class="card panel">
      <h3 class="section-title">Accounts${pendingCount ? ` <span class="badge badge-warn" style="vertical-align:middle;">${pendingCount} pending</span>` : ''}</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td class="cell-name">${escapeHtml(u.username)}</td>
                <td class="cell-muted">${escapeHtml(u.email)}</td>
                <td>${u.role === 'admin' ? 'Admin' : 'Staff'}</td>
                <td>${u.approved ? `<span class="badge badge-success"><span class="badge-dot"></span>Approved</span>` : `<span class="badge badge-warn"><span class="badge-dot"></span>Pending</span>`}</td>
                <td>
                  ${u.role === 'admin' ? `<span class="cell-muted">—</span>` : `
                  <div class="row-actions">
                    ${!u.approved ? `
                      <button class="btn btn-secondary btn-sm" data-approve="${escapeHtml(u.username)}">Approve</button>
                      <button class="btn btn-secondary btn-sm" data-reject="${escapeHtml(u.username)}" style="color:var(--danger);">Reject</button>
                    ` : `
                      <button class="btn btn-secondary btn-sm" data-revoke="${escapeHtml(u.username)}">Revoke</button>
                      <button class="btn btn-secondary btn-sm" data-remove="${escapeHtml(u.username)}" style="color:var(--danger);">Remove</button>
                    `}
                  </div>`}
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function attachManageUsersHandlers(){
  document.querySelectorAll('[data-approve]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const username = btn.getAttribute('data-approve');
      const result = await api('POST', 'api/users_approve.php', { username });
      if(!result.ok){ toast((result.data && result.data.error) || 'Could not approve this account.', 'danger'); return; }
      toast(`${username} approved.`, 'success');
      loadAndRenderUsers();
    });
  });
  document.querySelectorAll('[data-revoke]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const username = btn.getAttribute('data-revoke');
      showConfirmModal({
        title: 'Revoke access?',
        message: `"${username}" will no longer be able to sign in until re-approved.`,
        confirmLabel: 'Revoke',
        onConfirm: async () => {
          const result = await api('POST', 'api/users_revoke.php', { username });
          if(!result.ok){ toast((result.data && result.data.error) || 'Could not revoke this account.', 'danger'); return; }
          toast(`Access revoked for ${username}.`, 'success');
          loadAndRenderUsers();
        }
      });
    });
  });
  document.querySelectorAll('[data-reject]').forEach(btn => {
    btn.addEventListener('click', () => {
      const username = btn.getAttribute('data-reject');
      showConfirmModal({
        title: 'Reject this account?',
        message: `The registration request for "${username}" will be permanently deleted.`,
        confirmLabel: 'Reject',
        onConfirm: async () => {
          const result = await api('POST', 'api/users_remove.php', { username });
          if(!result.ok){ toast((result.data && result.data.error) || 'Could not reject this account.', 'danger'); return; }
          toast('Registration rejected.', 'success');
          loadAndRenderUsers();
        }
      });
    });
  });
  document.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const username = btn.getAttribute('data-remove');
      showConfirmModal({
        title: 'Remove this account?',
        message: `"${username}" will be permanently removed and will no longer be able to sign in.`,
        confirmLabel: 'Remove account',
        onConfirm: async () => {
          const result = await api('POST', 'api/users_remove.php', { username });
          if(!result.ok){ toast((result.data && result.data.error) || 'Could not remove this account.', 'danger'); return; }
          toast('Account removed.', 'success');
          loadAndRenderUsers();
        }
      });
    });
  });
}

/* =========================================================
   DASHBOARD
========================================================= */
function renderDashboard(){
  const totalProducts = state.products.length;
  const totalStock = state.products.reduce((sum, p) => sum + Number(p.quantity), 0);
  const lowStockItems = state.products.filter(p => statusOf(p.quantity) === 'Low Stock' || statusOf(p.quantity) === 'Out of Stock');
  const recent = state.products.slice(-5).reverse();

  return `
    <div class="stat-grid">
      <div class="card stat-card">
        <div class="stat-label">Total Products</div>
        <div class="stat-value">${totalProducts}</div>
        <div class="stat-sub">Unique items tracked</div>
      </div>
      <div class="card stat-card">
        <div class="stat-label">Total Stock</div>
        <div class="stat-value">${totalStock.toLocaleString()}</div>
        <div class="stat-sub">Units across all products</div>
      </div>
      <div class="card stat-card ${lowStockItems.length ? 'warn' : ''} stat-card-clickable" id="low-stock-card" role="button" tabindex="0">
        <div class="stat-label">Low Stock Items</div>
        <div class="stat-value">${lowStockItems.length}</div>
        <div class="stat-sub">At or below ${LOW_STOCK_THRESHOLD} units — click to view</div>
      </div>
    </div>

    <div class="card panel">
      <h3 class="section-title">Recently added products</h3>
      ${recent.length === 0 ? emptyState('No products yet', 'Add your first product to see it here.') : `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Product ID</th><th>Name</th><th>Category</th><th>Quantity</th><th>Status</th></tr></thead>
          <tbody>
            ${recent.map(p => `
              <tr>
                <td class="cell-muted">${escapeHtml(p.id)}</td>
                <td class="cell-name">${escapeHtml(p.name)}</td>
                <td>${escapeHtml(p.category)}</td>
                <td>${p.quantity}</td>
                <td>${statusBadge(p.quantity)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`}
    </div>
  `;
}
function attachDashboardHandlers(){
  const card = document.getElementById('low-stock-card');
  if(!card) return;
  card.addEventListener('click', goToLowStock);
  card.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); goToLowStock(); } });
}

function emptyState(title, sub){
  return `<div class="empty-state">${ICONS.inboxEmpty}<h3>${escapeHtml(title)}</h3><p>${escapeHtml(sub)}</p></div>`;
}

/* =========================================================
   INVENTORY
========================================================= */
function renderInventory(){
  let list = filteredProducts();
  list = applySort(list);
  const totalItems = list.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  if(state.currentPage > totalPages) state.currentPage = totalPages;
  if(state.currentPage < 1) state.currentPage = 1;
  const startIdx = (state.currentPage - 1) * PAGE_SIZE;
  const pageItems = list.slice(startIdx, startIdx + PAGE_SIZE);
  const rangeStart = totalItems === 0 ? 0 : startIdx + 1;
  const rangeEnd = Math.min(startIdx + PAGE_SIZE, totalItems);

  return `
    ${state.inventoryFilter === 'attention' ? `
    <div class="alert alert-warn" style="justify-content:space-between; align-items:center;">
      <span style="display:flex; align-items:center; gap:8px;">${ICONS.alert}Showing items needing attention — Low Stock &amp; Out of Stock only</span>
      <button class="btn btn-secondary btn-sm" id="clear-attention-filter">View all products</button>
    </div>` : ''}
    <div class="search-row">
      <div class="search-box">
        ${ICONS.search}
        <input type="text" id="search-input" placeholder="Search by Product ID, name, or category…" value="${escapeHtml(state.search)}" />
      </div>
      <span class="result-count">${totalItems} of ${state.products.length} products</span>
      <div style="flex:1"></div>
      <button class="btn btn-primary" id="go-add-product">${ICONS.plus} Add Product</button>
    </div>
    <div class="card">
      ${totalItems === 0 ? (
        state.products.length === 0
          ? emptyState('No products yet', 'Your inventory is empty — add your first product to get started.')
          : (state.inventoryFilter === 'attention' && !state.search.trim())
            ? emptyState('All good', 'No items currently need attention — everything is in stock.')
            : emptyState('No products found', `No results match "${state.search}". Try a different search term.`)
      ) : `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${SORTABLE_COLUMNS.map(col => `
                <th class="sortable" data-sort="${col.key}">${col.label}${state.sortColumn === col.key ? (state.sortDirection === 'asc' ? ' <span class="sort-arrow">▲</span>' : ' <span class="sort-arrow">▼</span>') : ''}</th>
              `).join('')}<th></th>
            </tr>
          </thead>
          <tbody>
            ${pageItems.map(p => `
              <tr>
                <td class="cell-muted">${escapeHtml(p.id)}</td>
                <td class="cell-name">${escapeHtml(p.name)}</td>
                <td>${escapeHtml(p.category)}</td>
                <td>${p.quantity}</td>
                <td>${money(p.price)}</td>
                <td class="cell-muted">${escapeHtml(p.supplier)}</td>
                <td>${statusBadge(p.quantity)}</td>
                <td>
                  <div class="row-actions">
                    <button class="btn btn-secondary btn-sm" data-edit="${escapeHtml(p.id)}">${ICONS.edit} Edit</button>
                    <button class="btn btn-secondary btn-sm" data-delete="${escapeHtml(p.id)}" style="color:var(--danger);">${ICONS.trash} Delete</button>
                  </div>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="mobile-card-list">
        ${pageItems.map(p => `
          <div class="product-mobile-card">
            <div class="product-mobile-head">
              <div class="cell-name">${escapeHtml(p.name)}</div>
              ${statusBadge(p.quantity)}
            </div>
            <div class="product-mobile-grid">
              <div><span class="cell-muted">ID</span><br>${escapeHtml(p.id)}</div>
              <div><span class="cell-muted">Category</span><br>${escapeHtml(p.category)}</div>
              <div><span class="cell-muted">Quantity</span><br>${p.quantity}</div>
              <div><span class="cell-muted">Price</span><br>${money(p.price)}</div>
              <div style="grid-column:1 / -1;"><span class="cell-muted">Supplier</span><br>${escapeHtml(p.supplier)}</div>
            </div>
            <div class="row-actions" style="margin-top:12px;">
              <button class="btn btn-secondary btn-sm" data-edit="${escapeHtml(p.id)}">${ICONS.edit} Edit</button>
              <button class="btn btn-secondary btn-sm" data-delete="${escapeHtml(p.id)}" style="color:var(--danger);">${ICONS.trash} Delete</button>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="pagination-row">
        <span class="result-count">Showing ${rangeStart}–${rangeEnd} of ${totalItems} products</span>
        <div class="pagination-controls">
          <button class="btn btn-secondary btn-sm" id="page-prev" ${state.currentPage <= 1 ? 'disabled' : ''}>Prev</button>
          <span class="page-indicator">Page ${state.currentPage} of ${totalPages}</span>
          <button class="btn btn-secondary btn-sm" id="page-next" ${state.currentPage >= totalPages ? 'disabled' : ''}>Next</button>
        </div>
      </div>
      `}
    </div>
  `;
}

function attachInventoryHandlers(){
  const clearFilterBtn = document.getElementById('clear-attention-filter');
  if(clearFilterBtn){
    clearFilterBtn.addEventListener('click', () => {
      state.inventoryFilter = 'all';
      state.currentPage = 1;
      renderPageInto();
    });
  }
  const input = document.getElementById('search-input');
  input.addEventListener('input', (e) => {
    state.search = e.target.value;
    state.currentPage = 1;
    const el = document.getElementById('page-content');
    el.innerHTML = renderInventory();
    attachInventoryHandlers();
    document.getElementById('search-input').focus();
    document.getElementById('search-input').setSelectionRange(state.search.length, state.search.length);
  });
  document.getElementById('go-add-product').addEventListener('click', () => navigate('add-product'));

  document.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.getAttribute('data-sort');
      if(state.sortColumn === col){
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortColumn = col;
        state.sortDirection = 'asc';
      }
      state.currentPage = 1;
      renderPageInto();
    });
  });

  const prevBtn = document.getElementById('page-prev');
  const nextBtn = document.getElementById('page-next');
  if(prevBtn) prevBtn.addEventListener('click', () => { state.currentPage -= 1; renderPageInto(); window.scrollTo(0,0); });
  if(nextBtn) nextBtn.addEventListener('click', () => { state.currentPage += 1; renderPageInto(); window.scrollTo(0,0); });

  document.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.editingId = btn.getAttribute('data-edit');
      navigate('add-product');
    });
  });
  document.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-delete');
      const product = state.products.find(p => p.id === id);
      showConfirmModal({
        title: 'Delete this product?',
        message: `"${product ? product.name : id}" will be permanently removed from your inventory. This cannot be undone.`,
        confirmLabel: 'Delete product',
        onConfirm: async () => {
          const result = await api('POST', 'api/products_delete.php', { id });
          if(!result.ok){
            toast((result.data && result.data.error) || 'Could not delete this product.', 'danger');
            return;
          }
          state.products = state.products.filter(p => p.id !== id);
          toast('Product deleted.', 'success');
          renderPageInto();
        }
      });
    });
  });
}

/* =========================================================
   ADD / EDIT PRODUCT FORM
========================================================= */
function renderProductForm(){
  const editing = state.editingId ? state.products.find(p => p.id === state.editingId) : null;
  const isEdit = !!editing;
  const suggestedId = isEdit ? editing.id : nextProductId();

  const catOptions = state.categories.map(c =>
    `<option value="${escapeHtml(c)}" ${editing && editing.category === c ? 'selected' : ''}>${escapeHtml(c)}</option>`
  ).join('');

  return `
    <div class="card panel" style="max-width:760px;">
      <h3 class="section-title">${isEdit ? 'Edit product' : 'Add a new product'}</h3>
      <form id="product-form" novalidate>
        <div class="form-grid">
          <div class="form-field">
            <label>Product ID <span class="req">*</span></label>
            <input type="text" id="f-id" value="${escapeHtml(suggestedId)}" ${isEdit ? 'readonly' : ''} />
            ${isEdit ? '' : `<div class="field-hint">Suggested — feel free to type your own ID instead</div>`}
            <div class="field-error" id="err-id"></div>
          </div>
          <div class="form-field">
            <label>Product Name <span class="req">*</span></label>
            <input type="text" id="f-name" placeholder="e.g. Bottled Water 500ml" value="${escapeHtml(editing ? editing.name : '')}" />
            <div class="field-error" id="err-name"></div>
          </div>
          <div class="form-field">
            <label>Category <span class="req">*</span></label>
            <select id="f-category">
              <option value="">Select a category</option>
              ${catOptions}
              <option value="__new__">+ Add new category…</option>
            </select>
            <div class="field-error" id="err-category"></div>
          </div>
          <div class="form-field" id="new-category-field" style="display:none;">
            <label>New Category Name <span class="req">*</span></label>
            <input type="text" id="f-new-category" placeholder="e.g. Frozen Goods" />
            <div class="field-error" id="err-new-category"></div>
          </div>
          <div class="form-field">
            <label>Supplier <span class="req">*</span></label>
            <input type="text" id="f-supplier" placeholder="e.g. AquaPure Distributors" value="${escapeHtml(editing ? editing.supplier : '')}" />
            <div class="field-error" id="err-supplier"></div>
          </div>
          <div class="form-field">
            <label>Quantity <span class="req">*</span></label>
            <input type="number" id="f-quantity" min="0" step="1" placeholder="0" value="${editing ? editing.quantity : ''}" />
            <div class="field-error" id="err-quantity"></div>
          </div>
          <div class="form-field">
            <label>Price (₱) <span class="req">*</span></label>
            <input type="number" id="f-price" min="0" step="0.01" placeholder="0.00" value="${editing ? editing.price : ''}" />
            <div class="field-error" id="err-price"></div>
          </div>
          <div class="form-field">
            <label>Expiration Date</label>
            <input type="date" id="f-expiry" value="${editing && editing.expiry ? editing.expiry : ''}" />
            <div class="field-hint">Optional — leave blank if not applicable</div>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Add Product'}</button>
          <button type="button" class="btn btn-secondary" id="cancel-form">Cancel</button>
        </div>
      </form>
    </div>
  `;
}

function nextProductId(){
  let max = 0;
  state.products.forEach(p => {
    const m = /^PRD-(\d+)$/.exec(p.id);
    if(m) max = Math.max(max, parseInt(m[1], 10));
  });
  return 'PRD-' + String(max + 1).padStart(4, '0');
}

function attachProductFormHandlers(){
  document.getElementById('cancel-form').addEventListener('click', () => navigate('inventory'));

  const categoryEl = document.getElementById('f-category');
  const newCatField = document.getElementById('new-category-field');
  const newCatInput = document.getElementById('f-new-category');
  categoryEl.addEventListener('change', () => {
    const isNew = categoryEl.value === '__new__';
    newCatField.style.display = isNew ? '' : 'none';
    if(isNew){ newCatInput.focus(); }
    else { newCatInput.value = ''; document.getElementById('err-new-category').textContent = ''; newCatInput.classList.remove('err'); }
  });

  document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const editing = state.editingId ? state.products.find(p => p.id === state.editingId) : null;

    const idEl = document.getElementById('f-id');
    const nameEl = document.getElementById('f-name');
    const supplierEl = document.getElementById('f-supplier');
    const quantityEl = document.getElementById('f-quantity');
    const priceEl = document.getElementById('f-price');
    const expiryEl = document.getElementById('f-expiry');

    [idEl, nameEl, categoryEl, supplierEl, quantityEl, priceEl, newCatInput].forEach(el => el.classList.remove('err'));
    ['err-id','err-name','err-category','err-supplier','err-quantity','err-price','err-new-category'].forEach(id => document.getElementById(id).textContent = '');

    const id = idEl.value.trim();
    const name = nameEl.value.trim();
    let category = categoryEl.value;
    const isNewCategory = category === '__new__';
    const newCategoryName = newCatInput.value.trim();
    const supplier = supplierEl.value.trim();
    const quantityRaw = quantityEl.value.trim();
    const priceRaw = priceEl.value.trim();
    const expiry = expiryEl.value;

    let hasError = false;
    const setErr = (fieldEl, errId, msg) => { fieldEl.classList.add('err'); document.getElementById(errId).textContent = msg; hasError = true; };

    if(!id){ setErr(idEl, 'err-id', 'Product ID is required.'); }
    else {
      const dup = state.products.find(p => p.id.toLowerCase() === id.toLowerCase() && (!editing || p.id !== editing.id));
      if(dup) setErr(idEl, 'err-id', 'This Product ID is already in use.');
    }
    if(!name) setErr(nameEl, 'err-name', 'Product name is required.');

    if(!category) setErr(categoryEl, 'err-category', 'Please select a category.');
    else if(isNewCategory){
      if(!newCategoryName) setErr(newCatInput, 'err-new-category', 'Enter a name for the new category.');
      else if(state.categories.some(c => c.toLowerCase() === newCategoryName.toLowerCase())) setErr(newCatInput, 'err-new-category', 'This category already exists — select it from the list instead.');
    }

    if(!supplier) setErr(supplierEl, 'err-supplier', 'Supplier is required.');

    if(quantityRaw === ''){ setErr(quantityEl, 'err-quantity', 'Quantity is required.'); }
    else if(!/^\d+$/.test(quantityRaw)){ setErr(quantityEl, 'err-quantity', 'Enter a whole number, 0 or greater.'); }

    if(priceRaw === ''){ setErr(priceEl, 'err-price', 'Price is required.'); }
    else if(isNaN(Number(priceRaw)) || Number(priceRaw) <= 0){ setErr(priceEl, 'err-price', 'Enter a valid price greater than 0.'); }

    if(hasError) return;

    const payload = {
      id, name, supplier, expiry,
      category: isNewCategory ? '__new__' : category,
      newCategory: isNewCategory ? newCategoryName : undefined,
      quantity: quantityRaw,
      price: priceRaw
    };

    const submitBtn = document.getElementById('product-form').querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    const result = editing
      ? await api('POST', 'api/products_update.php', payload)
      : await api('POST', 'api/products_create.php', payload);
    submitBtn.disabled = false;

    if(!result.ok){
      const fieldMap = { id:'err-id', name:'err-name', category:'err-category', newCategory:'err-new-category', supplier:'err-supplier', quantity:'err-quantity', price:'err-price' };
      const errs = (result.data && result.data.errors) || {};
      let anyFieldError = false;
      Object.keys(errs).forEach(field => {
        const errId = fieldMap[field];
        if(errId){ document.getElementById(errId).textContent = errs[field]; anyFieldError = true; }
      });
      if(!anyFieldError){
        toast((result.data && result.data.error) || 'Something went wrong. Please try again.', 'danger');
      }
      return;
    }

    await loadProductsAndCategories();
    toast(result.data.message, 'success');
    state.editingId = null;
    navigate('inventory');
  });
}

/* =========================================================
   CATEGORIES
========================================================= */
function renderCategories(){
  const counts = {};
  state.products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });

  return `
    <div class="card panel" style="max-width:640px;">
      <h3 class="section-title">Add a category</h3>
      <div class="cat-add-row">
        <input type="text" id="new-cat-input" placeholder="e.g. Frozen Goods" />
        <button class="btn btn-primary" id="add-cat-btn">${ICONS.plus} Add</button>
      </div>
      <div class="field-error" id="cat-error" style="margin-bottom:8px;"></div>
      <h3 class="section-title">All categories</h3>
      ${state.categories.length === 0 ? emptyState('No categories yet', 'Add a category to organize your products.') : `
      <div class="cat-list">
        ${state.categories.map(c => `
          <div class="cat-row">
            <div>
              <div class="cat-name">${escapeHtml(c)}</div>
              <div class="cat-count">${counts[c] || 0} product${(counts[c]||0) === 1 ? '' : 's'}</div>
            </div>
            <button class="btn btn-ghost btn-sm" data-del-cat="${escapeHtml(c)}" style="color:var(--danger);">${ICONS.trash} Remove</button>
          </div>`).join('')}
      </div>`}
    </div>
  `;
}

function attachCategoriesHandlers(){
  document.getElementById('add-cat-btn').addEventListener('click', async () => {
    const input = document.getElementById('new-cat-input');
    const val = input.value.trim();
    const errEl = document.getElementById('cat-error');
    errEl.textContent = '';
    if(!val){ errEl.textContent = 'Category name is required.'; return; }
    if(state.categories.some(c => c.toLowerCase() === val.toLowerCase())){ errEl.textContent = 'This category already exists.'; return; }

    const result = await api('POST', 'api/categories_create.php', { name: val });
    if(!result.ok){
      errEl.textContent = (result.data && result.data.error) || 'Could not add this category.';
      return;
    }
    await loadProductsAndCategories();
    toast('Category added.', 'success');
    renderPageInto();
  });
  document.querySelectorAll('[data-del-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-del-cat');
      const inUse = state.products.some(p => p.category === cat);
      if(inUse){
        toast(`Can't remove "${cat}" — it's still used by existing products.`, 'danger');
        return;
      }
      showConfirmModal({
        title: 'Remove this category?',
        message: `"${cat}" will be removed from the category list.`,
        confirmLabel: 'Remove',
        onConfirm: async () => {
          const result = await api('POST', 'api/categories_delete.php', { name: cat });
          if(!result.ok){
            toast((result.data && result.data.error) || 'Could not remove this category.', 'danger');
            return;
          }
          state.categories = state.categories.filter(c => c !== cat);
          toast('Category removed.', 'success');
          renderPageInto();
        }
      });
    });
  });
}

/* =========================================================
   REPORTS
========================================================= */
function renderReports(){
  const totalValue = state.products.reduce((sum, p) => sum + (Number(p.quantity) * Number(p.price)), 0);
  const lowStock = state.products.filter(p => statusOf(p.quantity) === 'Low Stock');
  const outStock = state.products.filter(p => statusOf(p.quantity) === 'Out of Stock');

  const byCategory = {};
  state.products.forEach(p => { byCategory[p.category] = (byCategory[p.category] || 0) + Number(p.quantity); });
  const maxCat = Math.max(1, ...Object.values(byCategory));

  return `
    <div class="stat-grid">
      <div class="card stat-card">
        <div class="stat-label">Total Inventory Value</div>
        <div class="stat-value">${money(totalValue)}</div>
        <div class="stat-sub">Quantity × price, all products</div>
      </div>
      <div class="card stat-card warn">
        <div class="stat-label">Low Stock</div>
        <div class="stat-value">${lowStock.length}</div>
        <div class="stat-sub">Below ${LOW_STOCK_THRESHOLD} units</div>
      </div>
      <div class="card stat-card danger">
        <div class="stat-label">Out of Stock</div>
        <div class="stat-value">${outStock.length}</div>
        <div class="stat-sub">Zero units remaining</div>
      </div>
    </div>

    <div class="card panel">
      <h3 class="section-title">Stock by category</h3>
      ${Object.keys(byCategory).length === 0 ? emptyState('No data yet', 'Add products to see category breakdown.') :
        Object.entries(byCategory).map(([cat, qty]) => `
          <div class="bar-row">
            <div class="cell-muted">${escapeHtml(cat)}</div>
            <div class="bar-track"><div class="bar-fill" style="width:${(qty/maxCat*100).toFixed(0)}%"></div></div>
            <div class="bar-val">${qty}</div>
          </div>`).join('')}
    </div>

    <div class="card panel">
      <h3 class="section-title">Items needing attention</h3>
      ${(lowStock.length + outStock.length) === 0 ? emptyState('All good', 'No low or out-of-stock items right now.') : `
      <div class="table-wrap">
        <table>
          <thead><tr><th>Product ID</th><th>Name</th><th>Category</th><th>Quantity</th><th>Status</th></tr></thead>
          <tbody>
            ${[...outStock, ...lowStock].map(p => `
              <tr>
                <td class="cell-muted">${escapeHtml(p.id)}</td>
                <td class="cell-name">${escapeHtml(p.name)}</td>
                <td>${escapeHtml(p.category)}</td>
                <td>${p.quantity}</td>
                <td>${statusBadge(p.quantity)}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`}
    </div>
  `;
}

/* =========================================================
   INIT
========================================================= */
boot();
