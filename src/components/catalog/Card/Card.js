import React from 'react';

const Card = ({ guitars }) => (
  <>
    {guitars.map((item) => (
      <div className='card' key={item.model}>
        <div className='image-container'>
          <img
            src={item.imageSrc}
            alt={item.model}
            width={item.width}
            height={item.height}
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

export default Card;
