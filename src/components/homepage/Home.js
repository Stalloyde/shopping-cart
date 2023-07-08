import React from 'react';
import Header from '../header/Header';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = ({ cartArray }) => (
  <div className='home-container' data-testid='homepage'>
    <Header cartArray={cartArray} />
    <div className='home-content'>
      Welcome to our electric guitar paradise!
      <br />
      <br />
      Whether you're a seasoned rockstar or a budding musician, our online store
      is your ultimate destination for all things electric guitars. Discover a
      curated collection of iconic brands, awe-inspiring designs, and
      cutting-edge technology that will elevate your musical journey to new
      heights. From timeless classics to modern innovations, we offer an
      extensive range of electric guitars that cater to every style and genre.
      <br />
      <br />
      With our passion for music and commitment to quality, we strive to provide
      you with an exceptional shopping experience. Explore our store and unleash
      the power of electrifying melodies today!
      <br />
      <br />
      Our brands include Fender, Gibson, PRS, Kiesel and many more!
    </div>
    <div className='btn-container'>
      <Link to='/catalog'>
        <div>View Our Collection</div>
      </Link>
    </div>
  </div>
);

export default Home;
