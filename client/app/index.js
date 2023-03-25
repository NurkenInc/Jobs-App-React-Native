import { Provider } from 'react-redux'

import store from '../state/store'
import Home from './home/Home'
import { SideMenu } from '../components'
import useSideMenu from '../hook/useSideMenu'

const App = () => {
  const { showSideMenu, toggleSideMenu, menuAnimation } = useSideMenu()

  return (
    <Provider store={store}>
      <Home toggleSideMenu={toggleSideMenu} />
      <SideMenu 
        showSideMenu={showSideMenu} 
        toggleSideMenu={toggleSideMenu} 
        menuAnimation={menuAnimation}
      />
    </Provider>
  )
}

export default App