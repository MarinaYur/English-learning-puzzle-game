import Tag from './tags/tags';

import './styles.css';

const createStartBtn = (container: HTMLElement) => {
  const startBtn = new Tag('button', 'btn start-btn', 'Start Game').createElem();
  container.append(startBtn);
};
export default createStartBtn;
