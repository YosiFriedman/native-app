import React, { useRef,useState } from "react";
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

import * as Animatable from "react-native-animatable";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button, Text, Row } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 350;

const SingleProduct = ( props ) => {
  const [item, setItem] = useState(props.route.params.item);
  const [quantity, setQuantity] = useState(0);
 
  const [availability, setAvailability] = useState('');
  const navTitleView = useRef(null);

  const reduceQuantity = () => {
    setQuantity(quantity - 1)
  }
  const addQuantity = () => {
    setQuantity(quantity + 1)
  }
console.log('SingleProduct',props.route.params.item)
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
          <Text style={{ fontWeight: "bold", fontSize: 18, margin: 2 }}>{quantity}</Text>
          <View style={styles.actionBtn}>
            <Icon name="add" size={25} style={{ color: "white" }} onPress={() => addQuantity()}/>
          </View>
        </Row>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 30 }}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.btnContainer}>
            <Button onPress={() => {
          props.addItemToCart(item)
        }}>
          <Text>asdf</Text>
        </Button>
        {console.log('props',props)}
            </View>
          </TouchableOpacity>
        </View>
      </HeaderImageScrollView>
    </View>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => dispatch(actions.addToCart({quantity: 1, product, business:product.business,status:'ממתין'})),
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
