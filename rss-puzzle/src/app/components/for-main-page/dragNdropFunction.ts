const dragNdropFunction = (elem: HTMLElement, sentences: NodeListOf<Element>) => {
  let currentDroppable: Element | null = null;
  let elemBelow: Element | null = null;
  sentences.forEach((sentence, index) => {
    index === 0 || sentences[index - 1]?.classList.contains('.disabled-div') ? sentence.classList.add('droppable') : 1;
  });

  elem.onmousedown = (e: MouseEvent) => {
    let shiftX = e.clientX - elem.getBoundingClientRect().left;
    let shiftY = e.clientY - elem.getBoundingClientRect().top;

    elem.style.position = 'absolute';
    elem.style.zIndex = '1000';

    const moveAt = (pageX: number, pageY: number) => {
      elem.style.left = pageX - shiftX + 'px';
      elem.style.top = pageY - shiftY + 'px';
    };

    moveAt(e.pageX, e.pageY);

    function onMouseMove(e: MouseEvent) {
      moveAt(e.pageX, e.pageY);
      elem.hidden = true;
      elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      elem.hidden = false;
    }

    document.addEventListener('mousemove', onMouseMove);
    elem.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      elem.style.position = 'static';
      if (elemBelow?.classList.contains('droppable')) {
        elemBelow.append(elem);
      }
    };
  };
};

export default dragNdropFunction;
