import { htmlElOrNull } from '../types/types';

export const getRSSPuzzleFromLS = () => {
  return JSON.parse(localStorage['rss-puzzle']);
};

export const getLevelsRoundsComplFromLS = () => {
  if (localStorage['rss-puzzle']) return JSON.parse(localStorage['rss-puzzle']).completed;
  // else console.log("No RSS");
};

export const levelsRoundsCompleteness = getLevelsRoundsComplFromLS();

export const getFromLocalStorage = () => {
  return JSON.parse(localStorage['rss-puzzle']).hints;
};

export const isShowAudio = (showPronunciationHintBtn: htmlElOrNull) => {
  if (localStorage.length !== 0 && localStorage.getItem('rss-puzzle') !== null)
    if (!getFromLocalStorage().isShowAudio)
      showPronunciationHintBtn?.classList.remove('chall-show-pronunciation-hint-active');
};

export const isShowTranslate = (showTranslationHint: htmlElOrNull) => {
  if (localStorage.length !== 0 && localStorage.getItem('rss-puzzle') !== null) {
    if (!getFromLocalStorage().isShowTranslate) showTranslationHint?.classList.remove('chall-show-hint');
  }
};

export const isShowImage = (showBackgroundImageBtn: htmlElOrNull) => {
  if (localStorage.length !== 0 && localStorage.getItem('rss-puzzle') !== null)
    if (!getFromLocalStorage().isShowImage)
      showBackgroundImageBtn?.classList.remove('chall-show-background-image-hint-on');
};

export const isShowTranslation = (challHint: htmlElOrNull) => {
  if (localStorage.length !== 0 && localStorage.getItem('rss-puzzle') !== null)
    if (!getFromLocalStorage().isShowTranslate) challHint?.classList.add('challenge-hint-invisible');
};

export const isPlayPronunciation = (pronunciationHint: htmlElOrNull) => {
  if (localStorage.length !== 0 && localStorage.getItem('rss-puzzle') !== null)
    if (!getFromLocalStorage().isShowAudio) pronunciationHint?.classList.add('chall-pronunciation-hint-invisible');
};
