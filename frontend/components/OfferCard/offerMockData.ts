import cardImage1 from './image.png';
import cardImage2 from './image2.jpg';
import cardImage3 from './image3.jpg';
import cardImage4 from './image4.jpg';
import cardImage5 from './image5.jpg';

export const offer = {
  uuid: '859a5296-72ac-4c6a-8423-b68b0dd50f0d',
  name: 'Test7',
  price: {
    value: '500',
    currency: 'RUR',
    unit: 'ft',
    amount: '100',
  },
  priceComment: 'Per unit',
  description: 'Test',
  moderated: 'idle',
  currency: 'RUR',
  offerType: 'Soap',
  company: {
    uuid: 'e5076b42-41c8-4f15-a6a6-d4003148e12e',
    name: 'Horn and Hoves',
    country: 'Moscow',
  },
  photos: [
    { url: cardImage1, description: 'photo 1' },
    { url: cardImage2, description: 'photo 2' },
    { url: cardImage3, description: 'photo 3' },
    { url: cardImage4, description: 'photo 4' },
    { url: cardImage5, description: 'photo 5' },
  ],
  characteristics: [
    {
      name: 'width',
      value: '500 ft',
    },
    {
      name: 'height',
      value: '100 m',
    },
  ],
  categories: ['Service', 'Cars', 'Toys'],
};
