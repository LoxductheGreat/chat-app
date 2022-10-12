import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import Login from './Components/login';
import Register from './Components/register';
import HomePage from './Components/HomePage';

function App() {

  return (
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
  );
}

export default App;
