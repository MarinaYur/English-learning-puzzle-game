import { ifClickContinueBtn } from '../buttons';
import Tag from '../tags/tags';
import { htmlElOrNull, listOfElements } from '../types/types';
import { checkIfAllRoundsAreCompleted, levelSelect } from './checkIfAllRoundsAreCompleted';
import { hearTranslation, playPronunciation, pronunciationHint, showBackgroundImageBtn } from './fillingChallengeBlock';
import { dataFromResponse, levelIndex, moveToNextLevel } from './fillingLevelRoundBlock';
import { getRSSPuzzleFromLS } from './getFromLocalStorage';
import resultBlockDom from './resultBlockDom';
import { saveNextLevelRoundAfterPassedInLS } from './saveInLicalStorage';

export let roundsNumber: number = 45;
export let background: string;
let challBlock: HTMLElement;
let prevPuzzlePeaceWidth: number = 0;
let prevPuzzlePeaceHeight: number = 0;
let prevPuzzlePeaceProtrusionHeight: number = -14.2878;
let resultBlock: HTMLElement;
let puzzleArray: Element[] = [];
export const puzzlePeaceProtrusionBkg: htmlElOrNull = document.querySelector('.puzzle-peace-protrusion-bkg');

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

export const turnOnGameChanger = (dataBlock: HTMLElement, roundIndex?: number, level?: number) => {
  const block = dataBlock;
  wordCounter = 0;
  prevPuzzlePeaceWidth = 0;
  prevPuzzlePeaceHeight = 0;
  prevPuzzlePeaceProtrusionHeight = -14.2878;
  puzzleArray = [];
  if (roundIndex || roundIndex === 0) {
    roundCounter = roundIndex;
  }
  const continueBtn: htmlElOrNull = document.querySelector('.continue-btn');
  challBlock.innerHTML = '';
  block.innerHTML = '';
  if (resultBlock) resultBlock.innerHTML = '';
  resultBlockDom(resultBlock);
  ifClickContinueBtn(challBlock, dataBlock, continueBtn);
};

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
      const imageSource = data.rounds[roundCounter].levelData.imageSrc;
      background = `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/${imageSource}`;
      resultBlock.style.backgroundImage = `url(${background})`;
      hearTranslation(audioExample);
      challBlock.innerHTML = textExampleTranslate;
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
      if (roundCounter + 1 !== roundsNumber) {
        console.log('roundCounter', roundCounter);
        const roundSelect: HTMLSelectElement | null = document.querySelector('.dropdown-select-Round');
        const roundOptions: listOfElements | undefined = roundSelect?.querySelectorAll('.dropdown-option');
        if (roundOptions) {
          const selectedOption = roundOptions[roundCounter];
          const nextOption = roundOptions[roundCounter + 1];
          const dropdownToggle = document.querySelector('.dropdown-toggle-Round');
          selectedOption.classList.add('completed-option');
          const puzzle = JSON.parse(localStorage['rss-puzzle']);
          puzzle.completed[levelIndex as number][(roundCounter as number) + 1] = true;
          localStorage.setItem('rss-puzzle', JSON.stringify(puzzle));
          selectedOption.classList.remove('active-l-r');
          nextOption.classList.add('active-l-r');
          if (dropdownToggle) dropdownToggle.innerHTML = nextOption.innerHTML;
          checkIfAllRoundsAreCompleted(roundOptions);
        }
        saveNextLevelRoundAfterPassedInLS(roundCounter);
        turnOnGameChanger(dataBlock);
        renderTasks(challBlock, dataBlock);
        roundCounter += 1;
      }

      console.log('wordCounter', wordCounter, 'roundCounter', roundCounter, 'roundsNumber', roundsNumber);

      if (roundCounter + 1 === roundsNumber) {
        console.log('levelIndex', levelIndex);
        if (levelIndex !== 6) {
          const levelSelect: HTMLSelectElement | null = document.querySelector('.dropdown-select-Level');
          const levelOptions: listOfElements | undefined = levelSelect?.querySelectorAll('.dropdown-option');
          if (levelOptions) {
            console.log('levelOptions', levelOptions);
            const selectedOption = levelOptions[levelIndex - 1];
            console.log(levelOptions[levelIndex]);
            const nextOption = levelOptions[levelIndex];
            const dropdownToggle = document.querySelector('.dropdown-toggle-Level');
            selectedOption.classList.add('completed-option');
            selectedOption.classList.remove('active-l-r');
            nextOption.classList.add('active-l-r');
            if (dropdownToggle) dropdownToggle.innerHTML = nextOption.innerHTML;
          }
          const roundSelect: HTMLSelectElement | null = document.querySelector('.dropdown-select-Round');
          const roundOptions: listOfElements | undefined = roundSelect?.querySelectorAll('.dropdown-option');
          if (roundOptions) {
            const selectedOption = roundOptions[roundCounter];
            const nextOption = roundOptions[0];
            const dropdownToggle = document.querySelector('.dropdown-toggle-Round');
            selectedOption.classList.add('completed-option');
            const puzzle = JSON.parse(localStorage['rss-puzzle']);
            puzzle.completed[levelIndex as number][(roundCounter as number) + 1] = true;
            localStorage.setItem('rss-puzzle', JSON.stringify(puzzle));
            selectedOption.classList.remove('active-l-r');
            nextOption.classList.add('active-l-r');
            if (dropdownToggle) dropdownToggle.innerHTML = nextOption.innerHTML;
          }
        }
        console.log('level finished');
        // const puzzle = JSON.parse(localStorage['rss-puzzle']);
        // puzzle.completed[levelIndex as number][0] = true;
        // localStorage.setItem('rss-puzzle', JSON.stringify(puzzle));
        // moveToNextLevel(1);
        roundCounter = 0;
        saveNextLevelRoundAfterPassedInLS(roundCounter, levelIndex);
        turnOnGameChanger(dataBlock);
      }
    }
  }
};

export default renderTasks;
