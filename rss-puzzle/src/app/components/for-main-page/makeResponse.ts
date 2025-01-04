import { levelIndex } from './fillingLevelRoundBlock';

export const makeResponse = async () => {
  const response = await fetch(
    `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${levelIndex}.json`
  );
  const data = await response.json();
  return data;
};
