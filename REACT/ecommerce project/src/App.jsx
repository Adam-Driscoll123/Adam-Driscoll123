import './index.css'
import { Routes, Route } from 'react-router';
import { HomePage } from './pages/home/HomePage.jsx'
import { CheckoutPage } from './pages/checkout/CheckoutPage.jsx'
import { OrdersPage } from './pages/orders/OrdersPage.jsx'
import { TrackingPage } from './pages/tracking/TrackingPage.jsx'
import { PageNotFound } from './pages/PageNotFound.jsx'
import { useEffect, useState } from 'react';
import axios from 'axios'


function App() {
  const [ cart, setCart ] = useState([])

  useEffect(() => {
    axios.get('api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data)
      })
  }, [])
  

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart}/>} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    
  )
}

export default App
