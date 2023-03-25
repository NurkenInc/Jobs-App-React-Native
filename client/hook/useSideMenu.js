import { useState, useRef } from 'react'
import { Animated } from 'react-native'

const useSideMenu = () => {
  const [showSideMenu, setShowSideMenu] = useState(false)
  const menuAnimation = useRef(new Animated.Value(-250)).current

  const toggleSideMenu = () => {
    setShowSideMenu(() => !showSideMenu)
    Animated.timing(menuAnimation, {
      toValue: showSideMenu ? -250 : 0,
      duration: 300,
      useNativeDriver: true
    }).start()
  }

  return { showSideMenu, toggleSideMenu, menuAnimation }
}

export default useSideMenu