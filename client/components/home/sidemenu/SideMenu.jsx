import React, { useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Animated } from 'react-native'
import { useDispatch,  useSelector } from 'react-redux'

import ScreenHeaderBtn from '../../common/header/ScreenHeaderBtn'
import { closeSideMenu } from '../../../actions/sidemenu'

import { icons } from '../../../constants'
import styles from './sidemenu.style'

const options = ['Profile', 'Popular Jobs', 'Nearby Jobs', 'Search Jobs']

const SideMenu = () => {
  const [selectedOption, setSelectedOption] = useState('')
  const [isContainerClosed, setIsContainerClosed] = useState(true)
  const { showSideMenu } = useSelector((state) => state.sidemenu)

  const menuAnimation = useRef(new Animated.Value(-250)).current
  const dispatch = useDispatch()
  
  const animateMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: showSideMenu ? 0 : -250,
      duration: 300,
      useNativeDriver: true
    }).start()
  }

  const closeMenu = () => {
    dispatch(closeSideMenu())
  }

  // if side menu was closed, we close outer container after sidemenu closing animation is done
  const setContainerState = () => {
    if(showSideMenu === false) {
      setTimeout(() => {
        setIsContainerClosed(true)
      }, 300)
    } else if(showSideMenu === true) {
      setIsContainerClosed(false)
    }
  }

  useEffect(() => {
    setContainerState()
    animateMenu()
  }, [showSideMenu])

  return (
    <View style={styles.container(isContainerClosed)}>
      <Animated.View style={{ transform: [{ translateX: menuAnimation }] }}>
        <View style={styles.innerContainer}>
          <View style={styles.closeBtnContainer}>
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={closeMenu}
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