import {
  SET_USER_LEAGUES,
  SetLeaguesAction,
  AsyncSetLeaguesAction,
  SET_LEAGUE_DETAILS,
  SetLeagueDetailsAction,
} from './action.types';

type State = {
  leagues?: any;
  leagueDetails?: any;
};

const initialState: State = {
  leagues: [],
};

export default (state = initialState, action: SetLeaguesAction | SetLeagueDetailsAction) => {
  switch (action.type) {
    case SET_USER_LEAGUES:
      return { ...state, leagues: action.payload };
    case SET_LEAGUE_DETAILS:
      return { ...state, leagueDetails: action.payload };
    default:
      return state;
  }
};
