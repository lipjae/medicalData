import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA9TIlz21CXTo59dihp_7XZ52XNgX6u8sA",
  authDomain: "medical-data-dev.firebaseapp.com",
  projectId: "medical-data-dev",
  storageBucket: "medical-data-dev.appspot.com",
  messagingSenderId: "376031364074",
  appId: "1:376031364074:web:bb090a70875542d8dd2893",
  measurementId: "G-22JD472DCV"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()


export { auth }