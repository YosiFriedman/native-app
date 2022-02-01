import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    ImageBackground,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
{/* <ImageBackground
source={require('../../assets/mainfood.jpg')}
style={{flex:1,justifyContent:'flex-end'}}
resizeMode='cover'>

</ImageBackground> */}
    return (
     <View style={{
        flex:2,
         backgroundColor:'black'
     }}>

     </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FF6347'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign:'right'
  },
  text: {
      color: 'grey',
      marginTop:5,
      textAlign:'right'
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30,
      
     
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

