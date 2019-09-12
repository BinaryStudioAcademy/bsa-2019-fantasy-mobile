import { PlayerType } from 'src/types/player.types';
import * as playerService from 'src/services/playerService';

import {
  PlayersAction,
  AsyncPlayersAction,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_FAILURE,
  FETCH_PLAYERS_FINALIZE,
} from './action.types';
import { showMessage } from 'react-native-flash-message';

const fetchPlayersRequest = (): PlayersAction => ({
  type: FETCH_PLAYERS_REQUEST,
});

export const fetchPlayersSuccess = (players: PlayerType[]): PlayersAction => ({
  type: FETCH_PLAYERS_SUCCESS,
  payload: players,
});

const fetchPlayersFailure = (err: string): PlayersAction => ({
  type: FETCH_PLAYERS_FAILURE,
  payload: err,
});

const fetchPlayersFinalize = (): PlayersAction => ({
  type: FETCH_PLAYERS_FINALIZE,
});

export const fetchPlayers = (): AsyncPlayersAction => async (dispatch, getRootState) => {
  dispatch(fetchPlayersRequest());

  try {
    const { count, rows } = await playerService.getPlayers();

    dispatch(fetchPlayersSuccess(rows));
  } catch (err) {
    showMessage({ icon: 'danger', type: 'danger', message: err.message || err });
    dispatch(fetchPlayersFailure(err.message || err));
  } finally {
    dispatch(fetchPlayersFinalize());
  }
};
