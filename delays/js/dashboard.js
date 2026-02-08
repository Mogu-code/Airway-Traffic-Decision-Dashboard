// ==========================================
// DASHBOARD JAVASCRIPT
// ==========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeFilters();
    initializeThemeToggle();
});

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
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log(`Filter changed: ${this.value}`);
            // Add filter logic here
            applyFilters();
        });
    });
}

function applyFilters() {
    // Get current filter values
    const airline = document.querySelector('.filter-select:nth-of-type(1)')?.value || 'All Airlines';
    const status = document.querySelector('.filter-select:nth-of-type(2)')?.value || 'All Status';
    const minDelay = document.querySelector('.filter-select:nth-of-type(3)')?.value || 'Any delay';
    
    console.log('Applying filters:', { airline, status, minDelay });
    
    // Filter logic would go here
    // This would typically update the charts and flight list
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