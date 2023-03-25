import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

import styles from './header.style'
import { icons, images } from '../../../constants'

import { ScreenHeaderBtn } from '../../index'

const Header = ({ toggleSideMenu }) => {
  return (
    <View style={styles.container}>
      <ScreenHeaderBtn 
        iconUrl={icons.menu}
        dimension='60%'
        handlePress={toggleSideMenu}
      />
      <ScreenHeaderBtn 
        iconUrl={images.profile}
        dimension='100%'
      />
    </View>
  )
}

export default Header