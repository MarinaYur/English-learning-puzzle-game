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
    const pageTitle = new Tag('h1', 'page-title', 'Login').createElem();
    loginForm.append(pageTitle);
    const formLineName = new Tag('div', 'form-line').createElem();
    loginForm.append(formLineName);
    const labelName = new Tag('label', 'label-name').createElem();
    formLineName.append(labelName);
    const name = new Tag(
      'input',
      'login-input name',
      null,
      'First name',
      true,
      'text',
      'name',
      '',
      '',
      'name'
    ).createElem() as HTMLInputElement;
    formLineName.append(name);
    const validateMsgName = new Tag('div', 'name-error').createElem();
    loginForm.append(validateMsgName);
    const formLinePass = new Tag('div', 'form-line').createElem();
    loginForm.append(formLinePass);

    const labelSurname = new Tag('label', 'label-surname').createElem();
    formLinePass.append(labelSurname);

    const surname = new Tag(
      'input',
      'login-input surname',
      null,
      'Surname',
      true,
      'text',
      'pass',
      '',
      '',
      'pass'
    ).createElem();
    formLinePass.append(surname);
    const validateMsgSurname = new Tag('div', 'surname-error').createElem();
    loginForm.append(validateMsgSurname);
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
    const inputs = [name as HTMLInputElement, surname as HTMLInputElement];
    const validResult: boolean[] = [false, false];
    inputs.forEach((elem, index) => {
      const input = elem;
      input.addEventListener('input', () => {
        const valState = checkInput(index, input.value);
        const validateMSG = index === 0 ? validateMsgName : validateMsgSurname;
        if (!valState) {
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
