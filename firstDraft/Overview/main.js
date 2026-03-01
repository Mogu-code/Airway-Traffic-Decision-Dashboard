document.addEventListener('DOMContentLoaded', function() {
    const collapseBtn = document.querySelector('.collapse-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (collapseBtn) {
        collapseBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }

    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Searching for:', searchTerm);
        });
    }
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
    const lineChartCircles = document.querySelectorAll('.line-chart circle');
    
    lineChartCircles.forEach(circle => {
        circle.addEventListener('mouseenter', function() {
            this.style.r = '7';
        });
        
        circle.addEventListener('mouseleave', function() {
            this.style.r = '4';
        });
    });
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            console.log('Row clicked:', this);
        });
    });
    const notificationBtn = document.querySelector('.notifications');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Notifications clicked');
        });
    }

    const userProfile = document.querySelector('.user-profile');
    
    if (userProfile) {
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('User profile clicked');
        });
    }
    function handleResize() {
        const width = window.innerWidth;
        
        if (width <= 768) {
            sidebar.classList.remove('open');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); 
    function refreshDashboard() {
        console.log('Dashboard data refreshed at:', new Date().toLocaleTimeString());
    }
    
    setInterval(refreshDashboard, 30000);
   
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltipText = this.getAttribute('data-tooltip');
                console.log('Tooltip:', tooltipText);
            });
        });
    }
    
    initTooltips();
    
    console.log('AirTraffic Dashboard initialized successfully');
});

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