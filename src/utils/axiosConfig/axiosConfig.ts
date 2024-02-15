import axios from 'axios';

const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;
axios.defaults.baseURL = REACT_APP_API_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config: any) => {
  config.headers['x-api-key'] = REACT_APP_API_KEY;

  return config;
});
