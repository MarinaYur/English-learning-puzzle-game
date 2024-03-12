import Page from '../../components/core/templates/page';
import Tag from '../../components/tags/tags';

import './style.css';

export default class LoginPage extends Page {
  createContent() {
    const loginContainer = new Tag('div', 'login').createElem();
    this.container.append(loginContainer);
    const loginContent = new Tag('div', 'login-content').createElem();
    loginContainer.append(loginContent);
    const pageTitle = new Tag('h1', 'page-title', 'Login form').createElem();
    loginContent.append(pageTitle);
    const firstName = new Tag(
      'input',
      'login-input first-name',
      null,
      'First Name',
      true,
      'text',
      'fname'
    ).createElem() as HTMLInputElement;
    loginContent.append(firstName);
    const lastName = new Tag(
      'input',
      'login-input last-name',
      null,
      'Surname',
      true,
      'text'
    ).createElem();
    loginContent.append(lastName);
    const loginButton = new Tag(
      'button',
      'btn login-btn',
      'Login',
      '',
      false,
      '',
      '',
      true
    ).createElem();
    loginContent.append(loginButton);
  }

  render() {
    this.createContent();
    return this.container;
  }
}
