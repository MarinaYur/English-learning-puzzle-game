const deletePuzzlePeaceHighlight = () => {
  const resultBlock = document.querySelector('.result-block') as HTMLElement;
  resultBlock.addEventListener('click', (e: MouseEvent) => {
    const correctPuzzles = resultBlock.querySelectorAll('.placed');
    correctPuzzles.forEach((item) => {
      item.classList.remove('correct-puzzle');
      item.classList.remove('incorrect-puzzle');
    });
  });
};

export default deletePuzzlePeaceHighlight;
