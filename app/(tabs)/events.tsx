import {StyleSheet, FlatList,Text} from 'react-native'
import React, {useEffect, useState} from 'react'
import Card from "@/components/event_card";
import {Event ,useEventStore} from "@/storage/storage";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";


const EventsTab = () => {
    const {events  , error, fetchEvents} = useEventStore()

   useEffect(
       () => { fetchEvents() },[]
   )

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchEvents()
        setRefreshing(false);
    }

    if (error !== null) {
        return (
            <Text style={styles.errorStyle}>
                {error}
            </Text>
        )
    }

//use new part in a better way

  return (
    <SafeAreaView style={{flex:1}}>

          <FlatList<Event>
              data={events}
              keyExtractor={(item : Event) => item.id.toString()}
              contentContainerStyle={styles.contentContainer}

              renderItem={ ({item}) => (
                  <Card
                      event={item}
                      onPress = {() => router.push({
                          pathname:`/event/[id]`,
                          params: {id :item.id}
                      })}
                  />
              )}

              refreshing={refreshing}
              onRefresh={onRefresh}
          />

    </SafeAreaView>
  )
}

export default EventsTab

const styles = StyleSheet.create({

    contentContainer: {
        display: 'flex',
        alignSelf: "center",
        // paddingHorizontal: '15%',
    },
    errorStyle: {
        flex:1,
        fontSize: 18,
        backgroundColor: '#915353',
        textAlign: 'center',

    }


})