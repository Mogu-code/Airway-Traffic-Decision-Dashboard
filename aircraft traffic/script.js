// Data
const trafficData = [
    { type: 'Wide Body', airline: 'American Airlines', flights: 2, occupancy: 78 },
    { type: 'Narrow Body', airline: 'United Airlines', flights: 4, occupancy: 83 },
    { type: 'Narrow Body', airline: 'Delta Airlines', flights: 4, occupancy: 76 },
    { type: 'Narrow Body', airline: 'Southwest', flights: 4, occupancy: 78 },
    { type: 'Wide Body', airline: 'British Airways', flights: 1, occupancy: 76 },
    { type: 'Narrow Body', airline: 'American Airlines', flights: 4, occupancy: 99 },
    { type: 'Cargo', airline: 'FedEx', flights: 3, occupancy: 92 },
    { type: 'Wide Body', airline: 'Emirates', flights: 2, occupancy: 88 },
];

const airportData = [
    { code: 'JFK', flights: 2.1 },
    { code: 'ORD', flights: 2.0 },
    { code: 'DEN', flights: 2.2 },
    { code: 'ATL', flights: 1.2 },
    { code: 'LHR', flights: 1.1 },
    { code: 'MIA', flights: 1.3 },
    { code: 'SFO', flights: 1.2 },
    { code: 'DTW', flights: 1.3 },
    { code: 'MEM', flights: 1.3 },
    { code: 'DFW', flights: 1.2 },
];

const hourlyData = [
    { hour: '00:00', volume: 1.0 },
    { hour: '01:00', volume: 1.0 },
    { hour: '02:00', volume: 1.0 },
    { hour: '03:00', volume: 1.0 },
    { hour: '04:00', volume: 1.0 },
    { hour: '05:00', volume: 1.0 },
    { hour: '06:00', volume: 1.0 },
    { hour: '07:00', volume: 1.5 },
    { hour: '08:00', volume: 2.1 },
    { hour: '09:00', volume: 2.1 },
    { hour: '10:00', volume: 2.1 },
    { hour: '11:00', volume: 2.1 },
    { hour: '12:00', volume: 2.1 },
    { hour: '13:00', volume: 2.1 },
    { hour: '14:00', volume: 2.1 },
    { hour: '15:00', volume: 2.1 },
    { hour: '16:00', volume: 2.1 },
    { hour: '17:00', volume: 2.1 },
    { hour: '18:00', volume: 2.1 },
    { hour: '19:00', volume: 1.7 },
    { hour: '20:00', volume: 1.3 },
    { hour: '21:00', volume: 1.0 },
    { hour: '22:00', volume: 1.0 },
    { hour: '23:00', volume: 1.0 },
];

// Initialize stats with animation
function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + suffix;
    }, 16);
}

function updateStats() {
    const totalFlights = trafficData.reduce((sum, item) => sum + item.flights, 0);
    const avgOccupancy = Math.round(trafficData.reduce((sum, item) => sum + item.occupancy, 0) / trafficData.length);
    const activeAirports = airportData.length;
    const peakHour = hourlyData.reduce((max, item) => item.volume > max.volume ? item : max).hour;

    animateValue(document.getElementById('totalFlights'), 0, totalFlights, 1000);
    animateValue(document.getElementById('avgOccupancy'), 0, avgOccupancy, 1000, '%');
    animateValue(document.getElementById('activeAirports'), 0, activeAirports, 1000);
    document.getElementById('peakTraffic').textContent = peakHour;
}

// Populate table
function populateTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    trafficData.forEach(item => {
        const row = tbody.insertRow();
        
        const typeCell = row.insertCell();
        const badgeClass = item.type === 'Narrow Body' ? 'badge-narrow' : 
                           item.type === 'Wide Body' ? 'badge-wide' : 'badge-cargo';
        typeCell.innerHTML = `<span class="aircraft-badge ${badgeClass}">${item.type}</span>`;
        
        row.insertCell().textContent = item.airline;
        row.insertCell().textContent = item.flights;
        
        const occupancyCell = row.insertCell();
        occupancyCell.innerHTML = `
            <div class="occupancy-bar">
                <div class="occupancy-fill" style="width: ${item.occupancy}%"></div>
            </div>
            ${item.occupancy}%
        `;
    });
}

// Draw Donut Chart
function drawDonutChart() {
    const canvas = document.getElementById('donutChart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 220;
    canvas.height = 220;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    const innerRadius = 50;

    // Calculate totals
    const typeCounts = {};
    trafficData.forEach(item => {
        typeCounts[item.type] = (typeCounts[item.type] || 0) + item.flights;
    });

    const total = Object.values(typeCounts).reduce((sum, val) => sum + val, 0);
    const colors = {
        'Narrow Body': '#3dd5b3',
        'Wide Body': '#4cc96b',
        'Cargo': '#ffab40'
    };

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw segments
    let currentAngle = -Math.PI / 2;
    Object.entries(typeCounts).forEach(([type, count]) => {
        const sliceAngle = (count / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fillStyle = colors[type];
        ctx.fill();

        currentAngle += sliceAngle;
    });

    // Update legend
    const legend = document.getElementById('donutLegend');
    legend.innerHTML = '';
    Object.entries(typeCounts).forEach(([type, count]) => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `
            <div class="legend-color" style="background: ${colors[type]}"></div>
            <span>${type}</span>
        `;
        legend.appendChild(item);
    });
}

// Draw Bar Chart
function drawBarChart() {
    const container = document.getElementById('barChart');
    container.innerHTML = '';

    const maxFlights = Math.max(...airportData.map(d => d.flights));

    airportData.forEach(airport => {
        const wrapper = document.createElement('div');
        wrapper.className = 'bar-wrapper';

        const bar = document.createElement('div');
        bar.className = 'bar';
        const height = (airport.flights / maxFlights) * 100;
        bar.style.height = height + '%';

        const value = document.createElement('div');
        value.className = 'bar-value';
        value.textContent = airport.flights;
        bar.appendChild(value);

        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = airport.code;

        wrapper.appendChild(bar);
        wrapper.appendChild(label);
        container.appendChild(wrapper);

        // Add hover effect
        bar.addEventListener('mouseenter', (e) => {
            showTooltip(e, `${airport.code}: ${airport.flights} flights`);
        });
        bar.addEventListener('mouseleave', hideTooltip);
    });
}

// Draw Line Chart
function drawLineChart() {
    const canvas = document.getElementById('lineChart');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#2a2f3e';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
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
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw line
    const maxVolume = Math.max(...hourlyData.map(d => d.volume));
    const xStep = width / (hourlyData.length - 1);

    ctx.strokeStyle = '#3dd5b3';
    ctx.lineWidth = 3;
    ctx.beginPath();

    hourlyData.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = canvas.height - padding - (point.volume / (maxVolume * 1.1)) * height;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    hourlyData.forEach((point, index) => {
        const x = padding + index * xStep;
        const y = canvas.height - padding - (point.volume / (maxVolume * 1.1)) * height;

        ctx.fillStyle = '#3dd5b3';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();

        // Add stroke to points
        ctx.strokeStyle = '#0f1419';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Draw labels
    ctx.fillStyle = '#8e9aaf';
    ctx.font = '11px Segoe UI';
    ctx.textAlign = 'center';

    hourlyData.forEach((point, index) => {
        if (index % 3 === 0) {
            const x = padding + index * xStep;
            ctx.fillText(point.hour, x, canvas.height - padding + 20);
        }
    });

    // Draw Y-axis labels
    ctx.textAlign = 'right';
    for (let i = 0; i <= 2; i++) {
        const value = (maxVolume / 2) * i;
        const y = canvas.height - padding - (height / 2) * i;
        ctx.fillText(value.toFixed(1), padding - 10, y + 4);
    }
}

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

// Utility functions
function refreshChart(type) {
    const charts = {
        'donut': drawDonutChart,
        'bar': drawBarChart,
        'line': drawLineChart
    };
    if (charts[type]) {
        charts[type]();
    }
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

function exportData() {
    // Create CSV content
    let csv = 'Aircraft Type,Airline,Number of Flights,Avg Occupancy\n';
    trafficData.forEach(row => {
        csv += `${row.type},${row.airline},${row.flights},${row.occupancy}%\n`;
    });

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aircraft-traffic-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function sortTable() {
    const tbody = document.getElementById('tableBody');
    const rows = Array.from(tbody.rows);
    const sorted = rows.sort((a, b) => {
        return parseInt(b.cells[2].textContent) - parseInt(a.cells[2].textContent);
    });
    tbody.innerHTML = '';
    sorted.forEach(row => tbody.appendChild(row));
}

function filterTable() {
    alert('Filter functionality would open a modal with advanced filtering options');
}

// Filter functionality
document.getElementById('aircraftFilter')?.addEventListener('change', function() {
    const filterValue = this.value;
    const tbody = document.getElementById('tableBody');
    const rows = tbody.getElementsByTagName('tr');
    
    for (let row of rows) {
        if (filterValue === 'All Types') {
            row.style.display = '';
        } else {
            const typeCell = row.cells[0].textContent;
            row.style.display = typeCell.includes(filterValue) ? '' : 'none';
        }
    }
});

document.getElementById('airlineFilter')?.addEventListener('change', function() {
    const filterValue = this.value;
    const tbody = document.getElementById('tableBody');
    const rows = tbody.getElementsByTagName('tr');
    
    for (let row of rows) {
        if (filterValue === 'All Airlines') {
            row.style.display = '';
        } else {
            const airlineCell = row.cells[1].textContent;
            row.style.display = airlineCell === filterValue ? '' : 'none';
        }
    }
});

// Initialize dashboard
function init() {
    updateStats();
    populateTable();
    drawDonutChart();
    drawBarChart();
    drawLineChart();

    // Simulate real-time updates every 5 seconds
    setInterval(() => {
        // Randomly update one stat
        const stats = ['totalFlights', 'avgOccupancy'];
        const randomStat = stats[Math.floor(Math.random() * stats.length)];
        const element = document.getElementById(randomStat);
        const currentValue = parseInt(element.textContent);
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newValue = Math.max(0, currentValue + change);
        
        if (randomStat === 'avgOccupancy') {
            element.textContent = Math.min(100, newValue) + '%';
        } else {
            element.textContent = newValue;
        }
    }, 5000);

    // Update charts periodically
    setInterval(() => {
        // Randomly update hourly data
        const randomIndex = Math.floor(Math.random() * hourlyData.length);
        const change = (Math.random() - 0.5) * 0.2;
        hourlyData[randomIndex].volume = Math.max(0.5, Math.min(2.5, hourlyData[randomIndex].volume + change));
        drawLineChart();
    }, 10000);
}

// Handle window resize
window.addEventListener('resize', () => {
    drawLineChart();
});

// Start the dashboard when page loads
window.addEventListener('load', init);

// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');
    });
});
