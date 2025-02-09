import { listOfElements } from './../types/types';
import { levelRoundBlock } from '../../pages/main/index';
import Tag from '../tags/tags';
import { htmlElOrNull } from '../types/types';
import { getLevelsRoundsComplFromLS, getRSSPuzzleFromLS, levelsRoundsCompleteness } from './getFromLocalStorage';
import { ResponseData } from './interfaces/ResponseData';
import { onDropdown, selectedOption } from './onDropdown';
import { turnOnGameChanger } from './renderTasks';

export let dataFromResponse: ResponseData;
export let levelIndex: number = localStorage['rss-puzzle'] ? getRSSPuzzleFromLS().nextLevelAfterPassed : 1;
export let roundIndex: number = localStorage['rss-puzzle'] ? getRSSPuzzleFromLS().nextRoundAfterPassed : 0;
export let roundsNumber: number = localStorage['rss-puzzle'] ? getRSSPuzzleFromLS().completed[levelIndex][0] : 45;

export const createSelectedList = (n: number, kind: string) => {
  const dropdown = new Tag('div', `dropdown dropdown-${kind}`).createElem();
  const dropdownToggle = new Tag('div', `dropdown-toggle dropdown-toggle-${kind}`).createElem();
  dropdown.append(dropdownToggle);
  const select = new Tag('ul', `dropdown-menu dropdown-select-${kind}`).createElem();
  dropdown.append(select);
  for (let i = 1; i <= n; i += 1) {
    const option = new Tag('li', 'dropdown-option').createElem();
    option.innerHTML = `${kind} ${i}`;
    dropdownToggle.innerHTML = `${kind} ${1}`;
    select.append(option);
    if (i === 1) option.classList.add('active-l-r');
    if (levelsRoundsCompleteness) {
      const levelCompleteness = getLevelsRoundsComplFromLS()[i];
      const roundCompleteness = levelsRoundsCompleteness[levelIndex as number][i];
      if (kind === 'Level') {
        dropdownToggle.innerHTML = `${kind} ${levelIndex || 1}`;
        if (levelCompleteness[0] === true) {
          option.classList.add('completed-option');
        }
        option.classList.remove('active-l-r');
        if (i === getRSSPuzzleFromLS().nextLevelAfterPassed) option.classList.add('active-l-r');
      }
      if (kind === 'Round') {
        dropdownToggle.innerHTML = `${kind} ${roundIndex + 1 || 0}`;
        if (roundCompleteness === true) {
          option.classList.add('completed-option');
        }
        option.classList.remove('active-l-r');
        if (i === getRSSPuzzleFromLS().nextRoundAfterPassed + 1) option.classList.add('active-l-r');
      }
    }
  }
  return dropdown;
};

export const roundFormChangeHandler = (flag?: boolean) => {
  onDropdown('.dropdown-toggle-Round', '.dropdown-select-Round');
  const roundSelect: HTMLSelectElement | null = document.querySelector('.dropdown-select-Round');
  roundSelect?.addEventListener('click', async () => {
    const roundOptions = roundSelect?.querySelectorAll('.dropdown-option');
    roundOptions?.forEach((option, ind) => {
      option.classList.remove('active-l-r');
      if (flag && ind === 0) {
        roundIndex = 0;
        option.classList.add('active-l-r');
      } else if (option === selectedOption) {
        roundIndex = ind;
        option.classList.add('active-l-r');
      }
    });
    const dataBlock: htmlElOrNull = document.querySelector('.data-block');
    if (dataBlock) turnOnGameChanger(dataBlock, roundIndex);
  });
};

export const changeLevel = async (parent: htmlElOrNull, levelOptions: listOfElements, flag?: boolean) => {
  levelOptions?.forEach((option, ind) => {
    option.classList.remove('active-l-r');
    if (flag && levelIndex === 6 && ind === 0) {
      levelIndex = 0;
      option.classList.add('active-l-r');
    }
    if (flag && ind === 0) {
      levelIndex = levelIndex + 1;
    }
    if (flag && ind + 1 === levelIndex) {
      option.classList.add('active-l-r');
    } else if (option === selectedOption) {
      levelIndex = ind + 1;
      option.classList.add('active-l-r');
    }
  });
  console.log('levelIndex from changeLevel', levelIndex);
  const response = await fetch(
    `https://raw.githubusercontent.com/MarinaYur/rss-puzzle-data/main/data/wordCollectionLevel${levelIndex}.json`
  );
  dataFromResponse = await response.json();
  parent?.lastElementChild?.remove();
  roundsNumber = getRSSPuzzleFromLS().completed[levelIndex][0];
  const roundForm = createSelectedList(roundsNumber, 'Round');
  parent?.append(roundForm);
  const dataBlock: HTMLElement | null = document.querySelector('.data-block');
  roundFormChangeHandler(true);
  roundIndex = 0;
  if (dataBlock) turnOnGameChanger(dataBlock, roundIndex);
};
export const levelFormChangeHandler = (parent: htmlElOrNull) => {
  onDropdown('.dropdown-toggle-Level', '.dropdown-select-Level');
  const select: HTMLSelectElement | null = document.querySelector('.dropdown-select-Level');
  select?.addEventListener('click', async () => {
    const levelOptions: listOfElements = select?.querySelectorAll('.dropdown-option');
    changeLevel(parent, levelOptions);
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
  roundFormChangeHandler();
};

export const moveToNextLevel = (level: number) => {
  if (level && levelIndex) levelIndex += level;
  levelFormChangeHandler(levelRoundBlock);
};
