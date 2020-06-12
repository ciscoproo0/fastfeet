export function loginRequest(id) {
  return {
    type: '@auth/LOGIN_REQUEST',
    payload: { id },
  };
}

export function loginSucess(token, user) {
  return {
    type: '@auth/LOGIN_SUCESS',
    payload: { token, user },
  };
}

export function loginFailure() {
  return {
    type: '@auth/LOGIN_FAILURE',
  };
}

export function logout() {
  return {
    type: '@auth/LOGOUT',
  };
}
