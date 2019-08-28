import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import profileReducer from '../containers/Auth/reducer';

const initialState = {};

const middlewares = [thunk];

const composedEnhancers = applyMiddleware(...middlewares);

const reducers = {
    profile: profileReducer,
};

const rootReducer = combineReducers({
  ...reducers,
});

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
