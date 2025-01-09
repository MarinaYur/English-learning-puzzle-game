import Tag from './tags/tags';

const logOut = () => {
  const logOutField = new Tag('div', 'out-field').createElem();
  const logOut = new Tag('div', 'out').createElem();
  logOutField.append(logOut);
  const logOutSpan = new Tag('span', 'log-out', 'log-out').createElem();
  logOut.append(logOutSpan);
  const logOutPic = new Tag('div', 'out-pic').createElem();
  logOut.append(logOutPic);
  return logOutField;
};

export default logOut;

export const addLogOutBlock = (block: HTMLElement) => {
  block.append(logOut());
};