import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import FilterList from './FilterList/FilterList';
import Card from './Card/Card';
import './Catalog.css';
import loading from '../../components/loading.gif';

const Catalog = () => {
  const [products, setProducts] = useState([{}]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function getAllData() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }

        const data = await response.json();
        setProducts(data);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getAllData();
  }, []);

  const filterProducts = (e) => {
    const filteredProducts = products.filter((product) => {
      if (
        JSON.stringify(e.target.textContent.toLowerCase()) ===
        JSON.stringify(product.category)
      ) {
        return product;
      }
    });
    setFilteredProducts(filteredProducts);
    setIsLoading(false);
  };

  if (isLoading) return <img className='loading' src={loading}></img>;
  if (errorMessage) return <p className='error'>{errorMessage}</p>;

  return (
    <div className='catalog-container'>
      <Header />
      <FilterList filterProducts={filterProducts} />
      <main className='catalog-content'>
        <div className='products'>
          {filteredProducts.length < 1
            ? products.map((item) => (
                <Card
                  products={products}
                  key={`${item.id}-${item.title}`}
                  productTitle={item.title}
                  src={item.image}
                  productPrice={item.price}
                  id={item.id}
                />
              ))
            : filteredProducts.map((item) => (
                <Card
                  products={products}
                  key={`${item.id}-${item.title}`}
                  productTitle={item.title}
                  src={item.image}
                  productPrice={item.price}
                  id={item.id}
                />
              ))}
        </div>
      </main>
    </div>
  );
};

export default Catalog;
