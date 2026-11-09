// DRISHYAM Application Entrypoint
import './styles/main.css';
import './styles/landing.css';
import './styles/app.css';
import { initRouter } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');
  if (root) {
    initRouter(root);
  }
});
