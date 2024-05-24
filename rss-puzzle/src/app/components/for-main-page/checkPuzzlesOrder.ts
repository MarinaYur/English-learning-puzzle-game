import renderTasks from './renderTasks';

const checkPuzzlesOrder = () => {
  const resultBlock = document.querySelector('.result-block') as HTMLElement;
  let counterRights = 0;
  const activePuzzlePeaces = document.querySelectorAll('.placed');
  const activePuzzlePeacesLength = activePuzzlePeaces.length;
  const continueBtn = document.querySelector('.continue-btn');
  activePuzzlePeaces.forEach((item, index) => {
    const order = Number(item.classList[1].at(-1));
    if (order === index) {
      item.classList.add('right');
      counterRights += 1;
    }
    if (counterRights === activePuzzlePeacesLength) {
      activePuzzlePeaces.forEach((item, index) => {
        item.classList.remove('placed');
      });
      continueBtn?.removeAttribute('disabled');
      item.parentElement ? item.parentElement.classList.add('disabled-div') : 1;
    }
  });
};

export default checkPuzzlesOrder;
