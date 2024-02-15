import { IWriting } from '../../copywriting/writing.type';

const validatePassword = (password: string, writing: IWriting) => {
  const regexPasswordLetter = new RegExp('^(?=.*[a-z]|[A-Z])');
  const regexPasswordNumeric = new RegExp('(?=.*[0-9])');
  const regexPasswordLonger = new RegExp('(?=.{8,})');
  if (!regexPasswordLetter.test(password)) {
    return writing.user.errorResponse.password.minOneLetter;
  }
  if (!regexPasswordLonger.test(password)) {
    return writing.user.errorResponse.password.minLength;
  }
  if (!regexPasswordNumeric.test(password)) {
    return writing.user.errorResponse.password.minOneNumber;
  }
  return null;
};

export default validatePassword;
