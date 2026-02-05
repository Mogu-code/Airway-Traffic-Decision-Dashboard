/* ============================================
   AIRTRAFFIC DASHBOARD - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // SIDEBAR TOGGLE
    // ============================================
    
    const collapseBtn = document.querySelector('.collapse-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (collapseBtn) {
        collapseBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // ============================================
    // THEME TOGGLE
    // ============================================
    
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            
            // Store preference
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
    
    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            // You can implement search logic here
            console.log('Searching for:', searchTerm);
        });
    }
    
    // ============================================
    // ANIMATE STATS ON LOAD
    // ============================================
    
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const targetValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = targetValue / 50;
        const duration = 1000;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                stat.textContent = targetValue;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(currentValue);
            }
        }, stepTime);
    });
    
    // ============================================
    // CHART INTERACTIONS
    // ============================================
    
    const lineChartCircles = document.querySelectorAll('.line-chart circle');
    
    lineChartCircles.forEach(circle => {
        circle.addEventListener('mouseenter', function() {
            // You can show tooltip or highlight here
            this.style.r = '7';
        });
        
        circle.addEventListener('mouseleave', function() {
            this.style.r = '4';
        });
    });
    
    // ============================================
    // TABLE ROW INTERACTIONS
    // ============================================
    
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // You can implement row selection or details view here
            console.log('Row clicked:', this);
        });
    });
    
    // ============================================
    // NOTIFICATION BELL
    // ============================================
    
    const notificationBtn = document.querySelector('.notifications');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            // You can show notifications dropdown here
            console.log('Notifications clicked');
        });
    }
    
    // ============================================
    // USER PROFILE DROPDOWN
    // ============================================
    
    const userProfile = document.querySelector('.user-profile');
    
    if (userProfile) {
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            // You can show user menu dropdown here
            console.log('User profile clicked');
        });
    }
    
    // ============================================
    // RESPONSIVE HANDLING
    // ============================================
    
    function handleResize() {
        const width = window.innerWidth;
        
        if (width <= 768) {
            // Mobile adjustments
            sidebar.classList.remove('open');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    // ============================================
    // AUTO-REFRESH DATA (SIMULATION)
    // ============================================
    
    function refreshDashboard() {
        // Simulate data refresh
        console.log('Dashboard data refreshed at:', new Date().toLocaleTimeString());
        
        // You can implement actual data fetching here
        // For example, updating flight counts, delay times, etc.
    }
    
    // Refresh every 30 seconds
    setInterval(refreshDashboard, 30000);
    
    // ============================================
    // SMOOTH SCROLL TO SECTIONS
    // ============================================
    
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // ============================================
    // INITIALIZE TOOLTIPS (IF NEEDED)
    // ============================================
    
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltipText = this.getAttribute('data-tooltip');
                // Create and show tooltip
                console.log('Tooltip:', tooltipText);
            });
        });
    }
    
    initTooltips();
    
    console.log('AirTraffic Dashboard initialized successfully');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

function formatTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function getDelayColor(minutes) {
    if (minutes <= 15) return 'success';
    if (minutes <= 30) return 'warning';
    return 'danger';
}