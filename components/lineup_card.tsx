import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import {Event,useLineupStore} from "@/storage/storage";
import {url} from "@/constants/get_data";
import {Image} from "expo-image";

type props =  {
    event : Event,
    onPress : () => void,
}


const LineupCard = ({event,onPress}:props ) => {
    const {removeLineupEvent} = useLineupStore()

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.wrapper}>
                <Image
                    source={
                        {uri : `${url}/events/${event.id}0/image`}
                    }
                    style={styles.image}
                />

                <View style={styles.container}>
                    <Text style={styles.heading}>{event.name}</Text>
                    <View>
                        <Text style={styles.text}>{event.day} - {event.time} - {event.venue}</Text>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={
                                async () => {
                                    await removeLineupEvent(event.id)
                                }}>
                            <Text style={styles.removeButtonText}>-</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default LineupCard

const styles = StyleSheet.create({
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: 10,
        margin : 10,
        marginHorizontal: "10%",
        borderWidth: 1,
        borderColor: "#46084d",
        borderStyle: "solid",
        minWidth:300,
        minHeight:100,
    },
    container: {
        display: 'flex',
        flexShrink:1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding : 15,
        margin : 10,
    },
    heading: {
        fontSize: 20,
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
    removeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#1c85c7',
        minWidth:20,
        minHeight:20,
        borderWidth: 1,
        borderRadius:3,
        borderColor: '#915353',
        backgroundColor:'#f0c0c0',

    },
    removeButtonText : {
        color: 'red',
        fontWeight: "500",

    },
    image:{
        width: 100,
        height: 150
    }
})
