import React, {useEffect,useState} from 'react'
import { Text,View,Button } from 'react-native'
import { Item, Picker } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import FormContainer from '../../Form/FormContainer'
import Input from '../../Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {connect} from 'react-redux'

const Checkout = (props) => {
    const [orderItems, setOrderItems ] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname ] = useState(); 
    const [phone, setPhone] = useState();
    const [personalid, setPersonalid] = useState();

    useEffect(() => {
        setOrderItems(props.cartItems)

    }, [orderItems])
    const checkOut = () => {
        let order = {
            dateOrdered: Date.now(),
            orderItems,
            phone,
            firstname,
            lastname,
            personalid
        }
        props.navigation.navigate("Payment", {order: order})
    }
    return(
        <KeyboardAwareScrollView 
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
        >
            <FormContainer title="מלא פרטיך">
                <Input 
                placeholder="שם פרטי"
                name="firstname"
                value={firstname}
                onChangeText={(text) => setFirstname(text)}
                />
                <Input 
                placeholder="שם משפחה"
                name="lastname"
                value={lastname}
                onChangeText={(text) => setLastname(text)}
                />
                 <Input 
                placeholder="פלאפון"
                name="phone"
                value={phone}
                keyboardType={"numeric"}
                onChangeText={(text) => setPhone(text)}
                />
                  <Input 
                placeholder="מספר ת.ז"
                name="personalid"
                value={personalid}
                keyboardType={"numeric"}
                onChangeText={(text) => setPersonalid(text)}
                />
                <View style={{width:'80%', alignItems:"center"}}>
                    <Button title="המשך לתשלום" onPress={ () => checkOut()}/>
                </View>
            </FormContainer>

        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state
    return{
        cartItems:cartItems,
    }
}

export default connect(mapStateToProps,null)(Checkout);