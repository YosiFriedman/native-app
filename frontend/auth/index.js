
import AsyncStorage from '@react-native-community/async-storage';
export const signup = (user) => {
    return fetch(`http://localhost:8000/api/signup`,{
       method: "POST",
       headers:{
           Accept:'application/json',
           "Content-Type": "application/json"
       },
       body: JSON.stringify(user)
   })
   .then(response => {
       return response.json()
   })
   .catch(err => {
       console.log(err)
   })
}
export const signin = (user) => {
    return fetch(`http://localhost:8000/api/signin`,{
       method: "POST",
       headers:{
           Accept:'application/json',
           "Content-Type": "application/json"
       },
       body: JSON.stringify(user)
   })
   .then(response => {
       return response.json()
   })
   .catch(err => {
       console.log(err)
   })
}
export const signout = (next) => {
    if(typeof window !== 'undefined') {
        AsyncStorage.removeItem('jwt')
        next();
        return fetch(`http://localhost:8000/api/signout`, {
            method: "GET",
        })
        .then(response => {
            console.log('signout', response)
        })
        .catch(err => console.log(err));
}
}

export const authenticate = (data, next) => {
    if(typeof global.window !== 'undefined') {
        AsyncStorage.setItem('jwt', JSON.stringify(data))
        next();
    }
}
export const isAuthenticated = () => {
    if(typeof global.window == 'undefined') {
        return false;
    }
    if(AsyncStorage.getItem('jwt')) {
        return AsyncStorage.getItem('jwt');
    } else {
        return false;
    }
}

export const auth = (data) => {
    AsyncStorage.setItem('jwt', JSON.stringify(data))
.then(() => {
  console.log(data);
})
.catch((error) => {
  console.log(error);
});
}
export const islogedin = () => {
    AsyncStorage.getItem('jwt')
      .then((value) => {
        const user = JSON.parse(value);
        Alert.alert(`${user.name} ${user.gender} ${user.age}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

