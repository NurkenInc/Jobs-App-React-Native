import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import debounce from 'lodash.debounce'

import styles from './nearbyjobs.style'

import NearbyjobsSkeleton from '../../common/skeleton/NearbyjobsSkeleton'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

import { fetchNearbyJobs } from '../../../actions/jobs'

const Nearbyjobs = () => {
  const router = useRouter()

  const dispatch = useDispatch()
  const { data, error } = useSelector((state) => state.jobs.nearbyJobs)

  const fetchData
   = debounce(() => {
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