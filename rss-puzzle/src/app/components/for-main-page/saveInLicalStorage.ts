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
        }
      };
  if (hintStatus[0] !== '') userData.hints.isShowAudio = hintStatus[0];
  if (hintStatus[1] !== '') userData.hints.isShowTranslate = hintStatus[1];
  if (hintStatus[2] !== '') userData.hints.isShowImage = hintStatus[2];
  localStorage.setItem('rss-puzzle', JSON.stringify(userData));
};
