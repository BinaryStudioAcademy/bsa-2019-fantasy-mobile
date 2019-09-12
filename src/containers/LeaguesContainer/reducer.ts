import {
  SET_USER_LEAGUES,
  SetLeaguesAction,
  SET_LEAGUE_DETAILS,
  SetLeagueDetailsAction,
  DELETE_LEAGUE_DETAILS,
  DeleteLeagueDetailsAction,
  SET_LEAGUE_DETAILS_LOADING,
} from './action.types';

type State = {
  leagues?: any;
  leagueDetails?: any;
  isLeagueDetailsLoading: boolean;
};

const initialState: State = {
  leagues: [],
  isLeagueDetailsLoading: true,
};

export default (state = initialState, action: SetLeaguesAction | SetLeagueDetailsAction | DeleteLeagueDetailsAction) => {
  switch (action.type) {
    case SET_USER_LEAGUES:
      return { ...state, leagues: action.payload };
    case SET_LEAGUE_DETAILS:
      return { ...state, leagueDetails: action.payload };
    case DELETE_LEAGUE_DETAILS:
      return { ...state, leagueDetails: [] };
    case SET_LEAGUE_DETAILS_LOADING:
      return { ...state, isLeagueDetailsLoading: action.payload };
    default:
      return state;
  }
};
