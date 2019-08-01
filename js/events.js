// Обработка событий пина

'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var minXMainPin = 0;
  var maxXMainPin = pinsContainer.offsetLeft + pinsContainer.clientWidth - mainPin.clientWidth;
  var minYMainPin = 130;
  var maxYMainPin = 630;
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormPrice = adForm.querySelector('#price');
  var adFormType = adForm.querySelector('#type');

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
      if (!window.setupIsPageActivated) {
        window.setupActivatePage();
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

  function onTypeSelectChange() {
    var min = 1000;
    switch (adFormType.value) {
      case 'bungalo':
        min = 0;
        break;
      case 'house':
        min = 5000;
        break;
      case 'palace':
        min = 10000;
        break;
    }
    adFormPrice.setAttribute('min', min);
    adFormPrice.setAttribute('placeholder', min);
  }

  adFormType.addEventListener('change', onTypeSelectChange);

  adFormTimeIn.addEventListener('change', function () {
    adFormTimeOut.value = adFormTimeIn.value;
  });

  adFormTimeOut.addEventListener('change', function () {
    adFormTimeIn.value = adFormTimeOut.value;
  });

})();
