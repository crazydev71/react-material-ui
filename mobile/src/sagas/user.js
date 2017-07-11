import { put, all, call, takeLatest } from 'redux-saga/effects';
import Types from '../actions/types';
import { api, json } from '../api';

function* auth(action) {
  try {
    const res = yield call (api.post('/auth', json(action.payload)));
    console.log(res);
  } catch (err) {
    console.log(err);
    yield put({ type: Types.AUTH_FAILED, payload: err });
  }
}

function* login(action) {
  try {
    const res = yield call (api.post('/login', json(action.payload)));
    console.log(res);
  } catch (err) {
    yield put({ type: Types.LOGIN_FAILED, payload: err });
  }
}

function* registerAttempt(action) {
  try {
    const res = yield call (api.post('/register', json(action.payload)));
    console.log(res);
  } catch (err) {
    yield put({ type: Types.LOGIN_FAILED, payload: err });
  }
}

function* sendSMSCodeAttempt(action) {
  try {
    const res = yield call (api.post('/sendsmscode', json(action.payload)));
    console.log(res);
  } catch (err) {
    yield put({ type: Types.LOGIN_FAILED, payload: err });
  }
}

function* veirfyCodeAttempt(action) {
  try {
    const res = yield call (api.post('/register', json(action.payload)));
    console.log(res);
  } catch (err) {
    yield put({ type: Types.LOGIN_FAILED, payload: err });
  }
}

export function* user() {
  yield all([
    takeLatest(Types.AUTH_REQUEST, auth),
    takeLatest(Types.LOGIN_REQUEST, login),
    takeLatest(Types.REGISTER_REQUEST, registerAttempt),
    takeLatest(Types.SEND_SMS_CODE_REQUEST, sendSMSCodeAttempt),
    takeLatest(Types.VERIFY_CODE_REQUEST, veirfyCodeAttempt)
  ]);
}