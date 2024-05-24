import deletePuzzlePeaceHighlight from './deletePuzzlePeaceHighlight';
import renderTasks from './renderTasks';

const checkPuzzlesOrder = () => {
  const resultBlock = document.querySelector('.result-block') as HTMLElement;
  console.log(resultBlock);
  let counterRights = 0;
  const activePuzzlePeaces = document.querySelectorAll('.placed');
  const activePuzzlePeacesLength = activePuzzlePeaces.length;
  const continueBtn = document.querySelector('.continue-btn') as HTMLElement;
  activePuzzlePeaces.forEach((item, index) => {
    const order = Number(item.classList[1].at(-1));
    if (order === index) {
      item.classList.add('right');
      item.classList.add('correct-puzzle');
      counterRights += 1;
    } else {
      item.classList.add('incorrect-puzzle');
    }
    if (counterRights === activePuzzlePeacesLength) {
      activePuzzlePeaces.forEach((item) => {
        item.classList.remove('placed');
      });
      continueBtn?.removeAttribute('disabled');
      continueBtn.style.display = 'block';
      item.parentElement ? item.parentElement.classList.add('disabled-div') : 1;
    }
  });
  // resultBlock.addEventListener('click', (e: MouseEvent) => {
  //  const correctPuzzles = resultBlock.querySelectorAll('.correct-puzzle');
  //  correctPuzzles.forEach((item) => {
  //   item.classList.remove('correct-puzzle');
  //  })
  //  const incorrectPuzzles = resultBlock.querySelectorAll('.incorrect-puzzle');
  //  incorrectPuzzles.forEach((item) => {
  //   item.classList.remove('incorrect-puzzle');
  //  })
  // })

  deletePuzzlePeaceHighlight();
};

export default checkPuzzlesOrder;
