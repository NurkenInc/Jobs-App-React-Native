import { combineReducers } from 'redux'

import jobs from './jobs'
import sidemenu from './sidemenu'
import location from './location'
import locationPermission from './locationPermission'
import country from './country'

const reducers = combineReducers({ jobs, sidemenu, location, locationPermission, country })

export default reducers