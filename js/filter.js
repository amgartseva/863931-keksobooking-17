// Форма фильтрации

'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var mapFilterFieldset = filterForm.querySelector('.map__features');
  var mapFilterSelects = filterForm.querySelectorAll('select');

  function activateFilterForm() {
    mapFilterFieldset.removeAttribute('disabled');
    for (var i = 0; i < mapFilterSelects.length; i++) {
      mapFilterSelects[i].removeAttribute('disabled');
    }
  }

  function deactivateFilterForm() {
    mapFilterFieldset.setAttribute('disabled', 'disabled');
    for (var i = 0; i < mapFilterSelects.length; i++) {
      mapFilterSelects[i].setAttribute('disabled', 'disabled');
    }
  }

  window.filter = {
    activate: activateFilterForm,
    deactivate: deactivateFilterForm
  };
})();
