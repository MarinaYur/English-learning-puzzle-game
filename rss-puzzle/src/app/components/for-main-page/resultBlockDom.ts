import Tag from '../tags/tags';
import { htmlElOrNull } from '../types/types';

const resultBlockDom = (parent: htmlElOrNull) => {
  for (let i = 1; i <= 10; i += 1) {
    const sentence = new Tag('div', `sentence sentence-${i}`).createElem();
    if (parent) parent.append(sentence);
  }
};

export default resultBlockDom;
