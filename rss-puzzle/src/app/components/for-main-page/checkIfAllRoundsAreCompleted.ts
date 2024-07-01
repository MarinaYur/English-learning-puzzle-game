export const checkIfAllRoundsAreCompleted = (rounds: NodeListOf<Element>) => {
  const level = document.querySelector('active-level')
  rounds.forEach((round) => {
    if (round.classList.contains('round-selected-option')) {
      level?.classList.add('round-selected-option');
    }
  });
};