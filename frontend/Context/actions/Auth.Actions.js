import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import baseURL from '../../assets/common/baseUrl';

export const SET_CURRENT_USER = "SET_CURRENT_USER";


export const loginUser = (user, dispatch) => {
    console.log('loginuser',user)
    fetch(`${baseURL}signin`,{
        method:"POST",
       
        body:JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
        },
    })
    .then((res) => res.json())
    .then((data)=> {
        if(data) { 
            const token = data.token;
            AsyncStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded, user)) 
        } else {
            logoutUser(dispatch)
        }
    })
    .catch((err) => {
        console.log(err)
        logoutUser(dispatch)
    })
}

export const getUserProfile = (id) => {
    fetch(`${baseURL}user/${id}`,{
        method:"get",
        body:JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-type":"application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => {
        console.log(err)
    })
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt")
    dispatch(setCurrentUser({}))
}



export const setCurrentUser = (decoded, user) => {
    return{
        type: SET_CURRENT_USER,
        payload:decoded,
        userProfile: user
    }
}