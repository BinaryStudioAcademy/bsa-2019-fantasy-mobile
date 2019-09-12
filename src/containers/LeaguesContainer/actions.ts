import * as leagueService from '../../services/leagueService';
import {
  SET_USER_LEAGUES,
  SET_LEAGUE_DETAILS,
  DELETE_LEAGUE_DETAILS,
  SET_LEAGUE_DETAILS_LOADING,
  SetLeaguesAction,
  AsyncSetLeaguesAction,
  AsyncSetLeagueDetailsAction,
  SetLeagueDetailsAction,
  DeleteLeagueDetailsAction,
  SetLoadingLeagueDetailsAction,
} from './action.types';

const setUserLeagues = (leagues: any): SetLeaguesAction => ({
  type: SET_USER_LEAGUES,
  payload: leagues,
});

const setLeagueDetails = (payload: any): SetLeagueDetailsAction => ({
  type: SET_LEAGUE_DETAILS,
  payload,
});

const setLeagueDetailsLoading = (isLeagueDetailsLoading: boolean): SetLoadingLeagueDetailsAction => ({
  type: SET_LEAGUE_DETAILS_LOADING,
  payload: isLeagueDetailsLoading,
});

export const deleteLeagueDetails = (): DeleteLeagueDetailsAction => ({
  type: DELETE_LEAGUE_DETAILS,
  payload: [],
});

export const loadUserLeagues = (id: any): AsyncSetLeaguesAction => async dispatch => {
  const result = await leagueService.getUserLeagues(id);
  dispatch(setUserLeagues(result));
};

export const loadLeagueDetails = (name: string): AsyncSetLeagueDetailsAction => async dispatch => {
  try {
    dispatch(setLeagueDetailsLoading(true));
    const result = await leagueService.getLeagueDetails(name);
    dispatch(setLeagueDetails(result));
    dispatch(setLeagueDetailsLoading(false));
  } catch (err) {
    // TODO handle not existing league
  }
};
