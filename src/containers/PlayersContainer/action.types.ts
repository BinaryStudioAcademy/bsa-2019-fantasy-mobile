import { PlayerType } from 'src/types/player.types';
import { Thunky } from 'src/store/types';

export const FETCH_PLAYERS_REQUEST = 'PLAYERS_ACTION:FETCH_PLAYERS_REQUEST';
export const FETCH_PLAYERS_SUCCESS = 'PLAYERS_ACTION:FETCH_PLAYERS_SUCCESS';
export const FETCH_PLAYERS_FAILURE = 'PLAYERS_ACTION:FETCH_PLAYERS_FAILURE';
export const FETCH_PLAYERS_FINALIZE = 'PLAYERS_ACTION:FETCH_PLAYERS_FINALIZE';

type FetchPlayersRequest = {
  type: typeof FETCH_PLAYERS_REQUEST;
};

type FetchPlayersSuccess = {
  type: typeof FETCH_PLAYERS_SUCCESS;
  payload: PlayerType[];
};

type FetchPlayersFailure = {
  type: typeof FETCH_PLAYERS_FAILURE;
  payload: string;
};

type FetchPlayersFinalize = {
  type: typeof FETCH_PLAYERS_FINALIZE;
};

export type PlayersAction =
  | FetchPlayersRequest
  | FetchPlayersSuccess
  | FetchPlayersFailure
  | FetchPlayersFinalize;
export type AsyncPlayersAction = Thunky<PlayersAction>;
