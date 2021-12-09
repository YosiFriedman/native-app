import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
  
} from "react-native";
import { Header, Item, Input } from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome'
import { useFocusEffect } from '@react-navigation/native'

import axios from 'axios'
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-community/async-storage'

import ListItem from './ListItem';
import StyledButton from "../../components/StyledComponents/StyledButton";
var {height, width} = Dimensions.get("window")
const ListHeader = () => {
    return(
        <View
        elevation={1}
        style={styles.listHeader}>
            <View  style={styles.headerItem}></View>
            <View  style={styles.headerItem}>
                <Text>בית עסק</Text>
            </View>
            <View  style={styles.headerItem}>
                <Text>שם</Text>
            </View>
            <View  style={styles.headerItem}>
                <Text>קטגוריה</Text>
            </View>
            <View  style={styles.headerItem}>
                <Text>מחיר</Text>
            </View>
        </View>
    )
}
const Products = (props) => {
    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(() => {
            // Get Token
            AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            }).catch((error) => console.log(error))

            axios.get(`${baseURL}products`)
            .then((res) => {
                setProductList(res.data)
                setProductFilter(res.data)
                setLoading(false);
            })
            return () => {
                setProductFilter()
                setProductList()
                setLoading(true)
            }
        },[],
        )
    )
    const searchProduct = (text) => {
        if(text == ""){
            setProductFilter(productList)
        }
        setProductFilter(
            productList.filter((i) => i.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const deleteProduct = (id) => {
        axios.delete(`${baseURL}product/${id}`, {
            headers:{Authorization: `Bearer ${token}`}
        })
        .then((res) =>{
            const products = productFilter.filter((item) => item.id !== id)
            setProductFilter(products)
        })
        .catch((err) => console.log(err))
    }
  return (
    
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <StyledButton large secondary 
            onPress ={() => props.navigation.navigate("AdminOrders")}
            >
                <Icon name="shopping-bag" size={18} color="white" />
                <Text style={styles.buttonText}>הזמנות</Text>
            </StyledButton>
       

        <StyledButton large secondary 
            onPress ={() => props.navigation.navigate("AdminProductFrorm")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>מוצרים</Text>
            </StyledButton>
        

      
        <StyledButton large secondary 
            onPress ={() => props.navigation.navigate("AdminCategories")}
            >
                <Icon name="plus" size={18} color="white" />
                <Text style={styles.buttonText}>קטגוריות</Text>
            </StyledButton>
        </View>
      <View>
          <Header searchBar rounded>
              <Item style={{padding: 5}}>
                  <Icon  name="search"/>
                  <Input placeholder="חפש" onChangeText={(text) => searchProduct(text)} />
                  

              </Item>

          </Header>
      </View>
      {loading ? (
          <View>
              <ActivityIndicator size ="large" color ="orange"/>
              </View>
      ) : (
          <FlatList ListHeaderComponent={ListHeader} data={productFilter} renderItem={({item,index}) =>(
            <ListItem
            {...item}
            navigation={props.navigation}
            index={index} 
            delete ={deleteProduct}/>
          )}
          keyExtractor= {(item) => item.id} />
              
          
      )}
    </View>
  
  );
};

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: "row",
        padding: 5,
        backgroundColor:'gainsboro',
    },
    headerItem:{
        margin: 3,
        width: width / 6
    },

    spinner:{

    },
    container:{
       marginBottom:16,
       backgroundColor:'white',
    },
    buttonContainer:{
        margin:20,
        alignSelf:'center',
        flexDirection:'row',
    },
    buttonText:{
        marginLeft:4,
        color:"white"
    }
})
export default Products;
