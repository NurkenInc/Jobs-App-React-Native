import {
  FETCH_GEOCODE_REQUEST,
  FETCH_GEOCODE_SUCCESS,
  FETCH_GEOCODE_FAILURE
} from '../constants/actionTypes'

const initialState = {
  isLoading: false,
  data: '',
  error: null
}

const country = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GEOCODE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_GEOCODE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
    case FETCH_GEOCODE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}

export default country