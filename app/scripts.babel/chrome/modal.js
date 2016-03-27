'use strict';

const modal = {};

let cachedDom = {};

const modalId = "kb-book-modal";
const hlId = "kb-highlights-container";
let modalActive = false;

let appendHighLights = (highlights) => {
  cachedDom[hlId].innerHTML = "";
  _.map(highlights, (h) => {
    cachedDom[hlId].appendChild(h);
  });
};

let createElement = (type, id, className = id) => {
  let element = document.createElement(type);
  element.id = id;
  element.className = className;
  cachedDom[id] = element;
  return element;
};

modal.toggleModal = (event, highlights) => {
  if (modalActive) {
    $(`#${modalId}`).removeClass('show');
  }
  else {
    appendHighLights(highlights);
    $(`#${modalId}`).addClass('show');
  }
  //console.log("test test ", highlights);
  modalActive = !modalActive;
};

modal.addModal = () => {
  let modalContainer = createElement("div", modalId);
  let closeButton = createElement("button", "kb-close-modal");
  let highlightsContainer = createElement("div", hlId);
  closeButton.innerHTML = "Close";
  closeButton.addEventListener('click', (event) => modal.toggleModal(event, null), false);
  modalContainer.insertBefore(closeButton, modal.firstChild);
  modalContainer.appendChild(highlightsContainer);
  document.body.insertBefore(modalContainer, document.body.firstChild);
};



module.exports = modal;
