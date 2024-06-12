import deletePuzzlePeaceHighlight from './deletePuzzlePeaceHighlight';
import renderTasks from './renderTasks';

const checkPuzzlesOrder = () => {
  const resultBlock = document.querySelector('.result-block') as HTMLElement;
  let counterRights = 0;
  const activePuzzlePeaces = document.querySelectorAll('.placed');
  const activePuzzlePeacesLength = activePuzzlePeaces.length;
  const continueBtn = document.querySelector('.continue-btn') as HTMLElement;
  const checkBtn = document.querySelector('.check-btn') as HTMLElement;
  activePuzzlePeaces.forEach((item, index) => {
    const order = Number(item.classList[1].at(-1));
    if (order === index) {
      item.classList.add('right');
      item.classList.add('correct-puzzle');
      counterRights += 1;
    } else {
      item.classList.add('incorrect-puzzle');
    }
    console.log('counterRights', counterRights, 'activePuzzlePeacesLength', activePuzzlePeacesLength);
    if (counterRights === activePuzzlePeacesLength) {
      activePuzzlePeaces.forEach((item) => {
        item.classList.remove('placed');
      });
      continueBtn?.removeAttribute('disabled');
      continueBtn.style.display = 'block';
      item.parentElement ? item.parentElement.classList.add('disabled-div') : 1;
      checkBtn.style.display = 'none';
      const challHint = document.querySelector('.challenge-hint');
      challHint?.classList.remove('challenge-hint-invisible');
    }
  });

  deletePuzzlePeaceHighlight();
};

export default checkPuzzlesOrder;
