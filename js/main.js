'use strict';

var ads = [];
var pin = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pins');
var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.getElementsByTagName('FIELDSET');
var mapFilterFieldset = document.querySelector('.map__filters').querySelector('.map__features');
var mapFilterSelects = document.querySelector('.map__filters').getElementsByTagName('SELECT');
var xMainPin = pin.offsetLeft + pin.clientWidth / 2;
var yMainPin = pin.offsetTop + pin.clientHeight / 2;
var address = document.getElementById('address');

function randomInteger(min, max) {
  var random = Math.floor(Math.random() * (+max - +min)) + +min;
  return random;
}

function generateData(ads) {
  for (var i = 0; i < 8; i++) {
    ads[i] = {
      author: 0,
      offer: 0,
      location: 0
    }
    ads[i].author = {
      number: "img/avatars/user0" + (i + 1) + ".png"
    };
    ads[i].offer = {
      type: getType()
    };
    ads[i].location = {
      x: getX(),
      y: randomInteger(130, 631)
    };
  };
};

function getX() {
  var min = mapPin.offsetLeft;
  var max = mapPin.offsetLeft + mapPin.clientWidth - pin.clientWidth;
  return randomInteger(min, max);
};

function getType() {
  var x = randomInteger(1, 5);
  switch (x) {
    case 1:
      return "palace"
      break;
    case 2:
      return "flat"
      break;
    case 3:
      return "house"
      break;
    case 4:
      return "bungalo"
      break;
    default:
      "bungalo";
  }
};

function createDOM(ad) {
  var newPin = pinTemplate.cloneNode(true);
  newPin.style.left = ad.location.x + 'px';
  newPin.style.top = ad.location.y + 'px';
  newPin.firstChild.src = ad.author.number;
  newPin.firstChild.alt = ad.offer.type;
  return newPin;
};

var fragment = document.createDocumentFragment();

function drawElement(fragment) {
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createDOM(ads[i]));
  };
  mapPin.appendChild(fragment);
};

function onPinClick() {
  map.classList.remove('map--faded');
  generateData(ads);
  drawElement(fragment);
  adForm.classList.remove('ad-form--disabled');
  mapFilterFieldset.removeAttribute('disabled');
  for (var i = 0; i < mapFilterSelects.length; i++) {
    mapFilterSelects[i].removeAttribute('disabled');
  };
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].removeAttribute('disabled');
  };
  pin.removeEventListener('mouseup', onPinClick);
};

pin.addEventListener('mousedown', function (evt) {
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
    if (pin.offsetTop - shift.y < 0) {
      pin.style.top = 0 + 'px';
    } else if (pin.offsetTop - shift.y > mapPin.clientHeight) {
      pin.style.top = (mapPin.clientHeight - pin.clientHeight / 2) + 'px';
    } else {
      pin.style.top = (pin.offsetTop - shift.y) + 'px';
    };
    if (pin.offsetLeft - shift.x < 0) {
      pin.style.left = 0 + 'px';
    } else if (pin.offsetLeft - shift.x > mapPin.clientWidth) {
      pin.style.left = (mapPin.clientWidth - pin.clientWidth) + 'px';
    } else {
      pin.style.left = (pin.offsetLeft - shift.x) + 'px';
    };
  };

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    getPinCoordinates();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

function getPinCoordinates() {
  var x = pin.offsetLeft + pin.clientWidth / 2;
  var y = pin.offsetTop + pin.clientHeight;
  address.value = x + ', ' + y;
};

mapFilterFieldset.setAttribute('disabled', 'disabled');

for (var i = 0; i < mapFilterSelects.length; i++) {
  mapFilterSelects[i].setAttribute('disabled', 'disabled');
};

for (var i = 0; i < adFormFieldsets.length; i++) {
  adFormFieldsets[i].setAttribute('disabled', 'disabled');
};

address.value = xMainPin + ', ' + yMainPin;

pin.addEventListener('mouseup', onPinClick);
