import { Thunky } from '../../store/types';
import { LOCAL_GameweekHistoryType } from './types';

export const SET_GAMEWEEKS_HISTORY = 'GAMEWEEK_HISTORY_ACTION:SET_GAMEWEEKS_HISTORY';
export const SET_IS_LOADING = 'TEAM_HISTORY_ACTIONS:SET_IS_LOADING';

type SetGameweeksHistory = {
  type: typeof SET_GAMEWEEKS_HISTORY;
  payload: LOCAL_GameweekHistoryType[];
};

type SetLoading = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

export type setGameweekHistoryAction = SetGameweeksHistory | SetLoading;
export type AsyncSetGameweekHistoryAction = Thunky<setGameweekHistoryAction>;
