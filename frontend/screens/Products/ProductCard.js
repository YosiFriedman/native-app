import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Container, Content, Icon, Thumbnail } from "native-base";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
const ProductCard = (props) => {
  const { name, price, image, description, countInStock } = props;
  
  console.log('PRODUCTCARD',props)
  return (
    <Card
      style={{
        width: 300,
        margin: 10,
        direction: "rtl",
        borderRadius: 10,
      }}
    >
    {console.log(props)}
      <Card.Content>
        <Card.Title
          title={name}
          subtitle={description}
          right={(props) => <Thumbnail style={{ width: 70 }} />}
        />
      </Card.Content>
      <Card.Cover
        source={{ uri: image ? image : "https://picsum.photos/700" }}
      />

      <Card.Actions>
        <Button
         onPress={()=>
          props.navigation.navigate("Product Detail", {item:props})}>
           ראה עוד</Button>
        <Button onPress={() => {
          props.addItemToCart(props)
        }}>הוסף לעגלה</Button>
      </Card.Actions>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => dispatch(actions.addToCart({quantity: 2, product, business:product.business,status:'ממתין'})),
  };
};
export default connect(null, mapDispatchToProps)(ProductCard);

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
