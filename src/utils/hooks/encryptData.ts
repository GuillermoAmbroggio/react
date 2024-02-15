import CryptoJS from 'crypto-js';
const { REACT_APP_SECRET_CRYPTO_JS } = process.env;

const encryptData = (datos: any) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(datos),
    REACT_APP_SECRET_CRYPTO_JS || '',
  ).toString();
};

export default encryptData;
