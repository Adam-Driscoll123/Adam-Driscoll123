import dayjs from 'dayjs';

export function formatMoney(amountCents) {
  return `$${(amountCents/100).toFixed(2)}`
}

export function formatDeliveryTime(deliveryTimeMs) {
  return dayjs(deliveryTimeMs).format('MMMM D');
}