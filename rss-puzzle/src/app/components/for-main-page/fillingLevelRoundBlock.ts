// import { roundIndex } from './fillingLevelRoundBlock';
import { levelRoundBlock } from '../../pages/main/index';
import Tag from '../tags/tags';
import { htmlElOrNull } from '../types/types';
import { getLevelsRoundsComplFromLS, getRSSPuzzleFromLS, levelsRoundsCompleteness } from './getFromLocalStorage';
import { ResponseData } from './interfaces/ResponseData';
import { onDropdown, selectedOption } from './onDropdown';
import { roundsNumber, turnOnGameChanger } from './renderTasks';
import { saveNextLevelRoundAfterPassedInLS } from './saveInLicalStorage';

export let dataFromResponse: ResponseData;
export let levelIndex: number = localStorage['rss-puzzle'] ? getRSSPuzzleFromLS().nextLevelAfterPassed : 1;
export let roundIndex: number = localStorage['rss-puzzle'] ? getRSSPuzzleFromLS().nextRoundAfterPassed : 0;

export const createSelectedList = (n: number, kind: string) => {
  const dropdown = new Tag('div', `dropdown dropdown-${kind}`).createElem();
  const dropdownToggle = new Tag('div', `dropdown-toggle dropdown-toggle-${kind}`).createElem();
  dropdown.append(dropdownToggle);
  const select = new Tag('ul', `dropdown-menu dropdown-select-${kind}`).createElem();
  dropdown.append(select);
  for (let i = 1; i <= n; i++) {
    const option = new Tag('li', 'dropdown-option').createElem();
    option.innerHTML = `${kind} ${i}`;
    dropdownToggle.innerHTML = `${kind} ${1}`;
    select.append(option);
    i === 1 ? option.classList.add('active-l-r') : 1;
    if (levelsRoundsCompleteness) {
      const levelCompleteness = getLevelsRoundsComplFromLS()[i];
      const roundCompleteness = levelsRoundsCompleteness[levelIndex as number][i];
      if (kind === 'Level') {
        dropdownToggle.innerHTML = `${kind} ${levelIndex || 1}`;
        if (levelCompleteness[0] === true) {
          option.classList.add('completed-option');
          // levelIndex = localStorage['rss-puzzle'] ? getRSSPuzzleFromLS().nextLevelAfterPassed : 1
        }
        option.classList.remove('active-l-r');
        i === getRSSPuzzleFromLS().nextLevelAfterPassed ? option.classList.add('active-l-r') : 1;
        // console.log(getRSSPuzzleFromLS().nextLevelAfterPassed);
      }
      if (kind === 'Round') {
        dropdownToggle.innerHTML = `${kind} ${roundIndex + 1 || 0}`;
        if (roundCompleteness === true) {
          option.classList.add('completed-option');
        }
        //  roundIndex = localStorage['rss-puzzle'] ? getRSSPuzzleFromLS().nextLevelAfterPassed : 0;
        option.classList.remove('active-l-r');
        i === getRSSPuzzleFromLS().nextRoundAfterPassed + 1 ? option.classList.add('active-l-r') : 1;
      }
    }
  }
  return dropdown;
};

export const levelFormChangeHandler = (parent: htmlElOrNull) => {
  onDropdown('.dropdown-toggle-Level', '.dropdown-select-Level');
  const select: HTMLSelectElement | null = document.querySelector('.dropdown-select-Level');
  select?.addEventListener('click', async () => {
    const levelOptions = select?.querySelectorAll('.dropdown-option');
    levelOptions?.forEach((option, ind) => {
      option.classList.remove('active-l-r');
      if (option === selectedOption) {
        levelIndex = ind + 1;
        option.classList.add('active-l-r');
      }
      // saveNextLevelRoundAfterPassedInLS();
    });

    const response = await fetch(
      `https://raw.githubusercontent.com/MarinaYur/rss-puzzle-data/main/data/wordCollectionLevel${levelIndex}.json`
    );
    dataFromResponse = await response.json();
    const roundsNumberfromFilling = dataFromResponse.roundsCount;
    parent?.lastElementChild?.remove();
    const roundForm = createSelectedList(roundsNumberfromFilling, 'Round');
    parent?.append(roundForm);
    const dataBlock: HTMLElement | null = document.querySelector('.data-block');
    roundFormChangeHandler(parent);
    if (dataBlock) turnOnGameChanger(dataBlock, roundIndex);
  });
};

export const roundFormChangeHandler = (parent: htmlElOrNull) => {
  onDropdown('.dropdown-toggle-Round', '.dropdown-select-Round');
  const roundSelect: HTMLSelectElement | null = document.querySelector('.dropdown-select-Round');
  roundSelect?.addEventListener('click', async () => {
    const roundOptions = roundSelect?.querySelectorAll('.dropdown-option');
    roundOptions?.forEach((option, ind) => {
      option.classList.remove('active-l-r');
      if (option === selectedOption) {
        roundIndex = ind;
        option.classList.add('active-l-r');
      }
      // saveNextLevelRoundAfterPassedInLS(roundIndex);
    });
    const dataBlock: HTMLElement | null = document.querySelector('.data-block');
    // console.log('roundIndex', roundSelect?.selectedIndex);
    if (dataBlock) turnOnGameChanger(dataBlock, roundIndex);
  });
};

export const fillingLevelRoundBlock = async (parent: htmlElOrNull, level?: number) => {
  if (level && levelIndex) levelIndex += 1;
  const response = await fetch(
    `https://raw.githubusercontent.com/MarinaYur/rss-puzzle-data/main/data/wordCollectionLevel${levelIndex}.json`
  );
  dataFromResponse = await response.json();
  const levelForm = createSelectedList(6, 'Level');
  parent?.append(levelForm);
  const roundForm = createSelectedList(roundsNumber, 'Round');
  parent?.append(roundForm);
  levelFormChangeHandler(parent);
  roundFormChangeHandler(parent);
};

export const moveToNextLevel = (level: number) => {
  if (level && levelIndex) levelIndex += level;
  // const levelRoundBlock = document.querySelector('.level-round');
  levelFormChangeHandler(levelRoundBlock);
  // roundFormChangeHandler(levelRoundBlock);
};
