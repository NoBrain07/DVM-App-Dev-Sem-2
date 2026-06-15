import {StyleSheet, FlatList, Text, TextInput, View, TouchableOpacity, ListRenderItem, Pressable} from 'react-native'
import React, {JSX, useCallback, useEffect, useState} from 'react'
import Card from "@/components/event_card";
import {Event ,useEventStore,useLineupStore} from "@/storage/storage";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from '@expo/vector-icons';
import {RelativePathString, router} from "expo-router";
import {ImageBackground} from "expo-image";
import {globalStyles, googleSans, milordFont} from "@/constants/styles";

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
        ( {item}) =>
            <Card
                event={item}
                onPress={
                () =>
                    router.push(
                        {
                            pathname:`event/[id]` as RelativePathString, // puts its type to specified type
                            params:{id:item.id}
                        }
                        )
                }


            />,[])

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
    const sidebarBackground = require(`@/assets/images/day_bg.png`)

    for (let i:number =0 ; i < 4 ; i++ ) {
        sidebarButtons.push(
            <Pressable onPress={() => setDay(i)} key={`day${i}`}>
            <ImageBackground source={sidebarBackground} contentFit={"fill"} style={[styles.sidebarButtonImage,i===day ? {width:90} : {}]} >

                <View style={ [ styles.sidebarButton , i===day ? {position:'relative',left:5} : {} ] } >
                    <Text style={[{fontSize:12,color:"white",fontFamily:'MilordBook'}]}>DAY</Text>
                    <Text style={[{fontSize:33,color:'white',fontFamily:'MilordBook'}]}>{i}</Text>
                </View>
            </ImageBackground>
            </Pressable>
        )
    }


    return (
        <SafeAreaView style={{flex:1}}>
        <ImageBackground source={require(`@/assets/images/background.png`)} style={{flex:1}}>

            <View style={styles.heading}>
                <TouchableOpacity style={{flex:1}}>
                    <Ionicons name={"home"} size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.headingText}>EVENTS</Text>

                <TouchableOpacity style={{flex:1}} onPress={toggleBookmarked}>
                  <Ionicons name={bookmarked ? "bookmarks":"bookmarks-outline"} size={24} color="white" />
                </TouchableOpacity>

            </View>
            <View style={styles.searchBox}>

                  <TextInput
                      style={[styles.searchBar,globalStyles.textFont]}
                      placeholder="Search ..."
                      placeholderTextColor="white"
                      value={search}
                      onChangeText={setSearch}
                  />


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
        </ImageBackground>
        </SafeAreaView>
      )
}

export default EventsTab

const styles = StyleSheet.create({
    heading:{
        flexDirection:"row",
        marginTop:10,
        justifyContent:"space-between",
        alignItems:"flex-start",
    },
    headingText:{
        ...milordFont.book,
        flex:8,
        fontSize:40,
        color:'white',
        textAlign:"center"
    },
    searchBox:{
        justifyContent:"center",
        alignContent:"center",
        borderRadius:20,
        borderWidth:2,
        borderColor:"white",
        margin:10,
        paddingHorizontal:10,
        flexDirection:"row",
    },
    searchBar : {
        ...googleSans.medium,
        flex:1,
        color:"white",
        alignItems:"center",
        justifyContent:"center",
        textAlignVertical:"center",

    },
    contentContainer: {
        display: 'flex',
        alignSelf: "center",
    },
    errorStyle: {
        flex:1,
        fontSize: 18,
        color:'white',
        alignItems: "center",
        textAlignVertical:"center",
        justifyContent: "center",
        textAlign: 'center',

    },
    sidebar: {
        position:"absolute",
        flexDirection:"column",
        top:'20%',
        left:-4,
        zIndex:10,
        justifyContent:"space-between",
        alignItems:'flex-start',

    },
    sidebarButton: {
        flex:1,
        width:70,
        height:24,
        justifyContent:"center",
        alignItems:"center",
    },
    sidebarButtonImage: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },

})