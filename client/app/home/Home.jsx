import { useState } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, SIZES, icons, images } from '../../constants'
import { 
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
  HomeHeader
} from '../../components'

const Home = ({ toggleSideMenu }) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* rewrite property drill to action/reducer */}
      <HomeHeader toggleSideMenu={toggleSideMenu} />

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
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home