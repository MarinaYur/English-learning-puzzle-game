import Page from '../../components/core/templates/page';
import Tag from '../../components/tags/tags';
import checkInput from '../../components/validation';

import './style.css';

export default class LoginPage extends Page {
  createContent() {
    const loginContainer = new Tag('div', 'login', '', '', false, '', 'loginPage').createElem();
    this.container.append(loginContainer);
    const loginForm = new Tag('form', 'login-form', '', '', false, '', 'form', '/', 'POST').createElem();
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
      'fname',
      '',
      '',
      'firstName'
    ).createElem() as HTMLInputElement;
    loginForm.append(firstName);
    const validateMsgFName = new Tag('div', 'fname-error').createElem();
    loginForm.append(validateMsgFName);
    const lastName = new Tag(
      'input',
      'login-input last-name',
      null,
      'Surname',
      true,
      'text',
      'lname',
      '',
      '',
      'surName'
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
      '',
      '',
      '',
      true
    ).createElem();
    loginForm.append(loginButton);
    const inputs = [firstName as HTMLInputElement, lastName as HTMLInputElement];
    const validResult: boolean[] = [false, false];

    inputs.forEach((elem, index) => {
      const input = elem;
      input.addEventListener('input', () => {
        const valState = checkInput(input as HTMLInputElement);
        const validateMSG = index === 0 ? validateMsgFName : validateMsgLName;

        if (!valState) {
          const lengthErrorMsg: string = index === 0 ? '3 - 40' : '4 - 40';
          const errorMsg = `First letter in uppercase, only English alphabet
        letters and hyphen ('-') accept, length of ${lengthErrorMsg} characters`;
          validateMSG.innerHTML = errorMsg;
          input.style.border = '2px solid red';
          validateMSG.style.display = 'block';
          validResult[index] = false;
        }
        if (valState) {
          input.style.border = '2px solid black';
          validateMSG.style.display = 'none';
          validResult[index] = true;
        }
        if (input.value === '') {
          validateMSG.style.display = 'none';
          input.style.border = '2px solid black';
          validResult[index] = false;
        }
        this.activeSubmitBtn(validResult, loginButton as HTMLButtonElement);
      });
    });
  }

  activeSubmitBtn(res: boolean[], btn: HTMLButtonElement): void {
    if (!res.includes(false)) {
      btn.removeAttribute('disabled');
    } else {
      btn.setAttribute('disabled', 'false');
    }
  }

  render() {
    this.createContent();
    return this.container;
  }
}
