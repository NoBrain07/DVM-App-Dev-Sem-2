import { Text, View, StyleSheet , Pressable} from "react-native";
import { Link } from "expo-router";

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Hello There</Text>
      <Link href="/onboarding" asChild>
        <Pressable style = {styles.press}><Text>Onboarding</Text></Pressable>
      </Link>
    </View>
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
    borderColor: "black",
    borderRadius:2,
    color:"black"
  }
})