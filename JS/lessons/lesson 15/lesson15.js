import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

//15a
let today = dayjs();
let fiveDays = today.add(5, 'days');
console.log(formatDate(fiveDays));
//15b
let oneMonth = today.add(1, 'months');
console.log(formatDate(oneMonth));
//15c
let oneMonthPrior = today.subtract(1, 'months');
console.log(formatDate(oneMonthPrior));

function formatDate(date){
  return date = date.format('MMMM, DD')
}

function isTodayWeekend(date){
  const day = date.format('dddd');
  return (day==="Saturday" || day==="Sunday") ? "This date is a " + day : "This day is not a weekend: " + day;

}

console.log(isTodayWeekend(oneMonthPrior));
