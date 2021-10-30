import React, {useEffect,useState} from "react";
import { View, Text,Button } from "react-native";
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
import {connect} from 'react-redux'
import * as actions from '../../../Redux/Actions/cartActions'
const Payment = (props) => {
const [orderItems, setOrderItems ] = useState();
 
 
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  const methods = [{ name: "כרטיס אשראי", value: "1" }];
  const paymentCards = [

    { name: "אפל פיי", value: "1" },
    { name: "ויזה", value: "2" },
    { name: "מאסטרקארד", value: "3" },
  ];
  useEffect(() => {
    console.log(props.cartItems)
    setOrderItems(props.cartItems)

}, [orderItems])
console.log('the props',props.cartItems)

const confirm = () => {
   setTimeout(() =>{
     props.clearCart();
     props.navigation.navigate("Cart")
   },500) 
}

  return (
    <Container>
      <Header>
        <Body>
          <Title>סיכום הזמנה</Title>
        </Body>
      </Header>
      <Content>
<Text>מוצרים:</Text>
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
