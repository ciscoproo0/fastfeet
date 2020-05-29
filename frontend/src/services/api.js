import axios from 'axios';

import { logout } from '../store/modules/auth/actions';

const api = axios.create({
  baseURL: `http://192.168.100.32:3000`,
});

api.interceptStore = (store) => {
  api.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response.status === 401) {
        store.dispatch(logout());
      }
      return Promise.reject(err);
    }
  );
};

export default api;
