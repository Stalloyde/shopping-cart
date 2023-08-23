import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import FilterList from './FilterList/FilterList';
import Card from './Card/Card';
import './Catalog.css';

const Catalog = () => {
  const [products, setProducts] = useState([{}]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function getAllData() {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
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
    console.log(filteredProducts);
  };

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
