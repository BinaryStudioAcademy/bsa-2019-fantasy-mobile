import { SET_USER, SET_IS_LOADING, SET_UPDATING_USER, UserAction } from './action.type';
import { User } from '../../types/user.type';

type State = {
  user: User | null;
  isAuthorized: boolean;
  isLoading: boolean;
  updatingUser: boolean;
};

const initialState: State = {
  user: null,
  isAuthorized: false,
  isLoading: true,
  updatingUser: false,
};

export default (state = initialState, action: UserAction) => {
  switch (action.type) {
    case SET_USER:
      const user = action.payload;
      return {
        ...state,
        user,
        isAuthorized: Boolean(user && user.id),
      };

    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_UPDATING_USER:
      return {
        ...state,
        updatingUser: action.payload,
      };

    default:
      return state;
  }
};
