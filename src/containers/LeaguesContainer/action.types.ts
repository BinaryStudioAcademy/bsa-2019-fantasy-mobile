import { Thunky } from '../../store/types';

export const SET_USER_LEAGUES = 'LEAGUES_ACTION:SET_USER_LEAGUES';
export const SET_LEAGUE_DETAILS = 'LEAGUES_ACTION:SET_LEAGUE_DETAILS';
export const DELETE_LEAGUE_DETAILS = 'LEAGUES_ACTION:DELETE_LEAGUE_DETAILS';
export const SET_LEAGUE_DETAILS_LOADING = 'LEAGUES_ACTION:SET_LEAGUE_DETAILS_LOADING'

type SetLeagues = {
  type: typeof SET_USER_LEAGUES;
  payload: any;
};

type SetLeagueDetails = {
  type: typeof SET_LEAGUE_DETAILS;
  payload: any;
};

type DeleteLeagueDetails = {
  type: typeof DELETE_LEAGUE_DETAILS;
  payload: any;
};

type SetLoadingLeagueDetails = {
  type: typeof SET_LEAGUE_DETAILS_LOADING;
  payload: any;
};

export type SetLeaguesAction = SetLeagues;
export type SetLeagueDetailsAction = SetLeagueDetails | SetLoadingLeagueDetails;
export type DeleteLeagueDetailsAction = DeleteLeagueDetails;
export type SetLoadingLeagueDetailsAction = SetLoadingLeagueDetails;
export type AsyncSetLoadingLeagueDetailsAction = Thunky<SetLoadingLeagueDetailsAction>;
export type AsyncSetLeaguesAction = Thunky<SetLeaguesAction>;
export type AsyncSetLeagueDetailsAction = Thunky<SetLeagueDetailsAction>;
