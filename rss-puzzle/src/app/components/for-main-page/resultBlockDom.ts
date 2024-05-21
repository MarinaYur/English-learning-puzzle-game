import Tag from "../tags/tags";

// import './styles.css'
const resultBlockDom = (parent: HTMLElement) => {
  for (let i = 1; i <= 10; i +=1) {
    const sentence = new Tag ('div', `sentence sentence-${i}`).createElem();
    parent.append(sentence);
  }
}

export default resultBlockDom;