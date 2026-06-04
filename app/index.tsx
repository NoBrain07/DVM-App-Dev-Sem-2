import {StyleSheet, FlatList, Text, TextInput, View,TouchableOpacity,ListRenderItem } from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import Card from "@/components/event_card";
import {Event ,useEventStore,useLineupStore} from "@/storage/storage";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from '@expo/vector-icons';


const EventsTab = () => {
    const {events  , error, fetchEvents} = useEventStore()
    const { lineupIds,fetchLineupEvents } = useLineupStore()

   useEffect(
       () => {
           fetchEvents()
           fetchLineupEvents()
           },[]
   )

    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState('');
    const [bookmarked, setBookmarked] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchEvents()
        setRefreshing(false);
    }

    const toggleBookmarked = () => {
        setBookmarked(state => !state);
    }

    const renderItem =useCallback<ListRenderItem<Event>> (
        ( {item}) => <Card event={item}/>,[])

    const keyExtractor = (item: Event) => item.id.toString()

    const filteredEvents:Event[] =
        events
            .filter(event => event.name.toLowerCase().includes(search.toLowerCase()))
            .filter(event => bookmarked ? lineupIds.includes(event.id):1)


    if (error !== null) {
        return (
            <Text style={styles.errorStyle}>
                {error}
            </Text>
        )
    }


    return (
        <SafeAreaView style={{flex:1}}>

            <View style={styles.searchBox}>

                  <TextInput
                      style={styles.searchBar}
                      placeholder="Search ..."
                      placeholderTextColor="black"
                      value={search}
                      onChangeText={setSearch}
                  />

                  <TouchableOpacity onPress={toggleBookmarked}>
                      <Ionicons name={bookmarked ? "bookmarks":"bookmarks-outline"} size={24} color="black" />
                  </TouchableOpacity>


            </View>
            {(filteredEvents.length !== 0) ?
                (<FlatList<Event>
                    data={filteredEvents}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={styles.contentContainer}

                    renderItem={renderItem}

                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />)
                :
                (<Text style={styles.errorStyle}>No Events Match your Search</Text>)
            }
        </SafeAreaView>
      )
}

export default EventsTab

const styles = StyleSheet.create({
    searchBox:{
        justifyContent:"space-between",
        alignItems:"center",
        gap:5,
        borderRadius:20,
        borderWidth:2,
        borderColor:"grey",
        margin:10,
        padding:10,
        flexDirection:"row",
    },
    searchBar : {
        minWidth:"60%",
    },
    contentContainer: {
        display: 'flex',
        alignSelf: "center",
    },
    errorStyle: {
        flex:1,
        fontSize: 18,
        alignItems: "center",
        textAlignVertical:"center",
        justifyContent: "center",
        textAlign: 'center',

    }


})