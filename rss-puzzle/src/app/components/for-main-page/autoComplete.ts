import madeBtnDisabledOrChangeDisplay from './madeBtnDisabledOrChangeDisplay';

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
    const orderA = Number(itemA.classList[2].slice(-1));
    const orderB = Number(itemB.classList[2].slice(-1));
    return orderA - orderB;
  });

  const insertItemWithDelay = (index: number) => {
    if (index < puzzleArray.length) {
      const item = puzzleArray[index] as HTMLElement;
      item.classList.remove('placed');
      activeSentence?.append(item);
      setTimeout(() => {
        insertItemWithDelay(index + 1);
      }, 200);
    } else {
      madeBtnDisabledOrChangeDisplay('.auto-complete-btn', true, true);
      madeBtnDisabledOrChangeDisplay('.check-btn', false, false);
      madeBtnDisabledOrChangeDisplay('.continue-btn', true, false);
    }
  };

  insertItemWithDelay(0);

  console.log(puzzleArray);
};

export default autoCompleteFunction;
