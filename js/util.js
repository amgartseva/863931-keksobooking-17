'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  var mainPage = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  function randomInteger(min, max) {
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random;
  }

  function activateElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  }

  function deactivateElements(elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  }

  function onLoadError() {
    var error = errorTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(error);
    mainPage.appendChild(fragment);
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', onErrorClick);
    error.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onEscErrorClick);
  }

  function closeErrorMessage() {
    var errorMessage = document.querySelector('.error');
    errorMessage.remove();
  }

  function onEscErrorClick(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeErrorMessage();
      evt.currentTarget.removeEventListener('keydown', onEscErrorClick);
    }
  }

  function onErrorClick(evt) {
    evt.currentTarget.remove();
    evt.currentTarget.removeEventListener('click', onErrorClick);
  }

  function debounce(func) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(func, DEBOUNCE_INTERVAL);
  }

  window.util = {
    randomInteger: randomInteger,
    activateElements: activateElements,
    deactivateElements: deactivateElements,
    loadError: onLoadError,
    debounce: debounce
  };
})();
