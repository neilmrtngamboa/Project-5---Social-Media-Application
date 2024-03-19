import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Authentication/Login'
import Register from './pages/Authentication/Register'
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
