import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet,TouchableOpacity, Dimensions } from 'react-native';
import ProductCard from './ProductCard';
var {width}  = Dimensions.get("window")


const ProductList = (props) => {

    const {item} = props;
    return (
    
          <View style={{ width: 50,marginRight:300 }} >
           <TouchableOpacity style={{width:'50%'}}
           onPress={()=>
           props.navigation.navigate("Product Detail", {item:item})}>
        <ProductCard {...item} /> 
        </TouchableOpacity>
        </View>
     
    );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '90%',
    alignSelf: 'center'
  },
});
