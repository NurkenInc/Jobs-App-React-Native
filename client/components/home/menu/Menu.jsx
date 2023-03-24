import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { createDrawerNavigation } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import styles from './menu.style'

const options = ['Profile', 'Popular Jobs', 'Nearby Jobs', 'Search Jobs']

const Menu = () => {
  const [selectedOption, setSelectedOption] = useState('')

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.optionContainer(selectedOption, item)} onPress={() => setSelectedOption(item)}>
            <Text style={styles.optionText(selectedOption, item)}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  )
}

export default Menu