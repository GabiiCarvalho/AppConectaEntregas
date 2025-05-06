import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const messaging = firebase.messaging();

// Solicitar permissão para notificações
export const requestNotificationPermission = async () => {
  try {
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('Device token:', token);
    return token;
  } catch (error) {
    console.error('Permission denied', error);
    return null;
  }
};

// Configurar listener para mensagens em foreground
export const setupForegroundNotification = (callback) => {
  messaging.onMessage((payload) => {
    console.log('Message received', payload);
    callback(payload);
  });
};