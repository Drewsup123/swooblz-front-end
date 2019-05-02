import React from 'react'

export const Store = React.createContext(); //creates context object

const initialState = {
    b_loggedIn: true,
    username: "Drewsup123",
    email : "drew@drew.com",
    profilePicture: "http://svgur.com/i/65U.svg",
    phoneNumber: "",
    dateCreated: "",
    friends: [],
    channels:[],
}

const empty = {
    b_loggedIn: false,
    username: "",
    email : "",
    profilePicture: "",
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
        case 'SIGNED_OUT':
            return{empty}
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