import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {toastErrorNotify,toastSuccessNotify,toastWarnNotify,} from "../helpers/ToastNotify";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
  };

const app = initializeApp(firebaseConfig); // Firebase'i baslat
const auth = getAuth(app); // Firebase authentication baslat

export const createUser = async (email, password, navigate, displayName) => {
  try {
      // yeni bir kullanıcı oluştur
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // kullanıcı profilini güncelle
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      navigate("/");
      toastSuccessNotify("Registered successfully!");
      console.log(userCredential);
    } catch (err) {
      toastErrorNotify(err.message);
    }
  };

export const signIn = async (email, password, navigate) => { //kullanici girisi
  try {      
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toastSuccessNotify("Logged in successfully!");
      console.log(userCredential);      
      navigate("/");
    } catch (err) {
      toastErrorNotify(err.message);
    }
  };
  
export const logOut = () => {
    signOut(auth)
      .then((res) => {
        console.log(res);
        toastSuccessNotify("Logged out successfully!");        
      })
      .catch((error) => {
        alert(error.message);
      });
  };

export const userObserver = (setCurrentUser) => {   
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {        
        setCurrentUser(false);
      }
    });
  };

export const signUpProvider = (navigate) => { //Google hesabi ile giris    
  const provider = new GoogleAuthProvider();    
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        toastSuccessNotify("Logged in successfully!");
        navigate("/");
      })
      .catch((error) => {        
        console.log(error);
      });
  };

export const forgotPassword = (email) => { // Password sifirlama emaili    
    sendPasswordResetEmail(auth, email)
      .then(() => {        
        toastWarnNotify("Please check your mail box!");        
      })
      .catch((err) => {
        toastErrorNotify(err.message);         
      });
  };