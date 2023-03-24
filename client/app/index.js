import { useState } from 'react'
import { View, ScrollView, SafeAreaView } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { Provider } from 'react-redux'

import { COLORS, SIZES, icons, images } from '../constants'
import { 
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
  Menu
} from '../components'
import store from '../state/store'

const Home = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <Stack.Screen 
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
            ),
            headerTitle: ""
          }}
          />
        <Menu />
        {/* side menu */}
        
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
                  router.push(`/search/${searchTerm}`)
                }
              }}
            />
            <Popularjobs />
            <Nearbyjobs />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  )
}

export default Home