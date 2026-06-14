import {Slot} from "expo-router";
import {useFonts} from "expo-font";
import {GoogleSans_700Bold,GoogleSans_500Medium,GoogleSans_600SemiBold_Italic} from "@expo-google-fonts/google-sans";

export default function RootLayout() {
<<<<<<< HEAD
=======
    const [loaded,error] = useFonts({
      GoogleSans_500Medium,GoogleSans_700Bold,GoogleSans_600SemiBold_Italic
    })

    if (!loaded && !error) return null; // if font neither loaded nor an error is received dont show anything

>>>>>>> a4d5d475bc69e599f8bb0dd936392d94b7ce9e22
    return <Slot/>;
}
