import axios, { AxiosRequestConfig } from 'axios';
import { IAuth } from '../../types/user.types';

type IAxiosFetch = (url: string, options?: AxiosRequestConfig) => Promise<any>;

const axiosFetch: IAxiosFetch = (url, options) => {
  const authStorage = localStorage.getItem('auth');
  /* Configuraciíon para request web   */
  if (authStorage) {
    const authWeb: IAuth = JSON.parse(authStorage);
    const headers = {
      ...options?.headers,
      authorization: `Bearer ${authWeb.csrfToken}`,
    };
    return axios(url, {
      ...options,
      headers,
      withCredentials: true,
    }).then((response) => {
      return response.data;
    });
  }
  return axios(url, {
    ...options,
    headers: { ...options?.headers },
    withCredentials: true,
  }).then((response) => response.data);
};

export default axiosFetch;
