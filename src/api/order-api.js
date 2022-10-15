import axiosClient from './axios-client';

const orderApi = {
  getAll: (queryString = '') => {
    const url = '/orders?';
    return axiosClient.get(`${url}${queryString}`);
  },
  get: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
  post: (data) => {
    const url = '/orders';
    return axiosClient.post(url, data);
  },
  put: (data) => {
    const url = `/orders/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  },
};

export default orderApi;
