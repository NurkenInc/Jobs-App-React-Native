import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'

import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import { fetchPopularJobs } from '../../../actions/jobs'
import { closeSideMenu } from '../../../actions/sidemenu'

const Popularjobs = () => {
  const [selectedJob, setSelectedJob] = useState()
  const [jobQuery, setJobQuery] = useState('React developer')
  const { isLoading, data, error }  = useSelector((state) => state.jobs.popularJobs)
  const { showSideMenu } = useSelector((state) => state.sidemenu)
  
  const router = useRouter()
  const dispatch = useDispatch()

  const closeMenu = () => {
    if (showSideMenu) {
      dispatch(closeSideMenu())
    }
  }

  const handleShowAll = (query) => {
    router.push(`../search/${query}`)
    closeMenu()
  }

  const handleCardPress = (item) => {
    router.push(`../job-details/${item.job_id}`)
    setSelectedJob(item.job_id)
    closeMenu()
  }

  const fetchData = () =>  {
    dispatch(fetchPopularJobs({ 
      endpoint: 'search', 
      query: {
        query: jobQuery,
        num_pages: 1
      }
    }))
  }

  useEffect(() => {
    fetchData()
  }, [dispatch])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity
          onPress={() => {
            handleShowAll(jobQuery)
          }}
        >
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