const madeBtnDisabledOrChangeDisplay = (className: string, display: boolean, disable: boolean): void => {
  const btn = document.querySelector(className) as HTMLElement;
  disable ? btn?.setAttribute('disabled', 'disabled') : btn?.removeAttribute('disabled');
  display ? btn.style.display = 'block' : btn.style.display = 'none';
}

export default madeBtnDisabledOrChangeDisplay;