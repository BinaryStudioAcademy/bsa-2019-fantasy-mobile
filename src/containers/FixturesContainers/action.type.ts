import { Thunky } from '../../store/types';

export const SET_GAMEWEEKS = 'GAMEWEEK_ACTION:SET_GAMEWEEKS';
export const SET_GAMES = 'GAME_ACTIONS:SET_GAME';
export const SET_GAME_DETAILS = 'GAME_ACTIONS:SET_GAME_DETAILS';
export const SET_FIXTURE_SUBSCRIBTIONS = 'GAMEWEEK_ACTION:SET_FIXTURE_SUBSCRIBTIONS';
export const SET_IS_LOADING = 'GAME_ACTION:SET_IS_LOADING';
export const SET_IS_DETAIL_LOADING = 'GAME_ACTION:SET_IS_DETAIL_LOADING';

type SetGameweeks = {
  type: typeof SET_GAMEWEEKS;
  payload: any;
};

type SetFixtureSubscribtions = {
  type: typeof SET_FIXTURE_SUBSCRIBTIONS;
  payload: any;
};

type SetGames = {
  type: typeof SET_GAMES;
  payload: any;
};

type SetGameDetails = {
  type: typeof SET_GAME_DETAILS;
  payload: any;
};

type SetLoading = {
  type: typeof SET_IS_LOADING;
  payload: boolean;
};

type SetDetailLoading = {
  type: typeof SET_IS_DETAIL_LOADING;
  payload: boolean;
};

export type setGameweekAction = SetGameweeks;
export type setGamesAction = SetGames | SetLoading;
export type setFixtureSubAction = SetFixtureSubscribtions;
export type setGameDetailsAction = SetGameDetails | SetDetailLoading;
export type AsyncSetGameweekAction = Thunky<setGameweekAction>;
export type AsyncSetGamesAction = Thunky<setGamesAction>;
export type AsyncSetGameDetailsAction = Thunky<setGameDetailsAction>;
export type AsyncSetFixtureSubscribtionAction = Thunky<setFixtureSubAction>;
