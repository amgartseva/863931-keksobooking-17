'use strict';

(function () {
  window.utilRandomInteger = function (min, max) {
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    return random;
  };
})();
