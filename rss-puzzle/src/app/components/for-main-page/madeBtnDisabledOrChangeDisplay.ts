const madeBtnDisabledOrChangeDisplay = (clName: string, displ: boolean, disable: boolean): void => {
  const btn = document.querySelector(clName) as HTMLElement;
  if (disable) {
    btn?.setAttribute('disabled', 'disabled');
  } else {
    btn?.removeAttribute('disabled');
  }
  if (displ) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
};

export default madeBtnDisabledOrChangeDisplay;
