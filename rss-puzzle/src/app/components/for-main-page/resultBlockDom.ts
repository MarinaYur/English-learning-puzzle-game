import Tag from "../tags/tags";

// import './styles.css'
const resultBlockDom = (parent: HTMLElement | null) => {
  for (let i = 1; i <= 10; i +=1) {
    const sentence = new Tag ('div', `sentence sentence-${i}`).createElem();
    (parent) ? parent.append(sentence) : 1;
  }
}

export default resultBlockDom;