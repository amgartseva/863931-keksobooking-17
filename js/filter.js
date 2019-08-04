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
  var savedAds = [];

  function activateFilterForm() {
    mapFilterFieldset.removeAttribute('disabled');
    window.util.activateElements(mapFilterSelects);
  }

  function deactivateFilterForm() {
    mapFilterFieldset.setAttribute('disabled', 'disabled');
    window.util.deactivateElements(mapFilterSelects);
  }

  function getFilterAds() {
    var filterObj = getFilterObj();
    var result = savedAds.filter(function (item) {
      return (item.offer.type === filterObj.type || filterObj.type === 'any');
    });
    return result;
  }

  function getFilterObj() {
    return {
      price: filterFormPrice.value,
      type: filterFormType.value,
      rooms: filterFormRooms.value,
      guests: filterFormGuests.value,
      features: []
    };
  }

  function initPins(ads) {
    savedAds = ads;
    window.pin.render(window.filter.getFilterAds());
    filterForm.addEventListener('change', function () {
      window.pin.render(window.filter.getFilterAds());
    });
  }

  window.filter = {
    activate: activateFilterForm,
    deactivate: deactivateFilterForm,
    getFilterAds: getFilterAds,
    init: initPins
  };
})();
