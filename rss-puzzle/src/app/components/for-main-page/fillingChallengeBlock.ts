import Tag from '../tags/tags';
import { htmlElOrNull } from '../types/types';
import { addBackground, removeBackground } from './addRemoveBackground';
import { isPlayPronunciation, isShowAudio, isShowImage, isShowTranslate } from './getFromLocalStorage';
import { saveInLocalStorage } from './saveInLicalStorage';

const toolsBlock = new Tag('div', 'tools-block').createElem();
const showTranslationHint = new Tag('div', 'hint chall-translation-hint chall-show-hint').createElem();
export const pronunciationHint = new Tag('div', 'hint chall-pronunciation-hint').createElem();
export const showPronunciationHintBtn = new Tag(
  'div',
  'hint chall-show-pronunciation-hint chall-show-pronunciation-hint-active'
).createElem();
export const showBackgroundImageBtn = new Tag(
  'div',
  'hint chall-show-background-image-hint chall-show-background-image-hint-on'
).createElem();

isShowTranslate(showTranslationHint);
isPlayPronunciation(pronunciationHint);
isShowAudio(showPronunciationHintBtn);
isShowImage(showBackgroundImageBtn);

showBackgroundImageBtn.addEventListener('click', () => {
  if (!showBackgroundImageBtn.classList.contains('chall-show-background-image-hint-on')) {
    showBackgroundImageBtn.classList.add('chall-show-background-image-hint-on');
    addBackground();
    saveInLocalStorage(['', '', true]);
  } else {
    showBackgroundImageBtn.classList.remove('chall-show-background-image-hint-on');
    saveInLocalStorage(['', '', false]);
    removeBackground();
  }
});

showPronunciationHintBtn.addEventListener('click', () => {
  if (showPronunciationHintBtn.classList.contains('chall-show-pronunciation-hint-active')) {
    showPronunciationHintBtn.classList.remove('chall-show-pronunciation-hint-active');
    pronunciationHint.classList.add('chall-pronunciation-hint-invisible');
    saveInLocalStorage([false, '', '']);
  } else {
    showPronunciationHintBtn.classList.add('chall-show-pronunciation-hint-active');
    pronunciationHint.classList.remove('chall-pronunciation-hint-invisible');
    saveInLocalStorage([true, '', '']);
  }
});

const fillingChallengeBlock = (parent: HTMLElement, challHint: htmlElOrNull) => {
  parent.prepend(pronunciationHint);
  parent.append(toolsBlock);
  toolsBlock.append(showPronunciationHintBtn);
  toolsBlock.append(showTranslationHint);
  toolsBlock.append(showBackgroundImageBtn);
  showTranslationHint.addEventListener('click', () => {
    if (challHint?.classList.contains('challenge-hint-invisible')) {
      challHint?.classList.remove('challenge-hint-invisible');
      showTranslationHint.classList.add('chall-show-hint');
      saveInLocalStorage(['', true, '']);
    } else {
      challHint?.classList.add('challenge-hint-invisible');
      showTranslationHint.classList.remove('chall-show-hint');
      saveInLocalStorage(['', false, '']);
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
