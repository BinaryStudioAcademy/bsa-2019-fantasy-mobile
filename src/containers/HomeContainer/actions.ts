import * as gameweekHistoryService from '../../services/gameweekHistoryService';

import {
  SET_GAMEWEEKS_HISTORY,
  SET_IS_LOADING,
  setGameweekHistoryAction,
  AsyncSetGameweekHistoryAction,
} from './action.types';

const setGameweeksHistory = (
  gameweeksHistory: any,
): setGameweekHistoryAction => ({
  type: SET_GAMEWEEKS_HISTORY,
  payload: gameweeksHistory,
});

const setIsLoading = (isLoading: boolean): any => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const loadGameweeksHistoryAction = (
  userId: string,
): AsyncSetGameweekHistoryAction => async dispatch => {
  dispatch(setIsLoading(true));
  const result = await gameweekHistoryService.getGameweeksHistoryByUser(userId);
  dispatch(setGameweeksHistory(result));
  dispatch(setIsLoading(false));
};