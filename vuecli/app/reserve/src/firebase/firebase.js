import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8lW6148uBSbC5_U7UZTk_KVt0E4akYM0",
  authDomain: "karatsu-waterpark.firebaseapp.com",
  projectId: "karatsu-waterpark",
  storageBucket: "karatsu-waterpark.appspot.com",
  messagingSenderId: "109223703797",
  appId: "1:109223703797:web:778d33f7c105ad987681bc",
  measurementId: "G-8MQSQKR3YG"
};


  // firebaseConfigの値を元にfirebaseの初期化
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  // Initialize Authentication
  const auth = getAuth(app)
  
  export default { analytics, db, auth };