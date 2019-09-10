import * as leagueService from '../../services/leagueService';
import {
  SET_USER_LEAGUES,
  SET_LEAGUE_DETAILS,
  SetLeaguesAction,
  AsyncSetLeaguesAction,
  AsyncSetLeagueDetailsAction,
  SetLeagueDetailsAction
} from './action.types';

const setUserLeagues = (leagues: any): SetLeaguesAction => ({
  type: SET_USER_LEAGUES,
  payload: leagues,
});

const setLeagueDetails = (payload: any): SetLeagueDetailsAction => ({
  type: SET_LEAGUE_DETAILS,
  payload,
});

export const loadUserLeagues = (id: any): AsyncSetLeaguesAction => async dispatch => {
  const result = await leagueService.getUserLeagues(id);
  dispatch(setUserLeagues(result));
};

export const loadLeagueDetails = (name: string): AsyncSetLeagueDetailsAction => async dispatch => {
  try {
    const result = await leagueService.getLeagueDetails(name);
    dispatch(setLeagueDetails(result));
  } catch (err) {
    // TODO handle not existing league
  }
};
