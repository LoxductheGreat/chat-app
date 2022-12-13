import {
  Routes,
  Route
} from 'react-router-dom'
import './App.css'
import Login from './Components/login'
import Register from './Components/register'
import Home from './Pages/Home'
function App () {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
