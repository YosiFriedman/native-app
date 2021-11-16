import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet,ScrollView, } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import ProductList from './ProductList';





const ProductContainer = (props) => {
const [products, setProducts] = useState([])

useEffect(() => {
  console.log('cardshomeprops',baseURL)
  axios.get(`${baseURL}products?categories=${props.categoryid}`)
.then((res) => {
  
  setProducts(res.data)
}).catch((err) => {
  console.log(err)
})
console.log(products)
  return () => {
    setProducts([])
  }
}, [])
    
    return (
      
      
        <FlatList 
            style={{ direction: "rtl" }}
            horizontal={true}
            showsHorizontalScrollIndicator={false} 
            data={products}
            renderItem={({item}) => { return <ProductList
            navigation={props.navigation}
            key={item.id}
            item={item}/>}}
            keyExtractor={item => item.name}
            contentContainerStyle={{
                alignItems: "center",
              paddingStart: 30,
              paddingEnd: 30,
              
                
              }}
              
        />
    
      
    );
};

export default ProductContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    alignSelf: 'center'
  },
});
