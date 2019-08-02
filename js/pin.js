// Добавление пинов

'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinsContainer = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var filterForm = document.querySelector('.map__filters');
  var filterFormType = filterForm.querySelector('#housing-type');

  function renderSingleElement(adElement) {
    var newPin = pinTemplate.cloneNode(true);
    newPin.style.left = adElement.location.x + 'px';
    newPin.style.top = adElement.location.y + 'px';
    newPin.querySelector('img').src = adElement.author.avatar;
    newPin.querySelector('img').alt = adElement.offer.type;
    return newPin;
  }

  function drawElements(adsElements) {
    if (adsElements.length > 8) {
      var cutAdsElements = adsElements.slice(0, 8);
    } else {
      cutAdsElements = adsElements;
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cutAdsElements.length; i++) {
      fragment.appendChild(renderSingleElement(cutAdsElements[i]));
    }
    pinsContainer.appendChild(fragment);
  }

  function updatePin(pins) {
    if (filterFormType.value === 'any') {
      var sameTypePins = pins;
    } else {
      sameTypePins = pins.filter(function (it) {
        return it.offer.type === filterFormType.value;
      }).slice(0, 5);
    }
    return sameTypePins;
  }

  window.pin = {
    render: drawElements,
    update: updatePin
  };
})();
