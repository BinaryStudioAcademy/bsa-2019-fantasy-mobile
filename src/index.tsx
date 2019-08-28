import React from 'react';
import {Provider} from 'react-redux';

import store from './store/index';
import App from './components/App';

const Home = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Home;
