'use strict';

var form = document.querySelector('.form');
var popupLinks = document.querySelectorAll('.popup-link');
var formCloseBtn = form.querySelector('.form__close');

function showPopup(evt) {
  evt.preventDefault();
  form.classList.remove('form--hidden');
}

function closePopup() {
  form.classList.add('form--hidden');
}

popupLinks.forEach(function (link) {
  link.addEventListener('click', showPopup);
});
formCloseBtn.addEventListener('click', closePopup); // ---------------------------------------------------------------

var storyHeaderLink = document.querySelector('.nav__link--story');
var factsHeaderLink = document.querySelector('.nav__link--facts');
var pricesHeaderLink = document.querySelector('.nav__link--prices');
var storyFooterLink = document.querySelector('.footer__nav-link--story');
var factsFooterLink = document.querySelector('.footer__nav-link--facts');
var pricesFooterLink = document.querySelector('.footer__nav-link--prices');
var storyBlock = document.querySelector('.story');
var factsBlock = document.querySelector('.facts');
var pricesBlock = document.querySelector('.prices');

var toStoryScroll = function toStoryScroll(evt) {
  evt.preventDefault();
  storyBlock.scrollIntoView({
    block: "start",
    behavior: "smooth"
  });
};

var toFactsScroll = function toFactsScroll(evt) {
  evt.preventDefault();
  factsBlock.scrollIntoView({
    block: "start",
    behavior: "smooth"
  });
};

var toPricesScroll = function toPricesScroll(evt) {
  evt.preventDefault();
  pricesBlock.scrollIntoView({
    block: "start",
    behavior: "smooth"
  });
};

storyHeaderLink.addEventListener('click', toStoryScroll);
factsHeaderLink.addEventListener('click', toFactsScroll);
pricesHeaderLink.addEventListener('click', toPricesScroll);
storyFooterLink.addEventListener('click', toStoryScroll);
factsFooterLink.addEventListener('click', toFactsScroll);
pricesFooterLink.addEventListener('click', toPricesScroll); // ---------------------------------------------------------------
// функция для проверки возможности использования webp-изображений фоном

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
}); // ---------------------------------------------------------------

if (document.documentElement.clientWidth > 1200) {
  // const heroStoryTL = gsap.timeline();
  // heroStoryTL.to('.header__logo-music-toggle-wrapper', {y: -95, duration: 2});
  // heroStoryTL.to('.social', {y: -200, duration: 2}, '-=2');
  // heroStoryTL.to('.hero__slogan', {x: -200, opacity: 0, duration: 2}, '-=2');
  // heroStoryTL.to('.hero__hashtag', {x: 200, opacity: 0, duration: 2}, '-=2');
  // heroStoryTL.to('.utterance', {opacity: 0, duration: 1}, '-=2');
  // ScrollTrigger.create({
  //     animation: heroStoryTL,
  //     trigger: '.hero',
  //     start: 'top top',
  // });
  var storyTL = gsap.timeline();
  storyTL.from('.story__title-autor-wrapper', {
    y: 100,
    opacity: 0,
    duration: 2
  });
  storyTL.from('.story__text-wrapper', {
    y: 100,
    opacity: 0,
    duration: 2
  }, '-=1.5');
  ScrollTrigger.create({
    animation: storyTL,
    trigger: '.hero',
    start: '70%'
  });
  var featuresTopTL = gsap.timeline();
  featuresTopTL.from('.features__figure-item-wrapper', {
    y: 100,
    opacity: 0,
    duration: 1
  }); // featuresTopTL.from('.story__text-wrapper', {y: 100, opacity: 0, duration: 1.5}, '-=1');

  ScrollTrigger.create({
    animation: featuresTopTL,
    trigger: '.story',
    start: '60%'
  });
  var featuresBottomTL = gsap.timeline();
  featuresBottomTL.from('.features__item-slogan--commitment', {
    y: 100,
    opacity: 0,
    duration: 1
  });
  featuresBottomTL.from('.features__item-text--commitment', {
    y: 100,
    opacity: 0,
    duration: 1.5
  }, '-=1');
  featuresBottomTL.from('.features__call', {
    y: 100,
    opacity: 0,
    duration: 1.5
  }, '-=1');
  ScrollTrigger.create({
    animation: featuresBottomTL,
    trigger: '.features__img',
    start: '50%'
  });
  var factsTL = gsap.timeline();
  factsTL.from('.facts__title', {
    y: 100,
    opacity: 0,
    duration: 1
  });
  factsTL.from('.facts__list-wrapper', {
    y: 100,
    opacity: 0,
    duration: 1.5
  }, '-=1');
  ScrollTrigger.create({
    animation: factsTL,
    trigger: '.features',
    start: '75%'
  });
  var pricesTL = gsap.timeline();
  pricesTL.from('.prices__title', {
    y: 100,
    opacity: 0,
    duration: 1
  });
  pricesTL.from('.prices__offer', {
    y: 100,
    opacity: 0,
    duration: 1.5
  }, '-=1');
  pricesTL.from('.prices__list', {
    y: 100,
    opacity: 0,
    duration: 1.5
  }, '-=1');
  ScrollTrigger.create({
    animation: pricesTL,
    trigger: '.features',
    start: '90%'
  });
  var footerTopTL = gsap.timeline();
  footerTopTL.from('.footer__nav', {
    x: -100,
    opacity: 0,
    duration: 1
  });
  footerTopTL.from('.footer__social', {
    x: 100,
    opacity: 0,
    duration: 1.5
  }, '-=1');
  ScrollTrigger.create({
    animation: footerTopTL,
    trigger: '.facts',
    start: '60%'
  });
  var footerBottomTL = gsap.timeline();
  footerBottomTL.from('.footer__call', {
    y: 100,
    opacity: 0,
    duration: 1
  });
  footerBottomTL.from('.footer__say-hello', {
    y: 100,
    opacity: 0,
    duration: 1.5
  }, '-=1');
  ScrollTrigger.create({
    animation: footerBottomTL,
    trigger: '.prices',
    start: '40%'
  });
}