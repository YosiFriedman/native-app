import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";

const CartItem = (props) => {
  const data = props.item;
  const [quantity, setQuantity] = useState(props.item.item.quantity);
  const [business, setBusiness] = useState(props);
  const [status, setStatus] = useState(props.item.status);
  console.log('business',props.item)
  console.log('carddataid',props)
  return (
    <ListItem style={styles.listItem} key={Math.random()} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: data.item.product.image
              ? data.item.product.image
              : "https://picsum.photos/700",
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Left>
          <Text>{data.item.product.name}</Text>
        </Left>
        <Right>
          <Text>₪{data.item.product.price}</Text>
          <Text>{quantity}</Text>
        </Right>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
   
    listItem:{
        alignItems: "center",
        backgroundColor:"white",
        justifyContent:"center"
    },
    body:{
        margin: 10,
        alignItems:"center",
        flexDirection:'row'
    },

})
export default CartItem;
