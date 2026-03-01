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

const precipitationData = [
    { hour: '00:00', precip: 0, ceiling: 8000 },
    { hour: '03:00', precip: 0.1, ceiling: 6500 },
    { hour: '06:00', precip: 0.3, ceiling: 4000 },
    { hour: '09:00', precip: 0.5, ceiling: 3000 },
    { hour: '12:00', precip: 0.8, ceiling: 2500 },
    { hour: '15:00', precip: 0.6, ceiling: 3500 },
    { hour: '18:00', precip: 0.2, ceiling: 5000 },
    { hour: '21:00', precip: 0, ceiling: 7500 },
    { hour: '24:00', precip: 0, ceiling: 8500 },
];

const runwayConditions = [
    { runway: 'Runway 27L', status: 'Open', condition: 'Good', friction: 0.85, visibility: 10, surface: 'Dry' },
    { runway: 'Runway 27R', status: 'Open', condition: 'Good', friction: 0.82, visibility: 10, surface: 'Dry' },
    { runway: 'Runway 09L', status: 'Limited', condition: 'Fair', friction: 0.65, visibility: 5, surface: 'Wet' },
    { runway: 'Runway 09R', status: 'Closed', condition: 'Poor', friction: 0.35, visibility: 2, surface: 'Icy' },
];

const currentConditions = {
    windSpeed: 15,
    humidity: 65,
    visibility: 10,
    pressure: 29.92,
};

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

// Draw Precipitation Chart
function drawPrecipChart() {
    const canvas = document.getElementById('precipChart');
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

    // Draw bars for precipitation
    const barWidth = width / (precipitationData.length * 2);
    const maxPrecip = Math.max(...precipitationData.map(d => d.precip));

    precipitationData.forEach((point, index) => {
        const barHeight = (point.precip / (maxPrecip * 1.1)) * height;
        const x = padding + (index * width) / precipitationData.length + barWidth / 2;
        const y = canvas.height - padding - barHeight;

        // Draw bar
        ctx.fillStyle = '#4de5c3';
        ctx.fillRect(x, y, barWidth, barHeight);
    });

    // Draw ceiling line
    const maxCeiling = Math.max(...precipitationData.map(d => d.ceiling));
    const xStep = width / (precipitationData.length - 1);

    ctx.strokeStyle = '#ffab40';
    ctx.lineWidth = 3;
    ctx.beginPath();

    precipitationData.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = canvas.height - padding - (point.ceiling / (maxCeiling * 1.1)) * height;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points for ceiling
    precipitationData.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = canvas.height - padding - (point.ceiling / (maxCeiling * 1.1)) * height;

        ctx.fillStyle = '#ffab40';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#8e9aaf';
    ctx.font = '11px Segoe UI';
    ctx.textAlign = 'center';

    precipitationData.forEach((point, index) => {
        const x = padding + index * xStep;
        ctx.fillText(point.hour, x, canvas.height - padding + 20);
    });

    // Draw Y-axis labels (left side - precipitation)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#4de5c3';
    for (let i = 0; i <= 4; i++) {
        const value = ((maxPrecip / 4) * (4 - i)).toFixed(1);
        const y = padding + (height / 4) * i;
        ctx.fillText(value + '"', padding - 10, y + 4);
    }

    // Draw Y-axis labels (right side - ceiling)
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffab40';
    for (let i = 0; i <= 4; i++) {
        const value = Math.round((maxCeiling / 4) * (4 - i));
        const y = padding + (height / 4) * i;
        ctx.fillText(value + 'ft', canvas.width - padding + 10, y + 4);
    }

    // Draw legend
    ctx.textAlign = 'left';
    ctx.font = '12px Segoe UI';
    
    ctx.fillStyle = '#4de5c3';
    ctx.fillRect(padding + 10, 15, 15, 15);
    ctx.fillStyle = '#fff';
    ctx.fillText('Precipitation', padding + 30, 27);
    
    ctx.fillStyle = '#ffab40';
    ctx.fillRect(padding + 140, 15, 15, 15);
    ctx.fillStyle = '#fff';
    ctx.fillText('Ceiling Height', padding + 160, 27);
}

// Populate Runway Conditions
function populateRunways() {
    const container = document.getElementById('runwayGrid');
    container.innerHTML = '';

    runwayConditions.forEach(runway => {
        const statusClass = runway.status === 'Open' ? 'status-open' : 
                           runway.status === 'Limited' ? 'status-limited' : 'status-closed';
        
        const conditionClass = runway.condition === 'Good' ? 'condition-good' : 
                              runway.condition === 'Fair' ? 'condition-fair' : 'condition-poor';
        
        const frictionPercent = Math.round(runway.friction * 100);

        const runwayItem = document.createElement('div');
        runwayItem.className = 'runway-item';
        runwayItem.innerHTML = `
            <div class="runway-header">
                <div class="runway-name">${runway.runway}</div>
                <div class="runway-status ${statusClass}">${runway.status}</div>
            </div>
            <div class="runway-details">
                <div class="runway-detail">
                    <span class="runway-detail-label">Surface:</span>
                    <span class="runway-detail-value">${runway.surface}</span>
                </div>
                <div class="runway-detail">
                    <span class="runway-detail-label">Visibility:</span>
                    <span class="runway-detail-value">${runway.visibility} mi</span>
                </div>
                <div class="runway-detail">
                    <span class="runway-detail-label">Friction Coefficient:</span>
                    <span class="runway-detail-value">${runway.friction}</span>
                </div>
                <div class="runway-condition-bar">
                    <div class="runway-condition-fill ${conditionClass}" style="width: ${frictionPercent}%"></div>
                </div>
            </div>
        `;
        container.appendChild(runwayItem);
    });
}

// Update Current Conditions Display
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
// Utility functions
function refreshChart(type) {
    const charts = {
        'weather-bar': drawWeatherBarChart,
        'trend': drawTrendChart,
        'precip': drawPrecipChart
    };
    if (charts[type]) {
        charts[type]();
    }
}

function refreshRunways() {
    populateRunways();
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
    drawPrecipChart();
    populateForecast();
    populateRunways();

    // Simulate real-time updates
    setInterval(() => {
        // Update random weather values
        const randomIndex = Math.floor(Math.random() * weatherImpactData.length);
        weatherImpactData[randomIndex].probability = Math.max(0, Math.min(100, 
            weatherImpactData[randomIndex].probability + (Math.random() - 0.5) * 10));
        populateWeatherTable();
    }, 8000);
}

// Handle window resize
window.addEventListener('resize', () => {
    drawWeatherBarChart();
    drawTrendChart();
    drawPrecipChart();
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