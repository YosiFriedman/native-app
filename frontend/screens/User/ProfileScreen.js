import React, {useContext, useState, useCallback, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet,Button} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,

} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.Actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import baseURL from '../../assets/common/baseUrl';


const ProfileScreen = (props) => {
const context = useContext(AuthGlobal)
const [userProfile, setUserProfile] = useState()

useEffect(() => {
  console.log('user',context.stateUser.isAuthenticated)
 
  if(
    context.stateUser.isAuthenticated === false ||
    context.stateUser.isAuthenticated === null
  ) {
    props.navigation.navigate("Signin")
   
  }
  AsyncStorage.getItem("jwt")
  .then((res)=>{
    console.log('res', res)
    axios.get(`${baseURL}user/${context.stateUser.user.userId}`,{
      headers: {Authorization: `Bearer ${res}`},
    })
    .then((user) => setUserProfile(user.data))
  })
  .catch((error) => console.log(error))

  return () => {
    setUserProfile();
  }
}, [context.stateUser.isAuthenticated])
  

  return (
    <SafeAreaView style={styles.container}>
{console.log('userprofile',userProfile)}
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{userProfile ? userProfile.name : ""}</Title>
            
          </View>
        </View>
      </View>

      

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₪140.50</Title>
            <Caption>ארנק</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>הזמנות</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>הזמנות שלי</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>תשלום</Text>
          </View>
        </TouchableRipple>
       
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>לתמיכה ושיתופי פעולה</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>אודותינו</Text>
          </View>
        </TouchableRipple>
        <Button
                title={"התנתק"}
                onPress={() => [
                  AsyncStorage.removeItem("jwt"),
                  logoutUser(context.dispatch),
                console.log('after press',  context.stateUser.isAuthenticated )
                ]}
              />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
     direction:'rtl'
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
