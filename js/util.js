'use strict';

(function () {
  function randomInteger(min, max) {
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random;
  }

  window.util = randomInteger;
})();
