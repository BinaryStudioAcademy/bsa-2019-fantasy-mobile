import { Thunky } from '../../store/types';

export const SET_USER_LEAGUES = 'LEAGUES_ACTION:SET_USER_LEAGUES';

type SetLeagues = {
  type: typeof SET_USER_LEAGUES;
  payload: any;
};

export type SetLeaguesAction = SetLeagues;
export type AsyncSetLeaguesAction = Thunky<SetLeaguesAction>;
