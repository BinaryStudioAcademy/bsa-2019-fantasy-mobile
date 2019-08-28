import {AsyncStorage} from 'react-native';

import {User} from '../../types/user.type';

import * as authService from '../../services/authService';

import {LoginCredentials, RegisterCredentials} from '../../types/auth.types';

import {
  SET_USER,
  SET_IS_LOADING,
  AsyncUserAction,
  UserAction,
} from './action.type';

const setToken = (token: string) => AsyncStorage.setItem('token', token);
const clearToken = () => AsyncStorage.removeItem('token');

export const setUser = (user: User | null): UserAction => ({
  type: SET_USER,
  payload: user,
});

const setIsLoading = (isLoading: boolean): UserAction => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

const setAuthData = (
  user: User,
  token: string,
): AsyncUserAction => dispatch => {
  setToken(token);
  dispatch(setUser(user));
};

const handleAuthResponse = (
  authResponsePromise: Promise<{
    user: User;
    token: string;
  }>,
): AsyncUserAction => async (dispatch, getRootState) => {
  try {
    const {user, token} = await authResponsePromise;
    setAuthData(user, token)(dispatch, getRootState);
  } finally {
    console.log('hello');
  }
};

export const login = (request: LoginCredentials) =>
  handleAuthResponse(authService.login(request));

export const registration = (request: RegisterCredentials) =>
  handleAuthResponse(authService.registration(request));

export const logout = (): AsyncUserAction => dispatch => {
  clearToken();
  dispatch(setUser(null));
};

export const loadCurrentUser = (
  soft = false,
): AsyncUserAction => async dispatch => {
  if (!soft) {
    dispatch(setIsLoading(true));
  }

  try {
    const user = await authService.getCurrentUser();
    dispatch(setUser(user));
  } catch (err) {
    dispatch(setUser(null));
  } finally {
    if (!soft) {
      dispatch(setIsLoading(false));
    }
  }
};
