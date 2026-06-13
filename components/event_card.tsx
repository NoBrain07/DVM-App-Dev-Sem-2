import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, {memo, useState} from 'react'
import {Event,useLineupStore} from "@/storage/storage";
import {url} from "@/constants/get_data";
import {Image, ImageBackground} from "expo-image";
import {Ionicons} from "@expo/vector-icons";


type props =  {
    event : Event,
    onPress : () => void,
}



const Card  = ({event,onPress} : props) => {
    const {lineupIds , addLineupEvent , removeLineupEvent} = useLineupStore();
    const isInLineup = lineupIds.includes(event.id)

    const activeBackground = require(`@/assets/images/card_bg.png`)
    const inactiveBackground = require(`@/assets/images/card_inactive.png`)

    const [active, setActive] = useState(false)

    const toggleActive = () => {
        setActive(prevState => !prevState);
    }

    return (
        <TouchableOpacity onPress={onPress} onLongPress={toggleActive} >
        <View>

        <ImageBackground source={active?activeBackground:inactiveBackground} contentFit={"fill"} >

            <View style={styles.wrapper}>

                <Image
                    source={
                        {uri: `${url}/events/${event.id}0/image`}
                    }
                    style={styles.image}
                />

                <View style={styles.container}>
                    <Text style={styles.heading}>{event.name}</Text>
                    <View>
                        <Text style={styles.text}>{event.day} - {event.time} - {event.venue}</Text>
                        <Text style={styles.text}>Registrations - {event.registrations}</Text>
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={async () => {
                                if (isInLineup) {
                                    await removeLineupEvent(event.id)
                                } else {
                                    await addLineupEvent(event.id)
                                }
                        }}>

                            <Ionicons name={isInLineup? "bookmark":"bookmark-outline"} color={"#012"} size={24}/>

                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </ImageBackground>
        </View>
        </TouchableOpacity>
    )
}

export default memo(Card)
//              ^ this is to make the last render of each card to be taken instead of rerendering each and every card

const styles = StyleSheet.create({
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin : 20,
        marginBottom:30,
        minWidth:300,
        minHeight:100,
    },
    container: {
        display: 'flex',
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding : 15,
        margin : 10,
    },
    heading: {
        fontSize: 20,
        justifyContent: "center",
        fontWeight: 'bold',
        color: "black",
        margin : 10,
    },
    text: {
        fontSize: 10,
        fontWeight: 400 ,
        color: "black",
        padding : 4,
    },
    image:{
        width: 100,
        height: 150
    },
    description: {
        fontSize: 13,
        fontWeight: 400 ,

    }
})
