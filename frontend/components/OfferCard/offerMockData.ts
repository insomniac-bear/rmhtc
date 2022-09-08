import cardImage1 from './image.png';
import cardImage2 from './image2.jpg';
import cardImage3 from './image3.jpg';
import cardImage4 from './image4.jpg';
import cardImage5 from './image5.jpg';

export const offer = {
  uuid: '859a5296-72ac-4c6a-8423-b68b0dd50f0d',
  name: 'Lorem ipsum dolor sit amet.',
  price: {
    value: '500',
    currency: 'RUR',
    unit: 'ft',
    amount: '100',
  },
  priceComment: 'Per unit',
  description: 'Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur'
    + 'adipisicing elit. Officia autem, dolores nemo exercitationem et, sint esse, natus voluptates'
    + 'tenetur expedita laboriosam. Odio ipsa obcaecati odit. Voluptatem delectus inventore, labore laudantium,'
    + 'quasi corporis consequuntur odit animi unde distinctio maiores ipsam aliquam?',
  moderated: 'failed',
  moderatedAuthorUuid: null,
  moderatedReason: 'Because.',
  presentationUrl: 'https://www.youtube.com/',
  currency: 'RUR',
  offerType: 'Product',
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
  //  Может ли в характеристиках придти неполный объект характеристики - без name или value?
  characteristics: [
    {
      name: null,
      value: '500 ft',
    },
    {
      name: 'height',
      value: '100 m',
    },
  ],
  categories: ['Service', 'Cars', 'Toys'],
};
