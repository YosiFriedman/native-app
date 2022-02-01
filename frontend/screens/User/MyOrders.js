import React, {useContext, useState, useCallback, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet,Button, ScrollView} from 'react-native';
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
import Icon from "react-native-vector-icons/MaterialIcons";
import baseURL from '../../assets/common/baseUrl';
import OrderCard from '../../components/OrderCard';

const ProfileScreen = (props) => {
const context = useContext(AuthGlobal)
const [userProfile, setUserProfile] = useState()
const [orders, setOrders] = useState()

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
    <ScrollView>

    
    <SafeAreaView style={styles.container}>
{console.log('ordersmyorders',orders)}
      

      

<Title style={[styles.title, {
              marginTop:15,
              marginRight:15,
              marginBottom: 5,textAlign:'right'
            }]}>ההזמנות שלי</Title>

      <View>
      {orders ? (
              orders.map((x) => {
                return <OrderCard key ={x.id} {...x} editMode={false}/>;
              })
            ): (
              <View>
                <Text>no orders</Text>
              </View>
            )}
       
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
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
