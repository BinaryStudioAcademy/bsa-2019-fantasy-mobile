import store from '../store/index';

import moment from 'moment';

import { showMessage, hideMessage } from 'react-native-flash-message';
import { setLiveStatus, addLiveEvent } from '../containers/LiveContainer/actions';
import { FixtureSubType } from '../types/fixtures.types';

export default (socket: any) => {
  console.log('Socket start');
  socket.on('displayNotification', (fixture: FixtureSubType) => {
    if (!fixture) {
      showMessage({
        icon: 'success',
        message: `Seems like you forgot to apply a team. Hurry up, the gameweek starts soon!`,
        type: 'success',
      });
    }
    if (fixture.isFavClub) {
      showMessage({
        icon: 'success',
        message: `Your favorite club will play on
        ${moment(fixture.start).format('dddd D MMMM YYYY HH:mm')}`,
        type: 'success',
      });
    } else {
      if (fixture.finished) {
        showMessage({
          icon: 'success',
          message: `Fixture ${fixture.homeTeamName} - ${fixture.awayTeamName} finished on 
          ${moment(fixture.end).format('dddd D MMMM YYYY HH:mm')} with results ${
            fixture.homeTeamScore
          } - ${fixture.awayTeamScore}`,
          type: 'success',
        });
      } else {
        showMessage({
          icon: 'success',
          message: `${fixture.homeTeamName} - ${fixture.awayTeamName} will play on
          ${moment(fixture.start).format('dddd D MMMM YYYY HH:mm')}`,
          type: 'success',
        });
      }
    }
  });
  socket.on('status', (status: any) => {
    store.dispatch(setLiveStatus(status));
  });
  socket.on('event', (data: any) => {
    store.dispatch(addLiveEvent(data));
  });
};
