import { View, Text, StyleSheet } from 'react-native'
import React from 'react';



const AnswerPairType4 = (item) => {

  return (
    <View style={styles.mainContainer}>
        <Text style={styles.textAnswers}>{item.dataParams.item.answerData.map((element, index, arr) => index === arr.length - 1 ? element : element + ' / ')}{item.dataParams.item.translationData ? ' - ' : ''}{item.dataParams.item.translationData}</Text>
    </View>
  )
}

export default AnswerPairType4

 

const styles = StyleSheet.create({
    mainContainer: {
      marginBottom: 5
    },
    textAnswers: {
      fontWeight: '600'
    }
})

