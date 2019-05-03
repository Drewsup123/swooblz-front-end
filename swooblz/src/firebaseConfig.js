import firebase from '@firebase/app'
import '@firebase/firestore';

export default function Load_Firebase() {
    try{
        const config = {
            apiKey: "AIzaSyAFr2GbPXDA4Eo9So_xEa4EOP4PANZsHY0",
            authDomain: "swooblz.firebaseapp.com",
            databaseURL: "https://swooblz.firebaseio.com",
            projectId: "swooblz",
            storageBucket: "swooblz.appspot.com",
            messagingSenderId: "370329610912"
        };
        // console.log("CONFIG", config)
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    } catch(err){
        if(!/already exists/.test(err.message)){
            console.error("firebase init error", err.stack)
        }
    }

    return firebase
}