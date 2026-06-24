import {StyleSheet, FlatList, Text, TextInput, View, TouchableOpacity, ListRenderItem, Pressable} from 'react-native'
import React, {JSX, useCallback, useEffect, useState} from 'react'
import Card from "@/components/event_card";
import {Event ,useEventStore,useLineupStore} from "@/storage/storage";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from '@expo/vector-icons';
import {RelativePathString, router} from "expo-router";
import {ImageBackground} from "expo-image";
import {googleSans, milordFont} from "@/themes/styles";
import {scaleWidth,scaleHeight} from "@/themes/scaling"

const EventsTab = () => {
    const background=require(`@/assets/images/background.png`);

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
            <ImageBackground source={sidebarBackground} contentFit={"fill"} style={[styles.sidebarButtonImage,i===day ? {width:scaleWidth(110)} : {}]} >

                <View style={ [ styles.sidebarButton , i===day ? {position:'relative',left:10} : {} ] } >
                    <Text style={[styles.sidebarButtonText,{fontSize:scaleHeight(21),textAlign:'center'}]}>DAY</Text>
                    <Text style={[styles.sidebarButtonText,{fontSize:scaleHeight(37),textAlign:'justify'}]}>{i}</Text>
                </View>
            </ImageBackground>
            </Pressable>
        )
    }


    return (
        <SafeAreaView style={{flex:1,backgroundColor:'black'}} edges={['top','bottom']}>
        <ImageBackground source={background} contentFit={"fill"} style={{flex:1}}>

            <View style={styles.heading}>
                <Text style={styles.headingText}>EVENTS</Text>

                <TouchableOpacity style={{flex:1}} onPress={toggleBookmarked}>
                  <Ionicons name={bookmarked ? "bookmarks":"bookmarks-outline"} size={scaleHeight(29)} color="white" />
                </TouchableOpacity>

            </View>
            <View style={styles.searchBox}>
                    <Ionicons name={'search'} size={scaleHeight(20)} color="white" />
                    <TextInput
                        style={[styles.searchBar]}
                        placeholder="Search"
                        placeholderTextColor="white"
                        value={search}
                        onChangeText={setSearch}
                        returnKeyType="search"
                        selectionHandleColor={'#3b3b3b'}
                        cursorColor={'#4b4b4b'}
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


                    style={{marginHorizontal:'3%',}}

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
        marginTop:scaleHeight(18),
        justifyContent:"space-between",
        alignItems:"flex-start",
    },
    headingText:{
        ...milordFont.book,
        flex:9,
        fontSize:scaleHeight(45),
        color:'white',
        textAlign:"center"
    },
    searchBox:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#1B1B1B',
        height:scaleHeight(54),
        borderRadius:12,
        borderWidth:2,
        borderColor:"white",
        margin:scaleHeight(10),
        paddingHorizontal:scaleWidth(10),
        flexDirection:"row",
    },
    searchBar : {
        ...googleSans.medium,
        includeFontPadding:false,
        flexDirection:"row",
        fontSize:scaleHeight(22),
        flex:1,
        color:"white",
        textAlignVertical:'center',
    },
    contentContainer: {
        display: 'flex',
        alignSelf: "center",
        rowGap:scaleHeight(13) ,
    },
    errorStyle: {
        flex:1,
        fontSize: scaleHeight(18),
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
        left:-scaleWidth(22),
        zIndex:19,
        justifyContent:"space-between",
        alignItems:'flex-start',

    },
    sidebarButton: {
        flex:1,
        width:scaleWidth(90),
        height:scaleHeight(21),
        paddingLeft:scaleWidth(23),
        justifyContent:"center",
        alignItems:'center',
        shadowColor:"black",
        shadowOpacity:0.6,
        shadowRadius:10,
    },
    sidebarButtonImage: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    sidebarButtonText: {
        ...milordFont.book,
        color:'white'
    }

})