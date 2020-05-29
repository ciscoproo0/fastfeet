import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { loginFailure, loginSuccess } from './actions';

import history from '../../../services/history';
import api from '../../../services/api';

export function* login({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSuccess(token));

    history.push('/encomendas');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(loginFailure());
  }
}

export function logout() {
  history.push('/');
}

export function setToken({ payload }) {
  if (!payload) {
    history.push('/');
    return;
  }

  const { token } = payload.auth;

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/LOGIN_REQUEST', login),
  takeLatest('@auth/LOGOUT', logout),
]);
