'use strict';

let url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=';
let urlMonthly = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=';
const API_KEY = '53G8MU0P10TSA54I';

async function getBtcCourseData() { // fetch btc-data from alpha-vantage
    let dataBtcCourse = await fetch(url + API_KEY);
    let jsonBtcCourse = await dataBtcCourse.json();
    let arrBtcCourseKeys = Object.keys(jsonBtcCourse);
    let dataMonthlyBtcCourse = await fetch(urlMonthly + API_KEY);
    let jsonMonthlyBtcCourse = await dataMonthlyBtcCourse.json();
    if (arrBtcCourseKeys[0] === 'Information') { // maximum requests of alpha-vantage exceeded 
        getCurrentBtcCourseBackup(jsonCourseBackup);
        getMonthlyBtcCourseBackup(jsonMonthlyCourseBackup);

    } else { // alpha vantage request successful
        getCurrentBtcCourse(jsonBtcCourse);
        getMonthlyBtcCourse(jsonMonthlyBtcCourse);
    };
}


async function getCurrentBtcCourseBackup(jsonBtcCourseBackup) { // btc-eur exchange course from backup-data
    let jsonCourse = jsonBtcCourseBackup;
    console.log('jsonCourse (backup) = ', jsonCourse);
    let course = Math.round(jsonCourse['Realtime Currency Exchange Rate']['5. Exchange Rate'] * 100) / 100;
    let output = document.getElementById('output').innerHTML = /*html*/ `
        <p>Das Tageslimit an möglichen Requests bei <i><b>Alpha-Vantage</b></i> wurde erreicht! <br>
            Dieser ausgegebene Wert kommt aus den <i><b>gespeicherten</b></i> Backup Daten. </p>
        <b> ${course} €</b>
    `;
}


async function getMonthlyBtcCourseBackup(jsonMonthlyCourseBackup) { // historical monthly btc-eur exchange course from backup-data
    let jsonCourses = await jsonMonthlyCourseBackup;
    console.log('jsonCourses (backup) = ', jsonCourses);
    let arrCoursesKeys = Object.keys(jsonCourses);
    let arrCoursesTimeSeriesKeys = Object.keys(jsonCourses['Time Series (Digital Currency Monthly)']);
    let arrMonthlyCloseValues = [];
    for (let i = 0; i < arrCoursesTimeSeriesKeys.length; i++) {
        arrMonthlyCloseValues.push(Math.round(jsonCourses['Time Series (Digital Currency Monthly)'][arrCoursesTimeSeriesKeys[i]]['4a. close (EUR)'] * 100 ) / 100 );
    }
    console.log('arrMonthlyCloseValues (backup) = ', arrMonthlyCloseValues); 
    let output = document.getElementById('output').innerHTML += /*html*/ `
        <p>Das Tageslimit an möglichen Requests bei <i><b>Alpha-Vantage</b></i> wurde erreicht! <br>
            Diese ausgegebenen Werte kommen aus den <i><b>gespeicherten</b></i> Backup Daten. </p>
        <b> ${arrMonthlyCloseValues} €</b>
    `;
}


async function getCurrentBtcCourse(jsonBtcCourse) { // current btc-eur exchange course from alpha-vantage
    let jsonCourse = jsonBtcCourse;
    console.log('jsonCourse (live) = ', jsonCourse);
    let course = jsonCourse['Realtime Currency Exchange Rate']['5. Exchange Rate'];
    course = Math.round(jsonCourse['Realtime Currency Exchange Rate']['5. Exchange Rate'] * 100) / 100;
    let output = document.getElementById('output').innerHTML = /*html*/ `
        <p>Das Tageslimit an möglichen Requests wurde noch nicht erreicht!<br>
        Der ausgegebene Wert wurde aktuell von <i><b>https://www.alphavantage.co/</b></i> gelesen.</p>
        <b> ${course} €</b>
    `;
}


async function getMonthlyBtcCourse(jsonMonthlyBtcCourse) { // current monthly btc-eur exchange course from alpha-vantage
    let jsonMonthlyCourses = jsonMonthlyBtcCourse;
    console.log('jsonMonthlyCourses (live) = ', jsonMonthlyCourses);
    let arrMonthlyCoursesKeys = Object.keys(jsonMonthlyCourses);
    let arrCoursesTimeSeriesKeys = Object.keys(jsonMonthlyCourses['Time Series (Digital Currency Monthly)']);
    let arrMonthlyCloseValues = [];
    for (let i = 0; i < arrCoursesTimeSeriesKeys.length; i++) {
        arrMonthlyCloseValues.push(Math.round(jsonMonthlyCourses['Time Series (Digital Currency Monthly)'][arrCoursesTimeSeriesKeys[i]]['4a. close (EUR)'] * 100 ) / 100 );
    }
    console.log('arrMonthlyCloseValues (live) = ', arrMonthlyCloseValues);
    let output = document.getElementById('output').innerHTML += /*html*/ `
        <p>Das Tageslimit an möglichen Requests wurde noch nicht erreicht!<br>
        D1e ausgegebenen Werte wurden aktuell von <i><b>https://www.alphavantage.co/</b></i> gelesen.</p>
        <b> ${arrMonthlyCloseValues} €</b>
    `;
}


function init() { // start application | fetch data from alpha-vantage
    getBtcCourseData(); // fetch btc-data from alpha-vantage
}



