import { useState } from 'react'
import './App.css'
import Signup from './components/Signup'
import LandingPage from './components/LandingPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>

      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<LandingPage/>}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
