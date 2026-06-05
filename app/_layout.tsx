import {useFonts} from "expo-font";
import {StyleSheet} from 'react-native';
import {SpaceMono_400Regular,SpaceMono_700Bold} from "@expo-google-fonts/space-mono";
import {Slot} from "expo-router";

export default function RootLayout() {

  const [loaded,error]= useFonts({
      SpaceMono_400Regular,SpaceMono_700Bold
  })

  if (!loaded && !error) return null

  return (

      <Slot />
  );
}

export const universalStyles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily:'SpaceMono_400Regular',
  },
  defaultBoldFontFamily: {
    fontFamily:'SpaceMono_700Bold',
  },
})