import * as leagueService from '../../services/leagueService.ts';
import {
  SET_USER_LEAGUES,
  SetLeaguesAction,
  AsyncSetLeaguesAction,
} from './action.types';

const setUserLeagues = (leagues: any): SetLeaguesAction => ({
  type: SET_USER_LEAGUES,
  payload: leagues,
});

export const loadUserLeagues = (id): AsyncSetLeaguesAction => async dispatch => {
  const result = await leagueService.getUserLeagues(id);
  dispatch(setUserLeagues(result));
};