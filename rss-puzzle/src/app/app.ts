import Page from './components/core/templates/page';
import { saveInLocalStorage } from './components/for-main-page/saveInLicalStorage';
import LoginPage from './pages/login/index';
import MainPage from './pages/main/index';
import ResultsPage from './pages/results/results';
import StartScreen from './pages/startScreen/index';

export default class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId: string = 'current-page';

  private initialPage: LoginPage;

  static logOutBtnHandler = () => {
    const logOutBtn = document.querySelector('.out');
    logOutBtn?.addEventListener('click', () => {
      localStorage.clear();
      App.renderNewPage('LoginPage');
      location.reload();
    });
  };

  static saveUserCredentials = () => {
    const loginForm = document.getElementById('form');

    loginForm?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const userFirstName: HTMLInputElement | null = loginForm.querySelector('[name = "name"]');
      const userSurName: HTMLInputElement | null = document.querySelector('.surname');
      saveInLocalStorage([true, true, true], userFirstName, userSurName);
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
    }
    if (pageId === 'StartScreen') {
      page = new StartScreen(pageId);
    }
    if (pageId === 'ResultsPage') {
      page = new ResultsPage(pageId);
    } else if (pageId === 'MainPage') {
      page = new MainPage(pageId);
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
    if (localStorage.length !== 0 && localStorage.getItem('rss-puzzle') !== null) {
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
