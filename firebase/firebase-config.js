import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyALloc2sH-Pue1KwlWH1OqQ4eywe7i_kvk",
  authDomain: "norapp-69bd4.firebaseapp.com",
  projectId: "norapp-69bd4",
  storageBucket: "norapp-69bd4.appspot.com",
  messagingSenderId: "955340714199",
  appId: "1:955340714199:web:88109dd77e3648ac198092"
};


const app = initializeApp(firebaseConfig);
const authentication = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
const db = getFirestore(app)

export { authentication, db };