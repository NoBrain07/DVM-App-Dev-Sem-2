import {FlatList, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import LineupCard from "@/components/lineup_card";
import {Event, useLineupStore,} from "@/storage/storage";
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";


const LineupTab = () => {

    const {error,lineupEvents,fetchLineupEvents} = useLineupStore()

    useEffect(() => {
        fetchLineupEvents()
    },[])

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchLineupEvents()
        setRefreshing(false);
    }

    if (error !== null) {
        return (
            <Text>
                {error}
            </Text>
        )
    }

    if (lineupEvents.length === 0) {
        return (
            <SafeAreaView style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                <View style={styles.emptyLineupContainer}>
                    <Text style={styles.emptyLineup}>
                        Lineup Is Empty
                    </Text>
                    <Text style={styles.emptyLineup}>
                        Add Events to lineup using +
                    </Text>
                </View>
            </SafeAreaView>
        )
    }

    return (

        <SafeAreaView style={{flex:1}}>

            <FlatList<Event>
                data={lineupEvents}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.contentContainer}

                renderItem={ ({item}) => (
                    <LineupCard
                        event={item}
                        onPress={() => router.push({
                            pathname:`/event/[id]`,
                            params: {id: item.id }
                        })}
                    />
                )}

                refreshing={refreshing}
                onRefresh={onRefresh}
            />

        </SafeAreaView>
    )
}

export default LineupTab;

const styles = StyleSheet.create({
    contentContainer: {
        display: 'flex',
        alignSelf: "center",
        // paddingHorizontal: '15%',
    },
    container:{
        flex: 1,
        display: 'flex',
        flexWrap:'wrap',
        flexDirection: 'row',
        maxWidth:1200,
        alignItems: "center",
    },
    cardOutline: {
        display: 'flex',
        flexDirection: 'row',
        // maxWidth: '80%',
        justifyContent: "space-around",
        alignItems: "center",
        padding: 50,
        margin : 10,
        borderWidth: 1,
        borderColor: "#46084d",
        borderStyle: "solid",
    },
    emptyLineup: {
        fontSize: 18,
        fontWeight: "bold",
        color:"#131f11",
    },
    emptyLineupContainer: {
        flex:1,
        justifyContent:"center",
        alignItems:'center',
        borderWidth:1,
        maxHeight:'30%',
        margin : 10,
        padding:10,
        backgroundColor:"lightgrey",

    },

})