import './index.css'
import { Routes, Route,} from 'react-router';
import { HomePage } from './pages/home/HomePage.jsx'
import { CheckoutPage } from './pages/checkout/CheckoutPage.jsx'
import { OrdersPage } from './pages/orders/OrdersPage.jsx'
import { TrackingPage } from './pages/tracking/TrackingPage.jsx'
import { PageNotFound } from './pages/PageNotFound.jsx'
import { useEffect, useState } from 'react';
import axios from 'axios'


function App() {
  
  const [ cart, setCart ] = useState([])
  const loadCart = async () => {
    const response = await axios.get('api/cart-items?expand=product')
    setCart(response.data)
  }


  useEffect(() => {
    
    
    loadCart();
  }, [])
  

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
      <Route path="orders" element={<OrdersPage cart={cart}/>} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<PageNotFound cart={cart} />} />
    </Routes>
    
  )
}

export default App
