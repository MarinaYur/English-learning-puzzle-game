const checkInput = (input: HTMLInputElement): boolean => {
  const regex = input.classList.contains('first-name') ? /^[A-Z][a-zA-Z-]{2,40}$/ : /^[A-Z][a-zA-Z-]{3,40}$/;
  return regex.test(input.value);
};

export default checkInput;
