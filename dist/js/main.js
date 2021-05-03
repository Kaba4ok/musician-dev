'use strict';

let delimiter = 0;
const DEBOUNCE_DURATION = 3500;

if (document.documentElement.clientWidth > 1200) {

    let screenSwitcher = {
        screens: ['hero', 'story', 'featuresTop', 'featuresBotoom', 'facts', 'prices', 'footer'],
        currentSreen: 'hero',
        get lastScreenIndex () {
            return Number(this.screens.length) - 1;
        },
        heroStoryAnimation: {

            HeroStoryAnimationTL: gsap.timeline({paused: true})
            .to('.header__logo-music-toggle-wrapper', {y: -95, duration: 1, ease: 'ease-in-out'})
            .to('.social', {y: -100, duration: 1}, '-=1')
            .to('.hero__bg-layout', {opacity: 1, duration: 1}, "-=1")
            .to('.hero__slogan', {x: -250, duration: 1}, '-=1')
            .to('.hero__hashtag', {x: 200, duration: 1}, '-=1')
            .to('.hero', {y: '-100vh', duration: 0})
            .to('.story', {y: '-100vh', duration: 0}, '-=0')
            .fromTo('.story__autor', {y: '100vh'}, {y: 0, duration: 0.8})
            .fromTo('.story__title', {y: '100vh'}, {y: 0, duration: 0.7}, '-=0.8')
            .fromTo('.story__text:nth-child(1)', {y: '100vh'}, {y: 0, duration: 0.9}, '-=0.8')
            .fromTo('.story__text:nth-child(2)', {y: '100vh'}, {y: 0, duration: 1}, '-=0.9')
            .fromTo('.story__bg-circle', {y: '100vh'}, {y: 80, duration: 2}, '-=1'),

            down() {
                console.log('hero_DOWN');
                this.HeroStoryAnimationTL.play();
            },
            up() {
                console.log('hero_UP');
                this.HeroStoryAnimationTL.reverse();
            }
        },
        storyFeaturesTopAnimation: {

            storyFeaturesTopAnimationTL: gsap.timeline({paused: true})
            .fromTo('.story__bg-circle', {y: 80}, {y: '-100vh', duration: 2.6, ease: 'none'})
            .fromTo('.story__autor', {y: 0}, {y: '-100vh', duration: 2.5}, '-=2.3')
            .fromTo('.story__title', {y: 0}, {y: '-100vh', duration: 2.5}, '-=2.6')
            .fromTo('.story__text:nth-child(1)', {y: 0}, {y: '-100vh', duration: 2.5}, '-=2.5')
            .fromTo('.story__text:nth-child(2)', {y: 0}, {y: '-100vh', duration: 2.5}, '-=2.4')
            .to('.story__bg-layout', {height: '100%', duration: 2}, '-=2.5')
            .fromTo('.utterance', {opacity: 1}, {opacity: 0, duration: 1}, '-=2'),
            // .to('.features', {y: '-200vh', duration: 0})
            // .to('.hero-story-wrapper', {y: '-200vh', duration: 0}),

            down() {
                console.log('storyFeaturesTopAnimation_DOWN');
                this.storyFeaturesTopAnimationTL.play();
            },
            up() {
                this.storyFeaturesTopAnimationTL.reverse();
            }
        },
        storyFeaturesTopFeaturesBottomAnimation: {
            down() {
                console.log('storyFeaturesTopFeaturesBottomAnimation_DOWN');
            },
            up() {
                console.log('storyFeaturesTopFeaturesBottomAnimation_UP');
            }
        },
        featuresBottomFactsAnimation: {
            down() {
                console.log('featuresBottomFactsAnimation_DOWN');
            },
            up() {
                console.log('featuresBottomFactsAnimation_UP');
            }
        },
        factsPricesAnimation: {
            down() {
                console.log('factsPricesAnimation_DOWN');
            },
            up() {
                console.log('factsPricesAnimation_UP');
            }
        },
        pricesFooterAnimation: {
            down() {
                console.log('pricesFooterAnimation_DOWN');
            },
            up() {
                console.log('pricesFooterAnimation_UP');
            }
        },
    }

    window.addEventListener('wheel', function(e) {

        const screenIndex = screenSwitcher.screens.indexOf(screenSwitcher.currentSreen);

        if(e.deltaY > 0) {
            if(delimiter === 0) {

                delimiter = 1;

                switch (screenSwitcher.currentSreen) {
                    case "hero":
                        screenSwitcher.heroStoryAnimation.down();
                        break;
                    case "story":
                        screenSwitcher.storyFeaturesTopAnimation.down();
                        break;
                    case "featuresTop":
                        screenSwitcher.storyFeaturesTopFeaturesBottomAnimation.down();
                        break;
                    case "featuresBottom":
                        screenSwitcher.featuresBottomFactsAnimation.down();
                        break;
                    case "facts":
                        screenSwitcher.factsPricesAnimation.down();
                        break;
                    case "prices":
                        screenSwitcher.pricesFooterAnimation.down();
                        break;
                }

                setTimeout(() => {
                    delimiter = 0;
                }, DEBOUNCE_DURATION);

                screenSwitcher.currentSreen = screenIndex === screenSwitcher.lastScreenIndex ? "hero" : screenSwitcher.screens[screenIndex + 1];
            }
        } else {
            if(delimiter === 0) {
                delimiter = 1;

                screenSwitcher.currentSreen = screenIndex === 0 ? screenSwitcher.lastScreenIndex : screenSwitcher.screens[screenIndex - 1];
                
                switch (screenSwitcher.currentSreen) {
                    case "hero":
                        screenSwitcher.heroStoryAnimation.up();
                        break;
                    case "story":
                        screenSwitcher.storyFeaturesTopAnimation.up();
                        break;
                    case "featuresTop":
                        screenSwitcher.storyFeaturesTopFeaturesBottomAnimation.up();
                        break;
                    case "featuresBottom":
                        screenSwitcher.featuresBottomFactsAnimation.up();
                        break;
                    case "facts":
                        screenSwitcher.factsPricesAnimation.up();
                        break;
                    case "prices":
                        screenSwitcher.pricesFooterAnimation.up();
                        break;
                }

                setTimeout(() => {
                    delimiter = 0;
                }, DEBOUNCE_DURATION);
            }
        }
    });
}





// .fromTo('.features', {y: '-500vh'}, {y: '-200vh', duration: 2},'-=3')
// .fromTo('.utterance', {opacity: 1}, {opacity: 0, duration: 1}, '-=2')
// .to('.hero-story-wrapper', {y: '-200vh', duration: 0}, '-=1')
// .fromTo('.features__bg-figure-1', {y: 0, opacity: 0}, {y: 0, opacity: 1, duration: 1}, '-=1')
// .from('.features__item', {y: '300vh', duration: 1}, '-=2')
// .from('.features__img', {y: '300vh', duration: 1}, '-=2')
// .from('.features__call', {y: '300vh', duration: 1}, '-=2')
// .from('.features__bg-figure-2', {y: '300vh', duration: 1}, '-=2')