import { StyleSheet, Text, View ,TouchableOpacity,Image, ImageBackground} from 'react-native'
import React, {memo} from 'react';
import {Event,useLineupStore} from "@/storage/storage";
import {Ionicons} from "@expo/vector-icons";
import {DMSans,  googleSans} from "@/themes/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {scaleWidth,scaleHeight} from "@/themes/scaling"


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
        <Image source={require('@/assets/images/paperclip.png')} resizeMode={'contain'} style={styles.paperclip}/>
        <ImageBackground source={activeBackground} resizeMode={'stretch'} style={styles.background} imageStyle={{resizeMode:'repeat',width:'100%',height:scaleHeight(320)}} >

            <View style={styles.wrapper}>

                <View style={styles.container}>

                    <View style={styles.title}>
                        <Text style={[styles.heading]} >{event.name}</Text>
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

                <View style={{}}>
                    <TouchableOpacity
                        onPress={async () => {
                            if (isInLineup) {
                                await removeLineupEvent(event.id)
                            } else {
                                await addLineupEvent(event.id)
                            }
                    }}>

                        <Ionicons name={isInLineup? "bookmark":"bookmark-outline"} color={"#012"} size={scaleHeight(32)}/>

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
    paperclip:{
        position:"absolute",
        zIndex:10,
        width:scaleWidth(20),
        top:scaleHeight(-38),
        left:scaleWidth(40),
    },
    background:{
        overflow:"hidden",
        width: scaleWidth(364),
        // marginBottom:20,
    },
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'flex-start',
        padding: 0,
        marginRight : scaleWidth(20),
        marginTop:scaleHeight(30),
        marginLeft:scaleWidth(75),
        marginBottom:scaleHeight(15),
    },
    container: {
        display: 'flex',
        flex:1,
        alignItems: 'flex-start',
    },
    title:{
        flex:6,
    },
    detailContainer:{
        flex:1,
        flexDirection:'row',
        height:scaleHeight(35),
        alignItems:'center',
        justifyContent:'center',
    },

    heading: {
        ...DMSans.semiBold,
        fontSize: scaleHeight(27),
        textAlign: "left",
        color: "black",
        includeFontPadding:false,
        rowGap:scaleHeight(1),

    },
    text: {
        ...googleSans.regular,
        fontSize: scaleHeight(20),
        color: "black",
    },
})
