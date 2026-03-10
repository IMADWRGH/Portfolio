// Trigger timeline animation on scroll
const timelineSection = document.querySelector('.timeline-items');

if (timelineSection) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate class to timeline container
                timelineSection.classList.add('animate');

                // Add animate class to each timeline item
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach(item => {
                    item.classList.add('animate');
                });

                // Unobserve after animation is triggered (only animate once)
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '0px'
    });

    timelineObserver.observe(timelineSection);
}

// script.js 
document.addEventListener("DOMContentLoaded", function () {
    const progressListItems =
        document.querySelectorAll("#progressbar li");
    // console.log("itme  " + progressListItems.length);
    const progressBar =
        document.querySelector(".progress-bar");
    let currentStep = 0;
    // console.log("cuu  " + currentStep);
    function updateProgress() {
        const percent =
            (currentStep / (progressListItems.length - 1)) * 100;
        progressBar.style.width = percent + "%";
        // console.log("p " + percent);

        progressListItems.forEach((item, index) => {
            if (index === currentStep) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    function showStep(stepIndex) {
        const steps =
            document.querySelectorAll(".step-container fieldset");
        steps.forEach((step, index) => {
            if (index === stepIndex) {
                step.style.display = "block";
            } else {
                step.style.display = "none";
            }
        });
    }

    function nextStep() {
        if (currentStep < progressListItems.length - 1) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            updateProgress();
        }
    }

    const nextStepButtons =
        document.querySelectorAll(".next-step");
    const prevStepButtons =
        document.querySelectorAll(".previous-step");

    nextStepButtons.forEach((button) => {
        button.addEventListener("click", nextStep);
    });

    prevStepButtons.forEach((button) => {
        button.addEventListener("click", prevStep);
    });
});


// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 300px from the top, show the button
if (scrollToTopBtn) {
    window.onscroll = function () {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    // When the user clicks on the button, scroll to the top of the document
    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}



// Menu 
const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Change icon based on menu state
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Active Menu State on Scroll
const sections = document.querySelectorAll('section, header');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });
});

// Trigger scroll on load to set initial active state
window.dispatchEvent(new Event('scroll'));

// --- GSAP Animations ---
document.addEventListener("DOMContentLoaded", function () {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Animate About Section
    gsap.from('#about .col-1 img', {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from('#about .col-2', {
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 2. Animate Skills Cards (Flip Cards)
    const skillCards = gsap.utils.toArray('#skills .flip-card');
    skillCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.5)"
        });
    });

    // 3. Animate Projects
    gsap.from('#projects .item', {
        scrollTrigger: {
            trigger: "#projects .rows",
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // Animate one after another
        ease: "power2.out"
    });

    // 4. Animate Contact Cards
    const contactCards = gsap.utils.toArray('#contact .contact-card');
    contactCards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: "#contact .contact-cards",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            scale: 0.8,
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.15, // Stagger effect
            ease: "power2.out"
        });
    });

    // 5. Animate Header Elements
    const tl = gsap.timeline();
    
    tl.from('header .navbar', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    .from('.header-content .content-text > *', {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out", /* Animates text elements sequentially */
        clearProps: "opacity,transform" // Prevents GSAP from overriding inline-block display
    }, "-=0.4")
    .from('.header-content > img', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.5)"
    }, "-=0.6");
});