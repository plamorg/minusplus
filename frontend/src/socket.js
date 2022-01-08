import { io } from 'socket.io-client';

export const socket = io(window.API_ENDPOINT);