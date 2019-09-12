import { Thunky } from '../../store/types';

export const SET_USER_LEAGUES = 'LEAGUES_ACTION:SET_USER_LEAGUES';
export const SET_LEAGUE_DETAILS = 'LEAGUES_ACTION: SET_LEAGUE_DETAILS';
export const DELETE_LEAGUE_DETAILS = 'LEAGUES_ACTION: DELETE_LEAGUE_DETAILS';

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

export type SetLeaguesAction = SetLeagues;
export type SetLeagueDetailsAction = SetLeagueDetails;
export type DeleteLeagueDetailsAction = DeleteLeagueDetails;
export type AsyncSetLeaguesAction = Thunky<SetLeaguesAction>;
export type AsyncSetLeagueDetailsAction = Thunky<SetLeagueDetailsAction>;
