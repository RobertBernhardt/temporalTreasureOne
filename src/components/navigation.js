/**
 * Navigation Component for Temporal Treasures
 * Handles mobile navigation menu
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get navigation elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Exit if elements don't exist
    if (!navToggle || !navMenu) return;
    
    // Toggle mobile menu on click
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking a nav link
    const navLinks = navMenu.querySelectorAll('a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Handle active link state
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // If on homepage
        if (currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
            if (linkPath === 'index.html' || linkPath === './') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
        // If on other pages
        else if (currentPath.includes(linkPath) && linkPath !== 'index.html' && linkPath !== './') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});