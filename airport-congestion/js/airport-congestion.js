// ==========================================
// AIRPORT CONGESTION JAVASCRIPT
// ==========================================

// Airport congestion data
const airportData = [
    {
        code: 'JFK',
        name: 'John F. Kennedy International',
        city: 'New York',
        activeFlights: 145,
        congestionLevel: 'high'
    },
    {
        code: 'LAX',
        name: 'Los Angeles International',
        city: 'Los Angeles',
        activeFlights: 132,
        congestionLevel: 'high'
    },
    {
        code: 'ORD',
        name: "O'Hare International",
        city: 'Chicago',
        activeFlights: 128,
        congestionLevel: 'high'
    },
    {
        code: 'ATL',
        name: 'Hartsfield-Jackson Atlanta',
        city: 'Atlanta',
        activeFlights: 156,
        congestionLevel: 'high'
    },
    {
        code: 'DFW',
        name: 'Dallas/Fort Worth International',
        city: 'Dallas',
        activeFlights: 98,
        congestionLevel: 'medium'
    },
    {
        code: 'DEN',
        name: 'Denver International',
        city: 'Denver',
        activeFlights: 89,
        congestionLevel: 'medium'
    },
    {
        code: 'SFO',
        name: 'San Francisco International',
        city: 'San Francisco',
        activeFlights: 76,
        congestionLevel: 'medium'
    },
    {
        code: 'SEA',
        name: 'Seattle-Tacoma International',
        city: 'Seattle',
        activeFlights: 54,
        congestionLevel: 'low'
    },
    {
        code: 'MIA',
        name: 'Miami International',
        city: 'Miami',
        activeFlights: 87,
        congestionLevel: 'medium'
    },
    {
        code: 'BOS',
        name: 'Boston Logan International',
        city: 'Boston',
        activeFlights: 62,
        congestionLevel: 'low'
    },
    {
        code: 'PHX',
        name: 'Phoenix Sky Harbor International',
        city: 'Phoenix',
        activeFlights: 45,
        congestionLevel: 'low'
    },
    {
        code: 'DXB',
        name: 'Dubai International',
        city: 'Dubai',
        activeFlights: 189,
        congestionLevel: 'high'
    },
    {
        code: 'LHR',
        name: 'London Heathrow',
        city: 'London',
        activeFlights: 167,
        congestionLevel: 'high'
    },
    {
        code: 'CDG',
        name: 'Charles de Gaulle',
        city: 'Paris',
        activeFlights: 142,
        congestionLevel: 'high'
    }
];

let filteredData = [...airportData];
let congestionChart = null;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
    populateTable(airportData);
    initializeFilters();
    initializeThemeToggle();
});

// ==========================================
// INITIALIZE HORIZONTAL BAR CHART
// ==========================================
function initializeChart() {
    const ctx = document.getElementById('congestionChart');
    
    if (!ctx) {
        console.error('Chart canvas not found');
        return;
    }
    
    // Get top 5 most congested airports
    const topAirports = getTopCongested(airportData, 5);
    
    congestionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topAirports.map(a => a.code),
            datasets: [{
                data: topAirports.map(a => a.activeFlights),
                backgroundColor: '#ef4444',
                borderRadius: 4,
                barThickness: 40
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    max: 200,
                    grid: {
                        color: '#2d3748',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#9aa0a6',
                        font: {
                            size: 12
                        },
                        stepSize: 50
                    },
                    border: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9aa0a6',
                        font: {
                            size: 13,
                            weight: '600',
                            family: 'Consolas, Monaco, monospace'
                        }
                    },
                    border: {
                        color: '#2d3748'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1a1f2e',
                    titleColor: '#e8eaed',
                    bodyColor: '#e8eaed',
                    borderColor: '#2d3748',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            const airport = topAirports[context[0].dataIndex];
                            return airport.name;
                        },
                        label: function(context) {
                            return `Active Flights: ${context.parsed.x}`;
                        }
                    }
                }
            }
        }
    });
    
    console.log('Chart initialized successfully');
}

// ==========================================
// GET TOP CONGESTED AIRPORTS
// ==========================================
function getTopCongested(data, count) {
    return [...data]
        .sort((a, b) => b.activeFlights - a.activeFlights)
        .slice(0, count);
}

// ==========================================
// UPDATE CHART
// ==========================================
function updateChart(data) {
    if (!congestionChart) return;
    
    const topAirports = getTopCongested(data, 5);
    
    congestionChart.data.labels = topAirports.map(a => a.code);
    congestionChart.data.datasets[0].data = topAirports.map(a => a.activeFlights);
    congestionChart.update();
}

// ==========================================
// POPULATE TABLE
// ==========================================
function populateTable(data) {
    const tableBody = document.getElementById('congestionTableBody');
    
    if (!tableBody) {
        console.error('Table body not found');
        return;
    }
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Sort by active flights (descending)
    const sortedData = [...data].sort((a, b) => b.activeFlights - a.activeFlights);
    
    // Populate with airport data
    sortedData.forEach((airport, index) => {
        const row = createTableRow(airport, index);
        tableBody.appendChild(row);
    });
    
    console.log(`Populated table with ${sortedData.length} airports`);
}

// ==========================================
// CREATE TABLE ROW
// ==========================================
function createTableRow(airport, index) {
    const row = document.createElement('tr');
    
    // Add animation delay
    row.style.animationDelay = `${(index * 0.05) + 0.5}s`;
    
    // Airport Code
    const codeCell = document.createElement('td');
    codeCell.innerHTML = `<span class="airport-code">${airport.code}</span>`;
    row.appendChild(codeCell);
    
    // Airport Name
    const nameCell = document.createElement('td');
    nameCell.textContent = airport.name;
    row.appendChild(nameCell);
    
    // City
    const cityCell = document.createElement('td');
    cityCell.textContent = airport.city;
    row.appendChild(cityCell);
    
    // Active Flights
    const flightsCell = document.createElement('td');
    flightsCell.innerHTML = `<span class="active-flights">${airport.activeFlights}</span>`;
    row.appendChild(flightsCell);
    
    // Congestion Level
    const levelCell = document.createElement('td');
    const levelClass = getCongestionClass(airport.congestionLevel);
    levelCell.innerHTML = `<span class="congestion-badge ${levelClass}">${airport.congestionLevel}</span>`;
    row.appendChild(levelCell);
    
    return row;
}

// ==========================================
// GET CONGESTION CLASS
// ==========================================
function getCongestionClass(level) {
    switch (level.toLowerCase()) {
        case 'low':
            return 'congestion-low';
        case 'medium':
            return 'congestion-medium';
        case 'high':
            return 'congestion-high';
        default:
            return '';
    }
}

// ==========================================
// INITIALIZE FILTERS
// ==========================================
function initializeFilters() {
    const cityFilter = document.getElementById('cityFilter');
    const congestionFilter = document.getElementById('congestionFilter');
    
    if (cityFilter) {
        cityFilter.addEventListener('change', applyFilters);
    }
    
    if (congestionFilter) {
        congestionFilter.addEventListener('change', applyFilters);
    }
}

// ==========================================
// APPLY FILTERS
// ==========================================
function applyFilters() {
    const cityFilter = document.getElementById('cityFilter').value.toLowerCase();
    const congestionFilter = document.getElementById('congestionFilter').value.toLowerCase();
    
    filteredData = airportData.filter(airport => {
        const cityMatch = cityFilter === 'all' || airport.city.toLowerCase() === cityFilter;
        const congestionMatch = congestionFilter === 'all' || airport.congestionLevel === congestionFilter;
        
        return cityMatch && congestionMatch;
    });
    
    console.log('Filters applied:', { cityFilter, congestionFilter });
    console.log('Filtered results:', filteredData.length);
    
    // Update both chart and table
    updateChart(filteredData);
    populateTable(filteredData);
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        const searchResults = filteredData.filter(airport => {
            return airport.code.toLowerCase().includes(searchTerm) ||
                   airport.name.toLowerCase().includes(searchTerm) ||
                   airport.city.toLowerCase().includes(searchTerm);
        });
        
        populateTable(searchResults);
        console.log('Search for:', searchTerm, '- Results:', searchResults.length);
    });
}

// ==========================================
// THEME TOGGLE
// ==========================================
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            console.log('Theme toggled');
        });
    }
}

// ==========================================
// NOTIFICATIONS
// ==========================================
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
        console.log('Notifications clicked');
    });
}

// ==========================================
// USER MENU
// ==========================================
const userMenu = document.querySelector('.user-menu');
if (userMenu) {
    userMenu.addEventListener('click', function() {
        console.log('User menu clicked');
    });
}

// ==========================================
// AUTO REFRESH
// ==========================================
setInterval(function() {
    console.log('Auto-refreshing congestion data...');
    // In production, fetch new data from API here
}, 60000); // Refresh every minute

console.log('Airport Congestion page initialized successfully');