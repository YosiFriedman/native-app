import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Container, Content, Icon, Thumbnail } from "native-base";

const CardsHome = (props) => {
  const {item} = props

 
    return (
      <View style={{ height: 350 }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ direction: "rtl" }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              paddingStart: 30,
              paddingEnd: 30,
            }}
          >
            <Card
              style={{
                width: 300,
                margin: 10,
                direction: "rtl",
                borderRadius: 10,
              }}
            >
              <Card.Content>
                <Card.Title
                  title="שם הטבה"
                  subtitle="פירוט הטבה"
                  right={(props) => (
                    <Thumbnail
                      source={require("../assets/logos/logo1.jpg")}
                      style={{ width: 70 }}
                    />
                  )}
                />
              </Card.Content>
              <Card.Cover source={require("../assets/bg1.jpg")} />
              <Card.Actions>
                <Button onPress={()=> props.navigation.navigate('CardItemDetails', {item: item})}>ראה עוד</Button>
                <Button>הוסף לעגלה</Button>
              </Card.Actions>
            </Card>

           
            
           
          </ScrollView>
        </View>
      </View>
    );
 
}
export default CardsHome;

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
