import { doc } from 'prettier/index';
import { ifClickContinueBtn } from '../buttons';
import Tag from '../tags/tags';
import { htmlElOrNull } from '../types/types';
import { checkIfAllRoundsAreCompleted } from './checkIfAllRoundsAreCompleted';
import { hearTranslation, playPronunciation, pronunciationHint, showBackgroundImageBtn } from './fillingChallengeBlock';
import {
  createSelectedList,
  dataFromResponse,
  fillingLevelRoundBlock,
  levelIndex,
  moveToNextLevel,
  roundIndex
} from './fillingLevelRoundBlock';
import { getRSSPuzzleFromLS } from './getFromLocalStorage';
import resultBlockDom from './resultBlockDom';
import { saveNextLevelRoundAfterPassedInLS } from './saveInLicalStorage';

export let roundsNumber: number = 45;
export let background: string;
// let levelRoundBlock = document.querySelector('.level-round');
let challBlock: HTMLElement;
// let dataBlock: HTMLElement;
let prevPuzzlePeaceWidth: number = 0;
let prevPuzzlePeaceHeight: number = 0;
let prevPuzzlePeaceProtrusionHeight: number = -14.2878;
let resultBlock: HTMLElement;
let puzzleArray: Element[] = [];
export const puzzlePeaceProtrusionBkg: htmlElOrNull = document.querySelector('.puzzle-peace-protrusion-bkg');
const continueBtn: HTMLElement | null = document.querySelector('.continue-btn');

export const createPuzzlesPieces = (
  parent: HTMLElement,
  text: [string, number],
  length: number,
  id: number,
  sentenseLength: number
) => {
  const puzzlePeace = new Tag('div', `puzzle-peace order-${text[1]}`).createElem();
  puzzleArray.push(puzzlePeace);
  const checkBtn = document.querySelector('.check-btn') as HTMLElement;
  const parentWidth = parent.offsetWidth;
  // console.log(window.innerWidth);
  const width = (text[0].length / length) * parentWidth;
  puzzlePeace.style.width = `${width}px`;
  if (showBackgroundImageBtn.classList.contains('chall-show-background-image-hint-on')) {
    puzzlePeace.style.backgroundImage = `url(${background})`;
  }
  puzzlePeace.style.backgroundPosition = `-${prevPuzzlePeaceWidth}px ${prevPuzzlePeaceHeight}px`;
  puzzlePeace.style.backgroundSize = '907.188px 510.281px';
  prevPuzzlePeaceWidth += width;

  const p = new Tag('p', 'puzzle-word').createElem();
  p.innerHTML = text[0];
  puzzlePeace.append(p);

  if (text[1] !== sentenseLength - 1) {
    const puzzlePeaceProtrusion = new Tag('div', 'puzzle-peace-protrusion puzzle-peace-protrusion-bkg').createElem();
    puzzlePeace.prepend(puzzlePeaceProtrusion);
    if (showBackgroundImageBtn.classList.contains('chall-show-background-image-hint-on')) {
      puzzlePeaceProtrusion.style.backgroundImage = `url(${background})`;
    }
    puzzlePeaceProtrusion.style.backgroundPosition = `-${prevPuzzlePeaceWidth}px  ${prevPuzzlePeaceProtrusionHeight}px`;
    puzzlePeaceProtrusion.style.backgroundSize = '907.188px 510.281px';
    puzzlePeaceProtrusion?.classList.remove('puzzle-peace-protrusion-bkg');
  } else if (text[1] === sentenseLength - 1) {
    prevPuzzlePeaceWidth = 0;
    prevPuzzlePeaceHeight -= 51.0281;
    prevPuzzlePeaceProtrusionHeight -= 51.0281;
    puzzleArray
      .sort(() => Math.random() - 0.5)
      .forEach((item) => {
        parent.append(item);
      });
    // console.log(puzzlePeace.children[0].innerHTML.length);

    puzzleArray = [];
  }

  if (text[1] !== 0) {
    const puzzlePeaceAperture = new Tag('div', 'puzzle-peace-aperture').createElem();
    puzzlePeace.append(puzzlePeaceAperture);
  }

  const sentences = document.querySelectorAll('.sentence');

  puzzlePeace?.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLLIElement;
    target.classList.remove('correct-puzzle');
    target.classList.remove('incorrect-puzzle');
    if (puzzlePeace.parentElement?.classList.contains('data-block')) {
      sentences.forEach((sentence, index) => {
        if (index === id) {
          sentence.classList.add('droppable');
          sentence.append(puzzlePeace);
          puzzlePeace.classList.add('placed');
        }
      });
    } else {
      parent.append(puzzlePeace);
      target.classList.remove('right');
      checkBtn.setAttribute('disabled', 'disabled');
    }

    if (parent.childNodes.length === 0) {
      checkBtn?.removeAttribute('disabled');
    }
  });
  checkBtn.style.display = 'block';
  checkBtn.setAttribute('disabled', 'disabled');
};

export let roundCounter = localStorage['rss-puzzle'] ? getRSSPuzzleFromLS().nextRoundAfterPassed : 0;
export let wordCounter = 0;

const renderTasks = async (challengeBlock: HTMLElement, dataBlock: HTMLElement) => {
  challBlock = challengeBlock;
  resultBlock = document.querySelector('.result-block') as HTMLElement;
  const data = await dataFromResponse;
  roundsNumber = data.roundsCount;
  if (roundCounter < roundsNumber) {
    if (wordCounter < 10) {
      const { textExampleTranslate } = data.rounds[roundCounter].words[wordCounter];
      const { textExample } = data.rounds[roundCounter].words[wordCounter];
      const { audioExample } = data.rounds[roundCounter].words[wordCounter];
      pronunciationHint.removeEventListener('click', playPronunciation);
      background = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/';
      data.rounds[roundCounter].levelData.imageSrc;
      resultBlock.style.backgroundImage = `url(${background})`;
      hearTranslation(audioExample);
      challengeBlock.innerHTML = textExampleTranslate;
      const numberOfTaskLetters = textExample.split(' ').join('').length;
      const randomTextExample = textExample.split(' ').map((item: string, ind: number) => [item, ind]);
      randomTextExample.forEach((item) => {
        createPuzzlesPieces(
          dataBlock,
          item as [string, number],
          numberOfTaskLetters,
          wordCounter,
          textExample.split(' ').length
        );
      });
      wordCounter += 1;
    } else if (wordCounter >= 10) {
      const roundSelect: HTMLSelectElement | null = document.querySelector('.dropdown-select-Round');
      const roundOptions = roundSelect?.querySelectorAll('.dropdown-option');
      if (roundOptions) {
        const selectedOption = roundOptions[roundCounter];
        const nextOption = roundOptions[roundCounter + 1];
        const dropdownToggle = document.querySelector('.dropdown-toggle-Round');
        selectedOption.classList.add('completed-option');

        const puzzle = JSON.parse(localStorage['rss-puzzle']);
        puzzle.completed[levelIndex as number][(roundCounter as number) + 1] = true;
        localStorage.setItem('rss-puzzle', JSON.stringify(puzzle));

        // localStorage['rss-puzzle'].completed.'levelIndex'.push(roundCounter);
        selectedOption.classList.remove('active-l-r');
        nextOption.classList.add('active-l-r');
        if (dropdownToggle) dropdownToggle.innerHTML = nextOption.innerHTML;
        checkIfAllRoundsAreCompleted(roundOptions);
      }
      if (roundCounter === roundsNumber) {
        const puzzle = JSON.parse(localStorage['rss-puzzle']);
        puzzle.completed[levelIndex as number][0] = true;
        localStorage.setItem('rss-puzzle', JSON.stringify(puzzle));
        moveToNextLevel(1);
        roundCounter = 0;
      }
      roundCounter += 1;
      saveNextLevelRoundAfterPassedInLS(roundCounter);
      turnOnGameChanger(dataBlock);
    }
  }
};

export const turnOnGameChanger = (dataBlock: HTMLElement, roundIndex?: number) => {
  wordCounter = 0;
  prevPuzzlePeaceWidth = 0;
  prevPuzzlePeaceHeight = 0;
  prevPuzzlePeaceProtrusionHeight = -14.2878;
  puzzleArray = [];
  // console.log('roundCounter', roundCounter);
  if (roundIndex || roundIndex === 0) {
    roundCounter = roundIndex;
  }
  // if (roundIndex === -1)
  // {
  //   roundCounter = 0;
  // }
  console.log('roundCounter', roundCounter);
  // console.log('roundCounter', roundCounter);
  const continueBtn: HTMLElement | null = document.querySelector('.continue-btn');
  challBlock.innerHTML = '';
  dataBlock.innerHTML = '';
  resultBlock ? (resultBlock.innerHTML = '') : console.log('1');
  resultBlockDom(resultBlock);
  ifClickContinueBtn(challBlock, dataBlock, continueBtn);
};

export default renderTasks;
