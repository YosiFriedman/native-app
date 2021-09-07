import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Thumbnail } from "native-base";
import { useTheme } from "@react-navigation/native";
import axios from "axios";

import Swiper from "react-native-swiper";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import StarRating from "../components/StarRating";
import Stories from "../components/Stories";
import Categories from "../components/Categories";
import CardsHome from "../components/CardsHome";
const HomeScreen = (props) => {
  const [category, setCategory] = useState("");
  const theme = useTheme();
  //     axios.get('http://localhost:8000/api/categories')
  //   .then(response => {
  //     setCategory({category:response.data})
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // console.log(category)

  return (
    <>
      
      <ScrollView style={styles.container}>
        <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            horizontal={true}
            height={200}
            activeDotColor="#FF6347"
          >
            <View style={styles.slide}>
              <Image
                source={require("../assets/banners/food-banner1.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../assets/banners/food-banner2.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require("../assets/banners/food-banner3.jpg")}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
          </Swiper>
        </View>

        {/* <View><Text>{JSON.stringify(category)}</Text></View> */}
        <Stories />

        <View style={styles.cardsWrapper}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
             מסעדת שף
          </Text>

          <CardsHome  
          navigation={props.navigation}/>
        </View>
        <View style={styles.cardsWrapper}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
             מסעדות
          </Text>
          <CardsHome />
        </View>
        <View style={styles.cardsWrapper}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            דיינרים 
          </Text>
          <CardsHome />
        </View>
        <View style={styles.cardsWrapper}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
             פאסטפוד
          </Text>
          <CardsHome />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 10,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 12,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: "30%",
    marginHorizontal: 0,
    alignSelf: "center",
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 65,
    height: 65,
    backgroundColor: "#fdeae7" /* '#FF6347' */,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "#de4f35",
  },
  cardsWrapper: {
    marginTop: 10,
    width: "100%",
    alignSelf: "center",
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "black",
  },
});
