import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },

  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },

  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999 
  }

]

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId){ deliveryOption = option;}
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption){
  let deliveryDays = deliveryOption.deliveryDays;
  let deliveryDate;
  
  let today = dayjs();
  while (deliveryDays>0){
    let currentDay = today.format('dddd');
  
    //If day is not saturday or sunday, decrease count
    if (!(currentDay==="Saturday" || currentDay==="Sunday")){ deliveryDays--; }
    today = today.add(1, 'days');
  }

  const dateString = today.format('dddd, MMMM, D');

  return dateString;
}