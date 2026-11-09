// DRISHYAM Client Router
import { renderLandingView } from './views/landingView.js';
import { renderAppView } from './views/appView.js';

class Router {
  constructor(appElement) {
    this.app = appElement;
    this.currentCleanup = null;

    window.addEventListener('popstate', () => this.handleRoute());
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  handleRoute() {
    if (this.currentCleanup && typeof this.currentCleanup === 'function') {
      try { this.currentCleanup(); } catch (e) {}
      this.currentCleanup = null;
    }

    const path = window.location.pathname;

    if (path.startsWith('/app')) {
      renderAppView(this.app, () => this.navigate('/'));
    } else {
      this.currentCleanup = renderLandingView(this.app, () => this.navigate('/app'));
    }
  }
}

export let router = null;

export function initRouter(appElement) {
  router = new Router(appElement);
  router.handleRoute();
  return router;
}
