class validateFormInputs {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public isNameValid(): boolean {
    const validateMSG = document.querySelector('.name-error');
    console.log(validateMSG);
    console.log('this.value', this.value);
    const regex = /^[a-zA-Z-]{0,}$/;
    if (validateMSG !== null) {
      if (this.value[0] !== this.value[0].toUpperCase() && !regex.test(this.value)) {
        const errorMsg = `Please, print first letter in uppercase and use only English alphabet letters`;
        validateMSG.innerHTML = errorMsg;
        return false;
      }
      if (this.value[0] !== this.value[0].toUpperCase()) {
        const errorMsg = `Please, print first letter in uppercase`;
        validateMSG.innerHTML = errorMsg;
        return false;
      }
      if (!regex.test(this.value)) {
        const errorMsg = `Please, use only English alphabet letters`;
        validateMSG.innerHTML = errorMsg;
        return false;
      }
    }
    return true;
  }

  public isPassValid(): boolean {
    const validateMSG = document.querySelector('.pass-error');
    if (validateMSG !== null) {
      if (this.value.length < 8) {
        const errorMsg = `Password length should be at least 8 characters`;
        validateMSG.innerHTML = errorMsg;
        return false;
      }
      let hasNumber = false;
    for (let char of this.value) {
        if (!isNaN(parseInt(char))) {
            hasNumber = true;
            break;
        }
    }
    if (!hasNumber) {
      const errorMsg = `Password should contain at least 1 digit`;
      validateMSG.innerHTML = errorMsg;
        return false;
    }
    let hasUpperCase = false;
    let hasLowerCase = false;
    for (let char of this.value) {
        if (char === char.toUpperCase() && isNaN(parseInt(char))) {
            hasUpperCase = true;
        }
        if (char === char.toLowerCase() && isNaN(parseInt(char))) {
            hasLowerCase = true;
        }
    }
    if (!hasUpperCase || !hasLowerCase) {
      const errorMsg = `Password should contain letters in Lowercase and Uppercase`;
      validateMSG.innerHTML = errorMsg;
        return false;
    }
    }
    return true;
  }
}

const checkInput = (index: number, value: string): boolean => {
  if (index === 0 && value !== '') {
    const validate = new validateFormInputs(value);
    return validate.isNameValid();
  }
  if (index === 1 && value !== '') {
    const validate = new validateFormInputs(value);
    return validate.isPassValid();
  }
  return false;
};
export default checkInput;
