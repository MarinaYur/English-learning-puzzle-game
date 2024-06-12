import { background } from "./renderTasks";



export const addBackground = () => {
  const puzzlePeaces = document.querySelectorAll('.puzzle-peace');
  const puzzlePeaceProtrusions = document.querySelectorAll('.puzzle-peace-protrusion');

  puzzlePeaces.forEach((item) => (item as HTMLElement).style.backgroundImage = `url(${background})`);
  puzzlePeaceProtrusions.forEach((item) => (item as HTMLElement).style.backgroundImage = `url(${background})`);
};

export const removeBackground = () => {
  const puzzlePeaces = document.querySelectorAll('.puzzle-peace');
  const puzzlePeaceProtrusions = document.querySelectorAll('.puzzle-peace-protrusion');

  puzzlePeaces.forEach((item) => {
    if (!item.parentElement?.classList.contains('disabled-div')) {
      (item as HTMLElement).style.backgroundImage = 'none';
    }
  });
  puzzlePeaceProtrusions.forEach((item) => {
    if (!item.parentElement?.parentElement?.classList.contains('disabled-div')) {
    (item as HTMLElement).style.backgroundImage = 'none'
  }
  });
}