// import Page from './components/core/templates/page';
// import LoginPage from './pages/login/index';
import StartScreen from './pages/startScreen/index';

// export const enum PageIds {
//   LoginPage = 'login-page',
// }
export default class App {
  // private static container: HTMLElement = document.body;

  // static renderNewPage(pageId: string) {
  //   let page: Page | null = null;

  //   if (pageId === 'loginPage') {
  //     page = new LoginPage(pageId);
  //     this.container.append(page.render());
  //   }
  // }
  private container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  run() {
    // const page = App.renderNewPage('loginPages');
    // App.container.append(page.render());
    const page = new StartScreen('');
    this.container.append(page.render());
  }
}
