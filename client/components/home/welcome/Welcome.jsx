import { useState } from 'react'
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList 
} from 'react-native'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import styles from './welcome.style'
import { icons, SIZES } from '../../../constants'

import { closeSideMenu } from '../../../actions/sidemenu'

const jobTypes = ['Full-time', 'Part-time', 'Contractor']

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const [activeJobType, setActiveJobType] = useState('Full-time')
  const { showSideMenu } = useSelector((state) => state.sidemenu)

  const router = useRouter()
  const dispatch = useDispatch()

  const closeMenu = () => {
    if(showSideMenu) {
      dispatch(closeSideMenu())
    }
  }

  const handleJobTypePress = (item) => {
    setActiveJobType(item)
    router.push(`../search/${item}`)
    closeMenu()
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Nurken</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onPressIn={closeMenu}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="What are you looking for?"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                handleJobTypePress(item)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome