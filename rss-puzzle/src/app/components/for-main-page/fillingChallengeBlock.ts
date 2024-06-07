import Tag from '../tags/tags';

const showTranslationHint = new Tag('div', 'hint chall-translation-hint').createElem();
export const pronunciationHint = new Tag('div', 'hint chall-pronunciation-hint').createElem();

const fillingChallengeBlock = (parent: HTMLElement, hint: HTMLElement | null) => {
  parent.prepend(pronunciationHint);
  parent.append(showTranslationHint);
  showTranslationHint.addEventListener('click', () => {
    const challHint = document.querySelector('.challenge-hint');
    if (challHint?.classList.contains('challenge-hint-invisible')) {
      challHint?.classList.remove('challenge-hint-invisible');
      showTranslationHint.classList.add('chall-show-hint');
    } else {
      challHint?.classList.add('challenge-hint-invisible');
      showTranslationHint.classList.remove('chall-show-hint');
    }
  });
};
export let pronunciation = new Audio();

export function playPronunciation() {
  pronunciationHint.classList.add('chall-pronunciation-hint-on');
  pronunciation.play();
  let duration = pronunciation.duration;
  pronunciation.addEventListener('ended', () => {
    pronunciationHint.classList.remove('chall-pronunciation-hint-on');
  })
}
export const hearTranslation = (audio: {}) => {
  pronunciation.src = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/' + audio;
  pronunciationHint.addEventListener('click', playPronunciation);

};

export default fillingChallengeBlock;
