import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

import Card from '../components/Card';

const data = require('../assets/data/products.json');

const CardListScreen = ({navigation}) => {
const [products, setProducts] = useState([])

useEffect(() => {
  setProducts(data);
  return () => {
    setProducts([])
  }
}, [])
    const renderItem = ({props}) => {
        return (
            <Card 
                itemData={item}
                onPress={()=> navigation.navigate('CardItemDetails', {itemData: item})}
            />
        );
    };

    return (
      <View style={styles.container}>
        <FlatList 
            data={products}
            renderItem={({item}) => <Text>{item.brand}</Text>}
            keyExtractor={item => item.name}
        />
      </View>
    );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '90%',
    alignSelf: 'center'
  },
});
