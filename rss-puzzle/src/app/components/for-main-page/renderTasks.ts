import Tag from '../tags/tags';
import checkPuzzlesOrder from './checkPuzzlesOrder';
import deletePuzzlePeaceHighlight from './deletePuzzlePeaceHighlight';
import resultBlockDom from './resultBlockDom';

export const createPuzzlesPieces = (parent: HTMLElement, text: [string, number], length: number, id: number) => {
  const puzzlePeace = new Tag('div', `puzzle-peace order-${text[1]}`).createElem();
  parent.append(puzzlePeace);
  const checkBtn = document.querySelector('.check-btn') as HTMLElement;
  const parentWidth = parent.offsetWidth;
  const width = (text[0].length / length) * parentWidth;
  puzzlePeace.style.width = `${width}px`;
  const p = new Tag('p', 'puzzle-word').createElem();
  p.innerHTML = text[0];
  puzzlePeace.append(p);
  const sentences = document.querySelectorAll('.sentence');
  puzzlePeace?.addEventListener('click', () => {
    puzzlePeace.classList.remove('correct-puzzle');
    puzzlePeace.classList.remove('incorrect-puzzle');
    if (puzzlePeace.parentElement?.classList.contains('data-block')) {
      sentences.forEach((sentence, index) => {
        if (index === id) {
          sentence.append(puzzlePeace);
          puzzlePeace.classList.add('placed');
        }
      });
    } else {
      parent.append(puzzlePeace);
      puzzlePeace.classList.remove('right');
      checkBtn.setAttribute('disabled', 'disabled');
    }

    if (parent.childNodes.length === 0) {
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
  if (roundCounter < 45) {
    if (wordCounter < 10) {
      const textExampleTranslate = data.rounds[roundCounter].words[wordCounter].textExampleTranslate;
      const textExample = data.rounds[roundCounter].words[wordCounter].textExample;
      challengeBlock.innerHTML = textExampleTranslate;
      const numberOfTaskLetters = textExample.split(' ').join('').length;
      const randomTextExample = textExample.split(' ').map((item: string, ind: number) => [item, ind]);
      randomTextExample.sort(() => Math.random() - 0.5);
      randomTextExample.forEach((item: [string, number]) =>
        createPuzzlesPieces(dataBlock, item, numberOfTaskLetters, wordCounter)
      );
      console.log('DO wordCounter = 10', wordCounter);
      wordCounter += 1;
    } else {
      if (wordCounter >= 10) {
        console.log('wordCounter = 10', wordCounter);
        wordCounter = 0;
        console.log('wordCounter = 0', wordCounter);
        roundCounter += 1;
        console.log('roundCounter = +1', roundCounter);
        challengeBlock.innerHTML = '';
        dataBlock.innerHTML = '';
        resultBlock.innerHTML = '';
        resultBlockDom(resultBlock);
        renderTasks(challengeBlock, dataBlock);
      }
    }
  }
};

export default renderTasks;
