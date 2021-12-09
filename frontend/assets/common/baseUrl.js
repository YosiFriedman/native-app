import { Platform } from "react-native";

// let baseURL = 'https://native-application.herokuapp.com/api/';

let baseURL = "";

{
  Platform.OS = "android"
    ? (baseURL = "http://localhost:8000/api/")
    : (baseURL = "http://10.0.2.2:3000/api/");
}
export default baseURL;
