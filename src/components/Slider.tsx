import React from 'react';
// import Slider from 'react-draggable-slider';

import { StaticImageData } from 'next/image';

interface ISettings {
  sliderSettings: {
    data: {
      id: number;
      img: StaticImageData;
    }[];
    speed: number;
    bgColor: string;
    showButton: boolean;
    buttonText: string;
    buttonHref: string;
    buttonTarget: string;
  };
}

const SliderWrapper = ({}: ISettings) => {
  return <div>{/* <Slider sliderSettings={sliderSettings} /> */}</div>;
};

export default SliderWrapper;
