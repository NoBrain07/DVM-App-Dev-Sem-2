import { StyleSheet, Text, View ,TouchableOpacity,Image, ImageBackground} from 'react-native'
import React, {memo} from 'react'
import {Event,useLineupStore} from "@/storage/storage";import {Ionicons} from "@expo/vector-icons";
import {DMSans,  googleSans} from "@/constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


type props =  {
    event : Event,
    onPress : () => void,
}



const Card  = ({event,onPress} : props) => {
    const {lineupIds , addLineupEvent , removeLineupEvent} = useLineupStore();
    const isInLineup = lineupIds.includes(event.id)

    const activeBackground = require(`@/assets/images/card_inactive.png`)
    const tear = require('@/assets/images/tear.png')

    return (
        <TouchableOpacity onPress={onPress} >

        <ImageBackground source={activeBackground} resizeMode={'stretch'} style={styles.background} imageStyle={{resizeMode:'repeat',width:'100%',height:300}} >

            <View style={styles.wrapper}>

                <View style={styles.container}>

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
            <Image source={tear} style={{width:"100%",height:20}} resizeMode={'stretch'} />

        </TouchableOpacity>
    )
}

export default memo(Card)
//              ^ this is to make the last render of each card to be taken instead of rerendering each and every card

const styles = StyleSheet.create({
    background:{
        overflow:"hidden",
        // marginBottom:20,
    },
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'flex-start',
        padding: 0,
        margin : 5,
        marginBottom:0,
        minWidth:320,
    },
    container: {
        display: 'flex',
        flex:1,
        alignItems: 'flex-start',
        padding : 10,
        marginBottom:4,
        paddingTop:0,
        marginLeft:"12%",
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
        ...DMSans.semiBold,
        fontSize: 30,
        textAlign: "left",
        color: "black",
    },
    text: {
        ...googleSans.regular,
        fontSize: 20,
        color: "black",
    },
    image:{
        width: 100,
        height: 150
    },
})
