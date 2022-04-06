const validateSomething = (str, regexp) => {
  return String(str).toLowerCase().match(regexp);
};

const validateEmail = (email) => {
  const rexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validateSomething(email, rexp);
};

const validatePhone = (phone) => {
  const rexp = /^\d[\d\(\)\ -]{4,14}\d$/;
  return validateSomething(phone, rexp);
};

const validateName = (name) => {
  const rexp = /[A-Za-zА-Яа-яЁё]{3,}/;
  return validateSomething(name, rexp);
};

const validateCustom = (custom, rexp) => {
  if (!rexp) {
    return false;
  }
  return validateSomething(custom, rexp);
};

const caseObject = {
  email: validateEmail,
  phone: validatePhone,
  name: validateName,
  custom: validateCustom,
};

export const validator = (validatorType, ...rest) => {
  //   console.log(validatorType);
  //   console.log(rest);
  //   console.dir(caseObject[validatorType]);
  return caseObject[validatorType](...rest);
};
