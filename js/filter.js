// Форма фильтрации

'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var mapFilterFieldset = filterForm.querySelector('.map__features');
  var mapFilterSelects = filterForm.querySelectorAll('select');
  var filterFormType = filterForm.querySelector('#housing-type');
  var filterFormPrice = filterForm.querySelector('#housing-price');
  var filterFormRooms = filterForm.querySelector('#housing-rooms');
  var filterFormGuests = filterForm.querySelector('#housing-guests');

  function activateFilterForm() {
    mapFilterFieldset.removeAttribute('disabled');
    window.util.activateElements(mapFilterSelects);
  }

  function deactivateFilterForm() {
    mapFilterFieldset.setAttribute('disabled', 'disabled');
    window.util.deactivateElements(mapFilterSelects);
  }

  function updatePin(savedAds) {
    window.map.clear();
    var filterObj = getFilterObj();
    var result = savedAds.filter(function (item) {
      return (item.offer.type === filterObj.offer.type || filterObj.offer.type === 'any');
    });
    return result;
  }

  function getFilterObj() {
    var filterObj = {
      offer: {
        ptice: filterFormPrice.value,
        type: filterFormType.value,
        rooms: filterFormRooms.value,
        guests: filterFormGuests.value,
        features: []
      }
    };
    return filterObj;
  }

  function initPins(ads) {
    var savedAds = ads;
    window.pin.render(savedAds);
    filterForm.addEventListener('change', function () {
      window.pin.render(window.filter.update(savedAds));
    });
  }

  window.filter = {
    activate: activateFilterForm,
    deactivate: deactivateFilterForm,
    update: updatePin,
    init: initPins
  };
})();
