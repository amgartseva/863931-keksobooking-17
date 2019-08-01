// Взаимодействия с картой

'use strict';

(function () {
  var PINS_COUNT = 8;

  var isPageActivated = false;
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var pinsContainer = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
  var xMainPin = mainPin.offsetLeft;
  var yMainPin = mainPin.offsetTop;
  var minXMainPin = 0;
  var maxXMainPin = pinsContainer.offsetLeft + pinsContainer.clientWidth - mainPin.clientWidth;
  var minYMainPin = 130;
  var maxYMainPin = 630;

  function getType() {
    return types[window.util(0, types.length)];
  }

  function generateData() {
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
          x: window.util(0, pinsContainer.clientWidth),
          y: window.util(minYMainPin, maxYMainPin)
        }
      });
    }
    return result;
  }

  function preparePage() {
    map.classList.remove('map--faded');
    var ads = generateData();
    window.pin(ads);
  }

  function clearMap() {
    var curPins = pinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    curPins.forEach(function (item) {
      item.remove();
    });
  }

  function activatePage() {
    isPageActivated = true;
    preparePage();
    window.form.activate();
    window.filter.activate();
    adFormResetButton.addEventListener('click', onResetClick);
  }

  function deactivatePage() {
    isPageActivated = false;
    map.classList.add('map--faded');
    clearMap();
    window.form.deactivate();
    window.filter.deactivate();
    adFormAddress.value = xMainPin + ', ' + yMainPin;
  }

  function onResetClick() {
    deactivatePage();
    mainPin.style.left = xMainPin + 'px';
    mainPin.style.top = yMainPin + 'px';
  }

  deactivatePage();

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var coordX = mainPin.offsetLeft - shift.x;
      var coordY = mainPin.offsetTop - shift.y;
      if (coordX < minXMainPin) {
        coordX = minXMainPin;
      }
      if (coordX > maxXMainPin) {
        coordX = maxXMainPin;
      }
      if (coordY < minYMainPin) {
        coordY = minYMainPin;
      }
      if (coordY > maxYMainPin) {
        coordY = maxYMainPin;
      }
      mainPin.style.left = coordX + 'px';
      mainPin.style.top = coordY + 'px';
      adFormAddress.value = coordX + ', ' + coordY;
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      if (!isPageActivated) {
        activatePage();
      }
      var shift = {
        x: startCoords.x - upEvt.clientX,
        y: startCoords.y - upEvt.clientY
      };
      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };
      var coordX = mainPin.offsetLeft - shift.x;
      var coordY = mainPin.offsetTop - shift.y;
      adFormAddress.value = coordX + ', ' + coordY;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
