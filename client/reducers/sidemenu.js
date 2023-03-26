import {
  CLOSE_SIDE_MENU,
  OPEN_SIDE_MENU
} from '../constants/actionTypes'

const initialState = {
  showSideMenu: false
}

const sidemenu = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_SIDE_MENU:
      return {
        ...state,
        showSideMenu: false
      }
    case OPEN_SIDE_MENU:
      return {
        ...state,
        showSideMenu: true
      }
    default:
      return state
  }
}

export default sidemenu