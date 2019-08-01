// Добавление пинов

'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderSingleElement(adElement) {
    var newPin = pinTemplate.cloneNode(true);
    newPin.style.left = adElement.location.x + 'px';
    newPin.style.top = adElement.location.y + 'px';
    newPin.firstChild.src = adElement.author.avatar;
    newPin.firstChild.alt = adElement.offer.type;
    return newPin;
  }

  function drawElements(adsElements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adsElements.length; i++) {
      fragment.appendChild(renderSingleElement(adsElements[i]));
    }
    pinsContainer.appendChild(fragment);
  }

  window.pin = drawElements;
})();
