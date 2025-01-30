import { listOfElements } from '../types/types';
import { background } from './renderTasks';

const makeBackgroundImageNone = (item: HTMLElement) => {
  const el = item;
  if (!el.parentElement?.classList.contains('disabled-div')) {
    el.style.backgroundImage = 'none';
  }
};

const setBackground = (item: HTMLElement) => {
  const el = item;
  el.style.backgroundImage = `url(${background})`;
};

export const addBackground = () => {
  const puzzlePeaces: listOfElements = document.querySelectorAll('.puzzle-peace');
  const puzzlePeaceProtrusions: listOfElements = document.querySelectorAll('.puzzle-peace-protrusion');
  puzzlePeaces.forEach(setBackground);
  puzzlePeaceProtrusions.forEach(setBackground);
};

export const removeBackground = () => {
  const puzzlePeaces: listOfElements = document.querySelectorAll('.puzzle-peace');
  const puzzlePeaceProtrusions: listOfElements = document.querySelectorAll('.puzzle-peace-protrusion');
  puzzlePeaces.forEach(makeBackgroundImageNone);
  puzzlePeaceProtrusions.forEach(makeBackgroundImageNone);
};
