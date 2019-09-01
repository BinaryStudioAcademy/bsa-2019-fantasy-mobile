import {
  SET_GAMEWEEKS_HISTORY,
  SET_IS_LOADING,
  setGameweekHistoryAction,
} from './action.type';

import {LOCAL_GameweekHistoryType} from './types';

type State = {
  gameweeksHistory: LOCAL_GameweekHistoryType[];
  isLoading: boolean;
};

const initialState: State = {
  gameweeksHistory: [],
  isLoading: true,
};

export default (state = initialState, action: setGameweekHistoryAction) => {
  switch (action.type) {
    case SET_GAMEWEEKS_HISTORY:
      return {...state, gameweeksHistory: action.payload};
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};