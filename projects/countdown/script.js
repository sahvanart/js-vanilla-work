window.addEventListener('load', () => {
    const MINUTE = 60;
    const HOUR = 60 * 60;
    const DAY = 24 * HOUR;
    
    const days = document.querySelector('.days');
    const hours = document.querySelector('.hours');
    const minutes = document.querySelector('.minutes');
    const seconds = document.querySelector('.seconds');
    
    const countdown = document.querySelector('#countdown');
    const launchDate = Date.parse(countdown.dataset.time); // ms
    
    let previousTimeLeft = {};
    let totalSeconds; // between today's date and countdown's end
    let timeLeft = {
        d: 0,
        h: 0,
        m: 0,
        s: 0,
    }
    
    function init() {
        // totalSeconds = Math.floor((new Date('01/01/2022') - new Date()) / 1000); // ms to s
        totalSeconds = Math.floor((launchDate - Date.now()) / 1000); // ms to s
        setTimeLeft();
        let interval = setInterval(() => {
            if (totalSeconds < 0) {
                clearInterval(interval);
            }
            countTime();
        }, 1000);
    }
    
    function countTime() {
        if (totalSeconds > 0) {
            --timeLeft.s;
            if (timeLeft.m >= 0 && timeLeft.s < 0) {
                timeLeft.s = 59;
                --timeLeft.m;
                if (timeLeft.h >= 0 && timeLeft.m < 0) {
                    timeLeft.m = 59;
                    --timeLeft.h;
                    if (timeLeft.d >= 0 && timeLeft.h < 0) {
                        timeLeft.h = 23;
                        --timeLeft.d;
                    }
                }
            }
        }
        previousTimeLeft = timeLeft;
        --totalSeconds;
        printTime();
    }
    
    function printTime() {
        animateFlip(days, timeLeft.d);
        animateFlip(hours, timeLeft.h);
        animateFlip(minutes, timeLeft.m);
        animateFlip(seconds, timeLeft.s);
    }
    
    function animateFlip(element, value) {
        const valueInDom = element.querySelector('.bottom-back').innerText;
        const currentValue = value < 10 ? '0' + value : '' + value;
        // no DOM update if not necessary == same value for days, hours, minutes 
        if (valueInDom === currentValue) return;
    
        element.querySelector('.top-back span').innerText = currentValue;
        element.querySelector('.bottom-back span').innerText = currentValue;
    
        gsap.to(element.querySelector('.top'), 0.7, {
            rotationX: '-180deg',
            transformPerspective: 300,
            ease: Quart.easeOut,
            onComplete: function() {
                element.querySelector('.top').innerText = currentValue; 
                element.querySelector('.bottom').innerText = currentValue; 
                gsap.set(element.querySelector('.top'), {rotationX: 0});
            }
        });
    
        gsap.to(element.querySelector('.top-back'), 0.7, {
            rotationX: 0,
            transformPerspective: 300,
            ease: Quart.easeOut,
            clearProps: 'all'
        });
    
    }   
    
    function setTimeLeft() {
        timeLeft.d = Math.floor(totalSeconds / DAY);
        timeLeft.h = Math.floor(totalSeconds % DAY / HOUR);
        timeLeft.m = Math.floor(totalSeconds % HOUR / MINUTE);
        timeLeft.s = Math.floor(totalSeconds % MINUTE);
    }
    
    init();
});