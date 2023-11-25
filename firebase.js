import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBet8h__vkcsfDvcDhAO1qGS-3liRzd45s",
  authDomain: "storyme-82d90.firebaseapp.com",
  projectId: "storyme-82d90",
  storageBucket: "storyme-82d90.appspot.com",
  messagingSenderId: "727116482522",
  appId: "1:727116482522:web:e6a13a4b95dc322ca262e3",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const roses = collection(database, "GazaFallenRoses");
