import { Tabs } from "expo-router";
import {Ionicons} from "@expo/vector-icons";


const tabLayout = () => (
    <Tabs screenOptions={{headerShown: false}} >
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                tabBarIcon: ({ color }:{color:string}) => <Ionicons size={28} name="home-outline" color={color} />}} />
        <Tabs.Screen
            name="events"
            options={{
                title: 'Events',
                tabBarIcon: ({ color }:{color:string}) => <Ionicons size={28} name="albums-outline" color={color} />,}} />
        <Tabs.Screen
            name="lineup"
            options={{
                title: 'Your Lineup' ,
                tabBarIcon: ({ color }:{color:string}) => <Ionicons size={28} name="archive-outline" color={color} />,}} />
        <Tabs.Screen
            name="onboarding"
            options={{
                title: 'Onboarding',
                tabBarIcon: ({ color }:{color:string}) => <Ionicons size={28} name="add-outline" color={color} />,}} />
    </Tabs>
)

export default tabLayout