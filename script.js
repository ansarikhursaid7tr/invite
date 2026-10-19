document.addEventListener('DOMContentLoaded', () => {
    const landingScreen = document.getElementById('landing-screen');
    const mainContent = document.getElementById('main-content');
    const openBtn = document.getElementById('open-btn');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');

    // Open Invitation Logic
    openBtn.addEventListener('click', () => {
        // Fade out landing screen
        landingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            landingScreen.style.display = 'none';
            // Show main content
            mainContent.classList.remove('hidden');
            // Small delay to allow CSS display to apply before fading in
            setTimeout(() => {
                mainContent.classList.add('visible');
                initScrollAnimations();
            }, 50);
            
            // Start Background Music
            bgMusic.volume = 0.5; // Set volume to 50%
            bgMusic.play().catch(e => console.log('Autoplay prevented', e));
        }, 1000); // 1 second CSS fade
    });

    // Music Toggle Logic
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            iconPlay.classList.add('hidden');
            iconPause.classList.remove('hidden');
        } else {
            bgMusic.pause();
            iconPause.classList.add('hidden');
            iconPlay.classList.remove('hidden');
        }
    });

    // Scroll Animations (Intersection Observer)
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.section-fade');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Countdown Timer Logic
    const targetDate = new Date('December 19, 2026 12:30:00').getTime();
    const countdownElement = document.getElementById('countdown-timer');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = "<div class='timer-block full'><span>Today is the big day!</span></div>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div style="display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 1.5rem; width: 100%; flex-wrap: nowrap; white-space: nowrap;">
                <div class="timer-block"><span>${days}</span><small>Days</small></div>
                <div class="timer-block"><span>${hours}</span><small>Hrs</small></div>
                <div class="timer-block"><span>${minutes}</span><small>Min</small></div>
                <div class="timer-block"><span>${seconds}</span><small>Sec</small></div>
            </div>
        `; 
    }

    // Update immediately, then every second
    if (countdownElement) {
        updateCountdown();
        setInterval(updateCountdown, 1000); // 1-second dynamic loop
    }
});
