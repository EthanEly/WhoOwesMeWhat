import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCI4rGYjXyFiISKIZA4IWQsWNeQQCGuHi0',
  authDomain: 'whoowesmewhat-4a459.firebaseapp.com',
  databaseURL: 'https://whoowesmewhat-4a459.firebaseio.com',
  projectId: 'whoowesmewhat-4a459',
  storageBucket: 'gs://whoowesmewhat-4a459.appspot.com',
  messagingSenderId: '720816414523',
  appId: '1:720816414523:ios:538886d2444d7fffe2a11e',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };