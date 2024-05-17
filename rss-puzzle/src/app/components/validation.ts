class ValidateFormInputs {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public isValidValue(n: number, className: string): boolean {
    const validateMSG = document.querySelector(className);
    const regex = /^[a-zA-Z-]{0,}$/;
    let errorMsg = '';
    if (validateMSG !== null) {
      if (this.value[0] !== this.value[0].toUpperCase() && !regex.test(this.value)) {
        errorMsg = 'Please, print first letter in uppercase and use only English alphabet letters';
      }
      if (this.value[0] !== this.value[0].toUpperCase()) {
        errorMsg = 'Please, print first letter in uppercase';
      }
      if (!regex.test(this.value)) {
        errorMsg = 'Please, use only English alphabet letters';
      }
      if (this.value.length < n) {
        errorMsg = `The first name must contain at least ${n} characters`;
      }
      validateMSG.innerHTML = errorMsg;
      if (errorMsg !== '') return false;
    }
    return true;
  }
}

const checkInput = (index: number, value: string): boolean => {
  if (index === 0 && value !== '') {
    const validate = new ValidateFormInputs(value);
    return validate.isValidValue(3, '.name-error');
  }
  if (index === 1 && value !== '') {
    const validate = new ValidateFormInputs(value);
    return validate.isValidValue(4, '.surname-error');
  }
  return false;
};
export default checkInput;
