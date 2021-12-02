import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Button,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";
import StyledButton from "../../components/StyledComponents/StyledButton";
import Toast from 'react-native-toast-message';
var { height, width } = Dimensions.get("window");

const Item = (props) => {
    return(
        <View style={styles.item}>
            <Text>{props.item.name}</Text>
            <StyledButton danger small
            onPress={() => props.delete(props.item._id)}
            >
                <Text style={{color:"white", fontWeight:"bold"}}>מחק</Text>
            </StyledButton>
        </View>
    )
}


const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();
  const loadCategories = () => {
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((err) =>
        alert("קיימת בעיה עם טעינת הקטגוריות אנא וודא שאתה מחובר לאינטרנט")
      );
  };
  const deleteCategory = (id) => {
   
    axios.delete(`${baseURL}category/${id}`, {
        headers:{Authorization: `Bearer ${token}`}
    })
    .then((res) => {
        const newCategories = categories.filter((item) => item.id !== id);
        setCategories(newCategories);
        loadCategories();
    })
    .catch((res) =>
      alert("קיימת בעיה עם מחיקת הקטגוריה אנא וודא שאתה מחובר לאינטרנט")
    );
  }

  const addCategory = () => {
      const data = {
          name: categoryName
      }
      const config = {
        headers: {
            Authorization:`Bearer ${token}` 
        }
    }
    axios
    .post(`${baseURL}category`,data,config)
    .then((res) => {
        Toast.show({
            topOffset:60,
            type:"success",
            text1: "הקטגוריה נוספה בהצלחה",
            
        }),
        setCategories([...categories,res.data]),
        setCategoryName()
      
    }  )
   
    .catch((err) =>
      alert("קיימת בעיה עם טעינת הקטגוריות אנא וודא שאתה מחובר לאינטרנט")
    );
  }
  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((err) => {
        console.log(err);
      });
    loadCategories();

    return () => {
        setCategories();
        setToken();
      };
  }, []);

  
  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => <Item item={item} index={index} delete={deleteCategory}/>}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View>
          <Text>הוסף קטגוריה</Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            style={styles.input}
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <View>
          <StyledButton medium primary onPress={addCategory}>
            <Text style={{ color: "white", fontWeight: "bold" }}>הוסף</Text>
          </StyledButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  item:{
     shadowColor: "#000",
     shadowOffset:{
         width:0,
         height:2
     },
     shadowOpacity: 0.2,
     shadowRadius:1,
     elevation:1,
     padding:5,
     margin:5,
     backgroundColor:"white",
     flexDirection:"row",
     alignItems:"center",
     justifyContent:"space-between",
     borderRadius:5
  }
});
export default Categories;
