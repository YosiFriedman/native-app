import React,{useState,useCallback,useContext} from 'react'
import {View, FlatList,Text} from 'react-native'
import axios from 'axios'
import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native'
import OrderCard from '../../components/OrderCard';
import AuthGlobal from '../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';
import OrderCardBusiness from '../../components/OrderCardBusiness';

const BusinessOrders = (props) => {
    const context = useContext(AuthGlobal)
    
    const [token, setToken] = useState()
    const [orderList, setOrders] = useState();

    const getOrders = () => {
        axios.get(`${baseURL}orderitems/${context.stateUser.user.business}`)
        .then((res) => {
          setOrders(res.data)
        })
        .catch((err) => console.log(err))
      
      
    }

  
        useEffect(() => {
        
        console.log('userr',context.stateUser.user)
       
       
        
       
      
        getOrders()
        return () => {
      
          setOrders();
        }
      }, [context.stateUser.isAuthenticated])
    return (
        <View>
             <Text>business</Text>
           <FlatList
           data={orderList}
           renderItem={({item}) => (
            <OrderCardBusiness navigation = {props.navigation} {...item} editMode={true}/>
           )}
keyExtractor = {(item) => item.id}
           />
        </View>
    )
}
export default BusinessOrders;