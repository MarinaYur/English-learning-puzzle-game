import Tag from '../tags/tags';
import checkPuzzlesOrder from './checkPuzzlesOrder';
import resultBlockDom from './resultBlockDom';

export const createPuzzlesPieces = (parent: HTMLElement, text: [string, number], length: number, id: number) => {
  const puzzlePeace = new Tag('div', `puzzle-peace order-${text[1]}`).createElem();
  parent.append(puzzlePeace);
  const parentWidth = parent.offsetWidth;
  const width = (text[0].length / length) * parentWidth;
  puzzlePeace.style.width = `${width}px`;
  const p = new Tag('p', 'puzzle-word').createElem();
  p.innerHTML = text[0];
  puzzlePeace.append(p);
  const sentences = document.querySelectorAll('.sentence');
  puzzlePeace?.addEventListener('click', () => {
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
    }
    if (parent.childNodes.length === 0) {
      checkPuzzlesOrder();
    }
  });
};

export let roundCounter = 0;
export let wordCounter = 0;

const renderTasks = async (challengeBlock: HTMLElement, dataBlock: HTMLElement) => {
  const resultBlock = document.querySelector('.result-block') as HTMLElement;

  const response = await fetch(
    ' https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json'
  );
  const data = await response.json();
  console.log('data.roundsCount', data.roundsCount);
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
      wordCounter += 1;
      console.log('wordCounter: ', wordCounter, 'roundCounter', roundCounter);
    } else {
      if ((wordCounter = 10)) {
        console.log('wordCounter = 10', wordCounter);
        wordCounter = 0;
        roundCounter += 1;
        console.log('wordCounter >= 10', wordCounter, 'roundCounter', roundCounter);
        challengeBlock.innerHTML = '';
        dataBlock.innerHTML = '';
        resultBlock.innerHTML = '';
        resultBlockDom(resultBlock);
      }
    }
  }
};

export default renderTasks;
