import {View, Text, StyleSheet} from 'react-native'
import React from 'react'

const onboarding = () => {
  return (
    <View style={styles.container}>
      <Text>onboarding site</Text>
    </View>
  )
}

export default onboarding

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})