import deletePuzzlePeaceHighlight from './deletePuzzlePeaceHighlight';
import madeBtnDisabledOrChangeDisplay from './madeBtnDisabledOrChangeDisplay';

const checkPuzzlesOrder = () => {
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
    if (counterRights === activePuzzlePeacesLength) {
      activePuzzlePeaces.forEach((el) => {
        el.classList.remove('placed');
      });
      madeBtnDisabledOrChangeDisplay('.auto-complete-btn', true, true);
      continueBtn?.removeAttribute('disabled');
      continueBtn.style.display = 'block';
      if (item.parentElement) item.parentElement.classList.add('disabled-div');
      checkBtn.style.display = 'none';
      const challHint = document.querySelector('.challenge-hint');
      challHint?.classList.remove('challenge-hint-invisible');
    }
  });
  deletePuzzlePeaceHighlight();
};

export default checkPuzzlesOrder;
