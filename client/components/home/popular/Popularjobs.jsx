import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPopularJobs } from '../../../actions/jobs'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {
  const router = useRouter()
  // const { data, isLoading, error } = useFetch
  // ('search', {
  //   query: 'React developer',
  //   num_pages: 1
  // })
  const dispatch = useDispatch()

  const { isLoading, data, error }  = useSelector((state) => state.jobs.popularJobs)

  const [selectedJob, setSelectedJob] = useState()

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`)
    setSelectedJob(item.job_id)    
  }

  useEffect(() => {
    dispatch(fetchPopularJobs({ 
      endpoint: 'search', 
      query: {
        query: 'React developer',
        num_pages: 1
      }
    }))
  }, [dispatch])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {
          isLoading ? (
            <ActivityIndicator size="large" colors={COLORS.primary}></ActivityIndicator>
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            <FlatList 
              data={data}
              renderItem={({ item }) => (
                <PopularJobCard 
                  item={item}
                  selectedJob={selectedJob}
                  handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={(item) => item?.job_id}
              contentContainerStyle={{ columnGap: SIZES.medium }}
              horizontal
            />
          )
        }
      </View>
    </View>
  )
}

export default Popularjobs