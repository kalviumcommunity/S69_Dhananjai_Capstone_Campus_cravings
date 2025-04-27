import { useState } from 'react'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import LandingPage from './components/LandingPage'
import Food from './components/FoodStationary'
import DeliveryDashboard from "./components/DeliveryDashboard"
import RegisterDelivery from './components/registerDelivery'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import DeliveryJoin from './components/DeliveryJoin'
import DeliveryRequests from './components/orderDelivery'
import OrderDetails from './components/orderDetails'
import AddRestaurant from './components/AddRestaurant'
import RestaurantDetails from './components/RestaurantDetails'
import MenuAndOperation from './components/MenuAndOperation'
import RestaurantDocuments from './components/RestaurantDocuments'
import RestaurantDashboard from './components/RestaurantDocuments'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>

      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/food' element={<Food/>}/>
      <Route path='/joindel' element={<DeliveryJoin/>}/>
      <Route path='/regisdel' element={<RegisterDelivery/>}/>
      <Route path='/dashdel' element={<DeliveryDashboard/>}/>
      <Route path='/delreq' element={<DeliveryRequests/>}/>
      <Route path="/order/:id" element={<OrderDetails />} /> {/* ✅ Route for Order Details */}
      <Route path="/addres" element={<AddRestaurant/>}/>
      <Route path="/restodet" element={<RestaurantDetails/>}/>
      <Route path="/menudet" element={<MenuAndOperation/>}/>
      <Route path="/resdoc" element ={<RestaurantDocuments/>}/>
      <Route path="/resdash" element ={<RestaurantDashboard/>}/>

    </Routes>
    
    </BrowserRouter>
  )
}

export default App
