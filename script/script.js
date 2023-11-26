'use strict';

let url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=';
const API_KEY = '53G8MU0P10TSA54I';

async function getBcyCourse() {
    let dataCourse = await fetch(url + API_KEY);
    let jsonCourse = await dataCourse.json();
    // let course = Math.round(jsonCourse['Realtime Currency Exchange Rate']['5. Exchange Rate']);
    let course = Math.round(jsonCourse['Realtime Currency Exchange Rate']['5. Exchange Rate'] * 100) / 100;
    // console.log('course = ', dataCourse);
    // console.log('jsonCourse = ', jsonCourse);
    // console.log('course = ', course, ' €');

    output = document.getElementById('output').innerHTML = course + ' €';
}