import React, {useEffect,useState,useContext} from "react";
import { View, Text,Button,Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  ListItem,
  Radio,
  Right,
  Left,
  Picker,
  Icon,
  Body,
  Title,
  Thumbnail,
  
} from "native-base";
import {connect} from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message';
import baseURL from '../../../assets/common/baseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import AuthGlobal from '../../../Context/store/AuthGlobal';
import { useFocusEffect } from '@react-navigation/native';
const Payment = (props) => {
const context = useContext(AuthGlobal);
const [orderItems, setOrderItems ] = useState();
const [user, setUser ] = useState();
const [token, setToken] = useState()

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  const methods = [{ name: "כרטיס אשראי", value: "1" }];
  const paymentCards = [

    { name: "אפל פיי", value: "1" },
    { name: "ויזה", value: "2" },
    { name: "מאסטרקארד", value: "3" },
  ];
  useFocusEffect(
    React.useCallback(() => {
      
      return () => {
        props.clearCart();
      };
    }, [])
  );
  useEffect(() => {
    
    setOrderItems(props.cartItems)
    if(context.stateUser.isAuthenticated){
      setUser(context.stateUser.user.userId)
    }else{
      props.navigation.navigate("Cart");
      Toast.show({
        type:'error',
        text1:"אנא התחבר קודם",
        text2:" "
      })
    }

}, [orderItems])
console.log('orderitems state',props.cartItems)

const finalorder = props.cartItems;
console.log(props.route.params)
const confirm = () => {
  const order = {
    orderItems:finalorder,
    user:user
  }

  axios.post(`${baseURL}order`, order, {
    headers:{Authorization: `Bearer ${token}`}
  })
  .then((res) => {
    if(res.status == 200 || res.status == 201) {
      Toast.show({
        topOffset:60,
        type:"success",
       text1:"ההזמנה בוצעה בהצלחה",
       text2:" "
      })
      setTimeout(() =>{
        props.clearCart();
        props.navigation.navigate("Home")
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
  AsyncStorage.getItem("jwt")
    .then((res) => {
      setToken(res);
    })
    .catch((err) => {
      console.log(err);
    });
  
}, []);

  return (
    <Container>
      <Header>
        <Body>
          <Title>סיכום הזמנה</Title>
         
        </Body>
      </Header>
      <Content>
{/* <Text>מוצרים:</Text> */}
{props.cartItems.map((x) =>{
    return(
<ListItem key={x.product._id}
avatar>
    <Left>
        <Thumbnail source={{uri:x.product.image}}/>
    </Left>
    <Body>
        <Left>
            <Text>{x.product.name}</Text>
        </Left>
        <Right>
            <Text>{x.product.price}</Text>
            <Text>{x.quantity}</Text>
        </Right>
    </Body>

</ListItem>
    )
})}

      </Content>
      <Header>
        <Body>
          <Title>בחר את שיטת התשלום</Title>
        </Body>
      </Header>
      <Content>
        {methods.map((item, index) => {
          return (
            <ListItem onPress={() => setSelected(item.value)}>
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={selected == item.value} />
              </Right>
            </ListItem>
          );
        })}
        {selected == 1 ? (
          <Picker
            mode="dropdown"
            iosIcon={<Icon name={"arrow-down"} />}
            headerStyle={{ backgroundColor: "orange" }}
            headerBackButtonTextStyle={{ color: "#fff" }}
            headerTitleStyle={{ color: "#fff" }}
            selectedValue={card}
            onValueChange={(x) => setCard(x)}
          >
            {paymentCards.map((c, index) => {
              return <Picker.Item label={c.name} value={c.value} key={c.name} />;
            })}
          </Picker>
        ) : null}
        <View style={{marginTop: 60, alignSelf:'center'}}>
            <Button title={'אשר'}
            onPress={() => confirm()}>

            </Button>

        </View>
      </Content>
    </Container>
  );
};


const mapStateToProps = (state) => {
    const { cartItems } = state
    return{
        cartItems:cartItems,
    }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    clearCart: () => dispatch(actions.clearCart())
    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Payment)
