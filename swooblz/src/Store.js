import React from 'react'

export const Store = React.createContext(); //creates context object

const initialState = {
    b_loggedIn: true,
    username: "Drewsup123",
    email : "drew@drew.com",
    profilePicture: "https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png",
    phoneNumber: "",
    dateCreated: "",
    friends: [],
}

function reducer(state, action) {
    switch(action.type){
        case 'LOGGED_IN':
            return{
                ...state, 
                b_loggedIn : true,
                username: action.payload.username,
                email: action.payload.email,
                profilePicture: action.payload.profilePicture,
                phoneNumber: action.payload.phoneNumber,
                dateCreated : action.payload.dateCreated,
                friends: action.payload.friends,
            }
        default:
            return state;
    }
}

export default function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch }; //creates an object from above statement that holds both the values
    return <Store.Provider value={value}>{props.children}</Store.Provider>
} 
// This will be the react component that will encapsulate the other components in the application. 
// It has an argument of props because that’s how we’ll get access to the other child components.
// This will be given to index.js to hold state