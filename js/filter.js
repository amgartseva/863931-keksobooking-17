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
  var filterFormFeaturesFieldset = filterForm.querySelector('#housing-features');
  var savedAds = [];
  var curFeatures = [];
  var prices = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

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
      return ((item.offer.type === filterObj.type || filterObj.type === 'any') &&
        (filterPrice(item) || filterObj.price === 'any') &&
        (String(item.offer.rooms) === filterObj.rooms || filterObj.rooms === 'any') &&
        (String(item.offer.guests) === filterObj.guests || filterObj.guests === 'any') &&
        (filterFeatures(item) || curFeatures.length == 0));
    });

    function filterFeatures(item) {
      for (var i = 0; i < filterObj.features.length; i++) {
        if (item.offer.features.indexOf(filterObj.features[i]) === -1) {
          return false;
        }
      }
      return true;
    }

    function filterPrice(item) {
      if (filterObj.price != 'any') {
        var filterPriceMinMax = prices[filterObj.price];
        return (item.offer.price >= filterPriceMinMax.min && item.offer.price < filterPriceMinMax.max);
      }
      return false;
    }

    return result;
  }

  function getFilterObj() {
    return {
      price: filterFormPrice.value,
      type: filterFormType.value,
      rooms: filterFormRooms.value,
      guests: filterFormGuests.value,
      features: getFilterObjFeatures()
    };
  }

  function getFilterObjFeatures() {
    var allFeatures = Array.from(filterFormFeaturesFieldset.querySelectorAll('input'));
    allFeatures.forEach(function (item) {
      if (item.checked) {
        curFeatures.push(item.value);
      }
    });
    return curFeatures;
  }

  function initPins(ads) {
    savedAds = ads;
    window.pin.render(window.filter.getFilterAds());
    filterForm.addEventListener('change', function () {
      window.card.close();
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
