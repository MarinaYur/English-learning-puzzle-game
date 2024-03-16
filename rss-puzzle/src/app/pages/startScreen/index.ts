import Page from '../../components/core/templates/page';
import logOut from '../../components/logout';
import Tag from '../../components/tags/tags';

import './styles.css';

export default class StartScreen extends Page {
  createContent() {
    const startContainer = new Tag('main', 'start-container', '', '', false, '', 'StartContainer').createElem();
    this.container.append(startContainer);
    const backgroundOpacity = new Tag('div', 'opacity').createElem();
    startContainer.append(backgroundOpacity);
    backgroundOpacity.append(logOut());
    const greeting = new Tag('h2', 'start-screen-greeting').createElem();
    backgroundOpacity.append(greeting);
    greeting.innerHTML = this.renderGreeting();
    const pageTitle = new Tag('h1', 'start-screen-title', 'Puzzle Game').createElem();
    backgroundOpacity.append(pageTitle);
    const descriptionContent = `To assemble 10 rows of the puzzle. 1 row corresponds to 1 sentence
    translated from Russian into English. By dragging the puzzle pieces to their places,
     you make a sentence. After 10 correctly composed rows of the puzzle, the enigmatic
     picture is revealed.`;
    const description = new Tag('div', 'start-description', `${descriptionContent}`).createElem();
    backgroundOpacity.append(description);
  }

  renderGreeting() {
    const user = JSON.parse(localStorage.getItem('rss-puzle') as string);
    const greeting: string = `Welcome <span>${user.firstName} ${user.surName}</span> to the`;
    return greeting;
  }

  render() {
    this.createContent();
    return this.container;
  }
}
