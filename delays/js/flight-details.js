// ==========================================
// FLIGHT DETAILS JAVASCRIPT
// ==========================================

// Flight data
const flightData = [
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

// ==========================================
// INITIALIZE PAGE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    populateFlightTable();
    initializeSearch();
    initializeThemeToggle();
});

// ==========================================
// POPULATE FLIGHT TABLE
// ==========================================
function populateFlightTable() {
    const tableBody = document.getElementById('flightsTableBody');
    
    if (!tableBody) {
        console.error('Table body not found');
        return;
    }
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Populate with flight data
    flightData.forEach((flight, index) => {
        const row = createFlightRow(flight, index);
        tableBody.appendChild(row);
    });
    
    console.log(`Populated ${flightData.length} flights`);
}

// ==========================================
// CREATE FLIGHT ROW
// ==========================================
function createFlightRow(flight, index) {
    const row = document.createElement('tr');
    
    // Add animation delay
    row.style.animationDelay = `${index * 0.05}s`;
    
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
    
    // Add click event to row
    row.addEventListener('click', function() {
        console.log('Flight clicked:', flight.flightNo);
        // Add logic to show flight details modal or navigate to details page
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
// SEARCH FUNCTIONALITY
// ==========================================
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterFlights(searchTerm);
        });
    }
}

function filterFlights(searchTerm) {
    const rows = document.querySelectorAll('.flights-table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    console.log('Filtered flights for:', searchTerm);
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
// SORTING FUNCTIONALITY
// ==========================================
function initializeSorting() {
    const headers = document.querySelectorAll('.flights-table th');
    
    headers.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            sortTable(index);
        });
    });
}

function sortTable(columnIndex) {
    const table = document.querySelector('.flights-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    let isAscending = table.dataset.sortOrder === 'asc';
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        if (isAscending) {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });
    
    // Re-append sorted rows
    rows.forEach(row => tbody.appendChild(row));
    
    // Toggle sort order
    table.dataset.sortOrder = isAscending ? 'desc' : 'asc';
    
    console.log(`Sorted column ${columnIndex} ${isAscending ? 'descending' : 'ascending'}`);
}

// ==========================================
// REFRESH DATA
// ==========================================
function refreshFlightData() {
    console.log('Refreshing flight data...');
    // In a real application, this would fetch new data from an API
    populateFlightTable();
}

// Auto-refresh every 30 seconds
setInterval(refreshFlightData, 30000);

console.log('Flight details page initialized successfully');