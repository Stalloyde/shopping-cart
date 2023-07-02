import React from 'react';
import Header from '../header/Header';
import './Catalog.css';

const guitars = [
  {
    brand: 'PRS',
    model: 'PRS CE24 - Black',
    price: 100,
    imageSrc: require('./Images/prs-ce24-black.webp'),
  },
  {
    brand: 'PRS',
    model: 'PRS John Mayer Silver Sky - Maple',
    price: 100,
    imageSrc: require('./Images/prs-john-mayer-silver-sky-maple.webp'),
  },
  {
    brand: 'PRS',
    model: 'PRS SE Custom 24 - Vintage Sunburst',
    price: 100,
    imageSrc: require('./Images/prs-se-custom-24-vintage-sunburst.webp'),
  },
  {
    brand: 'PRS',
    model: 'PRS SE Zach Myers 594 Semi-Hollow - Myers Blue',
    price: 100,
    imageSrc: require('./Images/prs-se-zach-myers-594-semi-hollow-myers-blue.webp'),
  },
  {
    brand: 'PRS',
    model: 'PRS Studio 22 - Purple Mist',
    price: 100,
    imageSrc: require('./Images/prs-studio-22-purple-mist.webp'),
  },
  { brand: 'Gibson', model: '2a', price: 200, imageSrc: '' },
  { brand: 'Gibson', model: '2b', price: 200, imageSrc: '' },
  { brand: 'Gibson', model: '2c', price: 200, imageSrc: '' },
  { brand: 'Gibson', model: '2d', price: 200, imageSrc: '' },
  { brand: 'Gibson', model: '2e', price: 200, imageSrc: '' },
  { brand: 'Ibanez', model: '3', price: 300, imageSrc: '' },
  { brand: 'Schecter', model: '4a', price: 400, imageSrc: '' },
  { brand: 'Schecter', model: '4b', price: 400, imageSrc: '' },
  { brand: 'Schecter', model: '4c', price: 400, imageSrc: '' },
  { brand: 'Schecter', model: '4d', price: 400, imageSrc: '' },
  { brand: 'Schecter', model: '4e', price: 400, imageSrc: '' },
  { brand: 'Schecter', model: '4f', price: 400, imageSrc: '' },
  { brand: 'Kiesel', model: '5', price: 500, imageSrc: '' },
  { brand: 'Fender', model: '6a', price: 600, imageSrc: '' },
  { brand: 'Fender', model: '6b', price: 600, imageSrc: '' },
  { brand: 'Fender', model: '6c', price: 600, imageSrc: '' },
  { brand: 'Fender', model: '6d', price: 600, imageSrc: '' },
  { brand: 'Fender', model: '6e', price: 600, imageSrc: '' },
  { brand: 'Fender', model: '6f', price: 600, imageSrc: '' },
  { brand: 'Suhr', model: '7', price: 700, imageSrc: '' },
];

const Card = (src, model, price) => (
  <>
    {guitars.map((item) => (
      <div className='card' key={item.model}>
        <div className='image-container'>
          <img
            src={item.imageSrc}
            alt={item.model}
            width='100%'
            height='100%'
          ></img>
        </div>
        <div className='description'>
          <div>
            <strong>{item.model}</strong>
          </div>
          <div>${item.price}</div>
          <div className='add-to-cart'>
            <>
              <label>
                Quantity:
                <input
                  name={item.model}
                  type='number'
                  min='1'
                  defaultValue='1'
                ></input>
              </label>
            </>
            <div>
              <button>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

const Catalog = () => (
  <div className='catalog-container'>
    <Header />
    <div className='brands'>
      <ul>
        Filter by:
        <li>All brands</li>
        <li>PRS</li>
        <li>Gibson</li>
        <li>Ibanez</li>
        <li>Schecter</li>
        <li>Kiesel</li>
        <li>Fender</li>
        <li>Suhr</li>
      </ul>
    </div>

    <div className='catalog-content'>
      <div className='products'>
        <Card />
      </div>
    </div>
  </div>
);

export default Catalog;
