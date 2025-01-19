import { levelIndex } from './fillingLevelRoundBlock';

export const levelSelect = document.querySelector('.dropdown-select-Level');
export const levels = levelSelect?.querySelectorAll('.dropdown-option');

export const checkIfAllRoundsAreCompleted = (rounds: NodeListOf<Element>) => {
  let roundsCompletedTrue = 1;
  const level = document.querySelector('active-level');
  rounds.forEach((round) => {
    if (!round.classList.contains('completed-option')) {
      roundsCompletedTrue = 0;
    }
  });
  if (roundsCompletedTrue === 1) {
    level?.classList.add('completed-option');
    level?.classList.remove('active-level');
    if (levels) levels[levelIndex as number].classList.add('active-level');
  }
};
