import Tag from './tags/tags';

const logOut = () => {
  const logOutField = new Tag('div', 'out-field').createElem();
  const logOutEL = new Tag('div', 'out').createElem();
  logOutField.append(logOutEL);
  const logOutSpan = new Tag('span', 'log-out', 'log-out').createElem();
  logOutEL.append(logOutSpan);
  const logOutPic = new Tag('div', 'out-pic').createElem();
  logOutEL.append(logOutPic);
  return logOutField;
};

export default logOut;

export const addLogOutBlock = (block: HTMLElement) => {
  block.append(logOut());
};
