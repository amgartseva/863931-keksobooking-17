// Генерация данных для пинов

'use strict';

(function () {
  var PINS_COUNT = 8;

  var types = ['palace', 'flat', 'house', 'bungalo'];
  var minYMainPin = 130;
  var maxYMainPin = 630;
  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');

  function getType() {
    return types[window.utilRandomInteger(0, types.length)];
  }

  window.data = function () {
    var result = [];
    for (var i = 0; i < PINS_COUNT; i++) {
      result.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          type: getType()
        },
        location: {
          x: window.utilRandomInteger(0, pinsContainer.clientWidth),
          y: window.utilRandomInteger(minYMainPin, maxYMainPin)
        }
      });
    }
    return result;
  };
})();
