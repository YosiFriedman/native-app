import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  
} from "react-native";
import { Item, Picker } from "native-base";
import FormContainer from "../Form/FormContainer";
import Input from "../Form/Input";
import StyledButton from "../../components/StyledComponents/StyledButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
const ProductFrom = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [pickerValue2, setPickerValue2] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [countinstock, setCountInStock] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [business, setBusiness] = useState();
  const [businesslist, setBusinessList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [item, setItem] = useState();
  const [err, setErr] = useState();

  const loadCategories = () => {
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((err) =>
        setErr(
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "קיימת בעיה עם טעינת הקטגוריות",
          })
        )
      );
  };

  const loadBusinessList = () => {
    axios
      .get(`${baseURL}businesslist`)
      .then((res) => setBusinessList(res.data))
      .catch((err) =>
        setErr(
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "קיימת בעיה עם טעינת העסקים",
          })
        )
      );
  };

  useEffect(() => {
      if(props.route.params == undefined) {
          setItem(undefined);
      } else {
          setItem(props.route.params.item)
          setBusiness(props.route.params.item.business._id)
          setName(props.route.params.item.name)
          setPrice(props.route.params.item.price.toString())
          setDescription(props.route.params.item.description)
          setCountInStock(props.route.params.item.countinstock.toString())
          setCategory(props.route.params.item.category._id)
          setMainImage(props.route.params.item.image)
          setImage(props.route.params.item.image)
      }

      AsyncStorage.getItem("jwt")
      .then((res)=> {
          setToken(res)
      })
      .catch((err)=> console.log(err))
    loadCategories();
    loadBusinessList();
    //Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("יש צורך בהרשאה לספריית התמונות");
        }
      }
    })();
    return () => {
      setCategories([]);
      setBusinessList([]);
    };
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setMainImage(result.uri);
      setImage(result.uri);
    }
  };
const addProduct = () => {
    if(
        name == "" ||
        business == "" ||
        price == "" ||
        description == "" ||
        category == "" ||
        countinstock == "" 
    ) {
        setErr("בבקשה מלא את כל הנתונים")
    }
    let formData = new FormData();
  
    const newImageUri = "file:///" + image.split("file:/").join("");

    formData.append("image", {
        uri: image,
        type:mime.getType(image),
        name: image.split("/").pop()
    });
    formData.append("name", name);
    formData.append("business", business);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("countinstock", countinstock);
    formData.append("richDescription", richDescription);
    formData.append("rating", rating);
    formData.append("numReviews", numReviews);
    formData.append("isFeatured", isFeatured);

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer ${token}` 
        }
    }
    
    if(item !== undefined){
        const configupdate = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:`Bearer ${token}` 
            }
        }
        console.log(formData)
        axios.put(`${baseURL}product/${item.id}`, formData, configupdate)
        .then((res) => {
            if(res.status == 200 || res.status == 201){
                Toast.show({
                    topOffset:60,
                    type:"success",
                    text1: "המוצר עודכן בהצלחה",
                    
                });
                setTimeout(()=> {
                    props.navigation.navigate("AdminProducts")
                }, 500)
            }
        })
        .catch((err) => {
            console.log(err)
            Toast.show({
                topOffset:60,
                type:"error",
                text1:"קיימת בעיה עם עדכון המוצר",
                text2:"אנא נסה שוב"
            })
        })
    } else{
        axios.post(`${baseURL}product`, formData, config)
        .then((res) => {
            if(res.status == 200 || res.status == 201){
                Toast.show({
                    topOffset:60,
                    type:"success",
                    text1: "המוצר נוסף בהצלחה",
                    
                });
                setTimeout(()=> {
                    props.navigation.navigate("AdminProducts")
                }, 500)
            }
        })
        .catch((err) => {
            console.log(err)
            Toast.show({
                topOffset:60,
                type:"error",
                text1:"קיימת בעיה עם הוספת המוצר",
                text2:"אנא נסה שוב"
            })
        })
    }
   
}
  return (
    <FormContainer title="הוסף מוצר">
      <View style={styles.imageContainer}>
        <Image source={{ uri: mainImage }} style={styles.image} />
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Icon style={{ color: "white" }} name="camera" />
        </TouchableOpacity>
      </View>
      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
          style={{ width: undefined }}
          placeholder="בחר עסק"
          selectedValue={pickerValue2}
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#007aff"
          onValueChange={(e) => [setPickerValue2(e), setBusiness(e)]}
        >
          {businesslist.map((c) => {
            return <Picker.Item key={c._id} label={c.name} value={c._id} />;
          })}
        </Picker>
      </Item>

      <View>
        <Text>שם</Text>
      </View>
      <Input
        placeholder="שם"
        name="name"
        id="name"
        value={name}
        onChangeText={(val) => setName(val)}
      />

      <View>
        <Text>מחיר</Text>
      </View>
      <Input
        placeholder="מחיר"
        name="price"
        id="price"
        value={price}
        onChangeText={(val) => setPrice(val)}
      />

      <View>
        <Text>מלאי</Text>
      </View>
      <Input
        placeholder="מלאי"
        name="countinstock"
        id="countinstock"
        value={countinstock}
        onChangeText={(val) => setCountInStock(val)}
      />

      <View>
        <Text>הסבר על המוצר</Text>
      </View>
      <Input
        placeholder="הסבר"
        name="description"
        id="description"
        value={description}
        onChangeText={(val) => setDescription(val)}
      />

      <Item picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
          style={{ width: undefined }}
          placeholder="בחר קטגוריה"
          selectedValue={pickerValue}
          placeholderStyle={{ color: "#007aff" }}
          placeholderIconColor="#007aff"
          onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
        >
          {categories.map((c) => {
            return <Picker.Item key={c._id} label={c.name} value={c._id} />;
          })}
        </Picker>
      </Item>
      {err ? <Text>{err}</Text> : null}
      <View style={styles.buttonContainer}>
        <StyledButton
          large
          primary
          onPress={() => addProduct()}
        >
          <Text style={styles.buttonText}>הוסף</Text>
        </StyledButton>
      </View>
    </FormContainer>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#e0e0e0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
});
export default ProductFrom;
