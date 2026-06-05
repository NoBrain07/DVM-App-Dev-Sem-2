import {StyleSheet, FlatList, Text, TextInput, View,TouchableOpacity,ListRenderItem } from 'react-native'
import React, {JSX, useCallback, useEffect, useState} from 'react'
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
    const [day, setDay] = useState(0);

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
            .filter(event => event.day === day)


    if (error !== null) {
        return (
            <Text style={styles.errorStyle} >
                {error}
            </Text>
        )
    }

    const sidebarButtons:JSX.Element[] = [];

    for (let i:number =0 ; i < 4 ; i++ ) {
        sidebarButtons.push(
            <TouchableOpacity onPress={() => setDay(i)} key={`day${i}`}>
                <View style={styles.sidebarButton} >
                    <Text>
                        DAY - {i}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={{flex:1}}>

            <View style={styles.searchBox}>

                  <TextInput
                      style={[styles.searchBar]}
                      placeholder="Search ..."
                      placeholderTextColor="black"
                      value={search}
                      onChangeText={setSearch}
                  />

                  <TouchableOpacity onPress={toggleBookmarked}>
                      <Ionicons name={bookmarked ? "bookmarks":"bookmarks-outline"} size={24} color="black" />
                  </TouchableOpacity>

            </View>

            <View style={styles.sidebar}>

                {sidebarButtons}

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

    },
    sidebar: {
        position:"absolute",
        flexDirection:"column",
        top:'40%',
        zIndex:10,
        justifyContent:"space-between",
        alignItems:'center',

    },
    sidebarButton: {
        paddingVertical:10,
        paddingRight:10,
        marginVertical:5,
        backgroundColor:"#f1f1f1",
        borderWidth:1,
        borderColor:"grey",
        borderBottomRightRadius:5,
        borderTopRightRadius:5,


    },


})