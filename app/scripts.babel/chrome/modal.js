'use strict';

const modal = {};
const modalId = "kb-book-modal";
const dialogId = "kb-dialog-container";
const hlId = "kb-highlights-container";
const detailsId = "kb-details-container";
const bookCoverId = "kb-details-book-cover";

let cachedDom = {};
let modalActive = false;

let appendHighLights = (highlights) => {
  cachedDom[bookCoverId].src = highlights.bookCover;
  cachedDom[hlId].innerHTML = "";
  _.map(highlights.selections, (h) => {
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

let createBookCoverSection = () => {
  let detailsContainer = createElement("div", detailsId);
  let bookCover = createElement("img", bookCoverId);
  detailsContainer.appendChild(bookCover);
  return detailsContainer;
};

modal.toggleModal = (event, highlights) => {
  if (modalActive) {
	$(`#${modalId}`).removeClass('show');
	document.body.style.overflowY = "auto";
  }
  else {
	appendHighLights(highlights);
	document.body.style.overflowY = "hidden";
	$(`#${modalId}`).addClass('show');
  }
  modalActive = !modalActive;
};

modal.addModal = () => {
  let modalContainer = createElement("div", modalId);
  let dialogContainer = createElement("div", dialogId);
  let closeButton = createElement("button", "kb-close-modal");
  let highlightsContainer = createElement("div", hlId);
  let detailsView = createBookCoverSection();
  //closeButton.innerHTML = "<i class='material-icons'>close</i>";
  closeButton.innerHTML = "Close";
  closeButton.addEventListener('click', (event) => modal.toggleModal(event, null), false);
  modalContainer.addEventListener('click', (event) => modal.toggleModal(event, null), false);
  dialogContainer.addEventListener('click', (event) => event.stopPropagation());
  dialogContainer.appendChild(closeButton);
  dialogContainer.appendChild(detailsView);
  dialogContainer.appendChild(highlightsContainer);
  modalContainer.appendChild(dialogContainer);
  document.body.insertBefore(modalContainer, document.body.firstChild);
};


module.exports = modal;
