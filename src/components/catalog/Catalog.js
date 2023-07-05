import React from 'react';
import Header from '../header/Header';
import FilterList from './FilterList/FilterList';
import Card from './Card/Card';
import './Catalog.css';

const guitars = [
  {
    brand: 'PRS',
    model: 'PRS CE24 - Black',
    price: 100,
    imageSrc: require('./Images/prs-ce24-black.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'PRS',
    model: 'PRS John Mayer Silver Sky - Maple',
    price: 100,
    imageSrc: require('./Images/prs-john-mayer-silver-sky-maple.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'PRS',
    model: 'PRS SE Custom 24 - Vintage Sunburst',
    price: 100,
    imageSrc: require('./Images/prs-se-custom-24-vintage-sunburst.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'PRS',
    model: 'PRS SE Zach Myers 594 Semi-Hollow - Myers Blue',
    price: 100,
    imageSrc: require('./Images/prs-se-zach-myers-594-semi-hollow-myers-blue.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'PRS',
    model: 'PRS Studio 22 - Purple Mist',
    price: 100,
    imageSrc: require('./Images/prs-studio-22-purple-mist.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'Gibson',
    model: 'Gibson 70s Explorer - Classic White',
    price: 200,
    imageSrc: require('./Images/gibson 70s explorer - classic white.png'),
    height: '85%',
    width: '45%',
  },
  {
    brand: 'Gibson',
    model: 'Gibson Firebird - Tobacco Burst',
    price: 200,
    imageSrc: require('./Images/gibson firebird -tobacco burst.png'),
    height: '85%',
    width: '45%',
  },
  {
    brand: 'Gibson',
    model: 'Gibson Les Paul Special - TV Yellow',
    price: 200,
    imageSrc: require('./Images/gibson les paul special - tv yellowpng'),
    height: '85%',
    width: '45%',
  },
  {
    brand: 'Gibson',
    model: 'Gibson Les Paul Standard 60s',
    price: 200,
    imageSrc: require('./Images/gibson les paul standard 60s.png'),
    height: '85%',
    width: '45%',
  },
  {
    brand: 'Gibson',
    model: 'Gibson SG Special - Ebony',
    price: 200,
    imageSrc: require('./Images/gibson sg special-ebony.png'),
    height: '85%',
    width: '45%',
  },
  {
    brand: 'Ibanez',
    model: 'Ibanez AR520HFM-VLS - Violin Burst',
    price: 300,
    imageSrc: require('./Images/ibanez-ar520hfm-vls-violin-burst.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'Ibanez',
    model:
      'Ibanez FTM33 WK Fredrik Thordendal Signature 8-string w/Case - Weathered Black',
    price: 300,
    imageSrc: require('./Images/ibanez-ftm33-wk-fredrik-thordendal-signature-8-string-w-case-weathered-black.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'Ibanez',
    model:
      'Ibanez M80M-WJ Meshuggah Signature 8-string w/Case - Weathered Black',
    price: 300,
    imageSrc: require('./Images/ibanez-m80m-wj-meshuggah-signautre-8string-w-case-weathered-black.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'Ibanez',
    model: 'Ibanez Prestige LB - Laser Blue',
    price: 300,
    imageSrc: require('./Images/ibanez-prestige-lb-laser-blue.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'Schecter',
    model: 'Schecter Avenger Exotic - Spalted Maple',
    price: 400,
    imageSrc: require('./Images/schecter-Avenger Exotic.Spalted Maple.01.png'),
    height: '85%',
    width: '30%',
  },
  {
    brand: 'Schecter',
    model: 'Schecter E-1 Custom - Vintage Sunburst',
    price: 400,
    imageSrc: require('./Images/schecter-E-1 Custom. Vintage Sunburst.01.png'),
    height: '85%',
    width: '30%',
  },
  {
    brand: 'Schecter',
    model: 'Schecter Hellraiser Hybrid C-1 - Trans Black Burst',
    price: 400,
    imageSrc: require('./Images/schecter-Hellraiser Hybrid C-1.Trans Black Burst (TBB).01.png'),
    height: '85%',
    width: '30%',
  },
  {
    brand: 'Schecter',
    model: 'Schecter Juan of the Dead V-1 - Black Reign',
    price: 400,
    imageSrc: require('./Images/schecter-Juan of the Dead V-1.Black Reign.01.png'),
    height: '85%',
    width: '30%',
  },
  {
    brand: 'Schecter',
    model: 'Schecter V-1 Custom - Trans Purple',
    price: 400,
    imageSrc: require('./Images/schecter-V-1 Custom.Trans Purple.01.png'),
    height: '85%',
    width: '30%',
  },
  {
    brand: 'Schecter',
    model: 'Schecter Aaron Marshall AM-7 - Cobalt Slate',
    price: 400,
    imageSrc: require('./Images/schecter-Aaron Marshall AM-7.Cobalt Slate.01.png'),
    height: '85%',
    width: '30%',
  },
  {
    brand: 'Kiesel',
    model: 'Kiesel Aries Bolt-On',
    price: 500,
    imageSrc: require('./Images/kiesel-a6h-main-137637.webp'),
    height: '85%',
    width: '30%',
  },
  {
    brand: 'Kiesel',
    model: 'Kiesel Aries Titanium Series ',
    price: 500,
    imageSrc: require('./Images/kiesel-newa6c-efb-nin-scallopedfb-evoj-pthr-y-eph-rtf-g-bg-pen-ptb-ppg-gl.webp'),
    height: '85%',
    width: '30%',
  },
  {
    brand: 'Kiesel',
    model: 'Kiesel Osiris',
    price: 500,
    imageSrc: require('./Images/kiesel-o6x-137486.webp'),
    height: '85%',
    width: '30%',
  },
  {
    brand: 'Fender',
    model: 'Fender American Vintage 77 Tele Custom Rosewood-FB - Olympic White',
    price: 600,
    imageSrc: require('./Images/fender-american-vintage-77-tele-custom-rosewood-fb-olympic-white.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'Fender',
    model:
      'Fender Custom Shop Michael Landau Signature 1968 Relic Stratocaster - 3-Tone Sunburst',
    price: 600,
    imageSrc: require('./Images/fender-custom-shop-michael-landau-signature-1968-relic-strat-3-tone-sunburst.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'Fender',
    model: 'Fender Gold Foil Telecaster Ebony-FB - White Blonde',
    price: 600,
    imageSrc: require('./Images/fender-gold-foil- telecaster-ebony-fb-white-blonde.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'Fender',
    model:
      'Fender Japan Traditional 60s Stratocaster - Aged Sherwood Green Metallic',
    price: 600,
    imageSrc: require('./Images/fender-japan-traditional-60s-strat- aged-sherwood-green-metallic.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'Fender',
    model: 'Fender Limited Edition Johny Marr Jaguar - Fever Dream Yellow',
    price: 600,
    imageSrc: require('./Images/fender-limited-edition-johny-marr-jaguar-fever-dream-yellow.webp'),
    height: '100%',
    width: '100%',
  },
  {
    brand: 'Fender',
    model: 'Fender Limited Edition Player Stratocaster Maple-FB - Black',
    price: 600,
    imageSrc: require('./Images/fender-limited-edition-player-strat-maple-fb-black.webp'),
    height: '100%',
    width: '100%',
  },
];

const Catalog = () => {
  return (
    <div className='catalog-container'>
      <Header />
      <FilterList guitars={guitars} />
      <div className='catalog-content'>
        <div className='products'>
          <Card guitars={guitars} />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
