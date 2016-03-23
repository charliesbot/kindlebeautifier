'use strict';

const modal = {};

const modalId = "kb-book-modal";
let modalActive = false;

modal.addModal = () => {
  let modal = document.createElement('div');
  modal.id = modalId;
  document.body.insertBefore(modal, document.body.firstChild);
};

modal.toggleModal = (event, id) => {
  if (modalActive) {
    $(`#${modalId}`).removeClass('show');
  }
  else {
    $(`#${modalId}`).addClass('show');
  }
  console.log("test test ", id);
  modalActive = !modalActive;
};


module.exports = modal;
