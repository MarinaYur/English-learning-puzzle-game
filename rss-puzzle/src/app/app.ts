import LoginPage from './pages/login/index';

export default class App {
  private container: HTMLElement;

  constructor() {
    this.container = document.body;
  }

  run() {
    const page = new LoginPage('');
    this.container.append(page.render());
  }
}
