import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/post.css';
import '../styles/form.css';
import '../styles/searchpages.css';
import '../styles/detail.css';
import '../styles/login.css';
import '../styles/register.css';
import '../styles/contact.css';
import '../styles/edit.css';
import AOS from 'aos';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

AOS.init({
  once: false,
  mirror: true,
  duration: 300,
});