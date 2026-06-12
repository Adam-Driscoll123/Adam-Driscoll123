export let orders = JSON.parse(localStorage.getItem('orders')) || [];
import {formatCurrency} from '../scripts/utils.js';

export function addOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}