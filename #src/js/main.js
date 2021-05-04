'use strict';

let delimiter = 0;
const DEBOUNCE_DURATION = 3500;

if (document.documentElement.clientWidth > 1200) {

    let screenSwitcher = {
        screens: ['hero', 'story', 'featuresTop', 'featuresMiddle', 'featuresBotoom', 'facts', 'prices', 'footer'],
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
            .fromTo('.utterance', {opacity: 1}, {opacity: 0, duration: 1}, '-=2')
            .to('.features', {y: '-200vh', backgroundColor: 'transparent', duration: 0}, '-=1.8')
            .from('.features__item-slogan', {y: '100vh', duration: 1.3}, '-=1.8')
            .from('.features__item-text', {y: '100vh', duration: 1.3}, '-=1.7')
            .from('.features__img', {y: '100vh', duration: 0}, '-=1.3')
            .fromTo('.features__img-wrapper', {height: 0}, {height: 'auto', duration: 2.2}, '-=1')
            .to('.features__img img', {y: -30, duration: 2.5}, '-=2.5'),

            down() {
                console.log('storyFeaturesTopAnimation_DOWN');
                this.storyFeaturesTopAnimationTL.play();
            },
            up() {
                this.storyFeaturesTopAnimationTL.reverse();
            }
        },
        featuresTopFeaturesMiddleAnimation: {

            featuresTopFeaturesMiddleAnimationTL: gsap.timeline({paused: true})
            .to('.features__item-slogan--passion', {y: '-90vh', duration: 3})
            .to('.features__item-text--passion', {y: '-90vh', duration: 2.6}, '-=3')
            .to('.features__bg-figure-1', {opacity: 0, duration: 1}, '-=3')
            .to('.features__img-wrapper', {y: '-68vh', duration: 2}, '-=2.7'),

            down() {
                console.log('featuresTopFeaturesMiddleAnimation_DOWN');
                this.featuresTopFeaturesMiddleAnimationTL.play();
            },
            up() {
                console.log('featuresTopFeaturesMiddleAnimation_UP');
                this.featuresTopFeaturesMiddleAnimationTL.reverse();
            }
        },
        featuresMiddleFeaturesBottomAnimation: {
            featuresMiddleFeaturesBottomAnimationTL: gsap.timeline({paused: true})
            .to('.features__img-wrapper', {y: '-160vh', duration: 1.8})
            .to('.features__item-slogan--commitment', {y: '-160vh', duration: 1.6}, '-=1.4')
            .to('.features__item-text--commitment', {y: '-160vh', duration: 2}, '-=2.3')
            .to('.features__call', {y: '-160vh', duration: 1.4}, '-=2.1'),
            // .to('.features', {y: '-290vh', duration: 1.4}, '-=1.4'),

            down() {
                console.log('featuresMiddleFeaturesBottomAnimation_DOWN');
                this.featuresMiddleFeaturesBottomAnimationTL.play();
            },
            up() {
                console.log('featuresMiddleFeaturesBottomAnimation_UP');
                this.featuresMiddleFeaturesBottomAnimationTL.reverse();
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
                        screenSwitcher.featuresTopFeaturesMiddleAnimation.down();
                        break;
                    case "featuresMiddle":
                        screenSwitcher.featuresMiddleFeaturesBottomAnimation.down();
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
                        screenSwitcher.featuresTopFeaturesMiddleAnimation.up();
                        break;
                    case "featuresMiddle":
                        screenSwitcher.featuresMiddleFeaturesBottomAnimation.up();
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