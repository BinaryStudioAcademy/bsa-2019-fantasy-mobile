import { SET_LIVE_STATUS, ADD_LIVE_EVENT } from "./action.type";

export const setLiveStatus = (payload: any) => ({
  type: SET_LIVE_STATUS,
  payload,
});

export const addLiveEvent = (payload: any) => ({
  type: ADD_LIVE_EVENT,
  payload,
});
