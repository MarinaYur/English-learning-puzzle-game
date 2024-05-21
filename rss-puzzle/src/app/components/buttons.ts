import Tag from './tags/tags';

import './styles.css';
import App from '../app';
import MainPage from '../pages/main/index';

const createStartBtn = (container: HTMLElement) => {
  const startBtn = new Tag('button', 'btn start-btn', 'Start Game').createElem();
  container.append(startBtn);
  startBtn.onclick = () => {
    App.renderNewPage('MainPage');
  }
};
export default createStartBtn;
