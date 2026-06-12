import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function formatCurrency(priceCents){
  return (Math.round(priceCents)/100).toFixed(2);
}

export function formatDate(day){ return day = day.format('dddd D MMMM'); }

export default formatCurrency;