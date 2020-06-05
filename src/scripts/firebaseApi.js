import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAPXE2T7jDmg3Ak6vpF-JzzX4VL-qqELb0",
    authDomain: "fir-crash-app.firebaseapp.com",
    databaseURL: "https://fir-crash-app.firebaseio.com",
    projectId: "fir-crash-app",
    storageBucket: "fir-crash-app.appspot.com",
    messagingSenderId: "229130637404",
    appId: "1:229130637404:web:8ae9841526a1bef8211699"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const firebaseStorage = firebase.storage().ref();
export const firebaseDatabase = firebase.database().ref();
export const firebaseAuth = null;