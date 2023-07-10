// import { io } from 'socket.io-client';
// const port = process.env.PORT || 3000;
// const socketUrl = `http://localhost:${port}`;

// const socket = io(`${socketUrl}`);
// // const socket = io(socketUrl);

// socket.on('connect', () => {
//   socket.emit('join-conversation', { conversationId: socket.id });
//   socket.emit('send-message', 'Hello from client');
// });
// socket.on('disconnect', (reason: string) => {
//   console.log(`Socket is disconnected because of ${reason}`);
// });
// socket.on('send-message', (message: string) => {
//   console.log(message);
// });
// socket.on('reply-message', (message: string) => {
//   console.log(message);
// });
// socket.on('typing', (id: string, message: string) => {
//   console.log(message);
// });

// export default socket;
