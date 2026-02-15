// ==========================================
// DASHBOARD JAVASCRIPT
// ==========================================

// Flight data for dashboard table (showing first 15 flights)
const dashboardFlights = [
    {
        flightNo: 'AA1234',
        airline: 'American Airlines',
        from: 'JFK',
        to: 'LAX',
        scheduled: '08:00',
        delay: null,
        status: 'On Time'
    },
    {
        flightNo: 'UA567',
        airline: 'United Airlines',
        from: 'ORD',
        to: 'SFO',
        scheduled: '09:30',
        delay: '25 min',
        status: 'Delayed'
    },
    {
        flightNo: 'DL890',
        airline: 'Delta Airlines',
        from: 'ATL',
        to: 'BOS',
        scheduled: '10:15',
        delay: null,
        status: 'On Time'
    },
    {
        flightNo: 'SW123',
        airline: 'Southwest',
        from: 'DEN',
        to: 'PHX',
        scheduled: '11:00',
        delay: '45 min',
        status: 'Delayed'
    },
    {
        flightNo: 'BA456',
        airline: 'British Airways',
        from: 'LHR',
        to: 'JFK',
        scheduled: '12:30',
        delay: null,
        status: 'Cancelled'
    },
    {
        flightNo: 'AA789',
        airline: 'American Airlines',
        from: 'MIA',
        to: 'DFW',
        scheduled: '13:00',
        delay: '15 min',
        status: 'Delayed'
    },
    {
        flightNo: 'UA234',
        airline: 'United Airlines',
        from: 'SFO',
        to: 'SEA',
        scheduled: '14:15',
        delay: null,
        status: 'On Time'
    },
    {
        flightNo: 'DL567',
        airline: 'Delta Airlines',
        from: 'DTW',
        to: 'MSP',
        scheduled: '15:00',
        delay: '60 min',
        status: 'Delayed'
    },
    {
        flightNo: 'FX101',
        airline: 'FedEx',
        from: 'MEM',
        to: 'ORD',
        scheduled: '06:00',
        delay: null,
        status: 'On Time'
    },
    {
        flightNo: 'AA456',
        airline: 'American Airlines',
        from: 'DFW',
        to: 'ORD',
        scheduled: '16:30',
        delay: null,
        status: 'On Time'
    },
    {
        flightNo: 'SW789',
        airline: 'Southwest',
        from: 'LAS',
        to: 'OAK',
        scheduled: '17:00',
        delay: '35 min',
        status: 'Delayed'
    },
    {
        flightNo: 'UA890',
        airline: 'United Airlines',
        from: 'EWR',
        to: 'LAX',
        scheduled: '18:15',
        delay: null,
        status: 'On Time'
    },
    {
        flightNo: 'DL123',
        airline: 'Delta Airlines',
        from: 'LAX',
        to: 'JFK',
        scheduled: '19:00',
        delay: null,
        status: 'Cancelled'
    },
    {
        flightNo: 'JB456',
        airline: 'JetBlue',
        from: 'BOS',
        to: 'FLL',
        scheduled: '20:30',
        delay: '20 min',
        status: 'Delayed'
    },
    {
        flightNo: 'AA101',
        airline: 'American Airlines',
        from: 'PHX',
        to: 'DEN',
        scheduled: '21:00',
        delay: null,
        status: 'On Time'
    }
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeFilters();
    initializeThemeToggle();
    populateDashboardTable();
});

// ==========================================
// POPULATE DASHBOARD TABLE
// ==========================================
function populateDashboardTable() {
    const tableBody = document.getElementById('dashboardFlightsTable');
    
    if (!tableBody) {
        console.log('Dashboard table not found');
        return;
    }
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Populate with flight data
    dashboardFlights.forEach((flight, index) => {
        const row = createFlightRow(flight, index);
        tableBody.appendChild(row);
    });
    
    console.log(`Populated dashboard table with ${dashboardFlights.length} flights`);
}

// ==========================================
// CREATE FLIGHT ROW
// ==========================================
function createFlightRow(flight, index) {
    const row = document.createElement('tr');
    
    // Add animation delay
    row.style.animationDelay = `${(index * 0.05) + 0.6}s`;
    
    // Flight Number
    const flightNoCell = document.createElement('td');
    flightNoCell.innerHTML = `<span class="flight-number">${flight.flightNo}</span>`;
    row.appendChild(flightNoCell);
    
    // Airline
    const airlineCell = document.createElement('td');
    airlineCell.textContent = flight.airline;
    row.appendChild(airlineCell);
    
    // From
    const fromCell = document.createElement('td');
    fromCell.innerHTML = `<span class="airport-code">${flight.from}</span>`;
    row.appendChild(fromCell);
    
    // To
    const toCell = document.createElement('td');
    toCell.innerHTML = `<span class="airport-code">${flight.to}</span>`;
    row.appendChild(toCell);
    
    // Scheduled
    const scheduledCell = document.createElement('td');
    scheduledCell.innerHTML = `<span class="scheduled-time">${flight.scheduled}</span>`;
    row.appendChild(scheduledCell);
    
    // Delay
    const delayCell = document.createElement('td');
    if (flight.delay) {
        delayCell.innerHTML = `<span class="delay-time">${flight.delay}</span>`;
    } else {
        delayCell.innerHTML = `<span class="delay-none">-</span>`;
    }
    row.appendChild(delayCell);
    
    // Status
    const statusCell = document.createElement('td');
    const statusClass = getStatusClass(flight.status);
    statusCell.innerHTML = `<span class="status-badge ${statusClass}">${flight.status}</span>`;
    row.appendChild(statusCell);
    
    // Add click event to row (optional - for future use)
    row.addEventListener('click', function() {
        console.log('Flight clicked:', flight.flightNo);
        // You can add a modal or expand row details here if needed
    });
    
    return row;
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case 'on time':
            return 'status-on-time';
        case 'delayed':
            return 'status-delayed';
        case 'cancelled':
            return 'status-cancelled';
        default:
            return '';
    }
}

// ==========================================
// DASHBOARD JAVASCRIPT
// ==========================================
// CHART INITIALIZATION
// ==========================================
function initializeCharts() {
    // Status Distribution - Donut Chart
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        const statusChart = new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['On Time', 'Delayed', 'Cancelled'],
                datasets: [{
                    data: [15, 12, 3],
                    backgroundColor: [
                        '#10b981', // Green for On Time
                        '#f59e0b', // Orange for Delayed
                        '#ef4444'  // Red for Cancelled
                    ],
                    borderWidth: 0,
                    borderRadius: 4,
                    spacing: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
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
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Delays by Airline - Bar Chart
    const airlineCtx = document.getElementById('airlineChart');
    if (airlineCtx) {
        const airlineChart = new Chart(airlineCtx, {
            type: 'bar',
            data: {
                labels: ['Air Peace', 'American', 'British', 'Delta', 'JetBlue', 'Qatar', 'Southwest', 'UPS', 'United'],
                datasets: [
                    {
                        label: 'Delayed',
                        data: [1, 2, 0, 1, 1, 0, 3, 1, 2],
                        backgroundColor: '#f59e0b',
                        borderRadius: 4,
                        barThickness: 32
                    },
                    {
                        label: 'Cancelled',
                        data: [0, 0, 1, 0, 0, 1, 0, 0, 0],
                        backgroundColor: '#ef4444',
                        borderRadius: 4,
                        barThickness: 32
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#9aa0a6',
                            font: {
                                size: 11
                            }
                        },
                        border: {
                            color: '#2d3748'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#2d3748',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#9aa0a6',
                            font: {
                                size: 11
                            },
                            stepSize: 0.75
                        },
                        border: {
                            display: false
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
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return context[0].label + ' Airlines';
                            }
                        }
                    }
                }
            }
        });
    }
}

// ==========================================
// FILTER FUNCTIONALITY
// ==========================================
function initializeFilters() {
    const airlineFilter = document.getElementById('airlineFilter');
    const statusFilter = document.getElementById('statusFilter');
    const delayFilter = document.getElementById('delayFilter');
    
    if (airlineFilter) {
        airlineFilter.addEventListener('change', applyFilters);
    }
    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }
    if (delayFilter) {
        delayFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    // Get current filter values
    const airlineValue = document.getElementById('airlineFilter')?.value || 'all';
    const statusValue = document.getElementById('statusFilter')?.value || 'all';
    const delayValue = parseInt(document.getElementById('delayFilter')?.value || '0');
    
    console.log('Applying filters:', { airlineValue, statusValue, delayValue });
    
    // Filter the flight data
    const filteredFlights = dashboardFlights.filter(flight => {
        // Airline filter
        const airlineMatch = airlineValue === 'all' || flight.airline === airlineValue;
        
        // Status filter
        const statusMatch = statusValue === 'all' || flight.status === statusValue;
        
        // Delay filter
        let delayMatch = true;
        if (delayValue > 0 && flight.delay) {
            const flightDelayMinutes = parseInt(flight.delay.replace(/\D/g, ''));
            delayMatch = flightDelayMinutes >= delayValue;
        } else if (delayValue > 0 && !flight.delay) {
            delayMatch = false; // Flight has no delay but filter requires minimum delay
        }
        
        return airlineMatch && statusMatch && delayMatch;
    });
    
    console.log('Filtered results:', filteredFlights.length, 'flights');
    
    // Update the table with filtered data
    updateTable(filteredFlights);
}

function updateTable(flights) {
    const tableBody = document.getElementById('dashboardFlightsTable');
    
    if (!tableBody) {
        console.log('Dashboard table not found');
        return;
    }
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // If no flights match, show message
    if (flights.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 7;
        cell.style.textAlign = 'center';
        cell.style.padding = '2rem';
        cell.style.color = 'var(--text-secondary)';
        cell.textContent = 'No flights match the selected filters';
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }
    
    // Populate with filtered flight data
    flights.forEach((flight, index) => {
        const row = createFlightRow(flight, index);
        tableBody.appendChild(row);
    });
    
    console.log(`Updated table with ${flights.length} flights`);
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
            // You can implement light theme CSS variables here
        });
    }
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
        // Add search logic here
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Format time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
}

// Calculate delay
function calculateDelay(scheduled, actual) {
    // Logic to calculate delay in minutes
    const scheduledTime = new Date(`1970-01-01T${scheduled}:00`);
    const actualTime = new Date(`1970-01-01T${actual}:00`);
    const diff = (actualTime - scheduledTime) / (1000 * 60);
    return diff > 0 ? diff : 0;
}

// Refresh data periodically
setInterval(function() {
    console.log('Refreshing flight data...');
    // Add logic to fetch and update data
}, 60000); // Refresh every minute

// ==========================================
// NOTIFICATIONS
// ==========================================
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
        console.log('Notifications clicked');
        // Show notifications panel
    });
}

// ==========================================
// USER MENU
// ==========================================
const userMenu = document.querySelector('.user-menu');
if (userMenu) {
    userMenu.addEventListener('click', function() {
        console.log('User menu clicked');
        // Show user menu dropdown
    });
}

console.log('Dashboard initialized successfully');