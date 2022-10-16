import axios from 'axios';
import { AUTHORIZATION_KEY, STATUS_CODE } from 'constants/global';
import queryString from 'query-string';

// Setup default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here...
  const accessToken = localStorage.getItem(AUTHORIZATION_KEY);
  if (accessToken) {
    config.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    switch (error.response.status) {
      case STATUS_CODE.UNAUTHORIZED: {
        const errorData = error.response.data;
        if (errorData && errorData.Errors[0].Code === 'login_failure') {
          return Promise.reject(error);
        }
        return this.redirectTo(document, '/login');
      }
      default:
        return Promise.reject(error);
    }
  }
);

export default axiosClient;
