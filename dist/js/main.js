'use strict';

var form = document.querySelector('.form');
var popupLinks = document.querySelectorAll('.popup-link');
var formCloseBtn = form.querySelector('.form__close');

function showPopup() {
  form.classList.remove('form--hidden');
}

function closePopup() {
  form.classList.add('form--hidden');
}

popupLinks.forEach(function (link) {
  link.addEventListener('click', showPopup);
});
formCloseBtn.addEventListener('click', closePopup); // ---------------------------------------------------------------
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
// const heroStoryTL = gsap.timeline();
// heroStoryTL.to('.header__logo-music-toggle-wrapper', {y: -95, duration: 2});
// heroStoryTL.to('.social', {y: -200, duration: 2}, '-=2');
// heroStoryTL.to('.hero__slogan', {x: -200, opacity: 0, duration: 2}, '-=2');
// heroStoryTL.to('.hero__hashtag', {x: 200, opacity: 0, duration: 2}, '-=2');
// heroStoryTL.to('.utterance', {opacity: 0, duration: 1}, '-=2');
// ScrollTrigger.create({
//     animation: heroStoryTL,
//     trigger: '.hero',
//     start: '60%',
//     end: '100%',
//     scrub: true,
//     pin: true
// });
// const storyTL = gsap.timeline();
// storyTL.from('.story__title-autor-wrapper', {y: 100, opacity: 0, duration: 1});
// storyTL.from('.story__text-wrapper', {y: 100, opacity: 0, duration: 1.5}, '-=1');
// ScrollTrigger.create({
//     animation: storyTL,
//     trigger: '.hero',
//     start: '50%',
//     end: '100%',
//     scrub: true,
//     pin: true
// });
// const featuresTL = gsap.timeline();
// featuresTL.from('.features__figure-item-wrapper', {y: 100, opacity: 0, duration: 1});
// // featuresTL.from('.story__text-wrapper', {y: 100, opacity: 0, duration: 1.5}, '-=1');
// ScrollTrigger.create({
//     animation: featuresTL,
//     trigger: '.story',
//     start: '70%',
//     end: '100%',
//     scrub: true,
//     pin: true
// });