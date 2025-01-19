import { addBackground } from './addRemoveBackground';
import { dataFromResponse } from './fillingLevelRoundBlock';
import madeBtnDisabledOrChangeDisplay from './madeBtnDisabledOrChangeDisplay';
import { roundCounter, wordCounter } from './renderTasks';

export let notKnow: string[] = [];
const autoCompleteFunction = () => {
  const challPronunciationHint: Element | null = document.querySelector('.chall-pronunciation-hint');
  const challHint = document.querySelector('.challenge-hint');
  challHint?.classList.remove('challenge-hint-invisible');
  challPronunciationHint?.classList.remove('chall-pronunciation-hint-invisible');

  const sentences = document.querySelectorAll('.sentence');
  let resultBlockWords: NodeListOf<Element> | null = null;
  let puzzleArray: Element[] = [];
  let activeSentence: Element | null = null;
  let activeSentenceIndex: number = 0;

  sentences.forEach((sentence, index) => {
    if (!sentence.classList.contains('disabled-div') && resultBlockWords === null) {
      resultBlockWords = sentence.querySelectorAll('.puzzle-peace');
      activeSentence = sentence;
      activeSentence.innerHTML = '';
      activeSentenceIndex = index;
      activeSentence.classList.add('disabled-div');
    }
  });

  const dataBlock = document.querySelector('.data-block');
  const dataBlockWords = dataBlock?.querySelectorAll('.puzzle-peace');

  if (resultBlockWords && dataBlockWords) {
    puzzleArray = [...dataBlockWords, ...resultBlockWords];
  }

  puzzleArray.sort((itemA, itemB) => {
    const orderA = Number(itemA.classList[1].slice(-1));
    const orderB = Number(itemB.classList[1].slice(-1));
    return orderA - orderB;
  });

  const insertItemWithDelay = (index: number) => {
    if (index < puzzleArray.length) {
      const item = puzzleArray[index] as HTMLElement;
      item.classList.remove('placed');
      activeSentence?.append(item);
      addBackground();
      setTimeout(() => {
        insertItemWithDelay(index + 1);
      }, 200);
    } else {
      madeBtnDisabledOrChangeDisplay('.auto-complete-btn', true, true);
      madeBtnDisabledOrChangeDisplay('.check-btn', false, false);
      madeBtnDisabledOrChangeDisplay('.continue-btn', true, false);
    }
  };
  const string = dataFromResponse.rounds[roundCounter].words[wordCounter - 1].textExample;
  if (notKnow.includes('0')) notKnow = [];
  notKnow.push(string);
  insertItemWithDelay(0);
};

export default autoCompleteFunction;
