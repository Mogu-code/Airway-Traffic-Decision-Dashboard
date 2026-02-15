// Weather Data
const weatherImpactData = [
    { airport: 'JFK', weather: 'Clear', severity: 'Low', probability: 5, flights: 2, icon: '☀️' },
    { airport: 'LAX', weather: 'Fog', severity: 'Medium', probability: 35, flights: 15, icon: '🌫️' },
    { airport: 'ORD', weather: 'Storm', severity: 'High', probability: 75, flights: 42, icon: '⛈️' },
    { airport: 'ATL', weather: 'Rain', severity: 'Medium', probability: 30, flights: 18, icon: '🌧️' },
    { airport: 'DFW', weather: 'Clear', severity: 'Low', probability: 8, flights: 3, icon: '☀️' },
    { airport: 'DEN', weather: 'Snow', severity: 'High', probability: 65, flights: 28, icon: '❄️' },
    { airport: 'SFO', weather: 'Fog', severity: 'High', probability: 55, flights: 22, icon: '🌫️' },
    { airport: 'SEA', weather: 'Cloudy', severity: 'Low', probability: 12, flights: 5, icon: '☁️' },
    { airport: 'MIA', weather: 'Storm', severity: 'High', probability: 80, flights: 35, icon: '⛈️' },
    { airport: 'BOS', weather: 'Rain', severity: 'Medium', probability: 28, flights: 12, icon: '🌧️' },
    { airport: 'PHX', weather: 'Clear', severity: 'Low', probability: 3, flights: 1, icon: '☀️' },
    { airport: 'EMR', weather: 'Wind', severity: 'Medium', probability: 40, flights: 20, icon: '💨' },
    { airport: 'LHR', weather: 'Fog', severity: 'High', probability: 60, flights: 45, icon: '🌫️' },
];

const delayByWeather = [
    { condition: 'Clear', probability: 5, color: '#4cc96b' },
    { condition: 'Cloudy', probability: 10, color: '#4cc96b' },
    { condition: 'Rain', probability: 30, color: '#ffab40' },
    { condition: 'Storm', probability: 70, color: '#ff5252' },
    { condition: 'Fog', probability: 50, color: '#ffab40' },
    { condition: 'Snow', probability: 65, color: '#ff5252' },
    { condition: 'Wind', probability: 35, color: '#ffab40' },
];

const hourlyTrend = [
    { hour: '00:00', delay: 15 },
    { hour: '04:00', delay: 12 },
    { hour: '08:00', delay: 25 },
    { hour: '12:00', delay: 65 },
    { hour: '16:00', delay: 55 },
    { hour: '20:00', delay: 35 },
    { hour: '24:00', delay: 18 },
];

const forecast48h = [
    { time: 'Now', temp: 72, condition: 'Clear', icon: '☀️', wind: 8, humidity: 45 },
    { time: '+3h', temp: 70, condition: 'Cloudy', icon: '☁️', wind: 10, humidity: 50 },
    { time: '+6h', temp: 68, condition: 'Rain', icon: '🌧️', wind: 15, humidity: 75 },
    { time: '+9h', temp: 65, condition: 'Storm', icon: '⛈️', wind: 25, humidity: 85 },
    { time: '+12h', temp: 63, condition: 'Rain', icon: '🌧️', wind: 18, humidity: 80 },
    { time: '+15h', temp: 66, condition: 'Cloudy', icon: '☁️', wind: 12, humidity: 60 },
    { time: '+18h', temp: 69, condition: 'Clear', icon: '☀️', wind: 8, humidity: 45 },
    { time: '+24h', temp: 73, condition: 'Clear', icon: '☀️', wind: 6, humidity: 40 },
    { time: '+30h', temp: 75, condition: 'Clear', icon: '☀️', wind: 7, humidity: 42 },
    { time: '+36h', temp: 71, condition: 'Cloudy', icon: '☁️', wind: 10, humidity: 55 },
    { time: '+42h', temp: 67, condition: 'Fog', icon: '🌫️', wind: 5, humidity: 90 },
    { time: '+48h', temp: 64, condition: 'Rain', icon: '🌧️', wind: 14, humidity: 78 },
];

const windData = [
    { airport: 'JFK', speed: 15, direction: 45 },
    { airport: 'LAX', speed: 22, direction: 180 },
    { airport: 'ORD', speed: 28, direction: 270 },
    { airport: 'ATL', speed: 12, direction: 90 },
    { airport: 'DFW', speed: 18, direction: 135 },
    { airport: 'DEN', speed: 32, direction: 315 },
];

const temperatureData = [
    { temp: -10, delays: 45 },
    { temp: 0, delays: 35 },
    { temp: 10, delays: 20 },
    { temp: 20, delays: 10 },
    { temp: 30, delays: 8 },
    { temp: 40, delays: 12 },
    { temp: 50, delays: 18 },
    { temp: 60, delays: 5 },
    { temp: 70, delays: 3 },
    { temp: 80, delays: 8 },
    { temp: 90, delays: 15 },
    { temp: 100, delays: 35 },
];

// Populate Weather Table
function populateWeatherTable() {
    const tbody = document.getElementById('weatherTableBody');
    tbody.innerHTML = '';

    weatherImpactData.forEach(item => {
        const row = tbody.insertRow();
        
        const airportCell = row.insertCell();
        airportCell.innerHTML = `<span class="airport-code">${item.airport}</span>`;
        
        const weatherCell = row.insertCell();
        weatherCell.innerHTML = `
            <div class="weather-icon-cell">
                <span class="weather-icon-small">${item.icon}</span>
                <span>${item.weather}</span>
            </div>
        `;
        
        const severityCell = row.insertCell();
        const severityClass = item.severity === 'Low' ? 'severity-low' : 
                              item.severity === 'Medium' ? 'severity-medium' : 'severity-high';
        severityCell.innerHTML = `<span class="severity-badge ${severityClass}">${item.severity}</span>`;
        
        const probabilityCell = row.insertCell();
        const probClass = item.probability < 20 ? 'probability-low' : 
                          item.probability < 50 ? 'probability-medium' : 'probability-high';
        probabilityCell.innerHTML = `
            <div class="probability-bar">
                <div class="probability-fill ${probClass}" style="width: ${item.probability}%"></div>
            </div>
            ${item.probability}%
        `;
        
        row.insertCell().textContent = item.flights;
    });
}

// Draw Weather Bar Chart
function drawWeatherBarChart() {
    const canvas = document.getElementById('weatherBarChart');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const padding = 50;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#2a2f3e';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // Draw bars
    const barWidth = width / (delayByWeather.length * 1.5);
    const maxValue = 80;

    delayByWeather.forEach((item, index) => {
        const barHeight = (item.probability / maxValue) * height;
        const x = padding + (index * width) / delayByWeather.length + barWidth / 4;
        const y = canvas.height - padding - barHeight;

        // Draw bar
        ctx.fillStyle = item.color;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw label
        ctx.fillStyle = '#8e9aaf';
        ctx.font = '12px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText(item.condition, x + barWidth / 2, canvas.height - padding + 20);

        // Draw value on hover
        ctx.fillStyle = item.color;
        ctx.font = 'bold 14px Segoe UI';
        ctx.fillText(item.probability + '%', x + barWidth / 2, y - 10);
    });

    // Draw Y-axis labels
    ctx.fillStyle = '#8e9aaf';
    ctx.font = '11px Segoe UI';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = (maxValue / 4) * (4 - i);
        const y = padding + (height / 4) * i;
        ctx.fillText(value + '%', padding - 10, y + 4);
    }
}

// Draw Trend Chart
function drawTrendChart() {
    const canvas = document.getElementById('trendChart');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const padding = 50;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#2a2f3e';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#3a4556';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw line
    const maxValue = Math.max(...hourlyTrend.map(d => d.delay));
    const xStep = width / (hourlyTrend.length - 1);

    ctx.strokeStyle = '#ffab40';
    ctx.lineWidth = 3;
    ctx.beginPath();

    hourlyTrend.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = canvas.height - padding - (point.delay / (maxValue * 1.1)) * height;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    hourlyTrend.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = canvas.height - padding - (point.delay / (maxValue * 1.1)) * height;

        // Outer circle
        ctx.fillStyle = '#ffab40';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Inner circle
        ctx.fillStyle = '#0f1419';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#8e9aaf';
    ctx.font = '11px Segoe UI';
    ctx.textAlign = 'center';

    hourlyTrend.forEach((point, index) => {
        const x = padding + index * xStep;
        ctx.fillText(point.hour, x, canvas.height - padding + 20);
    });

    // Draw Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = Math.round((maxValue / 4) * (4 - i));
        const y = padding + (height / 4) * i;
        ctx.fillText(value + '%', padding - 10, y + 4);
    }
}

// Draw Temperature Chart
function drawTempChart() {
    const canvas = document.getElementById('tempChart');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const padding = 50;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#2a2f3e';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (height / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#3a4556';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Create gradient for line
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#4de5c3');
    gradient.addColorStop(0.5, '#ffab40');
    gradient.addColorStop(1, '#ff5252');

    // Draw line
    const maxValue = Math.max(...temperatureData.map(d => d.delays));
    const xStep = width / (temperatureData.length - 1);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();

    temperatureData.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = canvas.height - padding - (point.delays / (maxValue * 1.1)) * height;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    temperatureData.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = canvas.height - padding - (point.delays / (maxValue * 1.1)) * height;

        ctx.fillStyle = '#3dd5b3';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Draw labels (every other temp)
    ctx.fillStyle = '#8e9aaf';
    ctx.font = '11px Segoe UI';
    ctx.textAlign = 'center';

    temperatureData.forEach((point, index) => {
        if (index % 2 === 0) {
            const x = padding + index * xStep;
            ctx.fillText(point.temp + '°F', x, canvas.height - padding + 20);
        }
    });

    // Draw Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = Math.round((maxValue / 4) * (4 - i));
        const y = padding + (height / 4) * i;
        ctx.fillText(value + '%', padding - 10, y + 4);
    }
}

// Populate Forecast
function populateForecast() {
    const container = document.getElementById('forecastContainer');
    container.innerHTML = '';

    forecast48h.forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-time">${item.time}</div>
            <div class="forecast-icon">${item.icon}</div>
            <div class="forecast-temp">${item.temp}°F</div>
            <div class="forecast-condition">${item.condition}</div>
            <div class="forecast-details">
                <div>💨 ${item.wind}mph</div>
                <div>💧 ${item.humidity}%</div>
            </div>
        `;
        container.appendChild(forecastItem);
    });
}

// Populate Wind Grid
function populateWindGrid() {
    const container = document.getElementById('windGrid');
    container.innerHTML = '';

    windData.forEach(item => {
        const windItem = document.createElement('div');
        windItem.className = 'wind-item';
        windItem.innerHTML = `
            <div class="wind-airport">${item.airport}</div>
            <div class="wind-compass">
                <div class="wind-arrow" style="transform: rotate(${item.direction}deg) translateY(-20px);"></div>
            </div>
            <div class="wind-speed">${item.speed} mph</div>
            <div class="wind-direction">${getWindDirection(item.direction)}</div>
        `;
        container.appendChild(windItem);
    });
}

// Get wind direction name
function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

// Utility functions
function refreshChart(type) {
    const charts = {
        'weather-bar': drawWeatherBarChart,
        'trend': drawTrendChart,
        'temp': drawTempChart,
        'wind': populateWindGrid
    };
    if (charts[type]) {
        charts[type]();
    }
}

function refreshForecast() {
    populateForecast();
}

function toggleFullscreen(btn) {
    const card = btn.closest('.card');
    if (!document.fullscreenElement) {
        card.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

function exportWeatherData() {
    let csv = 'Airport,Weather,Severity,Delay Probability,Affected Flights\n';
    weatherImpactData.forEach(row => {
        csv += `${row.airport},${row.weather},${row.severity},${row.probability}%,${row.flights}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weather-impact-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function sortWeatherTable() {
    const tbody = document.getElementById('weatherTableBody');
    const rows = Array.from(tbody.rows);
    const sorted = rows.sort((a, b) => {
        const probA = parseInt(a.cells[3].textContent);
        const probB = parseInt(b.cells[3].textContent);
        return probB - probA;
    });
    tbody.innerHTML = '';
    sorted.forEach(row => tbody.appendChild(row));
}

function filterWeatherTable() {
    alert('Advanced filter modal would open here with options to filter by multiple criteria');
}

// Filter functionality
document.getElementById('weatherFilter')?.addEventListener('change', function() {
    const filterValue = this.value;
    const tbody = document.getElementById('weatherTableBody');
    const rows = tbody.getElementsByTagName('tr');
    
    for (let row of rows) {
        if (filterValue === 'All Conditions') {
            row.style.display = '';
        } else {
            const weatherCell = row.cells[1].textContent;
            row.style.display = weatherCell.includes(filterValue) ? '' : 'none';
        }
    }
});

document.getElementById('severityFilter')?.addEventListener('change', function() {
    const filterValue = this.value;
    const tbody = document.getElementById('weatherTableBody');
    const rows = tbody.getElementsByTagName('tr');
    
    for (let row of rows) {
        if (filterValue === 'All Severity') {
            row.style.display = '';
        } else {
            const severityCell = row.cells[2].textContent;
            row.style.display = severityCell.includes(filterValue) ? '' : 'none';
        }
    }
});

// Tooltip functions
function showTooltip(e, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = text;
    tooltip.style.opacity = '1';
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY - 30 + 'px';
}

function hideTooltip() {
    document.getElementById('tooltip').style.opacity = '0';
}

// Initialize dashboard
function init() {
    populateWeatherTable();
    drawWeatherBarChart();
    drawTrendChart();
    drawTempChart();
    populateForecast();
    populateWindGrid();

    // Simulate real-time updates
    setInterval(() => {
        // Update random weather values
        const randomIndex = Math.floor(Math.random() * weatherImpactData.length);
        weatherImpactData[randomIndex].probability = Math.max(0, Math.min(100, 
            weatherImpactData[randomIndex].probability + (Math.random() - 0.5) * 10));
        populateWeatherTable();
    }, 8000);

    // Update wind directions
    setInterval(() => {
        windData.forEach(wind => {
            wind.direction = (wind.direction + Math.random() * 10 - 5 + 360) % 360;
        });
        populateWindGrid();
    }, 5000);
}

// Handle window resize
window.addEventListener('resize', () => {
    drawWeatherBarChart();
    drawTrendChart();
    drawTempChart();
});

// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Start the dashboard
window.addEventListener('load', init);
