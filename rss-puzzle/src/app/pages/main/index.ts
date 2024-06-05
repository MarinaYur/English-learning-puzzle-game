import Page from '../../components/core/templates/page';
import logOut from '../../components/logout';
import renderTasks from '../../components/for-main-page/renderTasks';
import Tag from '../../components/tags/tags';

import './styles.css';
import resultBlockDom from '../../components/for-main-page/resultBlockDom';
import { createAutoCompleteBtn, createCheckBtn, createContinueBtn } from '../../components/buttons';
import fillingChallengeBlock from '../../components/for-main-page/fillingChallengeBlock';

export default class MainPage extends Page {
  async createContent() {
    const mainContainer = new Tag('main', 'main-container', '', '', false, '', 'MainPage').createElem();
    this.container.append(mainContainer);
    const logOutBlock = logOut();
    logOutBlock.className = 'out-field-main out-field';
    mainContainer.append(logOutBlock);
    const challengeBlock = new Tag('div', 'challenge-block').createElem();
    mainContainer.append(challengeBlock);
    const challHint = new Tag('div', 'challenge-hint challenge-hint-invisible').createElem();
    challengeBlock.append(challHint);
    fillingChallengeBlock(challengeBlock, challHint);
    const resultBlock = new Tag('div', 'result-block').createElem();
    mainContainer.append(resultBlock);
    resultBlockDom(resultBlock);
    const dataBlock = new Tag('div', 'data-block droppable').createElem();
    mainContainer.append(dataBlock);
    renderTasks(challHint, dataBlock);
    const btnsBlock = new Tag('div', 'btns-block').createElem();
    mainContainer.append(btnsBlock);
    createCheckBtn(btnsBlock);
    createContinueBtn(btnsBlock, challengeBlock, dataBlock);
    createAutoCompleteBtn(btnsBlock);
  }
  render() {
    this.createContent();
    return this.container;
  }
}
