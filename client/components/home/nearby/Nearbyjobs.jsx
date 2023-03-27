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

import { RAPID_GEOCODE_API_KEY } from '@env'

const rapidGeocodeApiKey = RAPID_GEOCODE_API_KEY

const Nearbyjobs = () => {
  const [country, setCountry] = useState('')
  const [location, setLocation] = useState({})
  const { data, error } = useSelector((state) => state.jobs.nearbyJobs)
  const { showSideMenu } = useSelector((state) => state.sidemenu)

  const router = useRouter()
  const dispatch = useDispatch()

  const fetchData
   = debounce(() => {
    dispatch(fetchNearbyJobs({
      endpoint: 'search',
      query: {
        query: `React Native developer ${country}`,
        num_pages: 1
      }
    }))
  }, 5000)

  const closeMenu = () => {
    if (showSideMenu) {
      dispatch(closeSideMenu())
    }
  }

  const handleCardPress = (job) => {
    router.push(`../job-details/${job.job_id}`)
    closeMenu()
  }

  // rewrite location country logic to reducers and actions
  const getCurrentCountry = async ({ lat, lon }) => {
    const options = {
      method: 'GET',
      url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse',
      params: {
        lat,
        lon,
        'accept-language': 'en',
        polygon_threshold: '0.0'
      },
      headers: {
        'X-RapidAPI-Key': rapidGeocodeApiKey,
        'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
      }
    }

    try {
      const response = await axios.request(options)

      setCountry(response.data.address.country)
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()

      if(status !== 'granted') {
        return
      }

      let location = await Location.getCurrentPositionAsync({})

      const lat = location.coords.latitude
      const lon = location.coords.longitude

      setLocation({ lat, lon })
    })()
  }

  useEffect(() => {
    getCurrentLocation()
    getCurrentCountry(location)
  }, [])

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