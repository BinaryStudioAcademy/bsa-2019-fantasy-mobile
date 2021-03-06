import AsyncStorage from '@react-native-community/async-storage';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome';

import {User, UserTeamDetails} from '../../types/user.type';
import {TeamMemberData} from '../../types/teamMemberHistory.types';
import {GameweekType} from '../../types/gameweek.type';

import * as authService from '../../services/authService';
import * as profileService from '../../services/profileService';

import {LoginCredentials, RegisterCredentials} from '../../types/auth.types';

import {
  SET_USER,
  SET_IS_LOADING,
  SET_UPDATING_USER,
  AsyncUserAction,
  UserAction,
} from './action.type';
import {FixturesItemType} from '../../types/fixtures.types';

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

const setUpdatingUser = (isLoading: boolean) => ({
  type: SET_UPDATING_USER,
  payload: isLoading
})

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
  } catch (err) {
    showMessage({
      icon: 'danger',
      message: err && err.message ? err.message : err,
      type: 'danger',
    });
  } finally {
  }
};

export const login = (request: LoginCredentials) =>
  handleAuthResponse(authService.login(request));

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

export const createFixtureSubscription = (
  gameId: FixturesItemType['id'],
): AsyncUserAction => async (dispatch, getState) => {
  try {
    const user = await authService.getCurrentUser();
    const res = await profileService.createFixtureSub(user!.id, gameId);
  } catch (err) {
    showMessage({
      icon: 'danger',
      message: 'Failed to update favorite club.',
      type: 'danger',
    });
  }
};

export const deleteFixtureSubscription = (
  gameId: FixturesItemType['id'],
): AsyncUserAction => async (dispatch, getState) => {
  try {
    const user = await authService.getCurrentUser();
    const res = await profileService.destroyFixtureSub(user!.id, gameId);
  } catch (err) {
    showMessage({
      icon: 'danger',
      message: 'Failed to update favorite club.',
      type: 'danger',
    });
  }
};

export const updateUserTeamDetails = (
  userData: UserTeamDetails,
  teamMemberData: TeamMemberData,
  gameweekId: GameweekType['id'],
): AsyncUserAction => async (dispatch, getState) => {
  try {
    const {user} = getState().profile;

    const res = await profileService.updateUserTeamDetails(
      user!.id,
      gameweekId,
      userData,
      teamMemberData,
    );
    loadCurrentUser(true)(dispatch, getState);
    showMessage({
      icon: 'success',
      message: (res && res.message) || res,
      type: 'success',
    });
  } catch (err) {
    showMessage({
      icon: 'danger',
      message: 'Failed to create your team',
      type: 'danger',
    });
  }
};

export const updateUser = (
  imageId: string,
  name: string,
  email: string,
): AsyncUserAction => async (dispatch, getState) => {
  try {
    setUpdatingUser(true);
    const user = await authService.getCurrentUser();
    const res = await profileService.updateUser(user!.id, imageId, name, email);
    loadCurrentUser(true)(dispatch, getState);
    showMessage({
      icon: 'success',
      message: (res && res.message) || res,
      type: 'success',
    });
  } catch {
    showMessage({
      icon: 'danger',
      message: 'Failed to update profile datails',
      type: 'danger',
    });
  } finally {
    setUpdatingUser(false);
  }
};
