import {
  SET_LIVE_STATUS,
  ADD_LIVE_EVENT,
} from './action.type';
import produce from 'immer';

const initialState = {
  gameStarted: false,
  homeClubId: undefined,
  awayClubId: undefined,
  score: undefined,
  elapsed: undefined,
  events: [],
  isSimulation: undefined,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LIVE_STATUS:
      if (action.payload.gameStarted) {
        return { ...state, ...action.payload, events: [] };
      }
      return { ...state, ...action.payload };
    case ADD_LIVE_EVENT:
      return produce(state, (draft: any) => {
        draft.elapsed = action.payload.elapsed;
        draft.score = action.payload.score || draft.score;
        draft.events.push(action.payload);
      });
    default:
      return state;
  }
};
