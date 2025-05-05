document.addEventListener('DOMContentLoaded', function() {
    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const parallaxSections = document.querySelectorAll('.parallax');
        
        parallaxSections.forEach(section => {
            const bg = section.querySelector('.parallax-bg');
            if (!bg) return;
            
            const distance = window.scrollY;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Only apply effect when section is in view
            if (distance >= sectionTop - window.innerHeight && distance <= sectionTop + sectionHeight) {
                const yScroll = (distance - sectionTop) * 0.5;
                bg.style.transform = `translate3d(0, ${yScroll}px, 0)`;
            }
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Check if an element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Add animation class when element is in viewport
    function checkTimelineElements() {
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('animate');
            }
        });
    }
    
    // Initial check on page load
    checkTimelineElements();
    
    // Check on scroll
    window.addEventListener('scroll', checkTimelineElements);
    
    // Add animation class to timeline items
    document.querySelector('.timeline').style.cssText = `
        .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.5s, transform 0.5s;
        }
        
        .timeline-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
});

// Add these styles directly to the stylesheet to ensure they work
const style = document.createElement('style');
style.textContent = `
    .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .timeline-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .section {
        animation: fadeIn 1s ease-out;
    }
`;
document.head.appendChild(style);