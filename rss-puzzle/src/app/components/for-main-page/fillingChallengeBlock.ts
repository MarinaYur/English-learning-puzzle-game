import Tag from "../tags/tags";

const fillingChallengeBlock = (parent: HTMLElement, hint: HTMLElement | null) => {
  const showHint = new Tag('div', 'chall-translation-hint').createElem();
  parent.append(showHint);
  showHint.addEventListener('click', () => {
    const challHint = document.querySelector('.challenge-hint');
    if (challHint?.classList.contains('challenge-hint-invisible')) {
      challHint?.classList.remove('challenge-hint-invisible');
      showHint.classList.add('chall-show-hint');
    } else {
      challHint?.classList.add('challenge-hint-invisible');
      showHint.classList.remove('chall-show-hint');
    }
  });
}

export default fillingChallengeBlock;