import './HomePage.css'
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header.jsx'
import { Link, useSearchParams } from 'react-router';
import { ProductsGrid } from './ProductsGrid.jsx'
import axios from 'axios'

export function HomePage ({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  
  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search ? `/api/products?search=${search}` : '/api/products'
      const response = await axios.get(urlPath)
      setProducts(response.data);
    }
    
    getHomeData();
  }, [search]);

  
  
  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/public/home-favicon.png" />

      <Header cart={cart}/>

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}