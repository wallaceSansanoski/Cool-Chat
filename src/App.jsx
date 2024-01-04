import './App.css'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import SignIn from './pages/sign-in/sign-in'
import Signup from './pages/sign-up/signup'
import Home from './pages/home/home'
import Notfound from './pages/not found/Notfound'
import { authContext } from './AuthContext/authContext'
import { useContext} from 'react'

function App() {
  
  const currentUser = useContext(authContext)
  const loading = currentUser === false

  if(loading){
    return <p>Carregando</p>
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ currentUser ? <Home/> : <SignIn/>}/>
          <Route path='/home' element={ currentUser ? <Home/> : <Navigate to={'/'}/>}/>
          <Route path='/sign-up' element={<Signup />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
