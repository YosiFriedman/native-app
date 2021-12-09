import React,{useState,useCallback,useEffect} from 'react'
import {View, FlatList,Text} from 'react-native'
import axios from 'axios'
import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native'
import OrderCard from '../../components/OrderCard';


const Orders = (props) => {
    const [token, setToken] = useState()
    const [orderList, setOrderList] = useState();

    const getOrders = () => {
        axios.get(`${baseURL}orders`)
        .then((res) => {
            setOrderList(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useFocusEffect(
        useCallback(
            () => {
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
export default Orders;