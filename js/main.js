'use strict';

var PINS_COUNT = 8;

var isPageActivated = false;
var map = document.querySelector('.map');
var ads = [];
var mainPin = document.querySelector('.map__pin--main');
var pinsContainer = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var types = ['palace', 'flat', 'house', 'bungalo'];

var xMainPin = mainPin.offsetLeft;
var yMainPin = mainPin.offsetTop;
var minXMainPin = 0;
var maxXMainPin = pinsContainer.offsetLeft + pinsContainer.clientWidth - mainPin.clientWidth;
var minYMainPin = 130;
var maxYMainPin = 630;

var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var adFormTimeIn = adForm.querySelector('#timein');
var adFormTimeOut = adForm.querySelector('#timeout');
var adFormAddress = adForm.querySelector('#address');
var adFormPrice = adForm.querySelector('#price');
var adFormType = adForm.querySelector('#type');
var adFormResetButton = adForm.querySelector('.ad-form__reset');

var filterForm = document.querySelector('.map__filters');
var mapFilterFieldset = filterForm.querySelector('.map__features');
var mapFilterSelects = filterForm.querySelectorAll('select');

function randomInteger(min, max) {
  var random = Math.floor(Math.random() * (+max - +min)) + +min;
  return random;
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
        x: randomInteger(0, pinsContainer.clientWidth),
        y: randomInteger(minYMainPin, maxYMainPin)
      }
    });
  }
  return result;
}

function getType() {
  return types[randomInteger(0, types.length)];
}

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

function preparePage() {
  map.classList.remove('map--faded');
  ads = generateData();
  drawElements(ads);
}

function activateAdForm() {
  adForm.classList.remove('ad-form--disabled');
  for (var j = 0; j < adFormFieldsets.length; j++) {
    adFormFieldsets[j].removeAttribute('disabled');
  }
}

function activateFilterForm() {
  mapFilterFieldset.removeAttribute('disabled');
  for (var i = 0; i < mapFilterSelects.length; i++) {
    mapFilterSelects[i].removeAttribute('disabled');
  }
}

function clearMap() {
  // должны удаляться пины c карты
}

function deactivatePage() {
  map.classList.add('map--faded');
  mapFilterFieldset.setAttribute('disabled', 'disabled');
  for (var i = 0; i < mapFilterSelects.length; i++) {
    mapFilterSelects[i].setAttribute('disabled', 'disabled');
  }
  adForm.classList.add('ad-form--disabled');
  for (var j = 0; j < adFormFieldsets.length; j++) {
    adFormFieldsets[j].setAttribute('disabled', 'disabled');
  }
  adFormAddress.value = xMainPin + ', ' + yMainPin;
}

function onPinClick() {
  isPageActivated = true;
  preparePage();
  activateFilterForm();
  activateAdForm();
  adFormResetButton.addEventListener('click', onResetClick);
  mainPin.removeEventListener('mouseup', onPinClick);
}

function onResetClick() {
  isPageActivated = false;
  deactivatePage();
  clearMap();
  mainPin.style.left = xMainPin + 'px';
  mainPin.style.top = yMainPin + 'px';
}

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  if (isPageActivated === false) {
    mainPin.addEventListener('mouseup', onPinClick);
  }

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
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

deactivatePage();

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
