import * as Location from 'expo-location'

import {
  LOCATION_PERMISSION_REQUEST,
  LOCATION_PERMISSION_GRANTED,
  LOCATION_PERMISSION_UNDETERMINED,
  LOCATION_PERMISSION_DENIED,
  LOCATION_PERMISSION_FAILURE
} from '../constants/actionTypes'

export const getLocationPermission = () => {
  return async (dispatch) => {
    dispatch({ type: LOCATION_PERMISSION_REQUEST })
    
    try {
      let { status } = await Location.getForegroundPermissionsAsync()
      
      if (status === 'granted') {
        dispatch({ type: LOCATION_PERMISSION_GRANTED })
      } else if (status === 'denied') {
        dispatch({ type: LOCATION_PERMISSION_DENIED })
      } else {
        dispatch({ type: LOCATION_PERMISSION_UNDETERMINED })
      }

    } catch (error) {
      dispatch({ type: LOCATION_PERMISSION_FAILURE, payload: error })
    }  
  }
}