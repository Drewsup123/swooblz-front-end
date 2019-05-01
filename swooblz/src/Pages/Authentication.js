import React from 'react';
import {Store} from '../Store';
import '@firebase/firestore';
import firebase from "firebase";
import Load_Firebase from '../firebaseConfig'

const Authentication = () => {
    const {state, dispatch} = React.useContext(Store);

    // const particleConfig = {
    //     "particles": {
    //       "number": {
    //         "value": 6,
    //         "density": {
    //           "enable": true,
    //           "value_area": 800
    //         }
    //       },
    //       "color": {
    //         "value": "#1b1e34"
    //       },
    //       "shape": {
    //         "type": "polygon",
    //         "stroke": {
    //           "width": 0,
    //           "color": "#000"
    //         },
    //         "polygon": {
    //           "nb_sides": 6
    //         },
    //         "image": {
    //           "src": "img/github.svg",
    //           "width": 100,
    //           "height": 100
    //         }
    //       },
    //       "opacity": {
    //         "value": 0.3,
    //         "random": true,
    //         "anim": {
    //           "enable": false,
    //           "speed": 1,
    //           "opacity_min": 0.1,
    //           "sync": false
    //         }
    //       },
    //       "size": {
    //         "value": 160,
    //         "random": false,
    //         "anim": {
    //           "enable": true,
    //           "speed": 10,
    //           "size_min": 40,
    //           "sync": false
    //         }
    //       },
    //       "line_linked": {
    //         "enable": false,
    //         "distance": 200,
    //         "color": "#ffffff",
    //         "opacity": 1,
    //         "width": 2
    //       },
    //       "move": {
    //         "enable": true,
    //         "speed": 8,
    //         "direction": "none",
    //         "random": false,
    //         "straight": false,
    //         "out_mode": "out",
    //         "bounce": false,
    //         "attract": {
    //           "enable": false,
    //           "rotateX": 600,
    //           "rotateY": 1200
    //         }
    //       }
    //     },
    //     "interactivity": {
    //       "detect_on": "canvas",
    //       "events": {
    //         "onhover": {
    //           "enable": false,
    //           "mode": "bubble"
    //         },
    //         "onclick": {
    //           "enable": false,
    //           "mode": "push"
    //         },
    //         "resize": true
    //       },
    //       "modes": {
    //         "grab": {
    //           "distance": 400,
    //           "line_linked": {
    //             "opacity": 1
    //           }
    //         },
    //         "bubble": {
    //           "distance": 400,
    //           "size": 40,
    //           "duration": 2,
    //           "opacity": 8,
    //           "speed": 3
    //         },
    //         "repulse": {
    //           "distance": 200,
    //           "duration": 0.4
    //         },
    //         "push": {
    //           "particles_nb": 4
    //         },
    //         "remove": {
    //           "particles_nb": 2
    //         }
    //       }
    //     },
    //     "retina_detect": true
    // }

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
                username : user.displayName,
                email : user.email,
                profilePicture : user.photoURL,
                phoneNumber : user.phoneNumber,
                dateCreated : date,
                friends : [],
            }
            await db.collection('users').add(payload).then(() => {
                dispatch({type : 'LOGGED_IN', payload: payload})
            }).catch(err=>{console.log(err)})
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    return(
        <div className="auth-container">
            <div className="signup-container">
                <h1 className="signup-header">Sign Up</h1>
                <img 
                    alt="Sign in with Google" 
                    onClick={signInWithGoogle} 
                    src="https://img.icons8.com/color/96/000000/google-logo.png" 
                />
            </div>
            <a id="reference" href="https://icons8.com/icon/17949/google">Google icon by Icons8</a>
        </div>
    )
}

export default Authentication;