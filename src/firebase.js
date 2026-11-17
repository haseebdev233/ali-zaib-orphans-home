import { initializeApp } from 'firebase/app';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';

export const useEmulators = import.meta.env.DEV && import.meta.env.VITE_FIREBASE_EMULATORS === 'true';
const projectId = 'ali-zaib-orphans-home';

export const app = initializeApp(useEmulators ? {
  apiKey: 'demo-api-key',
  projectId: 'demo-ali-zaib',
  databaseURL: 'https://demo-ali-zaib-default-rtdb.firebaseio.com',
} : {
  apiKey: 'AIzaSyAi6OpIfUgdS0sy3JYMjPsY6_HiPAXOvdE',
  authDomain: 'ali-zaib-orphans-home.firebaseapp.com',
  projectId,
  messagingSenderId: '772028744498',
  appId: '1:772028744498:web:735f3fcc29b737f76a8d2b',
  databaseURL: 'https://ali-zaib-orphans-home-default-rtdb.asia-southeast1.firebasedatabase.app',
});

export const db = getDatabase(app);
if (useEmulators) connectDatabaseEmulator(db, '127.0.0.1', 9000);
