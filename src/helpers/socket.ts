import io from 'socket.io-client';
import handlers from './handlers';
import { User } from '../types/user.type';

const socket = io(
  'https://fantasy-football.tk/',
);

handlers(socket);

export const startSocket = () => {
  console.log('Connected to socket server.')
}

export const joinRoom = (favorite_club:number) => {
  socket.emit('createRoom', favorite_club);
};

export const leaveRoom = (favorite_club:number) => {
  socket.emit('leaveRoom', favorite_club);
};

export const requestGames = (userId: User['id']) => {
  socket.emit('requestGames', userId);
};


export default socket;
