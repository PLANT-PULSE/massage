// Function to redirect to WhatsApp with pre-filled message
function redirectToWhatsApp() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const duration = document.getElementById('duration').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('notes').value;

    // Format the message
    const message = `Hello! I would like to book a massage appointment:%0A%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0ADuration: ${duration}%0ADate: ${date}%0ATime: ${time}%0ASpecial Requests: ${notes}`;

    // Replace with actual WhatsApp number (remove spaces and special characters)
    const whatsappNumber = "+233552486518";

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// Function to send shop item details to WhatsApp
function sendShopItemToWhatsApp(button) {
    const card = button.closest('.card');
    const itemName = card.querySelector('.card-title').innerText;
    const itemPrice = card.querySelector('.text-purple').innerText;
    const itemDescription = card.querySelector('.card-text').innerText || 'A quality product from Glory Wellness Health Centre.';

    const whatsappNumber = "+233552486518";

    const message = `Hello! I am interested in purchasing the following item:%0A%0AName: ${itemName}%0APrice: ${itemPrice}%0ADescription: ${itemDescription}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// Attach event listeners to all "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.btn.btn-gold.btn-sm');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            sendShopItemToWhatsApp(button);
        });
    });
});

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Scroll Progress Bar and Navbar Active Link Update
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id], #mainCarousel');

    // Function to update scroll progress
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }

    // Function to update active navbar link
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;

        // Default to home if at top
        if (scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('.navbar-nav .nav-link[href="#"]').classList.add('active');
            return;
        }

        // Check which section is in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const correspondingLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Throttle scroll events for better performance
    let scrollTimer;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() {
            updateScrollProgress();
            updateActiveNavLink();
        }, 10);
    });

    // Initial call
    updateScrollProgress();
    updateActiveNavLink();
});
