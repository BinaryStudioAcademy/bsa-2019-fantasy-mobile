import {
  PlayersAction,
  FETCH_PLAYERS_REQUEST,
  FETCH_PLAYERS_SUCCESS,
  FETCH_PLAYERS_FAILURE,
  FETCH_PLAYERS_FINALIZE,
} from './action.types';
import { PlayerType } from 'src/types/player.types';

type State = {
  items: PlayerType[];
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  items: [],
  loading: true,
  error: null,
};

const playersReducer = (state = initialState, action: PlayersAction) => {
  switch (action.type) {
    case FETCH_PLAYERS_REQUEST:
      return { ...state, loading: true, err: null };

    case FETCH_PLAYERS_SUCCESS:
      return { ...state, items: action.payload };

    case FETCH_PLAYERS_FAILURE:
      return { ...state, err: action.payload };

    case FETCH_PLAYERS_FINALIZE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default playersReducer;
