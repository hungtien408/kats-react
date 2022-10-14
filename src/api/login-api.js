import axiosClient from './axios-client';

const loginApi = {
  post: (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  getUserMe: () => {
    const url = '/users/me';
    return axiosClient.get(url);
  },
};

export default loginApi;
