import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const lineup = () => {
  return (
    <View style={styles.container}>
      <Text>lineup</Text>
    </View>
  )
}

export default lineup

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})