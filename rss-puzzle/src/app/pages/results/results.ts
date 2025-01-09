import { showPictureInfo } from "../../components/buttons";
import Page from "../../components/core/templates/page";
import { roundIndex } from "../../components/for-main-page/fillingLevelRoundBlock";
import { addLogOutBlock } from "../../components/logout";
import Tag from "../../components/tags/tags";
import './styles.css';

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
    showPictureInfo(roundIndex + 1, image, infoBlock);
    const ul = new Tag('ul', '').createElem();
    resultsTable.append(ul);
    const li1NotKnow = new Tag('li', '').createElem();
    const pNotKnow = new Tag('p', '', 'You do not know').createElem();
    li1NotKnow.append(pNotKnow);
    const ul1 = new Tag('ul', '').createElem();
    li1NotKnow.append(ul1);
    const li2Know = new Tag('li', '').createElem();
    const pKnow = new Tag('p', '', 'You know').createElem();
    li2Know.append(pKnow);
    const ul2 = new Tag('ul', '').createElem();
    li2Know.append(ul2);
    ul.append(li1NotKnow);
    ul.append(li2Know);
  }
  render() {
    this.createContent();
    return this.container;
  }
}