import { StyleSheet,  View } from 'react-native'
import React, {useEffect} from 'react'
import Card from "@/components/event_card";
import {Event ,useEventStore} from "@/storage/storage";

//
// type Event = {
//     id: number           // Unique identifier
//     name: string         // Event name
//     category: string     // e.g. "Music", "Tech", "Drama"
//     day: number          // Fest day (0-indexed)
//     time: string         // "HH:MM" in 24-hour format
//     venue: string        // Venue name
//     registrations: number // Registration count
// }

const EventsTab = () => {
    const fetchedEvents = useEventStore((state) => state.fetchEvents)
    const allEvents = useEventStore(state => state.events)
    useEffect(
        () => { fetchedEvents() }
    )

  return (
    <View style={styles.container}>
        {allEvents.map((e: Event) => (
            <Card key = {e.id} event={e}/>
        ))}
    </View>
  )
}

export default EventsTab

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})