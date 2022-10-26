import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import {
  Routes,
  Route
} from 'react-router-dom'
import './App.css'
import Login from './Components/login'
import Register from './Components/register'
import HomePage from './Components/HomePage'

function App () {

  // const { token } = localStorage.getItem('token')

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
