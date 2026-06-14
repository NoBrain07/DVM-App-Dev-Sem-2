import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, {memo, useState} from 'react'
import {Event,useLineupStore} from "@/storage/storage";
import {url} from "@/constants/get_data";
import {ImageBackground} from "expo-image";
import {Ionicons} from "@expo/vector-icons";
import {globalStyles} from "@/constants/styles";


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
        <TouchableOpacity onPress={onPress} onLongPress={toggleActive}>

        <ImageBackground source={active?activeBackground:inactiveBackground} contentFit={"fill"} >

            <View style={styles.wrapper}>

                <View style={styles.container}>
                    <View>
                        <Text style={[styles.heading,globalStyles.headingFont]}>{event.name}</Text>
                    </View>

                    <View>
                        <Text style={[{textAlign:'left'},globalStyles.descriptionFont]}>{event.category}</Text>
                        <Text style={[styles.text,globalStyles.textFont]}> {event.time}  -  {event.venue}</Text>
                    </View>

                </View>
                <View style={{flex: 1,alignSelf:'stretch',paddingTop:15}}>
                    <TouchableOpacity
                        onPress={async () => {
                            if (isInLineup) {
                                await removeLineupEvent(event.id)
                            } else {
                                await addLineupEvent(event.id)
                            }
                    }}>

                        <Ionicons name={isInLineup? "bookmark":"bookmark-outline"} color={"#012"} size={30}/>

                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackground>

        </TouchableOpacity>
    )
}

export default memo(Card)
//              ^ this is to make the last render of each card to be taken instead of rerendering each and every card

const styles = StyleSheet.create({
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'flex-end',
        padding: 0,
        margin : 10,
        marginBottom:30,
        minWidth:320,
        minHeight:180,
    },
    container: {
        display: 'flex',
        flex:9,
        justifyContent: 'center',
        alignItems: 'center',
        padding : 10,
        paddingTop:0,
        marginLeft:15,
    },
    heading: {
        fontSize: 30,
        textAlign: "left",
        color: "black",
        margin : 10,
    },
    text: {
        fontSize: 20,
        color: "black",
        padding : 4,
    },
    image:{
        width: 100,
        height: 150
    },
})
