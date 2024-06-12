import Tag from '../tags/tags';
import { addBackground, removeBackground } from './addRemoveBackground';

const toolsBlock = new Tag('div', 'tools-block').createElem();
const showTranslationHint = new Tag('div', 'hint chall-translation-hint').createElem();
export const pronunciationHint = new Tag(
  'div',
  'hint chall-pronunciation-hint chall-pronunciation-hint-invisible'
).createElem();
export const showPronunciationHintBtn = new Tag('div', 'hint chall-show-pronunciation-hint').createElem();
export const showBackgroundImage = new Tag('div', 'hint chall-show-background-image-hint').createElem();

showBackgroundImage.addEventListener('click', () => {
  if (!showBackgroundImage.classList.contains('chall-show-background-image-hint-on')) {
    showBackgroundImage.classList.add('chall-show-background-image-hint-on');
    addBackground();
  } else {
    showBackgroundImage.classList.remove('chall-show-background-image-hint-on');
    removeBackground();
  }
});

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
  toolsBlock.append(showBackgroundImage);
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

export default fillingChallengeBlock;
