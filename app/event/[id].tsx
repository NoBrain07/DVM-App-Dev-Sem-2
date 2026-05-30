import {useLocalSearchParams} from "expo-router";
import {useEventStore , Event} from "@/storage/storage";
import EventPage from "@/components/event_page";


const DetailPage = () => {
    const {id} = useLocalSearchParams();
    const {events} = useEventStore()
    const currentEvent : Event = events.find((e) => e.id.toString() === id) as Event

    return (
        <EventPage event ={currentEvent}></EventPage>
    )
}

export default DetailPage ;