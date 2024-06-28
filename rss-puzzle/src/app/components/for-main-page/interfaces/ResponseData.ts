interface LevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

interface Word {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

interface Round {
  levelData: LevelData;
  words: Word[];
}

export interface ResponseData {
  rounds: Round[];
  roundsCount: number;
}