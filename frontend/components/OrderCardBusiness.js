import React, {useEffect, useState} from 'react'
import {View, StyleSheet,Text} from 'react-native'
import {Picker} from 'native-base'
import Icon from "react-native-vector-icons/MaterialIcons";
import StyledButton from '../components/StyledComponents/StyledButton'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl'
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";


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
      orderItems: props.orderItems,
      dateOrder:props.dateOrdered,
      id: props.id,
      status: statusChange,
      totalPrice:props.totalPrice,
      user:props.user
    }


    axios.put(`${baseURL}order/${props._id}`, order, config)
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
        <>
         <Card
    elevation={5}
      style={{
        width: 350,
        marginRight: 20,
        margin:10,
        direction: "rtl",
        borderRadius: 10,
      }}
    >
    {console.log(props)}
    
    <Card.Content>
       
         <View style={{
          alignItems:'right',
          justifyContent:'right',
          padding:5        
        }}>      
         <Text style={{fontWeight:'bold'}}>מספר הטבה: {props.ordernumber}</Text>
         <Text style={{fontWeight:'bold'}}>תאריך רכישה: {props.dateOrdered.split("T")[0]}</Text>
      </View>
      <View>
{props.editMode ? (
    <>
    <View style={{flexDirection:'row'}}> 
    <StyledButton small primary onPress={() => updateOrder()}>
            <Text style={{color:"white"}}>עדכן</Text>
        </StyledButton>
   
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
    
    
        </View>
        </>
): null}
        </View>
      </Card.Content>
      <View style={{
          position:'absolute',
          bottom:25,
          height:50,
          width:75,
          backgroundColor:cardColor,
          borderRadius:15,
          alignItems:'center',
          justifyContent:'center',
          marginBottom:210,
          marginLeft:260,
          zIndex:1
        }}>
         
             <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>{props.status}</Text>
             {/* <Text style={{textDecorationLine:'line-through',}}>{props.originalprice}₪</Text>  */}
           
        </View>
      <Card.Cover style={{width:350, height: 200}}
        source={{ uri: props.orderItems[0].product.image ? props.orderItems[0].product.image : "https://picsum.photos/700" }}
        
      />
<View style={{
          position:'absolute',
          bottom:25,
          height:50,
          width:100,
          borderTopLeftRadius:25,
          borderBottomRightRadius:10,
          alignItems:'center',
          justifyContent:'center',
          marginLeft:250,
         
        }}>
         
             <Text style={{fontSize:20,fontWeight:'bold',color:'#FF6347'}}>{props.totalPrice}₪</Text>
             {/* <Text style={{textDecorationLine:'line-through',}}>{props.originalprice}₪</Text>  */}
           
        </View>
<Card.Content>
        <Card.Title
        
          title={props.orderItems[0].product.name}
          subtitle={props.orderItems[0].product.description}
        //   right={(props) => <Thumbnail style={{ width: 70 }} />}
        />
         <View style={{
          alignItems:'right',
          justifyContent:'right',
          marginLeft:12,
          flexDirection:'row'
          
        }}>      
         <Icon name="place" size={10} style={{ color: "black",paddingRight:2,paddingTop:2}}></Icon> 
         <Text style={{fontSize:12,fontWeight:'bold',color:'#FF6347',direction:'rtl'}}>{props.orderItems[0].product.business.name }  {props.orderItems[0].product.business.address } </Text>
    
        
  
      
         
       
      </View>
      
      </Card.Content>
     
      {/* <Card.Actions>
        <Button
         onPress={()=>
          props.navigation.navigate("Product Detail", {item:props})}>
           לרכישה</Button> 
         <Button onPress={() => {
          props.addItemToCart(props)
        }}>הוסף לעגלה</Button>
      </Card.Actions>  */}
   
    </Card>

</>
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