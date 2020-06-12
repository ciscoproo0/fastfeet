import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { loginSucess, loginFailure } from './actions';

import api from '../../../services/api';

export function* login({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, 'sessions', {
      deliveryman_id: id,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(loginSucess(token, user));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve erro no login, verifique seus dados'
    );
    yield put(loginFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/LOGIN_REQUEST', login),
]);
