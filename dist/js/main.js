let tl = gsap.timeline({paused: true});

function fromHeroToStoryDown(e) {
    e.preventDefault();

    tl.to('.header__logo-music-toggle-wrapper', {
        y: -95, duration: 1,
        ease: 'ease-in-out'
    })
    .to('.social', {y: -100, duration: 1}, '-=1')
    .to('.hero__bg-layout', {opacity: 1, duration: 1}, "-=1")
    .to('.hero__slogan', {x: -250, duration: 1}, '-=1')
    .to('.hero__hashtag', {x: 200, duration: 1}, '-=1')
    .to('.story__autor', {y: '-100vh', duration: 1})
    .to('.story__title', {y: '-100vh', duration: 0.9}, '-=0.9')
    .to('.story__text:nth-child(1)', {y: '-100vh', duration: 0.9}, '-=0.9')
    .to('.story__text:nth-child(2)', {y: '-100vh', duration: 1}, '-=0.9')
    .to('.story__bg-circle', {y: '-90vh', duration: 2}, '-=1');

    tl.play();
}

function fromHeroToStoryUp(e) {
    e.preventDefault();
    tl.reverse();
}


document.addEventListener('wheel', function(e) {
    if(e.deltaY > 0) {
        fromHeroToStoryDown(e);
    } else {
        fromHeroToStoryUp(e);
    }
}, { passive: false });