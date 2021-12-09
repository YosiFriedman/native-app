import React, {useContext} from "react";
import { Body, Container, ListItem, Thumbnail, Left, Right } from "native-base";

import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
 
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import { SwipeListView } from "react-native-swipe-list-view";
import * as actions from "../../Redux/Actions/cartActions";
import AuthGlobal from '../../Context/store/AuthGlobal';
import StyledButton from '../../components/StyledComponents/StyledButton'
const Cart = (props) => {

  const context = useContext(AuthGlobal)

  let total = 0;
  return (
    <>
      {props.cartItems.length ? (
        <Container>
          {/* {console.log('props',props.cartItems)}
            {props.cartItems.map((data) => {
              return(
                <CartItem item={data}/>
              )
            })} */}
          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => (
            
                <CartItem item={data} />
              
             
            )}
            keyExtractor={(item, index) => index.toString()}
           
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity  style={styles.hiddenButton} onPress={()=> props.removeFromCart(data.item)}>
                  <Icon
                    name="trash"
                    color={"white"}
                    size={30}
                 
                  />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>${total}</Text>
            </Left>
            <Right>
            <StyledButton medium danger onPress={() => props.clearCart()}>
                <Text style={{color:"white"}} >נקה</Text>
                </StyledButton>
             
            </Right>
            <Right>
            {context.stateUser.isAuthenticated ?  
            <StyledButton medium primary onPress={() => props.navigation.navigate("Checkout")}>
            <Text style={{color:"white"}} >עבור לתשלום</Text>
            </StyledButton> 
           :
              (
                <StyledButton medium secondary onPress={() => props.navigation.navigate('User')}>
                <Text style={{color:"white"}} >התחבר</Text>
                </StyledButton>
              )
              }
             
            </Right>
          </View>
        </Container>
      ) : (
        <Container>
          <Text>looks like your cart is still empty</Text>
          <Text>add products to start</Text>
        </Container>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
const mapDispathToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: "100px",
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    elevation: 20,
  },
  price: {
    fontSize: 18,
    margin: 20,
    color: "red",
  },
  btnContainer: {
    backgroundColor: "#de4f35",
    height: 60,
    width: 100,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width:100
    
  },
});
export default connect(mapStateToProps, mapDispathToProps)(Cart);
