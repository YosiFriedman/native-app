import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  Image,
  Modal,
  TouchableHighlight
} from "react-native";
import StyledButton from '../../components/StyledComponents/StyledButton'
import Icon from 'react-native-vector-icons/FontAwesome'
var {height, width} = Dimensions.get("window")

export const ListItem = (props) => {
    const [modalVisible, setModalVisible] = useState(false)
  return(
<View >
    <Modal
    
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        setModalVisible(false)
    }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TouchableHighlight
                underlayColor="#e8e8e8"
                onPress={() => {
                    setModalVisible(false)
                }}
                style={{
                    alignSelf:"flex-end",
                    position:"absolute",
                    top:5,
                    right:10
                }}>
                    <Icon name="close" size={20}/>

                </TouchableHighlight>
                <StyledButton primary small
                onPress={() => [
                    props.navigation.navigate("AdminProductFrorm", {item: props}),
                    setModalVisible(false)
                ]}
                >
                    <Text>ערוך</Text>
                    </StyledButton>
                <StyledButton danger small
                 onPress={() => [props.delete(props._id), setModalVisible(false)]} delete event
                 >
<Text>מחק</Text>
                </StyledButton>
               
               
            </View>
        </View>
    </Modal>
    <TouchableOpacity
    onPress={() => {
        props.navigation.navigate("Product Detail", {item: props})
    }}
    onLongPress={() => setModalVisible(true)}
    style={[styles.container, {
        backgroundColor:props.index % 2 == 0 ? "white": "gainsboro"
    }]}>
        <Image
        source={{uri: props.image ? props.image : null }}
        resizeMode="contain"
        style={styles.image}
        />
        <Text style={styles.item}>{props.business.name}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.category.name}</Text>
        <Text>{props.price} ₪</Text>
    </TouchableOpacity>
</View>
  ) 
};

const styles = StyleSheet.create({
    container: {
      flexDirection:"row",
      padding:5,
      width : width  
    },
    image: {
        borderRadius: 50,
        width:width / 6,
        height: 20,
        margin: 4,
    },
    item:{
        flexWrap:"wrap",
        margin: 3,
        width: width / 6
    },
    centeredView: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginTop:22
    },
    modalView:{
        margin:20,
        backgroundColor:"white",
        borderRadius:20,
        padding:35,
        alignItems:"center",
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5
        
    }
})
export default ListItem;
