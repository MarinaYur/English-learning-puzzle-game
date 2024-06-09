import Tag from '../tags/tags';

const toolsBlock = new Tag('div', 'tools-block').createElem();
const showTranslationHint = new Tag('div', 'hint chall-translation-hint').createElem();
export const pronunciationHint = new Tag('div', 'hint chall-pronunciation-hint chall-pronunciation-hint-invisible').createElem();
export const showPronunciationHintBtn = new Tag('div', 'hint chall-show-pronunciation-hint').createElem();

showPronunciationHintBtn.addEventListener('click', () => {
  if (!showPronunciationHintBtn.classList.contains('chall-show-pronunciation-hint-active')) {
    showPronunciationHintBtn.classList.add('chall-show-pronunciation-hint-active');
    pronunciationHint.classList.remove('chall-pronunciation-hint-invisible');
  } else {
    showPronunciationHintBtn.classList.remove('chall-show-pronunciation-hint-active');
    pronunciationHint.classList.add('chall-pronunciation-hint-invisible');
  }
});

const fillingChallengeBlock = (parent: HTMLElement, hint: HTMLElement | null) => {
  parent.prepend(pronunciationHint);
  parent.append(toolsBlock);
  toolsBlock.append(showPronunciationHintBtn);
  toolsBlock.append(showTranslationHint);
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
  pronunciation.addEventListener('ended', () => {
    pronunciationHint.classList.remove('chall-pronunciation-hint-on');
  });
}
export const hearTranslation = (audio: {}) => {
  pronunciation.src = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/' + audio;
  pronunciationHint.addEventListener('click', playPronunciation);
};

// export function switchShowPronunciationHintBtm () {
//   sho
// }

export default fillingChallengeBlock;
