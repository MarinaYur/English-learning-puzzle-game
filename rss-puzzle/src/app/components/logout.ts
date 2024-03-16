import Tag from './tags/tags';

const logOut = () => {
  const logOutField = new Tag('div', 'log-out', 'log-out').createElem();
  return logOutField;
};

export default logOut;
