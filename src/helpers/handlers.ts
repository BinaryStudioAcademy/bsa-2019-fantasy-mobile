import store from '../store/index';
import { setLiveStatus, addLiveEvent } from '../containers/LiveContainer/actions';

export default (socket: any) => {
  console.log('Socket start');
  socket.on('status', (status: any) => {
    store.dispatch(setLiveStatus(status));
  });
  socket.on('event', (data: any) => {
    store.dispatch(addLiveEvent(data));
  });
};
