import './tracking.css'
import { Header } from '../../components/Header.jsx'
import { Link, useParams } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatDeliveryTime } from '../../utils/utils.js';
import dayjs from 'dayjs'


export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [ order, setOrder ] = useState(null);

  useEffect(() => {
    async function getOrderData() {
      let response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }
    
    getOrderData();
  }, [orderId])

  if (!order) { return null; }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  })

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() -  order.orderTimeMs;
  const orderProgress = (timePassedMs/totalDeliveryTimeMs) * 100;

  const isPreparing = (orderProgress<33);
  const isShipped = (orderProgress>=33 && orderProgress<100 );
  const isDelivered = (orderProgress>=100);
  
  


  return (
    <>
      <Header cart={cart}/>

      <link rel="icon" type="image/svg+xml" href="/public/tracking-favicon.png" />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {orderProgress>=100 ? 'Delivered on ' : 'Arriving on '}{formatDeliveryTime(orderProduct.estimatedDeliveryTimeMs)}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div 
              style={{width: `${orderProgress}%`}} 
              className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}