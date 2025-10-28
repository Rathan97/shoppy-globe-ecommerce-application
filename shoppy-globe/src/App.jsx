
import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom'
import appStore from './redux/store.js'
import Header from './components/Header'

import Footer from './components/Footer.jsx'
import {Suspense} from 'react'
import LoadingSpinner from './components/LoadingSpinner.jsx'





function App() {
 

  return (
    <Provider store={appStore}>

      <Header />
      <Suspense fallback={<LoadingSpinner />}>
       
     
      <Outlet />
       </Suspense>
      <Footer />
      </Provider>

  

  




      


    
  )
}

export default App;
