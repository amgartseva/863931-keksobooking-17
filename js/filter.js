// Форма фильтрации

'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var mapFilterFieldset = filterForm.querySelector('.map__features');
  var mapFilterSelects = filterForm.querySelectorAll('select');

  function activateFilterForm() {
    mapFilterFieldset.removeAttribute('disabled');
    window.util.activateElements(mapFilterSelects);
  }

  function deactivateFilterForm() {
    mapFilterFieldset.setAttribute('disabled', 'disabled');
    window.util.deactivateElements(mapFilterSelects);
  }

  window.filter = {
    activate: activateFilterForm,
    deactivate: deactivateFilterForm
  };
})();
