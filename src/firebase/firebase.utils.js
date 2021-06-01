import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDUPV5QHpIQqfxBnKtb989fTDS9XTO1IoE",
    authDomain: "crwn-db-157d9.firebaseapp.com",
    projectId: "crwn-db-157d9",
    storageBucket: "crwn-db-157d9.appspot.com",
    messagingSenderId: "147816811569",
    appId: "1:147816811569:web:09460576306b33958d1910",
    measurementId: "G-7QSZMW9ZW5"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot= await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      }catch (error){
        console.log('error creating user', error.message);

      }
    }

    return userRef;

  }
  
  firebase.initializeApp(config);
   export const auth = firebase.auth();
   export const firestore = firebase.firestore();
    
   const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'});

    export const signInWithGoogle = () => auth.signInWithPopup(provider);

    export default firebase;