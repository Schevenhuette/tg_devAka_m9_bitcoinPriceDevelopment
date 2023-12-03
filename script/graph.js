'use strict';

function btcChart() {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'line',
        data: {
        labels: month,
        datasets: [{
            label: 'Bit Coin Kurs in Euro',
            data: courses,
            
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}