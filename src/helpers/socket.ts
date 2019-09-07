import io from 'socket.io-client';
import handlers from './handlers';

const socket = io(
  'http://ec2-18-224-246-75.us-east-2.compute.amazonaws.com:5002',
);

handlers(socket);

export const startSocket = () => {
  console.log('Connected to socket server.')
}

export default socket;
