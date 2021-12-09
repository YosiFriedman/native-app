import React,{useState,useCallback,useContext} from 'react'
import {View, FlatList,Text} from 'react-native'
import axios from 'axios'
import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native'
import OrderCard from '../../components/OrderCard';
import AuthGlobal from '../../Context/store/AuthGlobal';

const BusinessProducts = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    const [token, setToken] = useState()
    const [orderList, setOrders] = useState();

    const getOrders = () => {
        axios.get(`${baseURL}orders`)
        .then((res) => {
          const data = res.data
          const businessOrders = data.filter(
            (order) => order.user.business === userProfile.business
          );
          setOrders(businessOrders)
        })
        .catch((err) => console.log(err))
      
    }

    useFocusEffect(
        useCallback(
            () => {
                axios.get(`${baseURL}user/${context.stateUser.user.userId}`,{
                    headers: {Authorization: `Bearer ${token}`},
                  })
                  .then((user) => setUserProfile(user.data))
                .catch((error) => console.log(error))

                getOrders()
                return () => {
                    setOrderList()
                }
            },[],
        )
    )
    
    return (
        <View>
           
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
export default BusinessProducts;