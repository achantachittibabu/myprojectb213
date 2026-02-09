import {Platform} from "react-native";

const API_URL = Platform.select({
    android:"http://10.0.2.2:8081",
    web:"http://loocalhost:8081",
    default: "http://loocalhost:8081"
})

export default API_URL;