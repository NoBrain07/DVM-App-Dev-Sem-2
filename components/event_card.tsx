import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, {memo, useState} from 'react'
import {Event,useLineupStore} from "@/storage/storage";
import {url} from "@/constants/get_data";
import {ImageBackground} from "expo-image";
import {Ionicons} from "@expo/vector-icons";
<<<<<<< HEAD
import {DMSans, globalStyles, googleSans} from "@/constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
=======
import {globalStyles} from "@/constants/styles";
>>>>>>> a4d5d475bc69e599f8bb0dd936392d94b7ce9e22


type props =  {
    event : Event,
    onPress : () => void,
}



const Card  = ({event,onPress} : props) => {
    const {lineupIds , addLineupEvent , removeLineupEvent} = useLineupStore();
    const isInLineup = lineupIds.includes(event.id)

    const activeBackground = require(`@/assets/images/card_bg.png`)

    return (
<<<<<<< HEAD
        <TouchableOpacity onPress={onPress} >
=======
        <TouchableOpacity onPress={onPress} onLongPress={toggleActive}>
>>>>>>> a4d5d475bc69e599f8bb0dd936392d94b7ce9e22

        <ImageBackground source={activeBackground} contentFit={"fill"} >

            <View style={styles.wrapper}>

                <View style={styles.container}>
<<<<<<< HEAD

                    <View style={styles.title}>
                        <Text style={[styles.heading]}>{event.name}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <MaterialIcons name="category" color="#000" size={20} />
                        <Text style={styles.text}> {event.category}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Ionicons name={"time"} color={"#012"} size={20}/>
                        <Text style={styles.text}> {event.time}</Text>
                    </View>

                    <View style={styles.detailContainer}>
                        <Ionicons name={'location'} color={"#012"} size={20}/>
                        <Text style={styles.text}> {event.venue}</Text>
                    </View>

                </View>

                <View style={{alignSelf:'stretch',paddingTop:15}}>
=======
                    <View>
                        <Text style={[styles.heading,globalStyles.headingFont]}>{event.name}</Text>
                    </View>

                    <View>
                        <Text style={[{textAlign:'left'},globalStyles.descriptionFont]}>{event.category}</Text>
                        <Text style={[styles.text,globalStyles.textFont]}> {event.time}  -  {event.venue}</Text>
                    </View>

                </View>
                <View style={{flex: 1,alignSelf:'stretch',paddingTop:15}}>
>>>>>>> a4d5d475bc69e599f8bb0dd936392d94b7ce9e22
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
<<<<<<< HEAD
        flex:1,
        alignItems: 'flex-start',
        padding : 10,
        marginBottom:5,
        paddingTop:0,
        marginLeft:"12%",
=======
        flex:9,
        justifyContent: 'center',
        alignItems: 'center',
        padding : 10,
        paddingTop:0,
        marginLeft:15,
>>>>>>> a4d5d475bc69e599f8bb0dd936392d94b7ce9e22
    },
    title:{
        flex:6,
        marginVertical : 10,
    },
    detailContainer:{
        flex:1,
        flexDirection:'row',
        height:35,
        alignItems:'center',
        justifyContent:'center',
    },

    heading: {
<<<<<<< HEAD
        ...DMSans.semiBold,
=======
>>>>>>> a4d5d475bc69e599f8bb0dd936392d94b7ce9e22
        fontSize: 30,
        textAlign: "left",
        color: "black",
    },
    text: {
<<<<<<< HEAD
        ...googleSans.regular,
=======
>>>>>>> a4d5d475bc69e599f8bb0dd936392d94b7ce9e22
        fontSize: 20,
        color: "black",
    },
    image:{
        width: 100,
        height: 150
    },
})
