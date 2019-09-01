import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import profileReducer from '../containers/Auth/reducer';
import fixtureReducer from '../containers/FixturesContainers/reducer';
import gameweekHistoryReducer from '../containers/HomeContainer/reducer';
import gameweeksReducer from '../containers/Routing/fetchGameweeks/reducer';

const initialState = {};

const middlewares = [thunk];

const composedEnhancers = applyMiddleware(...middlewares);

const reducers = {
  profile: profileReducer,
  fixtures: fixtureReducer,
  gameweekHistory: gameweekHistoryReducer,
  gameweeks: gameweeksReducer,
};

const rootReducer = combineReducers({
  ...reducers,
});

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
