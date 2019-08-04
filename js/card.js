'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var popupPhotos = cardTemplate.querySelector('.popup__photos');
  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var typesMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  function renderCard(adElement) {
    var newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.popup__avatar').src = adElement.author.avatar;
    newCard.querySelector('.popup__title').textContent = adElement.offer.title;
    newCard.querySelector('.popup__text--address').textContent = adElement.offer.address;
    newCard.querySelector('.popup__text--price').textContent = adElement.offer.price + ' ₽/ночь';
    newCard.querySelector('.popup__type').textContent = typesMap[adElement.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = adElement.offer.rooms + ' комнаты для ' + adElement.offer.guests;
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + adElement.offer.checkin + ', выезд до ' + adElement.offer.checkout;

    // В список .popup__features выведите все доступные удобства в объявлении.

    // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.

    adElement.offer.photos.forEach(function (item) {
      var newPhoto = document.createElement('IMG');
      newPhoto.classList.add('popup__photo');
      newPhoto.width = 45;
      newPhoto.height = 40;
      newPhoto.alt = 'Фотография жилья';
      newPhoto.src = item;
      popupPhotos.appendChild(newPhoto);
    });

    var fragment = document.createDocumentFragment();
    fragment.appendChild(newCard);
    map.insertBefore(fragment, filtersContainer);


    // добавить обработчики событий на esc и click по экрану
    var popupCloseButton = document.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', onPopupCloseClick);
  }

  function onPopupCloseClick() {
    var curCard = document.querySelector('.map__card');
    var curPhotos = Array.from(document.querySelectorAll('.popup__photo'));
    curPhotos.forEach(function (item) {
      item.remove();
    });
    curCard.remove();
  }

  window.card = {
    render: renderCard
  };
})();
