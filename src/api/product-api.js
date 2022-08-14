import axiosClient from './axios-client';

const productApi = {
  getAll: (params) => {
    const url = '/products';
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  post: (data) => {
    const url = '/products';
    return axiosClient.post(url, data);
  },
  patch: (data) => {
    const url = `/products/${data.id}`;
    return axiosClient.patch(url, data);
  },
  delete: (id) => {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
