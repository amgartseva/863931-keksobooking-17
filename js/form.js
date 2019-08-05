// Форма объявления

'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormPrice = adForm.querySelector('#price');
  var adFormType = adForm.querySelector('#type');
  var adFormRooms = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');

  var adFormCapacityOne = document.createElement('option');
  var adFormCapacityTwo = document.createElement('option');
  var adFormCapacityThree = document.createElement('option');
  var adFormCapacityZero = document.createElement('option');

  adFormCapacityOne.textContent = 'для 1 гостя';
  adFormCapacityOne.value = '1';
  adFormCapacityOne.id = 'capacity-one';
  adFormCapacityTwo.textContent = 'для 2 гостей';
  adFormCapacityTwo.value = '2';
  adFormCapacityTwo.id = 'capacity-two';
  adFormCapacityThree.textContent = 'для 3 гостей';
  adFormCapacityThree.value = '3';
  adFormCapacityThree.id = 'capacity-three';
  adFormCapacityZero.textContent = 'не для гостей';
  adFormCapacityZero.value = '0';
  adFormCapacityZero.id = 'capacity-zero';

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

  function onRoomSelectChange() {
    if (adFormCapacity.querySelector('#capacity-one') === null) {
      adFormCapacity.prepend(adFormCapacityOne);
    }
    if (adFormCapacity.querySelector('#capacity-two') === null) {
      adFormCapacity.appendChild(adFormCapacityTwo);
    }
    if (adFormCapacity.querySelector('#capacity-three') === null) {
      adFormCapacity.appendChild(adFormCapacityThree);
    }
    if (adFormCapacity.querySelector('#capacity-zero') === null) {
      adFormCapacity.appendChild(adFormCapacityZero);
    }
    switch (adFormRooms.value) {
      case '1':
        adFormCapacity.querySelector('#capacity-one').setAttribute('selected', 'selected');
        adFormCapacity.querySelector('#capacity-two').remove();
        adFormCapacity.querySelector('#capacity-three').remove();
        adFormCapacity.querySelector('#capacity-zero').remove();
        break;
      case '2':
        adFormCapacity.querySelector('#capacity-one').setAttribute('selected', 'selected');
        adFormCapacity.querySelector('#capacity-three').remove();
        adFormCapacity.querySelector('#capacity-zero').remove();
        break;
      case '3':
        adFormCapacity.querySelector('#capacity-one').setAttribute('selected', 'selected');
        adFormCapacity.querySelector('#capacity-zero').remove();
        break;
      case '100':
        adFormCapacity.querySelector('#capacity-zero').setAttribute('selected', 'selected');
        adFormCapacity.querySelector('#capacity-one').remove();
        adFormCapacity.querySelector('#capacity-two').remove();
        adFormCapacity.querySelector('#capacity-three').remove();
        break;
    }
  }

  adFormType.addEventListener('change', onTypeSelectChange);

  adFormTimeIn.addEventListener('change', function () {
    adFormTimeOut.value = adFormTimeIn.value;
  });

  adFormTimeOut.addEventListener('change', function () {
    adFormTimeIn.value = adFormTimeOut.value;
  });

  adFormRooms.addEventListener('change', onRoomSelectChange);

  window.form = {
    activate: activateAdForm,
    deactivate: deactivateAdForm
  };
})();
