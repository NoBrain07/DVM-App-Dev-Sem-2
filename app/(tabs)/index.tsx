import { Text, View, StyleSheet , Pressable} from "react-native";
import { Link } from "expo-router";
import {ImageBackground } from "expo-image";
import {MaterialCommunityIcons} from "@expo/vector-icons";


const App = () => {
  return (
  <ImageBackground source={require("@/assets/images/bg.jpg")} style={styles.backgroundImage}>

        <View style={styles.container}>
          <Text style={styles.text}>Hello There</Text>
            <View>
                <Link href={'/(tabs)/events'} asChild >
                    <Pressable >
                        <MaterialCommunityIcons name='fire' size={300} color="red" />
                    </Pressable>
                </Link>
            </View>
          <Link href = "/(tabs)/lineup" asChild>
              <Pressable >
                  <MaterialCommunityIcons name="archive-check" color="lightblue" size={250} />
              </Pressable>
          </Link>
        </View>
  </ImageBackground>
  )
}

export default App


const styles = StyleSheet.create({
  container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
  press:{
    borderWidth:2,
    borderColor: "#ffffff",
    borderRadius:2,
    color: "#ffffff"
  },
  text:{
      color: "#ffffff",
  },
  backgroundImage:{
    ...StyleSheet.absoluteFillObject,

  }
})