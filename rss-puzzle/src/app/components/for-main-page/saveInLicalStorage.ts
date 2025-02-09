import { levelIndex } from './fillingLevelRoundBlock';

export const saveInLocalStorage = (
  hintStatus: (boolean | '')[],
  userFirstName?: HTMLInputElement | null,
  userSurName?: HTMLInputElement | null
) => {
  const storedUserData = localStorage.getItem('rss-puzzle');
  const userData = storedUserData
    ? JSON.parse(storedUserData)
    : {
        firstName: userFirstName?.value,
        surName: userSurName?.value,
        hints: {
          isShowAudio: true,
          isShowTranslate: true,
          isShowImage: true
        },
        completed: {
          1: [45],
          2: [41],
          3: [40],
          4: [29],
          5: [29],
          6: [25]
        },
        nextLevelAfterPassed: 1,
        nextRoundAfterPassed: 0
      };

  const [audioHint, translateHint, imageHint] = hintStatus;

  if (audioHint !== '') userData.hints.isShowAudio = audioHint;
  if (translateHint !== '') userData.hints.isShowTranslate = translateHint;
  if (imageHint !== '') userData.hints.isShowImage = imageHint;
  localStorage.setItem('rss-puzzle', JSON.stringify(userData));
};

export const saveNextLevelRoundAfterPassedInLS = (prop?: number, level?: number) => {
  const puzzle = JSON.parse(localStorage['rss-puzzle']);
  if (level) puzzle.nextLevelAfterPassed = levelIndex;
  if (prop || prop === 0) puzzle.nextRoundAfterPassed = prop;
  localStorage.setItem('rss-puzzle', JSON.stringify(puzzle));
};
