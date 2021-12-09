import React,{useState,useCallback,useContext} from 'react'
import {View, FlatList,Text} from 'react-native'
import axios from 'axios'
import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native'
import OrderCard from '../../components/OrderCard';
import AuthGlobal from '../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';

const BusinessOrders = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    const [token, setToken] = useState()
    const [orderList, setOrders] = useState();

    const getOrders = () => {
        axios.get(`${baseURL}orders`)
        .then((res) => {
          const data = res.data
          const userOrders = data.filter(
            (order) => order.orderItems.business === userProfile.business
          
          );
          setOrders(userOrders)
        })
        .catch((err) => console.log(err))
      
      
    }

  
        useEffect(() => {
        console.log('user',context.stateUser.isAuthenticated)
        console.log('userr',context.stateUser.user)
        console.log('userProfile',userProfile)
        console.log('orderlist',orderList)
        
       
        AsyncStorage.getItem("jwt")
        .then((res)=>{
          console.log('res', res)
          axios.get(`${baseURL}user/${context.stateUser.user.userId}`,{
            headers: {Authorization: `Bearer ${res}`},
          })
          .then((user) => setUserProfile(user.data))
        })
        .catch((error) => console.log(error))
      
        getOrders()
        return () => {
          setUserProfile();
          setOrders();
        }
      }, [context.stateUser.isAuthenticated])
    return (
        <View>
             <Text>business</Text>
           <FlatList
           data={orderList}
           renderItem={({item}) => (
            <OrderCard navigation = {props.navigation} {...item} editMode={true}/>
           )}
keyExtractor = {(item) => item.id}
           />
        </View>
    )
}
export default BusinessOrders;