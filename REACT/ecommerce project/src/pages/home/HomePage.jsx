import './HomePage.css'
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header.jsx'
import { Link } from 'react-router';
import { ProductsGrid } from './ProductsGrid.jsx'
import axios from 'axios'

export function HomePage ({ cart }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('api/products')
      setProducts(response.data);
    }
    
    getHomeData();
  }, []);

  
  
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/public/home-favicon.png" />

      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}