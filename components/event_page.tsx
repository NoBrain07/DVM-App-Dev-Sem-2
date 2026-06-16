import React, {memo, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, ImageBackground} from "expo-image";
import {url} from "@/constants/get_data";
import { Event,useLineupStore } from "@/storage/storage"
import {Ionicons} from "@expo/vector-icons";
import {DMSans, globalStyles, googleSans} from "@/constants/styles";


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
    <ImageBackground source={require(`@/assets/images/background.png`)} style={{flex:1}}>

        <View style={styles.wrapper}>
        <ImageBackground source={require(`@/assets/images/card_bg.png`)}  contentFit={'cover'} >
        <View style={{flex:1}}>

            <Image
                source={
                    {uri: `${url}/events/${event.id}0/image`}
                }
                style={styles.image}
            />

            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={[styles.heading]}>{event.name}</Text>
                    <TouchableOpacity style={styles.lineupButton}
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
                <View style={styles.details}>
                    <Text style={styles.text}>DAY - {event.day}     |    TIME - {event.time}</Text>
                    <Text style={[styles.text,{textAlign:'center'}]}>VENUE - {event.venue.toUpperCase()}</Text>
                    <Text style={styles.text}>Total Registrations - {event.registrations}</Text>
                </View>


                <View style={styles.container}>
                    <Text style={[styles.description]}>
                        { (description === null) ? "Sorry, No description found." : description.toString() }
                    </Text>
                </View>
            </View>
        </View>



        </ImageBackground>
        </View>

    </ImageBackground>
    </SafeAreaView>
    );
};

export default EventPage;


const styles = StyleSheet.create({
    wrapper:{
        width:"85%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        alignSelf:'center',
        padding: 10,
        marginVertical : 10,
        paddingBottom:0,
        marginBottom:0,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding : 15,
        margin : 10,
    },
    heading: {
        ...DMSans.semiBold,
        fontSize: 40,
        justifyContent: "space-around",
        alignItems: "center",
        color: "black",
        margin : 15,
    },
    headingContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'stretch',
    },
    details:{
        alignItems: "center",
        justifyContent: "center",
        padding : 15,
        paddingTop:5,
        margin : 15,
        marginTop:5,
    },
    text: {
        ...googleSans.medium,
        fontSize: 15,
        color: "black",
    },
    lineupButton: {
        alignItems: 'center',
        justifyContent: "center",
        margin : 4,
        padding : 4,

    },
    image:{
        width: 200,
        height: 300,
        alignSelf: "center",
        marginTop:40,

    },
    description: {
        ...googleSans.italic,
        width: "60%",
        height: "40%",
        alignSelf: "center",
        marginTop:10,
        fontSize: 15,
    }
})
