import React, { useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Animated, Image } from 'react-native'

import { ScreenHeaderBtn } from '../../index'

import { icons } from '../../../constants'
import styles from './sidemenu.style'

const options = ['Profile', 'Popular Jobs', 'Nearby Jobs', 'Search Jobs']

const SideMenu = ({ showSideMenu, toggleSideMenu, menuAnimation }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [isContainerClosed, setIsContainerClosed] = useState(true)

  // if side menu was closed, we close outer container after sidemenu closing animation is done
  useEffect(() => {
    if(showSideMenu === false) {
      setTimeout(() => {
        setIsContainerClosed(true)
      }, 300)
    } else if(showSideMenu === true) {
      setIsContainerClosed(false)
    }
  }, [showSideMenu])

  return (
    <View style={styles.container(isContainerClosed)}>
      <Animated.View style={{ transform: [{ translateX: menuAnimation }] }}>
        <View style={styles.innerContainer}>
          <View style={styles.closeBtnContainer}>
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={toggleSideMenu}
            />
          </View>
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
      </Animated.View>
    </View>
  )
}

export default SideMenu