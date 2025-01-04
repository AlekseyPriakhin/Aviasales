import { useEffect, useState } from 'react';
import { socket } from '@/app/socket';

export const useSockets = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }
  });

  const onConnect = () => setIsConnected(true);
  socket.on('connect', onConnect);

  socket.on('hello', value => console.log(value));

  const publishHello = () => socket.emit('message', 'hello');

  const disconnect = () => {
    if (socket.connected) socket.disconnect();
  };
  const onDisconnect = () => setIsConnected(false);
  socket.on('disconnect', onDisconnect);

  return { isConnected, publishHello, disconnect, socket };
};
