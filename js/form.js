// Форма объявления

'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormPrice = adForm.querySelector('#price');
  var adFormType = adForm.querySelector('#type');

  function activateAdForm() {
    adForm.classList.remove('ad-form--disabled');
    window.util.activateElements(adFormFieldsets);
  }

  function deactivateAdForm() {
    adForm.classList.add('ad-form--disabled');
    window.util.deactivateElements(adFormFieldsets);
  }

  function onTypeSelectChange() {
    var min = 1000;
    switch (adFormType.value) {
      case 'bungalo':
        min = 0;
        break;
      case 'house':
        min = 5000;
        break;
      case 'palace':
        min = 10000;
        break;
    }
    adFormPrice.setAttribute('min', min);
    adFormPrice.setAttribute('placeholder', min);
  }

  adFormType.addEventListener('change', onTypeSelectChange);

  adFormTimeIn.addEventListener('change', function () {
    adFormTimeOut.value = adFormTimeIn.value;
  });

  adFormTimeOut.addEventListener('change', function () {
    adFormTimeIn.value = adFormTimeOut.value;
  });

  window.form = {
    activate: activateAdForm,
    deactivate: deactivateAdForm
  };
})();
