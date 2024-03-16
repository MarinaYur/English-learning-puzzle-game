import Page from './components/core/templates/page';
import LoginPage from './pages/login/index';
import StartScreen from './pages/startScreen/index';

export default class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId: string = 'current-page';

  private initialPage: LoginPage;

  static logOutBtnHandler = () => {
    const logOutBtn = document.querySelector('.log-out');
    logOutBtn?.addEventListener('click', () => {
      localStorage.clear();
      App.renderNewPage('LoginPage');
    });
  };

  static saveUserCredentials = () => {
    const loginForm = document.getElementById('form');

    loginForm?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const userFirstName: HTMLInputElement | null = loginForm.querySelector('[name = "firstName"]');
      const userSurName: HTMLInputElement | null = document.querySelector('.last-name');
      const user = {
        firstName: userFirstName?.value,
        surName: userSurName?.value
      };
      const userStr: string = JSON.stringify(user);
      localStorage.setItem('rss-puzle', userStr);
      App.renderNewPage('StartScreen');
    });
  };

  static renderNewPage(pageId: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (pageId === 'LoginPage') {
      page = new LoginPage(pageId);
    } else if (pageId === 'StartScreen') {
      page = new StartScreen(pageId);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
      this.saveUserCredentials();
      this.logOutBtnHandler();
    }
  }

  constructor() {
    this.initialPage = new LoginPage('LoginPage');
  }

  renderStartPage() {
    let startPage: string = '';
    if (localStorage.length !== 0) {
      startPage = 'StartScreen';
    } else {
      startPage = 'LoginPage';
    }
    return startPage;
  }

  run() {
    const startPage: string = this.renderStartPage();
    App.renderNewPage(startPage);
  }
}
