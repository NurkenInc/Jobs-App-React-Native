import {
  FETCH_NEARBY_JOBS_REQUEST,
  FETCH_NEARBY_JOBS_SUCCESS,
  FETCH_NEARBY_JOBS_FAILURE,
  FETCH_POPULAR_JOBS_REQUEST,
  FETCH_POPULAR_JOBS_SUCCESS,
  FETCH_POPULAR_JOBS_FAILURE,
} from '../constants/actionTypes';

export const initialState = {
  nearbyJobs: {
    isLoading: false,
    data: [],
    error: null
  },
  popularJobs: {
    isLoading: false,
    data: [],
    error: null
  }
}

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEARBY_JOBS_REQUEST: 
      return {
        ...state,
        nearbyJobs: {
          isLoading: true,
          data: [],
          error: null
        }
      }
    case FETCH_NEARBY_JOBS_SUCCESS: 
      return {
        ...state,
        nearbyJobs: {
          isLoading: false,
          data: action.payload,
          error: null
        }
      }
    case FETCH_NEARBY_JOBS_FAILURE: 
      return {
        ...state,
        nearbyJobs: {
          isLoading: false,
          data: [],
          error: action.payload
        }
      }
      case FETCH_POPULAR_JOBS_REQUEST: 
      return {
        ...state,
        popularJobs: {
          isLoading: true,
          data: [],
          error: null
        }
      }
    case FETCH_POPULAR_JOBS_SUCCESS: 
      return {
        ...state,
        popularJobs: {
          isLoading: false,
          data: action.payload,
          error: null
        }
      }
    case FETCH_POPULAR_JOBS_FAILURE: 
      return {
        ...state,
        popularJobs: {
          isLoading: false,
          data: [],
          error: action.payload
        }
      }
    default:
      return state
  }
}

export default jobsReducer