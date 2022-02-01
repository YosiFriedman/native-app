import React, {useContext, useState, useCallback, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet,ImageBackground} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,

} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.Actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import baseURL from '../../assets/common/baseUrl';
import OrderCard from '../../components/OrderCard';

const ProfileScreen = (props) => {
const context = useContext(AuthGlobal)
const [userProfile, setUserProfile] = useState()
const [orders, setOrders] = useState()
const image = { uri: "https://reactjs.org/logo-og.png" };
useFocusEffect(
  useCallback(() => {
  console.log('user',context.stateUser.isAuthenticated)
  console.log('user',context.stateUser.isAuthenticated)
 
  if(
    context.stateUser.isAuthenticated === false ||
    context.stateUser.isAuthenticated === null
  ) {
    props.navigation.navigate("Signin")
   
  }
  AsyncStorage.getItem("jwt")
  .then((res)=>{
    console.log('res', res)
    axios.get(`${baseURL}user/${context.stateUser.user.userId}`,{
      headers: {Authorization: `Bearer ${res}`},
    })
    .then((user) => setUserProfile(user.data))
  })
  .catch((error) => console.log(error))

  axios.get(`${baseURL}orders`)
  .then((res) => {
    const data = res.data
    const userOrders = data.filter(
      (order) => order.user._id === context.stateUser.user.userId
    );
    setOrders(userOrders)
  })
  .catch((err) => console.log(err))
  
  return () => {
    setUserProfile();
    setOrders();
  }
}, [context.stateUser.isAuthenticated]))
  

  return (
    <>
   
    <SafeAreaView style={styles.container}>
{console.log('userprofile',userProfile)}

      <View style={styles.userInfoSection}>
     
          <View style={{textAlign:'center', paddingTop:15}}>
          <Avatar.Image 
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
            }}
            size={80}
          />
          
          <Title style={[styles.title, {
             
            }]}>{userProfile ? userProfile.name : ""}</Title>
            
          </View>
       
      </View>

      

      <View style={styles.infoBoxWrapper}>
          {/* <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₪140.50</Title>
            <Caption>ארנק</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>הזמנות</Caption>
           
          </View> */}
      </View>

      <View style={styles.menuWrapper}>
        {/* <TouchableRipple onPress={() => {props.navigation.navigate('MyOrders')}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>הזמנות שלי</Text>
          </View>
        </TouchableRipple> */}
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>תשלום</Text>
          </View>
        </TouchableRipple>
       
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>לתמיכה ושיתופי פעולה</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-group" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>אודותינו</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => [
                  AsyncStorage.removeItem("jwt"),
                  logoutUser(context.dispatch),
                console.log('after press',  context.stateUser.isAuthenticated )
                ]}>
          <View style={styles.menuItem}>
            <Icon name="exit-to-app" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>התנתק</Text>
          </View>
        </TouchableRipple>
       
      </View>
    </SafeAreaView>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    
    paddingHorizontal: 160,
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
   
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
     direction:'rtl'
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
