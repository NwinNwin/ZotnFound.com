import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import ResultCard from './components/ResultCard/ResultCard'
import CreateModal from './components/CreateModal/CreateModal'
import InfoModal from './components/InfoModal/InfoModal'

import { ChakraProvider } from '@chakra-ui/react'
import 'leaflet/dist/leaflet.css'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
function App () {
  const { currentUser } = useContext(AuthContext)
  
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to='/' />
  }

  const ShowLogin = ({ children }) => {
    return currentUser ? <Navigate to='/home' /> : children
  }
  // console.log(currentUser)
  return (
    <ChakraProvider>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={
              <ShowLogin>
                <Login />
              </ShowLogin>
            }
          />
          <Route
            path='/home'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path='/cards'
            element={
              <RequireAuth>
                ;<ResultCard />
              </RequireAuth>
            }
          />
          <Route
            path='/modals'
            element={
              <RequireAuth>
                ;<CreateModal />
              </RequireAuth>
            }
          />
          <Route
            path='/info'
            element={
              <RequireAuth>
                ;<InfoModal />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </ChakraProvider>
  )
}

export default App
