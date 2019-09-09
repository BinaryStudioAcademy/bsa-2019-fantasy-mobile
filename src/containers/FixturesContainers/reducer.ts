import {
  SET_GAMEWEEKS,
  SET_GAMES,
  SET_GAME_DETAILS,
  SET_IS_LOADING,
  SET_IS_DETAIL_LOADING,
  SET_FIXTURE_SUBSCRIBTIONS,
  setGamesAction,
  setGameDetailsAction,
  setGameweekAction,
  setFixtureSubAction,
} from './action.type';

import { FixturesItemType, GamesDetailsType } from '../../types/fixtures.types';
import { FixtureSubscribtion } from '../../types/fixture.types';
import { GameweekType } from '../../types/gameweek.type';

type State = {
  gameweeks?: GameweekType[];
  games?: FixturesItemType[];
  gameDetails?: GamesDetailsType;
  fixtureSubscribtions?: FixtureSubscribtion[];
  isLoading: boolean;
  isDetailLoading: boolean;
};

const initialState: State = { isLoading: true, isDetailLoading: true };

export default (
  state = initialState,
  action:
    | setGamesAction
    | setGameweekAction
    | setGameDetailsAction
    | setFixtureSubAction,
) => {
  switch (action.type) {
    case SET_GAMEWEEKS:
      return { ...state, gameweeks: action.payload };
    case SET_GAMES:
      return { ...state, games: action.payload };
    case SET_GAME_DETAILS:
      return { ...state, gameDetails: action.payload };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_IS_DETAIL_LOADING:
      return {
        ...state,
        isDetailLoading: action.payload,
      };
    case SET_FIXTURE_SUBSCRIBTIONS:
      return {
        ...state,
        fixtureSubscribtions: action.payload,
      };
    default:
      return state;
  }
};
