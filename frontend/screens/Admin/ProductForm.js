import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
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
const ProductFrom = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [rating, setRating] = useState();
  const [isFeatured, setIsFeatured] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState();

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
 
  useEffect(() => {
    loadCategories();
//Image Picker
(async () => {
    if(Platform.OS !== "web") {
        const {
            status,
        } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            alert("יש צורך בהרשאה לספריית התמונות")
        }
      }
})();
    return () => {
      setCategories([]);
    };
  }, []);
  const pickImage = async () => {
let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect:[4, 3],
    quality: 1
});
if(!result.cancelled) {
    setMainImage(result.uri);
    setImage(result.uri);
};
  }
  return (
    <FormContainer title="הוסף מוצר">
      <View style={styles.imageContainer}>
        <Image source={{ uri: mainImage }} style={styles.image} />
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Icon style={{ color: "white" }} name="camera" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>בית עסק</Text>
      </View>
      <Input
        placeholder="בית עסק"
        name="brand"
        id="brand"
        value={brand}
        onChangeText={(val) => setBrand(val)}
      />

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
        name="stock"
        id="stock"
        value={countInStock}
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
          //onpress
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
