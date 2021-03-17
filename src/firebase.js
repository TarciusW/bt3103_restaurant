import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyAiEHzqBOJuqD4DSEPFMBS866qfd7cs7R8",
    authDomain: "bt3103-week-6-ef0e5.firebaseapp.com",
    projectId: "bt3103-week-6-ef0e5",
    storageBucket: "bt3103-week-6-ef0e5.appspot.com",
    messagingSenderId: "462783397535",
    appId: "1:462783397535:web:79e9f7516d23aee2b5acaa",
    measurementId: "G-F5SHK35NK4"
}

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
