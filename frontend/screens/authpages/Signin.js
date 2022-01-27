import React, {useState} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Button,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Redirect} from 'react-router-native'
import { useTheme } from 'react-native-paper';

import { signin, authenticate, isAuthenticated,auth, islogedin } from '../../auth/index';



const Signin = ({history}) => {
const[startmail, setStartEmail] = useState('user@gmail.com')
const[startpassword, setStartPassword] = useState('1234567890')

    const [values, setValues] = useState({
        mail: '',
        password: '',
        errortype: '',
        user:'',
        error: false,
        successmsg: false,
        loading: false,
        redirectToReferrer: false,
    });
values.mail = startmail
values.password = startpassword
    const { colors } = useTheme();

    const { mail, password, error, loading, redirectToReferrer,user } = values
    
    
      const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, loading: true, successmsg: false, error: false })
        signin({ mail, password })
          .then(data => {
            if (data.error) {
              setValues({ ...values, errortype: data.error, loading: false, error: true })
            } else {
                auth(data, () => {
                setValues({ ...values, loading: false, error: false, successmsg: true, redirectToReferrer: true, user:data.user.role })
              })
            }
          })
      }
      {console.log(user)}
      const redirectUser = () => {
        if (redirectToReferrer) {
          if (data.user && data.user.role === 2) {
            return <Redirect to="/home" />;
          } else if(user && user.role === 1){
            return <Redirect to="admin/dashboard" />;
          } else{
            return <Redirect to="/" />
          }
        }
      }
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#FF6347' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    onChangeText={startmail => setStartEmail(startmail)} 
                    defaultValue={startmail}
                   
                    
                />
               
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
               
            </View>
           
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>שם משתמש צריך להיות בעל 4 אותיות לפחות.</Text>
            </Animatable.View>
    
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                  
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    onChangeText={startpassword => setStartPassword(startpassword)} 
                    defaultValue={startpassword}
                  
                />
                {/* <TouchableOpacity
                    
                >
                    
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
               
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
               
                </TouchableOpacity> */}
            </View>
           
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
         
            

            <TouchableOpacity>
                <Text style={{color: '#FF6347', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                  
                >
               
                    <Button title='signin' onPress={clickSubmit} style={[styles.textSign, {
                        color:'#FF6347'
                    }]}></Button>
                {console.log(mail)}
                {console.log(password)}
                
                </TouchableOpacity>

                <TouchableOpacity
                 
                    style={[styles.signIn, {
                        borderColor: '#FF6347',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#FF6347'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
                {redirectUser()}
                
            </View>
        </Animatable.View>
      </View>
    );
};

export default Signin;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#FF6347'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });