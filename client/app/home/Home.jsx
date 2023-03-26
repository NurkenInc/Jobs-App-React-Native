import { useState } from 'react'
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import { COLORS, SIZES } from '../../constants'
import { 
  Nearbyjobs,
  Popularjobs,
  Welcome,
  HomeHeader
} from '../../components'
import { closeSideMenu } from '../../actions/sidemenu'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const { showSideMenu } = useSelector((state) => state.sidemenu)

  const router = useRouter()
  const dispatch = useDispatch()

  const closeMenu = () => {
    if(showSideMenu) {
      dispatch(closeSideMenu())
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen options={{ headerShown: false }} />

      <HomeHeader/>
      <TouchableOpacity 
        style={{ opacity: 1 }} 
        activeOpacity={1} 
        onPress={closeMenu}
      >

        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              padding: SIZES.medium
            }}
          >
            <Welcome 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleClick={() => {
                if(searchTerm) {
                  router.push(`../search/${searchTerm}`)
                }
                closeMenu()
              }}
            />
            <Popularjobs />
            <Nearbyjobs />
          </View>
        </ScrollView>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home