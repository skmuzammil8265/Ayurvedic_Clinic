// Admin Login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // In a real application, this would be handled by a backend
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn && window.location.pathname.includes('admin/') && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }
});

// Slider Management
function addSliderImage() {
    const title = document.getElementById('sliderTitle').value;
    const image = document.getElementById('sliderImage').files[0];
    
    if (!title || !image) {
        alert('Please fill in all fields');
        return;
    }

    // In a real application, this would upload to a server
    const reader = new FileReader();
    reader.onload = function(e) {
        const sliderData = {
            title: title,
            image: e.target.result
        };
        
        // Save to localStorage for demo purposes
        let sliders = JSON.parse(localStorage.getItem('sliders') || '[]');
        sliders.push(sliderData);
        localStorage.setItem('sliders', JSON.stringify(sliders));
        
        alert('Slider image added successfully');
        window.location.reload();
    };
    reader.readAsDataURL(image);
}

// Gallery Management
function addGalleryImage() {
    const title = document.getElementById('galleryTitle').value;
    const image = document.getElementById('galleryImage').files[0];
    
    if (!title || !image) {
        alert('Please fill in all fields');
        return;
    }

    // In a real application, this would upload to a server
    const reader = new FileReader();
    reader.onload = function(e) {
        const galleryData = {
            title: title,
            image: e.target.result
        };
        
        // Save to localStorage for demo purposes
        let gallery = JSON.parse(localStorage.getItem('gallery') || '[]');
        gallery.push(galleryData);
        localStorage.setItem('gallery', JSON.stringify(gallery));
        
        alert('Gallery image added successfully');
        window.location.reload();
    };
    reader.readAsDataURL(image);
}

// Appointment Management
function loadAppointments() {
    // In a real application, this would fetch from a server
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const tableBody = document.querySelector('.appointments-table tbody');
    
    if (tableBody) {
        tableBody.innerHTML = '';
        appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.name}</td>
                <td>${appointment.doctor}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td><span class="status ${appointment.status}">${appointment.status}</span></td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('dashboard.html')) {
        loadAppointments();
    }
}); 