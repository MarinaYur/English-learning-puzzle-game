import Tag from '../tags/tags';
import checkPuzzlesOrder from './checkPuzzlesOrder';
import deletePuzzlePeaceHighlight from './deletePuzzlePeaceHighlight';
import dragNdropFunction from './dragNdropFunction';
import { hearTranslation, playPronunciation, pronunciationHint, showBackgroundImage } from './fillingChallengeBlock';
import resultBlockDom from './resultBlockDom';

export let background: string;
let prevPuzzlePeaceWidth: number = 0;
let prevPuzzlePeaceHeight: number = 0;
let prevPuzzlePeaceProtrusionHeight: number = -14.2878;
const resultBlock = document.querySelector('.result-block') as HTMLElement;
let puzzleArray: Element[] = [];
export const puzzlePeaceProtrusionBkg: HTMLElement | null = document.querySelector('.puzzle-peace-protrusion-bkg');

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
  if (showBackgroundImage.classList.contains('chall-show-background-image-hint-on')) {
    puzzlePeace.style.backgroundImage = `url(${background})`;
  }
  puzzlePeace.style.backgroundPosition = `-${prevPuzzlePeaceWidth}px ${prevPuzzlePeaceHeight}px`;
  puzzlePeace.style.backgroundSize = `907.188px 510.281px`;
  prevPuzzlePeaceWidth += width;

  const p = new Tag('p', 'puzzle-word').createElem();
  p.innerHTML = text[0];
  puzzlePeace.append(p);

  if (text[1] !== sentenseLength - 1) {
    const puzzlePeaceProtrusion = new Tag('div', 'puzzle-peace-protrusion puzzle-peace-protrusion-bkg').createElem();
    puzzlePeace.prepend(puzzlePeaceProtrusion);
    if (showBackgroundImage.classList.contains('chall-show-background-image-hint-on')) {
      puzzlePeaceProtrusion.style.backgroundImage = `url(${background})`;
    }
    puzzlePeaceProtrusion.style.backgroundPosition = `-${prevPuzzlePeaceWidth}px  ${prevPuzzlePeaceProtrusionHeight}px`;
    puzzlePeaceProtrusion.style.backgroundSize = `907.188px 510.281px`;
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
    let target = e.target as HTMLLIElement;
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
      // checkPuzzlesOrder();
      checkBtn?.removeAttribute('disabled');
    }
  });
  checkBtn.style.display = 'block';
  checkBtn.setAttribute('disabled', 'disabled');
};

export let roundCounter = 0;
export let wordCounter = 0;

const renderTasks = async (challengeBlock: HTMLElement, dataBlock: HTMLElement) => {
  const resultBlock = document.querySelector('.result-block') as HTMLElement;
  const response = await fetch(
    ' https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json'
  );
  const data = await response.json();
  if (roundCounter < data.roundsCount) {
    if (wordCounter < 10) {
      const textExampleTranslate = data.rounds[roundCounter].words[wordCounter].textExampleTranslate;
      const textExample = data.rounds[roundCounter].words[wordCounter].textExample;
      const audioExample = data.rounds[roundCounter].words[wordCounter].audioExample;
      pronunciationHint.removeEventListener('click', playPronunciation);
      background =
        'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/' +
        data.rounds[roundCounter].levelData.cutSrc;
      hearTranslation(audioExample);
      challengeBlock.innerHTML = textExampleTranslate;
      const numberOfTaskLetters = textExample.split(' ').join('').length;
      const randomTextExample = textExample.split(' ').map((item: string, ind: number) => [item, ind]);
      randomTextExample.forEach((item: [string, number]) =>
        createPuzzlesPieces(dataBlock, item, numberOfTaskLetters, wordCounter, textExample.split(' ').length)
      );
      wordCounter += 1;
    } else {
      if (wordCounter >= 10) {
        wordCounter = 0;
        roundCounter += 1;
        challengeBlock.innerHTML = '';
        dataBlock.innerHTML = '';
        resultBlock ? (resultBlock.innerHTML = '') : console.log('1');
        resultBlockDom(resultBlock);
        renderTasks(challengeBlock, dataBlock);
      }
    }
  }
};

export default renderTasks;
