import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from "expo-image";
import {url} from "@/constants/get_data";
import { Event,useLineupStore } from "@/storage/storage"


const EventPage = ({event}: { event:Event }) => {
    const {lineupIds,addLineupEvent,removeLineupEvent} = useLineupStore()

    const [description, setDescription] = useState<string|null>(null)


    useEffect(()=>{
        fetch(`${url}/events/${event.id}`)
            .then(res => res.json())
            .then(data => data.description)
            .then(data => setDescription(data))
    } , [event])

    const isInLineup = lineupIds.includes(event.id)

    return (
    <SafeAreaView style={{flex:1 , justifyContent:"center",alignContent:"center"}}>
        <View style={styles.wrapper}>

            <Image
                source={
                    {uri: `${url}/events/${event.id}0/image`}
                }
                style={styles.image}
            />

            <View style={styles.container}>
                <Text style={styles.heading}>{event.name}</Text>
                <View style={styles.details}>
                    <Text style={styles.text}>DAY - {event.day}</Text>
                    <Text style={styles.text}>TIME - {event.time}</Text>
                    <Text style={styles.text}>VENUE - {event.venue.toUpperCase()}</Text>
                    <Text style={styles.text}>Total Registrations - {event.registrations}</Text>
                </View>

                <View>
                    <TouchableOpacity style={
                        [
                            styles.lineupButton,
                            isInLineup?
                                {borderColor: '#915353', backgroundColor: '#f0c0c0'}
                                :{borderColor: '#4d47a8', backgroundColor: '#a7a2eb'}

                        ]
                    }
                                      onPress={async () => {
                                          if (isInLineup) {
                                              await removeLineupEvent(event.id)
                                          } else {
                                              await addLineupEvent(event.id)
                                          }
                                      }}>
                        <Text
                            style={[isInLineup?{color:"red"}:{color:"blue"},styles.lineupButtonText]}>
                            {isInLineup?"Remove From Lineup":"Add To Lineup"}
                        </Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.container}>
                    <Text style={styles.description}>
                        { (description === null) ? "Sorry, No description found." : description.toString() }
                    </Text>
                </View>
            </View>
        </View>

    </SafeAreaView>
    );
};

export default EventPage;


const styles = StyleSheet.create({
    wrapper:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin : 10,
        marginHorizontal: "10%",
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding : 15,
        margin : 10,
    },
    heading: {
        fontSize: 25,
        justifyContent: "center",
        fontWeight: 'bold',
        color: "black",
        margin : 15,
    },
    details:{
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius:3,
        padding : 15,
        margin : 15,
    },
    text: {
        fontFamily: "Roboto-SemiBold",
        fontSize: 15,
        fontWeight: 400 ,
        color: "black",
        padding : 8,
        margin : 4,
    },
    lineupButton: {
        minWidth:30,
        minHeight:30,
        alignItems: 'center',
        justifyContent: "center",
        color: '#1c85c7',
        margin : 4,
        padding : 4,
        borderWidth:1,
        borderRadius:3,

    },
    lineupButtonText:{
        fontWeight: '600',
    },
    image:{
        width: "60%",
        height: "40%"
    },
    description: {
        fontFamily: "Roboto-SemiBold",
        fontSize: 15,
        fontWeight: 400 ,

    }
})
