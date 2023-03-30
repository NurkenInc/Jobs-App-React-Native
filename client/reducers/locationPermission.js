import {
  LOCATION_PERMISSION_REQUEST,
  LOCATION_PERMISSION_GRANTED,
  LOCATION_PERMISSION_FAILURE,
} from '../constants/actionTypes'

const initialState = {
  isLoading: false,
  granted: false,
  error: null
}

const locationPermission = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_PERMISSION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case LOCATION_PERMISSION_GRANTED:
      return {
        ...state,
        granted: true,
        isLoading: false
      }
    case LOCATION_PERMISSION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default locationPermission