import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


  // firebaseConfigの値を元にfirebaseの初期化
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  // Initialize Authentication
  const auth = getAuth(app)
  
  export default { analytics, db, auth };
