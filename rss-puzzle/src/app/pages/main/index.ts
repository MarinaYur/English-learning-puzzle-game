import Page from '../../components/core/templates/page';
import { addLogOutBlock } from '../../components/logout';
import renderTasks from '../../components/for-main-page/renderTasks';
import Tag from '../../components/tags/tags';

import './styles.css';
import resultBlockDom from '../../components/for-main-page/resultBlockDom';
import { createAutoCompleteBtn, createCheckBtn, createContinueBtn, createResultBtn } from '../../components/buttons';
import fillingChallengeBlock from '../../components/for-main-page/fillingChallengeBlock';
import { isShowTranslation } from '../../components/for-main-page/getFromLocalStorage';
import { fillingLevelRoundBlock } from '../../components/for-main-page/fillingLevelRoundBlock';
import { notKnow } from '../../components/for-main-page/autoComplete';

export const levelRoundBlock = new Tag('div', 'level-round').createElem();

export default class MainPage extends Page {
  async createContent() {
    addLogOutBlock(this.container);
    const mainContainer = new Tag('main', 'main-container', '', '', false, '', 'MainPage').createElem();
    this.container.append(mainContainer);
    mainContainer.append(levelRoundBlock);
    levelRoundBlock.innerHTML = '';
    await fillingLevelRoundBlock(levelRoundBlock);
    const challengeBlock = new Tag('div', 'challenge-block').createElem();
    mainContainer.append(challengeBlock);
    const challHint = new Tag('div', 'challenge-hint').createElem();
    isShowTranslation(challHint);
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
    createContinueBtn(btnsBlock, challHint, dataBlock);
    createAutoCompleteBtn(btnsBlock);
    createResultBtn(btnsBlock);
    notKnow.splice(0, notKnow.length);
  }

  render() {
    this.createContent();
    return this.container;
  }
}
