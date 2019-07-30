'use strict';

var map = document.querySelector('.map');
var ads = [];
var mainPin = document.querySelector('.map__pin--main');
var xMainPin = mainPin.offsetLeft + mainPin.clientWidth / 2;
var yMainPin = mainPin.offsetTop + mainPin.clientHeight / 2;
var pinsContainer = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var MAIN_PIN_MIN_X = 0;
var MAIN_PIN_MAX_X = pinsContainer.offsetLeft + pinsContainer.clientWidth - mainPin.clientWidth;
var MAIN_PIN_MIN_Y = 0;
var MAIN_PIN_MAX_Y = pinsContainer.offsetTop + pinsContainer.clientHeight - mainPin.clientHeight;

var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var adFormTimeIn = document.querySelector('#timein');
var adFormTimeOut = document.querySelector('#timeout');
var adFormAddress = document.querySelector('#address');
var adFormPrice = document.querySelector('#price');
var adFormType = document.querySelector('#type');

var filterForm = document.querySelector('.map__filters');
var mapFilterFieldset = filterForm.querySelector('.map__features');
var mapFilterSelects = filterForm.querySelectorAll('select');

function randomInteger(min, max) {
  var random = Math.floor(Math.random() * (+max - +min)) + +min;
  return random;
}

function generateData(adsData) {
  for (var i = 0; i < 8; i++) {
    adsData[i] = {
      author: 0,
      offer: 0,
      location: 0
    };
    adsData[i].author = {
      number: 'img/avatars/user0' + (i + 1) + '.png'
    };
    adsData[i].offer = {
      type: getType()
    };
    adsData[i].location = {
      x: getX(),
      y: randomInteger(130, 631)
    };
  }
}

function getX() {
  var min = pinsContainer.offsetLeft;
  var max = pinsContainer.offsetLeft + pinsContainer.clientWidth - mainPin.clientWidth;
  return randomInteger(min, max);
}

function getType() {
  var x = randomInteger(1, 5);
  switch (x) {
    case 1:
      x = 'palace';
      break;
    case 2:
      x = 'flat';
      break;
    case 3:
      x = 'house';
      break;
    case 4:
      x = 'bungalo';
      break;
    default:
      x = 'bungalo';
      break;
  }
  return x;
}

function drawElements(adsElements) {
  for (var i = 0; i < adsElements.length; i++) {
    var newPin = pinTemplate.cloneNode(true);
    newPin.style.left = adsElements[i].location.x + 'px';
    newPin.style.top = adsElements[i].location.y + 'px';
    newPin.firstChild.src = adsElements[i].author.number;
    newPin.firstChild.alt = adsElements[i].offer.type;
    fragment.appendChild(newPin);
  }
  pinsContainer.appendChild(fragment);
}

function preparePage() {
  map.classList.remove('map--faded');
  generateData(ads);
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
    if (coordY < MAIN_PIN_MIN_Y) {
      mainPin.style.top = MAIN_PIN_MIN_Y + 'px';
    } else if (coordY > MAIN_PIN_MAX_Y) {
      mainPin.style.top = MAIN_PIN_MAX_Y + 'px';
    } else {
      mainPin.style.top = coordY + 'px';
    }
    if (coordX < MAIN_PIN_MIN_X) {
      mainPin.style.left = MAIN_PIN_MIN_X + 'px';
    } else if (coordX > MAIN_PIN_MAX_X) {
      mainPin.style.left = MAIN_PIN_MAX_X + 'px';
    } else {
      mainPin.style.left = coordX + 'px';
    }
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
  var selectValue = adFormType.value;
  var min = 5000;
  switch (selectValue) {
    case 'bungalo':
      min = 0;
      break;
    case 'flat':
      min = 1000;
      break;
    case 'house':
      min = 5000;
      break;
    case 'palace':
      min = 10000;
      break;
    default:
      min = 5000;
  }
  adFormPrice.setAttribute('min', min);
  adFormPrice.setAttribute('placeholder', min);
}

adFormType.addEventListener('change', onTypeSelectChange);

adFormTimeIn.addEventListener('click', function () {
  switch (adFormTimeIn.options.selectedIndex) {
    case 0:
      adFormTimeOut.options.selectedIndex = 0;
      break;
    case 1:
      adFormTimeOut.options.selectedIndex = 1;
      break;
    case 2:
      adFormTimeOut.options.selectedIndex = 2;
      break;
    default:
      adFormTimeOut.options.selectedIndex = 0;
  }
});

adFormTimeOut.addEventListener('click', function () {
  switch (adFormTimeOut.options.selectedIndex) {
    case 0:
      adFormTimeIn.options.selectedIndex = 0;
      break;
    case 1:
      adFormTimeIn.options.selectedIndex = 1;
      break;
    case 2:
      adFormTimeIn.options.selectedIndex = 2;
      break;
    default:
      adFormTimeIn.options.selectedIndex = 0;
  }
});
