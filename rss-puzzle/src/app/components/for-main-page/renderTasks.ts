import Tag from '../tags/tags';

export const createPuzzlesPieces = (parent: HTMLElement, text: string, length: number, id: number) => {
  const puzzlePeace = new Tag('div', 'puzzle-peace').createElem();
  parent.append(puzzlePeace);
  const parentWidth = parent.offsetWidth;
  const width = (text.length / length) * parentWidth;
  puzzlePeace.style.width = `${width}px`;
  const p = new Tag('p', 'puzzle-word').createElem();
  p.innerHTML = text;
  puzzlePeace.append(p);

  puzzlePeace?.addEventListener('click', () => {
    const sentences = document.querySelectorAll('.sentence');
    console.log(puzzlePeace.parentElement);
    if (puzzlePeace.parentElement?.classList.contains('data-block')) {
    sentences.forEach((sentence, index) => {
      if (index + 1 === id) {
        // puzzlePeace.className = 'puzzle-peace-result';
        sentence.append(puzzlePeace);
      }
    });
  } else {
    parent.append(puzzlePeace);
  }
  });
};

const renderTasks = async (challengeBlock: HTMLElement, dataBlock: HTMLElement, id: number) => {
  const response = await fetch(
    ' https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel1.json'
  );
  const data = await response.json();
  const textExampleTranslate = data.rounds[0].words[id - 1].textExampleTranslate;
  const textExample = data.rounds[0].words[id - 1].textExample;
  challengeBlock.innerHTML = textExampleTranslate;
  const numberOfTaskLetters = textExample.split(' ').join('').length;
  const randomTextExample = textExample.split(' ');
  randomTextExample.sort(() => Math.random() - 0.5);
  randomTextExample.forEach((item: string) => createPuzzlesPieces(dataBlock, item, numberOfTaskLetters, id));
};

export default renderTasks;
