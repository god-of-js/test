import "firebase";
import firebase from "firebase/app";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyBJK5FZpM4lNV5pJ8Mv7j7lptbidMorhwM",
  authDomain: "cargopas.firebaseapp.com",
  databaseURL: "https://cargopas.firebaseio.com",
  projectId: "cargopas",
  storageBucket: "cargopas.appspot.com",
  messagingSenderId: "706945387507",
  appId: "1:706945387507:web:a4994d6e0fb092256fa086",
  measurementId: "G-L8MYQGC7PE"
};
class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    this.storage = firebase.storage().ref();
  }
}
export default Firebase;
