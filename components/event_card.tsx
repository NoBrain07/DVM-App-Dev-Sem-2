import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import {Event,useLineupStore} from "@/storage/storage";




const Card = ({event} : { event:Event }) => {
    const addEventToLineup = useLineupStore((state) => state.addLineupEvent)
    const removeEventFromLineup = useLineupStore((state) => state.removeLineupEvent)
    const lineupIds = useLineupStore(state => state.lineupIds)
    const isInLineup = lineupIds.includes(event.id)

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{event.name}</Text>
            <View>
                <Text style={styles.text}>{event.day} - {event.time} - {event.venue}</Text>
                <Text style={styles.text}>{event.registrations}</Text>
                <TouchableOpacity style={styles.lineupButton} onPress={async () => {
                        if (isInLineup) {
                            await removeEventFromLineup(event.id)
                        } else {
                            await addEventToLineup(event.id)
                        }
                }}>
                    <Text>{isInLineup?"-":"+"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding : 10,
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
    },
    lineupButton: {
        alignItems: 'center',
        color: 'cyan',
    }
})
