import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
import { fetchNearbyJobs } from '../../../actions/jobs'
import debounce from 'lodash.debounce'

import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants'
import NearbyjobsSkeleton from '../../common/skeleton/NearbyjobsSkeleton'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hook/useFetch'
import { useEffect } from 'react'

const Nearbyjobs = () => {
  const router = useRouter()
  // const { data, isLoading, error } = useFetch('search', {
  //   query: 'React Native developer',
  //   num_pages: 1
  // })

  const dispatch = useDispatch()
  const { data, error } = useSelector((state) => state.jobs.nearbyJobs)

  const fetchData = debounce(() => {
    dispatch(fetchNearbyJobs({
      endpoint: 'search',
      query: {
        query: 'React Native developer',
        num_pages: 1
      }
    }))
  }, 5000)

  useEffect(() => {
    fetchData()
  }, [dispatch])
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {
          error ? (
              <Text>Something went wrong</Text>
          ) : data.length ? (
            data?.map((job) => (
              <NearbyJobCard 
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              />
            ))
            ) : (
              <NearbyjobsSkeleton />
          )
        }
      </View>
    </View>
  )
}

export default Nearbyjobs