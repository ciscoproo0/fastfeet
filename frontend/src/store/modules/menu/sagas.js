import { takeLatest, all } from 'redux-saga/effects';
import { useDispatch } from 'react-redux';

import { menuRegister } from './actions';

export function SetMenu({ payload }) {
  const dispatch = useDispatch();

  if (!payload) {
    dispatch(menuRegister('Encomendas'));
  }
  dispatch(menuRegister(payload.menu.menuState));
}

export default all([takeLatest('persist/REHYDRATE', SetMenu)]);
