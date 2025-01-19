import { levelRoundBlock } from '../pages/main/index';
import Tag from './tags/tags';

import './styles.css';
import '../pages/results/styles.css';
import App from '../app';
import renderTasks, { roundCounter, wordCounter } from './for-main-page/renderTasks';
import checkPuzzlesOrder from './for-main-page/checkPuzzlesOrder';
import autoCompleteFunction, { notKnow } from './for-main-page/autoComplete';
import madeBtnDisabledOrChangeDisplay from './for-main-page/madeBtnDisabledOrChangeDisplay';
import { pronunciationHint, showPronunciationHintBtn } from './for-main-page/fillingChallengeBlock';
import deletePuzzlePeaceHighlight from './for-main-page/deletePuzzlePeaceHighlight';
import { dataFromResponse, levelIndex, roundIndex } from './for-main-page/fillingLevelRoundBlock';

let ifRoundIsFinished = true;
export let know: string[] = [];

export const ifClickContinueBtn = (
  challengeBlock: HTMLElement,
  dataBlock: HTMLElement,
  continueBtn: HTMLElement | null
) => {
  const round = document.querySelectorAll('.active-l-r');
  const resultBlock: HTMLElement | null = document.querySelector('.result-block');

  // let roundIndex: number = 0;
  // const match = round[1].innerHTML.match(/\d+/);
  // if (match) {
  //   roundIndex = +match[0];
  // }

  if (wordCounter === 10 && ifRoundIsFinished) {
    madeBtnDisabledOrChangeDisplay('.continue-btn', true, false);
    madeBtnDisabledOrChangeDisplay('.result-btn', true, false);
    madeBtnDisabledOrChangeDisplay('.auto-complete-btn', false, true);
    addPuzzleDisappearance();
    showPictureInfo(roundCounter, resultBlock, dataBlock);
    notKnow.push('0');
    ifRoundIsFinished = false;
  } else {
    renderTasks(challengeBlock, dataBlock);
    if (resultBlock) {
      resultBlock.style.backgroundBlendMode = 'luminosity';
    }
    ifRoundIsFinished = true;
    dataBlock.classList.remove('data-block-info');
  }

  if (continueBtn && wordCounter !== 10) {
    continueBtn.setAttribute('disabled', 'disabled');
    continueBtn.style.display = 'none';
    madeBtnDisabledOrChangeDisplay('.auto-complete-btn', true, false);
    madeBtnDisabledOrChangeDisplay('.result-btn', false, true);
  }
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
    const string = dataFromResponse.rounds[roundCounter].words[wordCounter - 1].textExample;
    if (!notKnow.includes(string)) {
      know.push(string);
    }
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
  resultBtn.onclick = () => {
    App.renderNewPage('ResultsPage');
  };
};

export const createAutoCompleteBtn = (container: HTMLElement) => {
  const autoComplete = new Tag('button', 'btn auto-complete-btn', 'Auto-Complete').createElem();
  container.append(autoComplete);
  autoComplete.style.display = wordCounter === 10 ? 'none' : 'block';
  autoComplete.addEventListener('click', () => {
    autoCompleteFunction();
  });
};
export default createStartBtn;

export const showPictureInfo = async (roundIndex: number, block1: HTMLElement | null, block2: HTMLElement | null) => {
  const response = await fetch(
    `https://raw.githubusercontent.com/MarinaYur/rss-puzzle-data/main/data/wordCollectionLevel${levelIndex}.json`
  );
  const fromResponse = await response.json();
  const info = fromResponse.rounds[roundCounter].levelData;
  const pictureName = info.name;
  const pictureAuthor = info.author;
  const pictureYear = info.year;
  const background = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${info.cutSrc}`;
  if (block1) {
    block1.style.backgroundImage = `url(${background})`;
    block1.style.backgroundBlendMode = 'normal';
  }

  if (block2) {
    block2.innerHTML = `<p class="picture-name">${pictureName}</p>
  <p class="picture-auth-year">${pictureAuthor}, ${pictureYear}</p>`;
    block2?.classList.add('data-block-info');
  }
};

export const addPuzzleDisappearance = () => {
  const puzzlePeaces = document.querySelectorAll('.puzzle-peace');
  puzzlePeaces.forEach((pPeace) => {
    const peace = pPeace as HTMLElement;
    setTimeout(() => {
      peace.classList.add('fall');
    }, Math.random() * 1000);
  });
  console.log(puzzlePeaces);
};

export const addContinueBtnOnResultPage = (container: HTMLElement) => {
  const continueBtn = new Tag(
    'button',
    'btn res-continue-btn continue-btn',
    'Continue',
    '',
    false,
    '',
    'res-continue-btn'
  ).createElem();
  container.append(continueBtn);
  continueBtn.addEventListener('click', () => {
    know = [];
    App.renderNewPage('MainPage');
  });
};
