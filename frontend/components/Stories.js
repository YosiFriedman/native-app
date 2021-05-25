import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Container, Content, Icon, Thumbnail } from "native-base";

class Stories extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    ),
  };

  render() {
    return (
      <View style={{ height: 70 }}>
        <View style={{ flex: 3 }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              paddingStart: 5,
              paddingEnd: 5,
            }}
          >
            <Thumbnail
              style={{
                marginHorizontal: 5,
                borderColor: "lightgrey",
                borderWidth: 2,
              }}
              source={require("../assets/logos/logo1.jpg")}
            />
            <Thumbnail
              style={{
                marginHorizontal: 5,
                borderColor: "lightgrey",
                borderWidth: 2,
              }}
              source={require("../assets/logos/logo2.jpg")}
            />
            <Thumbnail
              style={{
                marginHorizontal: 5,
                borderColor: "lightgrey",
                borderWidth: 2,
              }}
              source={require("../assets/logos/logo3.jpg")}
            />
            <Thumbnail
              style={{
                marginHorizontal: 5,
                borderColor: "lightgrey",
                borderWidth: 2,
              }}
              source={require("../assets/logos/logo4.jpg")}
            />

            <Thumbnail
              style={{
                marginHorizontal: 5,
                borderColor: "lightgrey",
                borderWidth: 2,
              }}
              source={require("../assets/logos/logo1.jpg")}
            />
            <Thumbnail
              style={{
                marginHorizontal: 5,
                borderColor: "lightgrey",
                borderWidth: 2,
              }}
              source={require("../assets/logos/logo2.jpg")}
            />
            <Thumbnail
              style={{
                marginHorizontal: 5,
                borderColor: "lightgrey",
                borderWidth: 2,
              }}
              source={require("../assets/logos/logo3.jpg")}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default Stories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
