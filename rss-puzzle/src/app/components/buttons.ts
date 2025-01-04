import Tag from './tags/tags';

import './styles.css';
import App from '../app';
import renderTasks, { wordCounter } from './for-main-page/renderTasks';
import checkPuzzlesOrder from './for-main-page/checkPuzzlesOrder';
import autoCompleteFunction from './for-main-page/autoComplete';
import madeBtnDisabledOrChangeDisplay from './for-main-page/madeBtnDisabledOrChangeDisplay';
import { pronunciationHint, showPronunciationHintBtn } from './for-main-page/fillingChallengeBlock';
import deletePuzzlePeaceHighlight from './for-main-page/deletePuzzlePeaceHighlight';
import { dataFromResponse } from './for-main-page/fillingLevelRoundBlock';

let ifRoundIsFinished = true;
export const ifClickContinueBtn = (
  challengeBlock: HTMLElement,
  dataBlock: HTMLElement,
  continueBtn: HTMLElement | null
) => {
  const round = document.querySelectorAll('.active-l-r');
  let roundIndex: number = 0;
  const match = round[1].innerHTML.match(/\d+/);
  if (match) {
    roundIndex = +match[0];
  }
  if (wordCounter === 10 && ifRoundIsFinished) {
    showPictureInfo(roundIndex);
    ifRoundIsFinished = false;
  } else {
    renderTasks(challengeBlock, dataBlock);
    ifRoundIsFinished = true;
    dataBlock.classList.remove('data-block-info');
  }

  if (continueBtn) {
    continueBtn.setAttribute('disabled', 'disabled');
    continueBtn.style.display = 'none';
  }
  madeBtnDisabledOrChangeDisplay('.auto-complete-btn', true, false);
  console.log('wordCounter', wordCounter);
};

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
    ifClickContinueBtn(challengeBlock, dataBlock, continueBtn);
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
    deletePuzzlePeaceHighlight();
  });
};

const createStartBtn = (container: HTMLElement) => {
  const startBtn = new Tag('button', 'btn start-btn', 'Start Game').createElem();
  container.append(startBtn);
  startBtn.onclick = () => {
    // location.reload();
    App.renderNewPage('MainPage');
  };
};

export const createResultBtn = (container: HTMLElement) => {
  const resultBtn = new Tag('button', 'btn result-btn', 'Result').createElem();
  container.append(resultBtn);
  resultBtn.onclick = () => {};
};

export const createAutoCompleteBtn = (container: HTMLElement) => {
  const autoComplete = new Tag('button', 'btn auto-complete-btn', 'Auto-Complete').createElem();
  container.append(autoComplete);
  autoComplete.addEventListener('click', () => {
    autoCompleteFunction();
  });
};
export default createStartBtn;

export const showPictureInfo = (roundIndex: number) => {
  const dataBlock = document.querySelector('.data-block');
  const info = dataFromResponse.rounds[roundIndex].levelData;
  const pictureName = info.name;
  const pictureAuthor = info.author;
  const pictureYear = info.year;
  if (dataBlock) {
    dataBlock.innerHTML = `<p class="picture-name">${pictureName}</p>
  <p class="picture-auth-year">${pictureAuthor}, ${pictureYear}</p>`;
    dataBlock?.classList.add('data-block-info');
  }
  console.log('dataFromResponse', dataFromResponse.rounds[roundIndex]);
  console.log('roundIndex', roundIndex);

  // challengeBlock?.innerHTML;
};
