// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoOs_N93Win5x9NpaBglNy5pG5JyCbFu8",
  authDomain: "client-sys.firebaseapp.com",
  projectId: "client-sys",
  storageBucket: "client-sys.appspot.com",
  messagingSenderId: "94673396284",
  appId: "1:94673396284:web:2b37927c66d1518b15d939"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtener el objeto de autenticación de Firebase
export const auth_fire = getAuth(app);