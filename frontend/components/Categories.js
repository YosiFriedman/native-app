import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Container, Content, Icon, Thumbnail } from "native-base";
import { useTheme } from "@react-navigation/native";

const Categories = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View style={{ height: 85 }}>
      <View style={{ flex: 3 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingStart: 30,
            paddingEnd: 30,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CardListScreen", { title: "Restaurant" })
            }
          >
            
            <View style={styles.categoryIcon}>
              <Thumbnail
                square={true}
                style={styles.thumstyle}
                source={require("../assets/icons/wineandglass.png")}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>מסעדת שף</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.categoryIcon}>
              <Thumbnail
                square={true}
                style={styles.thumstyle}
                source={require("../assets/icons/hamburger.png")}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>מסעדות</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.categoryIcon}>
              <Thumbnail
                square={true}
                style={styles.thumstyle}
                source={require("../assets/icons/pancake.png")}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>דיינרים</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.categoryIcon}>
              <Thumbnail
                square={true}
                style={styles.thumstyle}
                source={require("../assets/icons/fastfood.png")}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>פאסטפוד</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};
export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  thumstyle: {
    marginHorizontal: 15,
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 10,
    width: 60,
    height: 60,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "black",
    fontWeight: "bold",
  },
});
