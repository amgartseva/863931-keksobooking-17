'use strict';

var PINS_COUNT = 8;

var map = document.querySelector('.map');
var ads = [];
var mainPin = document.querySelector('.map__pin--main');
var pinsContainer = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var types = ['palace', 'flat', 'house', 'bungalo'];

var xMainPin = mainPin.offsetLeft + mainPin.clientWidth / 2;
var yMainPin = mainPin.offsetTop + mainPin.clientHeight / 2;
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
        y: randomInteger(130, 631)
      }
    });
  }
  return result;
}

function getType() {
  return types[randomInteger(0, types.length)];
}

function drawSingleElement(adElement, singleFragment) {
  var newPin = pinTemplate.cloneNode(true);
  newPin.style.left = adElement.location.x + 'px';
  newPin.style.top = adElement.location.y + 'px';
  newPin.firstChild.src = adElement.author.avatar;
  newPin.firstChild.alt = adElement.offer.type;
  singleFragment.appendChild(newPin);
}

function drawElements(adsElements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsElements.length; i++) {
    drawSingleElement(adsElements[i], fragment);
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

function onPinClick() {
  preparePage();
  activateFilterForm();
  activateAdForm();
  mainPin.removeEventListener('mouseup', onPinClick);
}

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
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

mapFilterFieldset.setAttribute('disabled', 'disabled');

for (var i = 0; i < mapFilterSelects.length; i++) {
  mapFilterSelects[i].setAttribute('disabled', 'disabled');
}

for (var j = 0; j < adFormFieldsets.length; j++) {
  adFormFieldsets[j].setAttribute('disabled', 'disabled');
}

adFormAddress.value = xMainPin + ', ' + yMainPin;

mainPin.addEventListener('mouseup', onPinClick);

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
  switch (adFormTimeIn.value) {
    case '12:00':
      adFormTimeOut.value = '12:00';
      break;
    case '13:00':
      adFormTimeOut.value = '13:00';
      break;
    case '14:00':
      adFormTimeOut.value = '14:00';
      break;
  }
});

adFormTimeOut.addEventListener('change', function () {
  switch (adFormTimeOut.value) {
    case '12:00':
      adFormTimeIn.value = '12:00';
      break;
    case '13:00':
      adFormTimeIn.value = '13:00';
      break;
    case '14:00':
      adFormTimeIn.value = '14:00';
      break;
  }
});
