import axios from 'axios'

import {
  FETCH_GEOCODE_REQUEST,
  FETCH_GEOCODE_SUCCESS,
  FETCH_GEOCODE_FAILURE
} from '../constants/actionTypes'
import { RAPID_GEOCODE_API_KEY } from '@env'

const rapidGeocodeApiKey = RAPID_GEOCODE_API_KEY

export const geocodeLocation = ({ lat, lon }) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_GEOCODE_REQUEST })

    try {
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

      const response = await axios.request(options)

      dispatch({
        type: FETCH_GEOCODE_SUCCESS,
        payload: response.data.address.country
      })

    } catch (error) {
      dispatch({ type: FETCH_GEOCODE_FAILURE, payload: error })
    }
    
  }
}