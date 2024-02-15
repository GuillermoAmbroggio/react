import CryptoJS from 'crypto-js';
import logger from '../logger/logger';
import handleErrorReponse from './handleErrorReponse';
const { REACT_APP_SECRET_CRYPTO_JS } = process.env;

const decryptData = (cryptData: any) => {
  if (typeof cryptData !== 'string') return cryptData;

  try {
    const bytes = CryptoJS.AES.decrypt(
      cryptData,
      REACT_APP_SECRET_CRYPTO_JS || '',
    );
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    const e = handleErrorReponse(error);
    logger(e);
    return null;
  }
};

export default decryptData;
