// DRISHYAM Authentication Modal
import { api } from '../services/api.js';

export function openAuthModal(initialMode = 'login', onSuccess = () => {}) {
  // Remove existing modal if any
  const existing = document.getElementById('drishyam-auth-modal');
  if (existing) existing.remove();

  const backdrop = document.createElement('div');
  backdrop.id = 'drishyam-auth-modal';
  backdrop.className = 'modal-backdrop';

  let currentMode = initialMode; // 'login' or 'register'

  function renderContent() {
    backdrop.innerHTML = `
      <div class="modal-content glass-panel" style="max-width: 440px; border-color: rgba(255, 138, 50, 0.3); padding: 36px 32px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="brand-symbol" style="width: 28px; height: 28px; font-size: 0.95rem;">D</div>
            <span style="font-family: var(--font-serif); font-weight: 700; letter-spacing: 0.15em; font-size: 1.1rem;">DRISHYAM</span>
          </div>
          <button id="auth-close-btn" style="color: var(--text-muted); font-size: 1.4rem; padding: 4px;">&times;</button>
        </div>

        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 6px; font-weight: 700;">
          ${currentMode === 'login' ? 'Welcome back' : 'Create your account'}
        </h3>
        <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 24px;">
          ${currentMode === 'login' ? 'Sign in to access your intelligent pantry and nutrition targets.' : 'Join the next generation of computational gastronomy.'}
        </p>

        <form id="auth-form" style="display: flex; flex-direction: column; gap: 16px;">
          ${currentMode === 'register' ? `
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 6px;">Full Name</label>
              <input type="text" id="auth-name" required placeholder="Chef Alex" style="width: 100%; padding: 12px 14px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; font-size: 0.92rem;" />
            </div>
          ` : ''}

          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 6px;">Email Address</label>
            <input type="email" id="auth-email" required placeholder="alex@kitchen.ai" value="${currentMode === 'login' ? 'demo@drishyam.ai' : ''}" style="width: 100%; padding: 12px 14px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; font-size: 0.92rem;" />
          </div>

          <div>
            <label style="display: block; font-size: 0.78rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 6px;">Password</label>
            <input type="password" id="auth-password" required placeholder="••••••••" value="${currentMode === 'login' ? 'drishyam2026' : ''}" style="width: 100%; padding: 12px 14px; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: #fff; font-size: 0.92rem;" />
          </div>

          <div id="auth-error" style="color: var(--accent-red); font-size: 0.82rem; display: none;"></div>

          <button type="submit" id="auth-submit-btn" class="btn-primary" style="width: 100%; padding: 14px; margin-top: 6px;">
            ${currentMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style="position: relative; text-align: center; margin: 20px 0;">
          <div style="position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border-subtle);"></div>
          <span style="position: relative; background: var(--bg-surface); padding: 0 12px; font-size: 0.76rem; color: var(--text-muted); text-transform: uppercase; font-family: var(--font-mono);">OR</span>
        </div>

        <button id="auth-demo-btn" class="btn-secondary" style="width: 100%; padding: 12px; border-color: rgba(232, 181, 106, 0.4); color: var(--accent-secondary); font-size: 0.88rem;">
          ⚡ Instant Demo Sign In (Chef Suman)
        </button>

        <div style="margin-top: 22px; text-align: center; font-size: 0.85rem; color: var(--text-secondary);">
          ${currentMode === 'login' ? `
            Don't have an account yet? <a href="#" id="auth-toggle-mode" style="color: var(--accent-primary); font-weight: 600;">Sign up</a>
          ` : `
            Already have an account? <a href="#" id="auth-toggle-mode" style="color: var(--accent-primary); font-weight: 600;">Sign in</a>
          `}
        </div>
      </div>
    `;

    // Attach Listeners
    backdrop.querySelector('#auth-close-btn').onclick = () => backdrop.remove();
    backdrop.querySelector('#auth-toggle-mode').onclick = (e) => {
      e.preventDefault();
      currentMode = currentMode === 'login' ? 'register' : 'login';
      renderContent();
    };

    // Demo Sign In
    backdrop.querySelector('#auth-demo-btn').onclick = async () => {
      const btn = backdrop.querySelector('#auth-demo-btn');
      btn.innerText = 'Connecting...';
      btn.disabled = true;
      const res = await api.demoLogin();
      if (res?.access_token) {
        backdrop.remove();
        onSuccess(res.user);
      } else {
        btn.innerText = 'Demo Login Failed';
        btn.disabled = false;
      }
    };

    // Form Submit
    backdrop.querySelector('#auth-form').onsubmit = async (e) => {
      e.preventDefault();
      const email = backdrop.querySelector('#auth-email').value;
      const password = backdrop.querySelector('#auth-password').value;
      const errBox = backdrop.querySelector('#auth-error');
      const submitBtn = backdrop.querySelector('#auth-submit-btn');

      errBox.style.display = 'none';
      submitBtn.innerText = 'Verifying...';
      submitBtn.disabled = true;

      let res;
      if (currentMode === 'register') {
        const name = backdrop.querySelector('#auth-name').value;
        res = await api.register(email, password, name);
      } else {
        res = await api.login(email, password);
      }

      if (res?.access_token) {
        backdrop.remove();
        onSuccess(res.user);
      } else {
        errBox.innerText = res?.detail || 'Authentication failed. Please check credentials.';
        errBox.style.display = 'block';
        submitBtn.innerText = currentMode === 'login' ? 'Sign In' : 'Create Account';
        submitBtn.disabled = false;
      }
    };
  }

  renderContent();
  document.body.appendChild(backdrop);
}
