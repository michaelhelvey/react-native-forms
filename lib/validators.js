export function createValidator(validator, options) {
  return (value) => {
    const result = validator(value);
    if (!result) {
      throw new Error(options.errorMessage || '');
    }
  };
}

export function emailValidator(email) {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
