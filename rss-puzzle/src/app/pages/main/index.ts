import Page from '../../components/core/templates/page';
import logOut from '../../components/logout';
import renderTasks from '../../components/for-main-page/renderTasks';
import Tag from '../../components/tags/tags';

import './styles.css';
import resultBlockDom from '../../components/for-main-page/resultBlockDom';
import { createCheckBtn, createContinueBtn } from '../../components/buttons';

export default class MainPage extends Page {
  async createContent() {
    const mainContainer = new Tag('main', 'main-container', '', '', false, '', 'MainPage').createElem();
    this.container.append(mainContainer);
    const logOutBlock = logOut();
    logOutBlock.className = 'out-field-main out-field';
    mainContainer.append(logOutBlock);
    const challengeBlock = new Tag('div', 'challenge-block').createElem();
    mainContainer.append(challengeBlock);
    const resultBlock = new Tag('div', 'result-block').createElem();
    mainContainer.append(resultBlock);
    resultBlockDom(resultBlock);
    const dataBlock = new Tag('div', 'data-block').createElem();
    mainContainer.append(dataBlock);
    renderTasks(challengeBlock, dataBlock);
    createContinueBtn(mainContainer, challengeBlock, dataBlock);
    createCheckBtn(mainContainer);
  }
  render() {
    this.createContent();
    return this.container;
  }
}
