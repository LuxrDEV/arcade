// ==========================================
// APP.JS — Arcade Social · Main init
// ==========================================

// ---- TOAST ----
const Toast = (() => {
  let timeout;
  function show(msg, dur = 2400) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(timeout);
    timeout = setTimeout(() => el.classList.remove('show'), dur);
  }
  return { show };
})();

// ---- MODAL ----
const Modal = (() => {
  function open(id) {
    const el = document.getElementById(`modal-${id}`);
    if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
  }
  function close(id) {
    const el = document.getElementById(`modal-${id}`);
    if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
  }
  function init() {
    document.querySelectorAll('.modal-overlay').forEach(o => {
      o.addEventListener('click', e => {
        if (e.target === o) { o.classList.remove('open'); document.body.style.overflow = ''; }
      });
    });
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => close(btn.dataset.closeModal));
    });
    const postBtn = document.getElementById('submit-post');
    if (postBtn) postBtn.addEventListener('click', submitPost);
  }
  function submitPost() {
    const ta = document.getElementById('new-post-text');
    if (!ta) return;
    const text = ta.value.trim();
    if (!text) { Toast.show('Escribe algo primero ✍️'); return; }
    AppData.posts.unshift({
      id: 'p' + Date.now(),
      user: { id: 'u1', name: 'Alexis Hernandez', handle: 'alexis', initials: 'AH', color: '#3b82f6' },
      content: text, time: 'Ahora', type: 'text',
      likes: 0, reposts: 0, comments: 0, views: 0, saves: 0, liked: false,
    });
    Feed.renderFeed();
    ta.value = '';
    const cc = document.getElementById('char-counter');
    if (cc) cc.textContent = '0/280';
    close('create-post');
    Navigation.navigate('feed');
    Toast.show('✅ Publicado exitosamente');
  }
  return { init, open, close };
})();

// ---- SHORTS (Interno) ----
const Shorts = (() => {
  const shortsData = [
    {
      id: 's1',
      user: { name: 'gam3r564231', handle: 'gam3r564231', initials: 'G', color: '#f97316' },
      caption: 'La partida más rápida 🎮',
      tags: ['#ClashRoyale', '#fyp'],
      likes: 12, comments: 1, views: 175,
      grad: 'linear-gradient(160deg,#0a0a1a 0%,#1a0a2e 40%,#2a0a1a 100%)',
      icon: '🎮',
    },
    {
      id: 's2',
      user: { name: 'scottystiles335', handle: 'scottystiles335', initials: 'SS', color: '#ef4444' },
      caption: '🌩️ Tormenta épica captada',
      tags: ['#naturaleza', '#fyp'],
      likes: 24, comments: 7, views: 340,
      grad: 'linear-gradient(160deg,#0a1220 0%,#0a2040 50%,#0a1830 100%)',
      icon: '⛈️',
    },
    {
      id: 's3',
      user: { name: 'angel.caleb.gt', handle: 'angel.caleb.gt', initials: 'AC', color: '#8b5cf6' },
      caption: 'Nuevo día, nueva oportunidad 💪 #contenido',
      tags: ['#contenido', '#fpy'],
      likes: 8, comments: 3, views: 92,
      grad: 'linear-gradient(160deg,#120a20 0%,#1e0a36 50%,#0a0a1a 100%)',
      icon: '✨',
    },
    {
      id: 's4',
      user: { name: 'esauesparza39', handle: 'esauesparza39', initials: 'EA', color: '#f59e0b' },
      caption: 'Primera semana en la app y ya me encanta 🔥',
      tags: ['#fyp', '#x2f'],
      likes: 31, comments: 12, views: 458,
      grad: 'linear-gradient(160deg,#1a0f00 0%,#2a1a00 50%,#1a0f00 100%)',
      icon: '🔥',
    },
  ];

  function renderShort(s) {
    const tagsHTML = s.tags.map(t => `<span class="tag">${t}</span>`).join(' ');
    return `
      <div class="short-item" id="${s.id}">
        <div class="short-item__bg" style="background:${s.grad};">
          <span style="font-size:80px;opacity:.18;user-select:none;">${s.icon}</span>
          <div class="short-item__play" onclick="Toast.show('▶ Reproduciendo...')">
            <svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>

        <!-- Side actions -->
        <div class="short-item__actions">
          <div class="short-action" onclick="likeShort('${s.id}',this)">
            <div class="short-action__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <span id="sl-${s.id}">${s.likes}</span>
          </div>
          <div class="short-action" onclick="Toast.show('💬 Comentarios')">
            <div class="short-action__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <span>${s.comments}</span>
          </div>
          <div class="short-action" onclick="Toast.show('🔗 Enlace copiado')">
            <div class="short-action__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </div>
            <span>Compartir</span>
          </div>
        </div>

        <!-- Bottom overlay -->
        <div class="short-item__overlay">
          <div class="short-item__user">
            <div class="avatar avatar-sm" style="background:${s.user.color}22;color:${s.user.color};border:1px solid ${s.user.color}55;flex-shrink:0;">${s.user.initials}</div>
            <span style="font-size:14px;font-weight:700;">@${s.user.handle}</span>
            <button class="btn btn-outline btn-sm" style="padding:4px 12px;font-size:12px;" onclick="Toast.show('Siguiendo a @${s.user.handle}')">Seguir</button>
          </div>
          <div class="short-item__caption">${s.caption} ${tagsHTML}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.5);display:flex;align-items:center;gap:4px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            ${s.views} vistas
          </div>
        </div>

        <!-- Progress bar -->
        <div class="short-item__progress">
          <div class="short-item__progress-bar" style="animation:progress ${6 + Math.random()*4}s linear infinite;"></div>
        </div>
      </div>
    `;
  }

  function render() {
    const el = document.getElementById('shorts-feed');
    if (!el || el.dataset.rendered) return;
    el.innerHTML = shortsData.map(renderShort).join('');
    el.dataset.rendered = '1';
  }

  function renderProfileGrid() {
    const el = document.getElementById('profile-shorts-grid');
    if (!el || el.dataset.rendered) return;
    const colors = ['#f97316','#3b82f6','#8b5cf6','#22c55e'];
    el.innerHTML = shortsData.map((s, i) => `
      <div class="profile-short-thumb" onclick="switchProfileTab('interno');document.getElementById('${s.id}').scrollIntoView();">
        <div class="pst-bg" style="background:${s.grad};">
          <span style="font-size:32px;opacity:.3;">${s.icon}</span>
        </div>
        <div class="pst-overlay">
          <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="pst-views">
          <svg viewBox="0 0 24 24" fill="white" width="10" height="10"><path d="M8 5v14l11-7z"/></svg>
          ${s.views}
        </div>
      </div>
    `).join('');
    el.dataset.rendered = '1';
  }

  return { render, renderProfileGrid };
})();

// Global like handler for shorts
function likeShort(id, btn) {
  const icon = btn.querySelector('.short-action__icon svg');
  const count = document.getElementById(`sl-${id}`);
  const liked = btn.dataset.liked === '1';
  btn.dataset.liked = liked ? '0' : '1';
  icon.setAttribute('fill', liked ? 'none' : 'red');
  icon.setAttribute('stroke', liked ? 'white' : 'red');
  if (count) count.textContent = parseInt(count.textContent) + (liked ? -1 : 1);
}

// ---- RIGHT SIDEBAR ----
const RightSidebar = (() => {
  function renderTrends() {
    const el = document.getElementById('right-trends');
    if (!el) return;
    el.innerHTML = AppData.trends.slice(0, 5).map(t => `
      <div class="trend-item" onclick="Navigation.navigate('explore')">
        <span class="trend-item__rank">${t.rank}</span>
        <div class="trend-item__icon">🔥</div>
        <div class="trend-item__info">
          <div class="trend-item__label">Tendencia ${t.hot ? '<span class="trend-item__fire-badge">🔥 En llamas</span>' : ''}</div>
          <div class="trend-item__tag">${t.tag}</div>
          <div class="trend-item__count">🔥 ${t.mentions} menciones</div>
        </div>
      </div>
    `).join('');
  }
  function renderSuggested() {
    const el = document.getElementById('right-suggested');
    if (!el) return;
    el.innerHTML = AppData.suggestedUsers.map(u => `
      <div class="follow-item">
        <div class="avatar avatar-md" style="background:#1a1a2e;color:#3b82f6;border:1px solid #1e3a5f;">${u.initials}</div>
        <div class="follow-item__info">
          <div class="follow-item__name">${u.name.length > 16 ? u.name.slice(0,16)+'…' : u.name}</div>
          <div class="follow-item__handle">@${u.handle.length > 14 ? u.handle.slice(0,14)+'…' : u.handle}</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="Toast.show('Siguiendo a @${u.handle}')">Seguir</button>
      </div>
    `).join('');
  }
  return { renderTrends, renderSuggested };
})();

// ---- EXPLORE ----
const Explore = (() => {
  function renderTrends() {
    const el = document.getElementById('explore-trends');
    if (!el) return;
    el.innerHTML = AppData.trends.map(t => `
      <div class="trend-item">
        <span class="trend-item__rank">${t.rank}</span>
        <div class="trend-item__icon">🔥</div>
        <div class="trend-item__info">
          <div class="trend-item__label">Tendencia ${t.hot ? '<span class="trend-item__fire-badge">🔥 En llamas</span>' : ''}</div>
          <div class="trend-item__tag">${t.tag}</div>
          <div class="trend-item__count">🔥 ${t.mentions} menciones</div>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" width="14" height="14"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    `).join('');
  }
  return { renderTrends };
})();

// ---- ACTIVITY ----
const Activity = (() => {
  const typeData = {
    like: { bg: 'var(--accent-red)', icon: '<svg viewBox="0 0 24 24" fill="white" width="10" height="10"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>', label: 'le gustó tu publicación', badgeClass: '' },
    save: { bg: 'var(--accent-blue)', icon: '<svg viewBox="0 0 24 24" fill="white" width="10" height="10"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>', label: 'guardó tu publicación', badgeClass: 'save-icon' },
  };
  const colors = ['#3b82f6','#8b5cf6','#f97316','#22c55e','#ef4444','#f59e0b'];

  function render() {
    const el = document.getElementById('activity-list');
    if (!el) return;
    el.innerHTML = `<div class="section-header" style="padding:16px 20px 8px;">HOY</div>` +
      AppData.activity.map((item, i) => {
        const t = typeData[item.type] || typeData.like;
        const c = colors[i % colors.length];
        return `
          <div class="activity-item">
            <div class="activity-item__icon-wrapper">
              <div class="avatar avatar-md" style="background:${c}22;color:${c};border:1px solid ${c}44;">${item.user.slice(0,2).toUpperCase()}</div>
              <div class="activity-item__type-icon ${t.badgeClass}" style="background:${t.bg};">${t.icon}</div>
            </div>
            <div class="activity-item__content">
              <div><strong>Nuevo ${item.type === 'save' ? 'guardado' : 'like'}</strong> ${item.user} ${t.label}</div>
              <div class="activity-item__time">${item.time}</div>
            </div>
          </div>
        `;
      }).join('');
  }
  return { render };
})();

// ---- COMMUNITIES ----
const Communities = (() => {
  const banners = {
    'gradient-blue': 'linear-gradient(135deg,#0a0a2e,#0d2060,#1a3a8f)',
    'gradient-dark': 'linear-gradient(135deg,#111,#1a1a1a)',
  };
  function render() {
    const el = document.getElementById('communities-grid');
    if (!el) return;
    let html = AppData.communities.map(c => `
      <div class="community-card" onclick="Toast.show('Abriendo ${c.name}...')">
        <div class="community-card__banner" style="background:${banners[c.banner]||banners['gradient-dark']};">
          <div class="community-card__logo" style="color:${c.color};font-weight:800;">${c.name[0]}</div>
          <div class="community-card__active-dot"></div>
        </div>
        ${c.joined ? `<div class="community-card__joined"><svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" width="14" height="14"><path d="M20 6L9 17l-5-5"/></svg></div>` : ''}
        <div class="community-card__body">
          <div class="community-card__name">${c.name}</div>
          <div class="community-card__members">${c.members} miembros</div>
        </div>
      </div>
    `).join('');
    html += `
      <div class="community-card community-card--create" onclick="Toast.show('Crear comunidad próximamente')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        <span>Crear</span>
      </div>
    `;
    el.innerHTML = html;

    const expEl = document.getElementById('explore-communities-list');
    if (expEl) {
      expEl.innerHTML = AppData.exploreCommunities.map(c => `
        <div class="follow-item" style="padding:16px 20px;border-bottom:1px solid var(--border);">
          <div class="avatar avatar-md" style="background:#1a1a2e;font-size:18px;">${c.initials}</div>
          <div class="follow-item__info">
            <div class="follow-item__name">${c.name}</div>
            <div class="follow-item__handle">${c.members} miembros · ${c.category}</div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="Toast.show('Uniéndote a ${c.name}...')">Unirse</button>
        </div>
      `).join('');
    }
  }
  return { render };
})();

// ---- MESSAGES ----
const Messages = (() => {
  function render() {
    const el = document.getElementById('groups-list');
    if (!el) return;
    el.innerHTML = AppData.groups.map(g => `
      <div class="chat-item" onclick="Toast.show('Chat de ${g.name}')">
        <div class="avatar avatar-md" style="background:#0a0a1e;font-weight:800;color:#fff;border:1px solid #222;font-size:${g.icon==='A'?'16px':'18px'};">${g.icon}</div>
        <div class="chat-item__info">
          <div class="chat-item__name">${g.name}</div>
          <div class="chat-item__sub">${g.category}</div>
        </div>
        <div class="chat-item__count">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          ${g.members}
        </div>
      </div>
    `).join('');
  }
  return { render };
})();

// ---- PROFILE ----
const Profile = (() => {
  function render() {
    const myPosts = AppData.posts.filter(p => p.user.id === 'u1');
    const el = document.getElementById('profile-posts-list');
    if (!el) return;
    if (!myPosts.length) {
      el.innerHTML = `<div style="padding:48px 20px;text-align:center;color:var(--text-muted);font-size:14px;">No hay publicaciones aún</div>`;
      return;
    }
    el.innerHTML = myPosts.map(p => {
      const content = p.content
        .replace(/#(\w+)/g, '<span style="color:var(--accent-blue)">#$1</span>')
        .replace(/@(\w[\w.]+)/g, '<span style="color:var(--accent-blue)">@$1</span>');
      return `
        <div class="post-card">
          <div class="post-card__content post-card__content--no-avatar">${content}</div>
          <div class="post-card__actions" style="padding-left:0;">
            <button class="post-action post-action--like"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="17" height="17"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg><span class="post-action__count">${p.likes||''}</span></button>
            <button class="post-action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="17" height="17"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span class="post-action__count">${p.comments||''}</span></button>
            <button class="post-action post-action--chart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="17" height="17"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg><span class="post-action__count">${p.views||''}</span></button>
          </div>
        </div>
      `;
    }).join('');
    const cnt = document.getElementById('profile-posts-count');
    if (cnt) cnt.textContent = `${myPosts.length} posts`;
  }
  return { render };
})();

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
  Modal.init();
  Feed.renderFeed();

  Explore.renderTrends();
  Activity.render();
  Communities.render();
  Messages.render();
  Profile.render();
});