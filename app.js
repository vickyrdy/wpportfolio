
const workbook = XLSX.readFile('fuel.xlsx');
const sheetName = workbook.SheetNames[0]; 
const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);


const fuelData = excelData.map(row => ({
    date: row.Date,
    D7DW: row.D7DW,
    D7DU: row.D7DU,
    D7DT: row.D7DT,
    D7DV: row.D7DV,
}));

const ctx = document.getElementById('fuelChart').getContext('2d');
let chart;

let currentMode = 'historical';
let currentIndex = fuelData.length - 1;

function updateChart() {
    const labels = fuelData.map(data => data.date);
    const datasets = ['D7DW', 'D7DU', 'D7DT', 'D7DV'].map(fuelType => ({
        label: fuelType,
        data: fuelData.map(data => data[fuelType]),
        borderColor: getRandomColor(),
        fill: false,
    }));

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets,
        },
    });
}

function scrollBackward() {
    if (currentIndex > 0) {
        currentIndex--;
        updateChart();
    } else {
        displayError('Cannot scroll backward beyond January 1996');
    }
}

function scrollForward() {
    const currentDate = new Date(fuelData[currentIndex].date);
    const lastDate = new Date(fuelData[fuelData.length - 1].date);

    if (currentDate < lastDate) {
        currentIndex++;
        updateChart();
    } else {
        displayError('Cannot scroll forward beyond the current month');
    }
}

function toggleFuel(fuelType) {
    const checkbox = document.getElementById(`${fuelType}Checkbox`);
    const index = fuelData.findIndex(data => data.date === fuelData[currentIndex].date);

    if (checkbox.checked) {
        chart.data.datasets.push({
            label: fuelType,
            data: fuelData.map(data => data[fuelType]),
            borderColor: getRandomColor(),
            fill: false,
        });
    } else {
        const datasetIndex = chart.data.datasets.findIndex(dataset => dataset.label === fuelType);
        chart.data.datasets.splice(datasetIndex, 1);
    }

    chart.update();
}

function toggleMode() {
    currentMode = currentMode === 'historical' ? 'forecast' : 'historical';
    updateChart();
}

function displayError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = message;

    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initial chart setup
updateChart();
