import React, {useEffect, useState} from 'react'
import {View, StyleSheet,Text} from 'react-native'
import {Picker} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import StyledButton from '../components/StyledComponents/StyledButton'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl'



const OrderCardBusiness = (props) => {

    const [orderStatus, setOrderStatus] = useState()
    const [statusText, setStatusText] = useState()
    const [statusChange, setStatusChange] = useState()
    const [token, setToken] = useState()
    const [cardColor, setCardColor] = useState()
   const codes = [
       {name:"ממתין"},
       {name:"הועבר"},
   ]


   const updateOrder = () => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}` 
        }
    }
    const order = {
        id: props._id,
        status: statusChange,
    }


    axios.put(`${baseURL}orderitem/${props._id}`, order, config)
    .then((res) => {
        if(res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset:60,
            type:"success",
           text1:"ההזמנה עודכנה בהצלחה",
           text2:" "
          })
          setTimeout(() =>{
           
            props.navigation.navigate("BusinessProducts")
          },500) 
        }
      })
      .catch((err) => {
        Toast.show({
          topOffset:60,
          type:"error",
          text1:"משהו השתבש",
          text2:"אנא נסה שוב"
        })
      })
    }
    useEffect(() => {
if(props.editMode){
    AsyncStorage.getItem('jwt')
    .then((res)=>{
        setToken(res)
    }).catch((err) => {
        console.log(err)
    })
}
       
        if(props.status == "ממתין"){
            setOrderStatus("ממתין")
            setStatusText("ממתין")
            setCardColor("#e74c3c")
        } else if(props.status == "הועבר"){
            setOrderStatus("הועבר")
            setStatusText("הועבר")
            setCardColor("#2ecc71")
        }  
        return () =>{
            setOrderStatus()
            setStatusText()
            setCardColor()
        }
    })

    
    return(
<View style={[{backgroundColor: cardColor},styles.container]}>
    <View style={styles.container}>
        <Text>מספר הזמנה: {props._id}</Text>
       

    </View>
    <View style={{marginTop: 10}}>
        <Text> סטטוס: {statusText}  </Text>
    
        <View style={styles.priceContainer}>
         
            <Text style={styles.price}>₪ {props.totalPrice}</Text>
            <Text >מחיר: </Text>
        </View>
        <View>
{props.editMode ? (
    <>
    <Picker
    mode="dropdown"
    iosIcon={<Icon color={"#007aff"} name="arrow-down"/>}
    style={{width: undefined}}
    selectedValue={statusChange}
    placeholder="שנה סטטוס"
    placeholderIconColor={{color: "#007aff"}}
    onValueChange={(e) => setStatusChange(e)}
    >
        {codes.map((c) => {
            return (
                <Picker.Item key={c.name} label={c.name} value={c.name} />
            )
        })}
        
        
            
    </Picker>
    <StyledButton small secondary onPress={() => updateOrder()}>
            <Text style={{color:"white"}}>עדכן</Text>
        </StyledButton>
        </>
): null}
        </View>
        
        
    </View>
</View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding:20,
        margin:10,
        borderRadius:10
    },
    title:{
        backgroundColor:"#62b1f6",
        padding:5
    },
    priceContainer: {
        marginTop:10,
        alignSelf:"flex-end",
        flexDirection:"row"
    },
    price:{
        color:"white",
        fontWeight:"bold"
    }
})

export default OrderCardBusiness;