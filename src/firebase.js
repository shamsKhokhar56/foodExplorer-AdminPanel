import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD0bH9Nqv78BWVHvtI1z_UOMVuNPd9IZEY",
    authDomain: "food-explorer-70663.firebaseapp.com",
    projectId: "food-explorer-70663",
    storageBucket: "food-explorer-70663.appspot.com",
    messagingSenderId: "903281067181",
    appId: "1:903281067181:web:5963a1bcaa85c55c487224"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;