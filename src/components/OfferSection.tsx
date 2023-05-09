import React from 'react';
import evt008 from '@/public/evt008.png';
import evt009 from '@/public/evt009.png';
import evt010 from '@/public/evt010.png';
import evt011 from '@/public/evt011.png';
import Slider from './Slider';

const imgList = [
  {
    id: 1,
    img: evt008,
  },
  {
    id: 2,
    img: evt009,
  },
  {
    id: 3,
    img: evt010,
  },
  {
    id: 4,
    img: evt011,
  },
];

const sliderSettings = {
  data: imgList,
  speed: 3000,
  bgColor: `#070707`,
  showButton: true,
  buttonText: `View projects`,
  buttonHref: `https://www.example.com`,
  buttonTarget: `_self`,
};

const OfferSection = () => {
  return (
    <div>
      <Slider sliderSettings={sliderSettings} />
    </div>
  );
};

export default OfferSection;
