'use strict';



let url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=';
let urlMonthly = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=';
const API_KEY = '53G8MU0P10TSA54I';

async function getBtcCourseData() {
    let dataBtcCourse = await fetch(url + API_KEY);
    // console.log('dataBtcCourse = ', dataBtcCourse);
    let jsonBtcCourse = await dataBtcCourse.json();
    // console.log('jsonBtcCourse = ', jsonBtcCourse);
    let arrBtcCourseKeys = Object.keys(jsonBtcCourse);
    // console.log('arrBtcCourseKeys = ', arrBtcCourseKeys);

    if (arrBtcCourseKeys[0] === 'Information') {
        // console.log('Das Tageslimit an möglichen Requests wurde erreicht!');
        getBtcCourseBackup(jsonCourseBackup);
        getMonthlyBtcCourseBackup();
    } else {
        // console.log('Es wurden Daten von Alpha - Vantage geladen!');
        getBtcCourse(jsonBtcCourse);
    };
}


async function getBtcCourseBackup(jsonBtcCourse) { // btc-eur exchange course from backup-data
    let jsonCourse = jsonBtcCourse;
    let course = Math.round(jsonCourse['Realtime Currency Exchange Rate']['5. Exchange Rate'] * 100) / 100;
    let output = document.getElementById('output').innerHTML = /*html*/ `
        <p>Das Tageslimit an möglichen Requests bei <i><b>Alpha-Vantage</b></i> wurde erreicht! <br>
        Dieser ausgegebene Wert kommt aus den <i><b>gespeicherten</b></i> Backup Daten. </p>
        <b> ${course} €</b>
    `;
}


async function getMonthlyBtcCourseBackup() { // historical monthly btc-eur exchange course from backup-data
    let jsonCourses = await jsonMonthlyCourseBackup;
    // console.log('jsonCourses = ', jsonCourses);
    let arrCoursesKeys = Object.keys(jsonCourses);
    // console.log('arrCoursesKeys = ', arrCoursesKeys);
    // console.log('arrCourses Length  = ', Object.keys(jsonCourses).length);
    let arrCoursesTimeSeriesKeys = Object.keys(jsonCourses['Time Series (Digital Currency Monthly)']);
    // console.log('arrCoursesTimeSeriesKeys = ', arrCoursesTimeSeriesKeys);
    // console.log('arrCoursesTimeSeriesKeys Length = ', Object.keys(arrCoursesTimeSeriesKeys).length);
    let arrMonthly = [];
    for (let i = 0; i < arrCoursesTimeSeriesKeys.length; i++) {
        // arrMonthly.push(jsonCourses['Time Series (Digital Currency Monthly)'][arrMonthly[i]]['4a. close (EUR)']);
        // console.log(jsonCourses['Time Series (Digital Currency Monthly)'][arrCoursesTimeSeriesKeys[i]]['4a. close (EUR)']);
        // .str(arrCoursesTimeSeriesKeys[i]));
        arrMonthly.push(Math.round(jsonCourses['Time Series (Digital Currency Monthly)'][arrCoursesTimeSeriesKeys[i]]['4a. close (EUR)'] * 100 ) / 100 );
        }
    console.log('arrMonthly = ', arrMonthly); 
}


async function getBtcCourse(jsonBtcCourse) { // actual btc-eur exchange course from alpha-vantage
    let jsonCourse = jsonBtcCourse;
    console.log('jsonCourse = ', jsonCourse);
    let course = jsonCourse['Realtime Currency Exchange Rate']['5. Exchange Rate'];
    // course = Math.round(jsonCourse['Realtime Currency Exchange Rate']['5. Exchange Rate']);
    course = Math.round(jsonCourse['Realtime Currency Exchange Rate']['5. Exchange Rate'] * 100) / 100;
    // console.log('course = ', course, ' €');
    let output = document.getElementById('output').innerHTML = /*html*/ `
        <p>Das Tageslimit an möglichen Requests wurde noch nicht erreicht!<br>
        Der ausgegebene Wert wurde aktuell von <i><b>https://www.alphavantage.co/</b></i> gelesen.</p>
        <b> ${course} €</b>
    `;
}


function init() {
    getBtcCourseData();
    ;
}



