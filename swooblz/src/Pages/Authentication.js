import React from 'react';
import {Store} from '../Store';
import '@firebase/firestore';
import firebase from "firebase";
import Load_Firebase from '../firebaseConfig';
import {Grid, Header, Icon} from 'semantic-ui-react'

const Authentication = () => {
    const {state, dispatch} = React.useContext(Store);


    const signInWithGoogle = () => {
        const loaded = Load_Firebase();
        const db = loaded.firestore();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then( async result => {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user)
            let today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const payload = {
                uid:user.uid,
                username : user.displayName,
                email : user.email,
                profilePicture : user.photoURL,
                phoneNumber : user.phoneNumber,
                dateCreated : date,
                friends : [],
            }
            await db.collection('users').doc(user.uid).set(payload).then(() => {
                dispatch({type : 'LOGGED_IN', payload: payload})
            }).catch(err=>{console.log(err)})
        })
        .catch(error => {
            console.log(error);
        })
    }

    const logInWithGoogle = () => {
        const loaded = Load_Firebase();
        const db = loaded.firestore();
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then( async result => {
            // This gives you a Google Access Token.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("This is the user", user)
            await db.collection('users').doc(user.uid).get().then(docSnapshot => {
                const payload = docSnapshot.data();
                dispatch({type : 'LOGGED_IN', payload})
            }).catch(err=>{console.log(err)})
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    return(
        <Grid textAlign="center" verticalAlign="center" >
            <Grid.Column>
                <Header as="h2" icon color="orange" textAlign="center">
                    Sign In
                    <Icon onClick={signInWithGoogle}  name="google" color="blue" />
                </Header>
            </Grid.Column>
            or
            <Header as="h2" icon color="orange" textAlign="center">
                    Log In
                    <Icon onClick={logInWithGoogle}  name="google" color="blue" />
            </Header>
        </Grid>
    )
}

export default Authentication;

// {/* <div className="auth-container">
// {/* <div className="signup-container">
//     <h1 className="signup-header">Sign Up</h1>
//     <img 
//         alt="Sign in with Google" 
//         onClick={signInWithGoogle} 
//         src="https://img.icons8.com/color/96/000000/google-logo.png" 
//     />

//     <h1>Log in</h1>
//     <img 
//         alt="Sign in with Google" 
//         onClick={logInWithGoogle} 
//         src="https://img.icons8.com/color/96/000000/google-logo.png" 
//     />
// </div>
// <a id="reference" href="https://icons8.com/icon/17949/google">Google icon by Icons8</a> */}
// </div> */}