import { notKnow } from '../../components/for-main-page/autoComplete';
import { addContinueBtnOnResultPage, know, showPictureInfo } from '../../components/buttons';
import Page from '../../components/core/templates/page';
import { addLogOutBlock } from '../../components/logout';
import Tag from '../../components/tags/tags';
import './styles.css';
import { showPronunciationHintBtn } from '../../components/for-main-page/fillingChallengeBlock';

export default class ResultsPage extends Page {
  async createContent() {
    addLogOutBlock(this.container);
    const resultsContainer = new Tag('div', 'results-container', '', '', false, '', 'ResultsPage').createElem();
    this.container.append(resultsContainer);
    const pictureBlock = new Tag('div', 'picture-block').createElem();
    resultsContainer.append(pictureBlock);
    const image = new Tag('div', 'results-block-image').createElem();
    pictureBlock.append(image);
    const infoBlock = new Tag('div', 'results-block-info').createElem();
    pictureBlock.append(infoBlock);
    const resultsTable = new Tag('div', 'results-table').createElem();
    resultsContainer.append(resultsTable);
    showPictureInfo(image, infoBlock);
    const ul = new Tag('ul', '').createElem();
    resultsTable.append(ul);

    const ul1 = new Tag('ul', 'ul1').createElem();
    const ul2 = new Tag('ul', 'ul2').createElem();

    const li2NotKnow = new Tag('li', '').createElem();
    const pKnow = new Tag('p', '', 'You know').createElem();
    const pNotKnow = new Tag('p', '', 'You do not know').createElem();
    const li1Know = new Tag('li', '').createElem();
    li1Know.append(pKnow);
    li2NotKnow.append(pNotKnow);
    li2NotKnow.append(ul2);
    li1Know.append(ul1);
    ul.append(li1Know);
    ul.append(li2NotKnow);
    for (let i = 0; i < notKnow.length; i += 1) {
      const li = new Tag('li', '').createElem();
      ul2.append(li);
      if (notKnow[i] !== '0') li.innerHTML = `- ${notKnow[i]}`;
    }
    for (let i = 0; i < know.length; i += 1) {
      const li = new Tag('li', '').createElem();
      ul1.append(li);
      li.innerHTML = `+ ${know[i]}`;
    }
    addContinueBtnOnResultPage(resultsContainer);
    console.log('from result', notKnow);
  }

  render() {
    this.createContent();
    return this.container;
  }
}
