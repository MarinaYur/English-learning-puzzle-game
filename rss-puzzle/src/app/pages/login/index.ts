import Page from '../../components/core/templates/page';
import Tag from '../../components/tags/tags';

import './style.css';

export default class LoginPage extends Page {
  createContent() {
    const loginContainer = new Tag('div', 'login').createElem();
    this.container.append(loginContainer);
    const loginForm = new Tag('form', 'login-form').createElem();
    loginContainer.append(loginForm);
    const pageTitle = new Tag('h1', 'page-title', 'Login form').createElem();
    loginForm.append(pageTitle);
    const firstName = new Tag(
      'input',
      'login-input first-name',
      null,
      'First Name',
      true,
      'text',
      'fname'
    ).createElem() as HTMLInputElement;
    loginForm.append(firstName);
    const validateMsgFName = new Tag('div', '1name-error').createElem();
    loginForm.append(validateMsgFName);
    const lastName = new Tag(
      'input',
      'login-input last-name',
      null,
      'Surname',
      true,
      'text'
    ).createElem();
    loginForm.append(lastName);
    const validateMsgLName = new Tag('div', 'lname-error').createElem();
    loginForm.append(validateMsgLName);
    const loginButton = new Tag(
      'button',
      'btn login-btn',
      'Login',
      '',
      false,
      'submit',
      '',
      true
    ).createElem();
    loginForm.append(loginButton);
  }

  render() {
    this.createContent();
    return this.container;
  }
}
