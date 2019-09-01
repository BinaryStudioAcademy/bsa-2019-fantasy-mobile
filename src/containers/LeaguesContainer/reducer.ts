import {
  SET_USER_LEAGUES,
  SetLeaguesAction,
  AsyncSetLeaguesAction,
} from './action.types';

type State = {
  leagues?: any;
};

const initialState = {
  leagues: []
};

export default (state = initialState, action: SetLeaguesAction) => {
  switch (action.type) {
    case SET_USER_LEAGUES:
      return {...state, leagues: action.payload};
    default:
      return state;
  }
};
