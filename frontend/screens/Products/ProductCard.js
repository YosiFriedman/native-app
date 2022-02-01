import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Container, Content, Row, Thumbnail } from "native-base";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
const ProductCard = (props) => {
  const { name, price, image,originalprice, description, countInStock } = props;
  
  console.log('PRODUCTCARD',props)
  return (
    <Card
    elevation={5}
      style={{
        width: 270,
        marginRight: 20,
        direction: "rtl",
        borderRadius: 10,
      }}
    >
    {console.log(props)}
   
      <Card.Cover style={{width:270, height: 200,borderTopRightRadius:15,borderTopLeftRadius:15}}
        source={{ uri: image ? image : "https://picsum.photos/700" }}
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
          marginLeft:180
        }}>
         
             <Text style={{fontSize:20,fontWeight:'bold',color:'#FF6347'}}>{price}₪</Text>
             <Text style={{textDecorationLine:'line-through',}}>{originalprice}₪</Text> 
           
        </View>
<Card.Content>
        <Card.Title
        
          title={name}
          subtitle={description}
          right={(props) => <Thumbnail style={{ width: 70 }} />}
        />
         <View style={{
          alignItems:'right',
          justifyContent:'right',
          marginLeft:12,
          flexDirection:'row'
          
        }}>      
         <Icon name="place" size={10} style={{ color: "black",paddingRight:2,paddingTop:2}}> </Icon> 
         <Text style={{fontSize:12,fontWeight:'bold',color:'#FF6347',direction:'rtl'}}>{props.business.name} </Text>
         {/* {props.business.address} */}
  
      
         
       
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
    // <TouchableOpacity style={{marginBottom:10}}>
    //   <View style={{
    //     marginBottom:15
    //   }}>
    //   <Card.Cover style={{width:300, height: 200, borderRadius:'25px'}}
    //     source={{ uri: image ? image : "https://picsum.photos/700" }}
    //   />
    //     <View style={{
    //       position:'absolute',
    //       bottom:0,
    //       height:50,
    //       width:100,
    //       backgroundColor:'white',
    //       borderTopLeftRadius:25,
    //       borderBottomRightRadius:10,
    //       alignItems:'center',
    //       justifyContent:'center',
    //       marginLeft:200
    //     }}>
         
    //          <Text style={{fontSize:20}}>{price}₪</Text>
    //          <Text style={{textDecorationLine:'line-through',}}>{originalprice}₪</Text> 
           
    //     </View>
    //     {/* <View style={{
    //       position:'absolute',
    //       bottom:140,
    //       height:50,
    //       width:50,
    //       backgroundColor:'white',
    //       borderRadius:100,
    //       alignItems:'center',
    //       justifyContent:'center',
    //       marginLeft:10
    //     }}>
         
    //      <Card.Cover style={{ height:50,
    //       width:50,borderRadius:100}}
    //       source={require("../../assets/logos/logo4.jpg")}
    //   />
           
    //     </View> */}
        
    //   </View>
    //   {/* info */}
     
    //   <Text style={{fontSize:20}}>{name}</Text>
    
      
        
    
    // </TouchableOpacity>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => dispatch(actions.addToCart({quantity: 1, product, business:product.business,status:'ממתין'})),
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
