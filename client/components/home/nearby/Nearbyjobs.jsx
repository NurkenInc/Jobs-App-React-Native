import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import debounce from 'lodash.debounce'
import * as Location from 'expo-location'
import axios from 'axios'

import styles from './nearbyjobs.style'

import NearbyjobsSkeleton from '../../common/skeleton/NearbyjobsSkeleton'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'

import { fetchNearbyJobs } from '../../../actions/jobs'
import { closeSideMenu } from '../../../actions/sidemenu'
import { getLocationPermission } from '../../../actions/locationPermission'
import { getLocation } from '../../../actions/location'
import { geocodeLocation } from '../../../actions/country'

import { RAPID_GEOCODE_API_KEY } from '@env'

const rapidGeocodeApiKey = RAPID_GEOCODE_API_KEY

const Nearbyjobs = () => {
  // const [country, setCountry] = useState('')
  // const [location, setLocation] = useState({})
  const nearbyJobs = useSelector((state) => state.jobs.nearbyJobs)
  const country = useSelector((state) => state.country)
  const location = useSelector((state) => state.location)
  const locationPermission = useSelector((state) => state.locationPermission)
  const { showSideMenu } = useSelector((state) => state.sidemenu)

  const router = useRouter()
  const dispatch = useDispatch()

  const fetchJobs = debounce(() => {
    dispatch(fetchNearbyJobs({
      endpoint: 'search',
      query: {
        query: `React Native developer ${country.data}`,
        num_pages: 1
      }
    }))
  }, 5000)

  const fetchCountry = async ({ latitude, longitude }) => {
    dispatch(geocodeLocation({ latitude, longitude }))
  }

  const fetchLocationPermission = () => {
    dispatch(getLocationPermission())
  }

  const fetchLocation = () => {
    dispatch(getLocation())
  }

  const closeMenu = () => {
    if (showSideMenu) {
      dispatch(closeSideMenu())
    }
  }

  const handleCardPress = (job) => {
    router.push(`../job-details/${job.job_id}`)
    closeMenu()
  }

  // TODO: rewrite useEffects to HOC
  useEffect(() => {
    if(locationPermission.granted) {
      fetchLocation()
    }
  }, [locationPermission.isLoading])

  useEffect(() => {
    if(Object.keys(location.data).length) {
      fetchCountry(location.data)
    }
  }, [location.isLoading])
  
  
  useEffect(() => {
    // may not get country on time when fetching jobs
    fetchLocationPermission()
    fetchJobs()
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
          nearbyJobs.error ? (
              <Text>Something went wrong</Text>
          ) : nearbyJobs.data.length ? (
            nearbyJobs.data?.map((job) => (
              <NearbyJobCard 
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={() => {
                  handleCardPress(job)
                }}
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