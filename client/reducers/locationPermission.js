import {
  LOCATION_PERMISSION_REQUEST,
  LOCATION_PERMISSION_GRANTED,
  LOCATION_PERMISSION_DENIED,
  LOCATION_PERMISSION_UNDETERMINED,
  LOCATION_PERMISSION_FAILURE,
} from '../constants/actionTypes'

const initialState = {
  isLoading: true,
  permission: {
    granted: false,
    denied: false,
    undetermined: true
  },
  error: null
}

const locationPermission = (state = initialState, action) => {
  switch (action) {
    case LOCATION_PERMISSION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case LOCATION_PERMISSION_GRANTED:
      return {
        ...state,
        permission: {
          ...state.permission,
          granted: true,
          undetermined: false
        }
      }
    case LOCATION_PERMISSION_DENIED:
      return {
        ...state,
        permission: {
          ...state.permission,
          denied: true,
          undetermined: false
        }
      }
    case LOCATION_PERMISSION_UNDETERMINED:
      return {
        ...state,
        permission: {
          ...state.permission,
          undetermined: true
        }
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