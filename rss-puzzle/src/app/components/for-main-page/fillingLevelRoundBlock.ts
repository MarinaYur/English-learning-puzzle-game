// import { roundIndex } from './fillingLevelRoundBlock';
import Tag from '../tags/tags';
import { htmlElOrNull } from '../types/types';
import { ResponseData } from './interfaces/ResponseData';
import { makeResponse } from './makeResponse';
import renderTasks, { roundsNumber, turnOnGameChanger } from './renderTasks';

export let dataFromResponse: ResponseData;
export let levelIndex: number | undefined = 1;
export let roundIndex: number | undefined = 0;

export const createSelectedList = (n: number, kind: string) => {
  const form = new Tag('form', `form-${kind}`).createElem();
  const select = new Tag('select', `form-select form-select-${kind}`).createElem();
  const round = new Tag('div', 'round').createElem();
  form.append(select);
  for (let i = 1; i <= n; i++) {
    const option = new Tag('option', 'form-option').createElem();
    option.innerHTML = `${kind} ${i}`;
    select.append(option);
  }
  return form;
};

export const levelFormChangeHandler = (parent: htmlElOrNull, levelForm: htmlElOrNull) => {
  levelForm?.addEventListener('change', async function () {
    const select: HTMLSelectElement | null = document.querySelector('.form-select-Level');
    levelIndex = select?.selectedIndex ? select.selectedIndex + 1 : 1;
    const response = await fetch(
      `https://raw.githubusercontent.com/MarinaYur/rss-puzzle-data/main/data/wordCollectionLevel${levelIndex}.json`
    );
    dataFromResponse = await response.json();
    const roundsNumberfromFilling = dataFromResponse.roundsCount;
    parent?.lastElementChild?.remove();
    const roundForm = createSelectedList(roundsNumberfromFilling, 'Round');
    parent?.append(roundForm);
    const dataBlock: HTMLElement | null = document.querySelector('.data-block');
    roundFormChangeHandler(parent, roundForm);
    if (dataBlock) turnOnGameChanger(dataBlock, -1);
  });
};

export const roundFormChangeHandler = (parent: htmlElOrNull, roundForm: htmlElOrNull) => {
  roundForm?.addEventListener('change', async function () {
    const roundSelect: HTMLSelectElement | null = document.querySelector('.form-select-Round');
    if (roundSelect?.selectedIndex) roundIndex = roundSelect.selectedIndex;
    const dataBlock: HTMLElement | null = document.querySelector('.data-block');
    console.log('roundIndex', roundSelect?.selectedIndex);
    if (dataBlock) turnOnGameChanger(dataBlock, roundSelect?.selectedIndex);
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
  levelFormChangeHandler(parent, levelForm);
};
