
import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom'
import appStore from './redux/store.js'
import Header from './components/Header'

import Footer from './components/Footer.jsx'
import ProductList from './components/ProductList.jsx'





function App() {
 

  return (
    <Provider store={appStore}>

      <Header />
      <Outlet />
      <Footer />
      </Provider>

  

  




      


    
  )
}

export default App;
