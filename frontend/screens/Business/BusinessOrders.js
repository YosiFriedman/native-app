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
import { Header, Item, Input } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome'

const BusinessOrders = (props) => {
    const context = useContext(AuthGlobal)
    
    const [token, setToken] = useState()
    const [orderList, setOrders] = useState();
    const [orderFilter, setOrderFilter] = useState();
    const getOrders = () => {
        axios.get(`${baseURL}orderbusiness/${context.stateUser.user.business}`)
        .then((res) => {
          setOrders(res.data)
          setOrderFilter(res.data)
        })
        .catch((err) => console.log(err))
      
      
    }

    const searchOrder = (text) => {
      if(text == ""){
          setOrderFilter(orderList)
      }
      setOrderFilter(
          orderList.filter((i) => i.ordernumber.toString().includes(text.toString())
          )
      )
  }
        useEffect(() => {    
        console.log('userr',context.stateUser.user)
        getOrders()
        return () => {
      setOrderFilter();
          setOrders();
        }
      }, [context.stateUser.isAuthenticated])
    return (
        <View>
            <View>
          <Header searchBar rounded>
              <Item style={{padding: 5}}>
                  <Icon  name="search"/>
                  <Input placeholder="חפש" onChangeText={(text) => searchOrder(text)} />
                  

              </Item>

          </Header>
      </View>
           <FlatList
           data={orderFilter}
           renderItem={({item}) => (
            <OrderCardBusiness navigation = {props.navigation} {...item} editMode={true}/>
           )}
keyExtractor = {(item) => item.id}
           />
        </View>
    )
}
export default BusinessOrders;