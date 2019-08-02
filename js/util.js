'use strict';

(function () {
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

  window.util = {
    randomInteger: randomInteger,
    activateElements: activateElements,
    deactivateElements: deactivateElements
  };
})();
