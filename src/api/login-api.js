import axiosClient from './axios-client';

const loginApi = {
  post: (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
};

export default loginApi;
