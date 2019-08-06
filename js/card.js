'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhotos = cardTemplate.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');
  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var typesMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  function createNewFeatures(adElement) {
    var featuresFragment = document.createDocumentFragment();
    adElement.offer.features.forEach(function (item) {
      var popupOneFeature = document.createElement('LI');
      popupOneFeature.className = 'popup__feature popup__feature--' + item;
      featuresFragment.appendChild(popupOneFeature);
    });
    return featuresFragment;
  }

  function createNewPhotos(adElement) {
    var photosFragment = document.createDocumentFragment();
    adElement.offer.photos.forEach(function (item) {
      var popupOnePhoto = popupPhoto.cloneNode(true);
      popupOnePhoto.src = item;
      photosFragment.appendChild(popupOnePhoto);
    });
    return photosFragment;
  }

  function renderCard(adElement) {
    window.card.close();
    var newCard = cardTemplate.cloneNode(true);

    if (adElement.author.avatar === 'img/avatars/default.png') {
      newCard.querySelector('.popup__avatar').remove();
    } else {
      newCard.querySelector('.popup__avatar').src = adElement.author.avatar;
    }

    newCard.querySelector('.popup__title').textContent = adElement.offer.title;

    newCard.querySelector('.popup__text--address').textContent = adElement.offer.address;

    newCard.querySelector('.popup__text--price').textContent = adElement.offer.price + ' ₽/ночь';

    newCard.querySelector('.popup__type').textContent = typesMap[adElement.offer.type];

    if (adElement.offer.rooms === 0 && adElement.offer.guests === 0) {
      newCard.querySelector('.popup__text--capacity').remove();
    } else {
      newCard.querySelector('.popup__text--capacity').textContent = adElement.offer.rooms + ' комнаты для ' + adElement.offer.guests;
    }

    if (adElement.offer.checkin === '0:00' && adElement.offer.checkout === '0:00') {
      newCard.querySelector('.popup__text--time').remove();
    } else {
      newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adElement.offer.checkin + ', выезд до ' + adElement.offer.checkout;
    }

    if (adElement.offer.description === null) {
      newCard.querySelector('.popup__description').remove();
    } else {
      newCard.querySelector('.popup__description').textContent = adElement.offer.description;
    }

    var curFeatures = newCard.querySelector('.popup__features');
    while (curFeatures.firstChild) {
      curFeatures.removeChild(curFeatures.firstChild);
    }
    newCard.querySelector('.popup__features').appendChild(createNewFeatures(adElement));
    newCard.querySelector('.popup__photos').removeChild(newCard.querySelector('.popup__photos').querySelector('.popup__photo'));
    newCard.querySelector('.popup__photos').appendChild(createNewPhotos(adElement));

    map.insertBefore(newCard, filtersContainer);

    var popupCloseButton = document.querySelector('.popup__close');

    popupCloseButton.addEventListener('click', onPopupCloseClick);
    document.addEventListener('keydown', onEscClick);
  }

  function closeCard() {
    var curCard = document.querySelector('.map__card');
    if (curCard !== null) {
      curCard.remove();
    }
  }

  function onPopupCloseClick() {
    closeCard();
  }

  function onEscClick(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  }

  window.card = {
    render: renderCard,
    close: closeCard
  };
})();
