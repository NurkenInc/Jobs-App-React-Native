import * as Location from 'expo-location'

import {
  LOCATION_PERMISSION_REQUEST,
  LOCATION_PERMISSION_GRANTED,
  LOCATION_PERMISSION_FAILURE
} from '../constants/actionTypes'

export const getLocationPermission = () => {
  return async (dispatch) => {
    dispatch({ type: LOCATION_PERMISSION_REQUEST })

    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      
      if (status === 'granted') {
        dispatch({ type: LOCATION_PERMISSION_GRANTED })
      }
    } catch (error) {
      dispatch({ type: LOCATION_PERMISSION_FAILURE, payload: error })
    }  
  }
}