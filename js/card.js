'use strict';

(function () {
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

  function createNewFeature(adElement) {
    var featuresFragment = document.createDocumentFragment();
    adElement.offer.features.forEach(function (item) {
      var popupOneFeature = document.createElement('LI');
      popupOneFeature.className = 'popup__feature popup__feature--' + item;
      featuresFragment.appendChild(popupOneFeature);
    });
    return featuresFragment;
  }

  function createNewPhoto(adElement) {
    var photosFragment = document.createDocumentFragment();
    adElement.offer.photos.forEach(function (item) {
      var popupOnePhoto = popupPhoto.cloneNode(true);
      popupOnePhoto.src = item;
      photosFragment.appendChild(popupOnePhoto);
    });
    return photosFragment;
  }

  function renderCard(adElement) {
    var newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.popup__avatar').src = adElement.author.avatar;
    newCard.querySelector('.popup__title').textContent = adElement.offer.title;
    newCard.querySelector('.popup__text--address').textContent = adElement.offer.address;
    newCard.querySelector('.popup__text--price').textContent = adElement.offer.price + ' ₽/ночь';
    newCard.querySelector('.popup__type').textContent = typesMap[adElement.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = adElement.offer.rooms + ' комнаты для ' + adElement.offer.guests;
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adElement.offer.checkin + ', выезд до ' + adElement.offer.checkout;
    var curFeatures = Array.from(newCard.querySelector('.popup__features').querySelectorAll('.popup__feature'));
    curFeatures.forEach(function (it) {
      it.remove();
    });
    newCard.querySelector('.popup__features').appendChild(createNewFeature(adElement));
    newCard.querySelector('.popup__photos').removeChild(newCard.querySelector('.popup__photos').querySelector('.popup__photo'));
    newCard.querySelector('.popup__photos').appendChild(createNewPhoto(adElement));

    var fragment = document.createDocumentFragment();
    fragment.appendChild(newCard);
    map.insertBefore(fragment, filtersContainer);


    // добавить обработчики событий на esc
    var popupCloseButton = document.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', onPopupCloseClick);
  }

  function onPopupCloseClick() {
    var curCard = document.querySelector('.map__card');
    curCard.remove();
  }

  window.card = {
    render: renderCard
  };
})();
