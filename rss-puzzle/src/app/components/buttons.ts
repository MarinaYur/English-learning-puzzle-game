import Tag from './tags/tags';

import './styles.css';
import App from '../app';
import renderTasks from './for-main-page/renderTasks';
import checkPuzzlesOrder from './for-main-page/checkPuzzlesOrder';
import autoCompleteFunction from './for-main-page/autoComplete';
import madeBtnDisabledOrChangeDisplay from './for-main-page/madeBtnDisabledOrChangeDisplay';
import { pronunciationHint, showPronunciationHintBtn } from './for-main-page/fillingChallengeBlock';

export const createCheckBtn = (container: HTMLElement) => {
  const checkBtn = new Tag('button', 'btn check-btn', 'Check').createElem();
  checkBtn.setAttribute('disabled', 'disabled');
  container.append(checkBtn);
  checkBtn.addEventListener('click', () => {
    checkPuzzlesOrder();
  });
};

export const createContinueBtn = (container: HTMLElement, challengeBlock: HTMLElement, dataBlock: HTMLElement) => {
  const continueBtn = new Tag('button', 'btn continue-btn', 'Continue').createElem();
  continueBtn.setAttribute('disabled', 'disabled');
  container.append(continueBtn);
  continueBtn.addEventListener('click', () => {
    renderTasks(challengeBlock, dataBlock);
    continueBtn.setAttribute('disabled', 'disabled');
    continueBtn.style.display = 'none';
    madeBtnDisabledOrChangeDisplay('.auto-complete-btn', true, false);
    const challHint = document.querySelector('.challenge-hint');
    const showHint = document.querySelector('.chall-translation-hint');
    if (showHint?.classList.contains('chall-show-hint')) {
      challHint?.classList.remove('challenge-hint-invisible');
    } else {
      challHint?.classList.add('challenge-hint-invisible');
    }

    if (showPronunciationHintBtn?.classList.contains('chall-show-pronunciation-hint-active')) {
      pronunciationHint?.classList.remove('chall-pronunciation-hint-invisible');
    } else {
      pronunciationHint?.classList.add('chall-pronunciation-hint-invisible');
    }

  });
};

const createStartBtn = (container: HTMLElement) => {
  const startBtn = new Tag('button', 'btn start-btn', 'Start Game').createElem();
  container.append(startBtn);
  startBtn.onclick = () => {
    App.renderNewPage('MainPage');
  };
};

export const createAutoCompleteBtn = (container: HTMLElement) => {
  const autoComplete = new Tag('button', 'btn auto-complete-btn', 'Auto-Complete').createElem();
  container.append(autoComplete);
  autoComplete.addEventListener('click', () => {
    autoCompleteFunction();
  });
};
export default createStartBtn;
