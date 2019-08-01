// Все взаимодействия с формой фильтрации и формой объявления

'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  var filterForm = document.querySelector('.map__filters');
  var mapFilterFieldset = filterForm.querySelector('.map__features');
  var mapFilterSelects = filterForm.querySelectorAll('select');

  window.formActivateAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].removeAttribute('disabled');
    }
  };

  window.formActivateFilterForm = function () {
    mapFilterFieldset.removeAttribute('disabled');
    for (var i = 0; i < mapFilterSelects.length; i++) {
      mapFilterSelects[i].removeAttribute('disabled');
    }
  };

  window.formDeactivateAdForm = function () {
    adForm.classList.add('ad-form--disabled');
    for (var j = 0; j < adFormFieldsets.length; j++) {
      adFormFieldsets[j].setAttribute('disabled', 'disabled');
    }
  };

  window.formDeactivateFilterForm = function () {
    mapFilterFieldset.setAttribute('disabled', 'disabled');
    for (var i = 0; i < mapFilterSelects.length; i++) {
      mapFilterSelects[i].setAttribute('disabled', 'disabled');
    }
  };

})();
