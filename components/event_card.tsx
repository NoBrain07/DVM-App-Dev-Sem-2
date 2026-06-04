import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, {memo, useEffect, useState} from 'react'
import {Event,useLineupStore} from "@/storage/storage";
import {url} from "@/constants/get_data";
import {Image} from "expo-image";
import {Ionicons} from "@expo/vector-icons";


type props =  {
    event : Event,
    // onPress : () => void,
}



const Card  = ({event} : props) => {
    const {lineupIds , addLineupEvent , removeLineupEvent} = useLineupStore();
    const isInLineup = lineupIds.includes(event.id)

    const [active,setActive] = useState<boolean>(false)
    const [description, setDescription] = useState<string|null>(null)

    const toggleActive = () => {
        setActive((prevState) => !prevState);
    }

    useEffect(()=>{
        fetch(`${url}/events/${event.id}`)
            .then(res => res.json())
            .then(data => data.description)
            .then(data => setDescription(data))
    } , [event])


    return (
        <TouchableOpacity onPress={toggleActive}>
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
                {
                    active?
                        (
                            <View style={styles.container}>
                                <Text style={styles.description}>
                                    {(description === null) ? "Sorry, No description found." : description.toString()}
                                </Text>
                            </View>
                        )
                        :null
                }
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default memo(Card)

const styles = StyleSheet.create({
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin : 10,
        borderWidth: 1,
        borderColor: "#35073d",
        borderStyle: "solid",
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
