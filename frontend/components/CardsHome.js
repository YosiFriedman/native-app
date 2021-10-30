import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Container, Content, Icon, Thumbnail } from "native-base";
import CardListScreen from "../screens/CardListScreen";
import ProductContainer from "../screens/Products/ProductContainer";

const CardsHome = (props) => {
  const {item} = props
console.log('item props', props.categoryid)
 
    return (
      <>
      <View style={{ height: 350 }}>
      <ProductContainer navigation={props.navigation} categoryid={props.categoryid}/>
      </View>
      </>
    );
 
}
export default CardsHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  thumstyle: {
    marginHorizontal: 15,
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 10,
    width: 60,
    height: 60,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "black",
    fontWeight: "bold",
  },
});
