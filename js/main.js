'use strict';

var ads = [];
var pin = document.querySelector('.map__pin');
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pins');
var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

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
  console.log(ads[2]);
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

generateData(ads);

map.classList.remove('map--faded');

function createDOM(ad) {
  var newPin = pinTemplate.cloneNode(true);
  newPin.style.left = ad.location.x + 'px';
  newPin.style.top = ad.location.y + 'px';
  newPin.firstChild.src = ad.author.number;
  newPin.firstChild.alt = ad.offer.type;
  return newPin;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(createDOM(ads[i]));
};

mapPin.appendChild(fragment);
