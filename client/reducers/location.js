import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE
} from '../constants/actionTypes'

const initialState = {
  isLoading: false,
  data: {},
  error: null
}

const location = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }
    case FETCH_LOCATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default location