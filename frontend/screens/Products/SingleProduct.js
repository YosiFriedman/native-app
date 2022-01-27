import React, { useRef,useState, useContext,useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
import Toast from 'react-native-toast-message';
import * as Animatable from "react-native-animatable";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button, Text, Row } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import AuthGlobal from '../../Context/store/AuthGlobal';
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 350;

const SingleProduct = ( props ) => {
  const [item, setItem] = useState(props.route.params.item);
  const [quantity, setQuantity] = useState(1);
 
  const [availability, setAvailability] = useState('');
  const navTitleView = useRef(null);
  const context = useContext(AuthGlobal)
  const reduceQuantity = () => {
    
    if(quantity< 1){
      setQuantity(1)
    } else {
      setQuantity(quantity - 1)
    }
    
    
    
    Object.assign(item, {quantity: quantity});
    // setItem({ ...item, quantity: quantity });
  }
  const addQuantity = () => {
    if(quantity > item.countinstock){
      Toast.show({
        topOffset:60,
        type:"error",
        text1:`כמות המלאי מוגבלת ל ${item.countinstock} הטבות `,
        text2:"אנא הזמינו בכמות התואמת למכסה"
      })
      return;
    }
    setQuantity(quantity + 1)
    Object.assign(item, {quantity: quantity});
  }
  useEffect(() => {
    Object.assign(item, {quantity: quantity});
    console.log('newitem',item)
  }, [])
console.log('SingleProduct',props.route.params.item)
console.log('countinstockkkkk',item.countinstock)
console.log('updateitem',item)
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image source={{uri : item.image  ? item.image : 'https://picsum.photos/700'}} style={styles.image} />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{item.name}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{item.name}</Text>
          
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>פירוט</Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <FontAwesome name="star" size={16} color="#FF6347" />
              <Text style={{ marginHorizontal: 2 }}>rating</Text>
              <Text>reviews</Text>
            </View>
          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{item.description}</Text>
          
        </View>
       
        <View style={{ marginHorizontal: 30 }}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.lastCall}>
              <Text style={{ color: "black" }}>מלאי מוגבל</Text>
              <Row>
          <View style={styles.actionBtn}>
            <Icon name="remove" size={25} style={{ color: "white" }} onPress={() => reduceQuantity()} />
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 18, margin: 2 }}>{item.quantity}</Text>
          <View style={styles.actionBtn}>
            <Icon name="add" size={25} style={{ color: "white" }} onPress={() => addQuantity()}/>
          </View>
        </Row>
            </View>
          </TouchableOpacity>
        </View>
        
        {context.stateUser.isAuthenticated ?  
             <View style={{ marginHorizontal: 100 }}>
         
             <View style={styles.btnContainer}>
             <Button style={styles.btnContainer} onPress={() => {
           props.addItemToCart(item); props.navigation.navigate("Checkout");
         }}>
            <Text style={{paddingLeft:55}}>הזמינו עכשיו</Text>
         </Button>
         {console.log('props',props)}
             </View>
            
           
         </View>
           :
              (
                <View style={{ marginHorizontal: 100 }}>
         
                <View style={styles.btnContainer}>
                <Button style={styles.btnContainer} onPress={() => props.navigation.navigate('User')}>
               <Text style={{paddingLeft:45}}>התחבר להזמנה</Text>
            </Button>
            {console.log('props',props)}
                </View>
               
              
            </View>
           
              )
              }
       
      </HeaderImageScrollView>
    </View>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => dispatch(actions.addToCart({quantity:product.quantity, product, business:product.business,status:'ממתין'})),
  };
};

export default connect(null, mapDispatchToProps)(SingleProduct);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: "bold",
  },
  section: {
    padding:10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white",
    direction: "rtl",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionContent: {
    fontSize: 16,
    textAlign: "justify",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  categoryContainer: {
    flexDirection: "row",
    backgroundColor: "#FF6347",
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  imageTitle: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: "white",
    fontSize: 18,
    backgroundColor: "transparent",
  },
  sectionLarge: {
    minHeight: 250,
  },
  btnContainer: {
    backgroundColor: "#de4f35",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  lastCall: {
    backgroundColor: "white",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtn: {
    width: 50,
    height: 30,
    backgroundColor: "#de4f35",
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 3,
  },
  title: { color: "white", fontWeight: "bold", fontSize: 18 },
});
