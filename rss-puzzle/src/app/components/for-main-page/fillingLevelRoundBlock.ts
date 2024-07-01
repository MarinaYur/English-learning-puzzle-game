// import { roundIndex } from './fillingLevelRoundBlock';
import Tag from '../tags/tags';
import { htmlElOrNull } from '../types/types';
import { ResponseData } from './interfaces/ResponseData';
import { makeResponse } from './makeResponse';
import { onDropdown, selectedOption } from './onDropdown';
import renderTasks, { roundsNumber, turnOnGameChanger } from './renderTasks';

export let dataFromResponse: ResponseData;
export let levelIndex: number | undefined = 1;
export let roundIndex: number | undefined = 0;

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
  }
  return dropdown;
};

export const levelFormChangeHandler = (parent: htmlElOrNull) => {
  onDropdown('.dropdown-toggle-Level', '.dropdown-select-Level');
  const select: HTMLSelectElement | null = document.querySelector('.dropdown-select-Level');
  select?.addEventListener('click', async function () {
    const levelOptions = select?.querySelectorAll('.dropdown-option');
    levelOptions?.forEach((option, ind) => {
      console.log('selectedOptionFromFilling', selectedOption);
      if (option === selectedOption) levelIndex = ind + 1;
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
    if (dataBlock) turnOnGameChanger(dataBlock, -1);
  });
};

export const roundFormChangeHandler = (parent: htmlElOrNull) => {
  onDropdown('.dropdown-toggle-Round', '.dropdown-select-Round');
  const roundSelect: HTMLSelectElement | null = document.querySelector('.dropdown-select-Round');
  roundSelect?.addEventListener('click', async function () {
    const roundOptions = roundSelect?.querySelectorAll('.dropdown-option');
    roundOptions?.forEach((option, ind) => {
      if (option === selectedOption) roundIndex = ind;
    });
    const dataBlock: HTMLElement | null = document.querySelector('.data-block');
    console.log('roundIndex', roundSelect?.selectedIndex);
    if (dataBlock) turnOnGameChanger(dataBlock, roundIndex);
  });
};

export const fillingLevelRoundBlock = async (parent: htmlElOrNull) => {
  const response = await fetch(
    `https://raw.githubusercontent.com/MarinaYur/rss-puzzle-data/main/data/wordCollectionLevel${levelIndex}.json`
  );
  dataFromResponse = await response.json();
  const levelForm = createSelectedList(6, 'Level');
  parent?.append(levelForm);
  let roundForm = createSelectedList(roundsNumber, 'Round');
  parent?.append(roundForm);
  levelFormChangeHandler(parent);
  roundFormChangeHandler(parent);
};
