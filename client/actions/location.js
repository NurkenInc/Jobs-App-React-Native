import * as Location from 'expo-location'

import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE,
} from '../constants/actionTypes'

export const getLocation = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LOCATION_REQUEST })

    console.log('f')
    try {
      const { coords } = await Location.getCurrentPositionAsync({})

      console.log('p')
      const { latitude, longitude } = coords

      console.log(latitude)
      console.log(longitude)
      dispatch({
        type: FETCH_LOCATION_SUCCESS,
        payload: { latitude, longitude }
      })

    } catch (error) {
      dispatch({ type: FETCH_LOCATION_FAILURE, payload: error })
      console.log('lat')
    }
  }
}