import React from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'

import styles from './header.style'
import { icons, images } from '../../../constants'

import ScreenHeaderBtn from '../../common/header/ScreenHeaderBtn'
import { openSideMenu } from '../../../actions/sidemenu'

const Header = () => {
  const dispatch = useDispatch()

  const openMenu = () => {
    dispatch(openSideMenu())
  }
  
  return (
    <View style={styles.container}>
      <ScreenHeaderBtn 
        iconUrl={icons.menu}
        dimension='60%'
        handlePress={openMenu}
      />
      <ScreenHeaderBtn 
        iconUrl={images.profile}
        dimension='100%'
      />
    </View>
  )
}

export default Header