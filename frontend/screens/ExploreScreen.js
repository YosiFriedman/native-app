import { Button, Row } from 'native-base';
import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image,TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import foods from '../model/foods';



const ExploreScreen = ({navigation}) => {
  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <Image source={item.image} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
          <Text style={{fontSize: 13, color: 'greyc'}}>
            {item.ingredients}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>₪{item.price}</Text>
        </View>
        <View style={{marginRight: 25, alignItems: 'center'}}>
         <Row>
          <View style={style.actionBtn}>
            <Icon name="remove" size={25} style={{color:'white'}} />
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 18,margin:2}}>3</Text>
            <View style={style.actionBtn}>
            <Icon name="add" size={25} style={{color:'white'}} />
            </View>
            </Row>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={foods}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Total Price
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>₪30.05</Text>
            </View>
            <View style={{marginHorizontal: 30}}>
            <TouchableOpacity activeOpacity={0.8} >
              <View style={style.btnContainer}>
                <Text style={style.title}>לסיום הזמנה</Text>
              </View>
    </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 50,
    height: 30,
    backgroundColor: '#de4f35',
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop:3
  },
  btnContainer: {
    backgroundColor:'#de4f35' ,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {color: 'white', fontWeight: 'bold', fontSize: 18},
});

export default ExploreScreen;