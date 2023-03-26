import { Provider } from 'react-redux'

import store from '../state/store'
import Home from './home/Home'
import { SideMenu } from '../components'

const App = () => {

  return (
    <Provider store={store}>
      <Home />
      <SideMenu />
    </Provider>
  )
}

export default App