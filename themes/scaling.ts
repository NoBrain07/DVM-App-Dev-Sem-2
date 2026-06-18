import {Dimensions} from "react-native";


const {width, height} = Dimensions.get("window");

const figmaWidth:number = 428
const figmaHeight:number = 888;

export const scaleWidth = (size:number) => (width/figmaWidth)*size
export const scaleHeight = (size:number) => (height/figmaHeight)*size

