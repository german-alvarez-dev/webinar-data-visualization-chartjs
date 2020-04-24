// API Ajax call
fetch('https://coasters-api.herokuapp.com/')
    .then(response => response.json())
    .then(data => printCharts(data))


function printCharts(coasters) {

    // Remove loading message, show chart panels 
    document.body.classList.add('running')

    // Call each chart function passing the coasters and DOM Canvas tag ID to be rendered
    compareRadialChart(coasters, 'chart2')
    modelDoughnutChart(coasters, 'chart4')
    heightRadarChart(coasters, 'chart3')

}


function compareRadialChart(coasters, id) {

    // Every ChartJS chart needs data with labels and datasets
    const data = {
        labels: ['EEUU', 'UK', 'España', 'Japón', 'China'],
        datasets: [   // datasets is an Array of Objects, each Object contains one set of info/styles to be shown. In many charts, multiple sets of info can be rendered if multiple Objets are passed to the datasets Array
            {
                data: [
                    coasters.filter(eachCoaster => eachCoaster.country === 'United States').length,
                    coasters.filter(eachCoaster => eachCoaster.country === 'United Kingdom').length,
                    coasters.filter(eachCoaster => eachCoaster.country === 'Spain').length,
                    coasters.filter(eachCoaster => eachCoaster.country === 'Japan').length,
                    coasters.filter(eachCoaster => eachCoaster.country === 'China').length
                ],
                borderWidth: 1,
                borderColor: styles.color.solids.map(eachColor => eachColor),
                backgroundColor: styles.color.alphas.map(eachColor => eachColor)
            }
        ]
    }

    // Every ChartJs chart can have multiple layout options
    const options = {
        scale: {
            gridLines: {
                color: '#444'
            },
            ticks: {
                display: false
            }
        },
        legend: {
            position: 'right',
            labels: {
                fontColor: '#fff'
            }
        }
    }

    // Every ChartJS chart receives two arguments: the Canvas id to place the chart, and an object with: chart type, data to show, layout options object (optional)
    new Chart(id, { type: 'polarArea', data, options })
}








function modelDoughnutChart(coasters, id) {

    const data = {
        labels: ['Propulsada', 'Hiper montaña', 'Giga montaña', 'Inversión', 'Sentado'],
        datasets: [
            {
                data: [
                    coasters.filter(eachCoaster => eachCoaster.model === 'Accelerator Coaster').length,
                    coasters.filter(eachCoaster => eachCoaster.model === 'Hyper Coaster').length,
                    coasters.filter(eachCoaster => eachCoaster.model === 'Giga Coaster').length,
                    coasters.filter(eachCoaster => eachCoaster.model === 'Multi Inversion Coaster').length,
                    coasters.filter(eachCoaster => eachCoaster.model === 'Sitting Coaster').length
                ],
                borderColor: styles.color.solids.map(eachColor => eachColor),
                backgroundColor: styles.color.alphas.map(eachColor => eachColor),
                borderWidth: 1
            }
        ]
    }

    const options = {
        legend: {
            position: 'right',
            labels: {
                fontColor: '#fff'
            }
        }
    }

    new Chart(id, { type: 'doughnut', data, options })
}







function heightRadarChart(coasters, id) {

    const selectedCoasters = coasters.filter(eachCoaster => eachCoaster.height > 80)

    const data = {
        labels: selectedCoasters.map(eachCoaster => eachCoaster.name),
        datasets: [
            {
                label: 'Altura',
                data: selectedCoasters.map(eachCoaster => eachCoaster.height),
                borderColor: styles.color.solids[0],
                borderWidth: 1
            }
        ]
    }

    const options = {
        scale: {
            gridLines: {
                color: '#444'
            },
            pointLabels: {
                fontColor: '#fff'
            },
            ticks: {
                display: false
            }
        },
        legend: {
            display: false
        }
    }

    new Chart(id, { type: 'radar', data, options })
}