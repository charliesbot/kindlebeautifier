'use strict';

import modal from "./chrome/modal";

let currentId;
let highlights = {};

var pageLoaded = () => {
  //This removes the existing elements when page loads, and observable can't detect
  let bookMain = document.getElementsByClassName('bookMain');
  let highlightRow = document.getElementsByClassName('highlightRow');
  let collection = _.union(bookMain, highlightRow);
  _.map(collection, (node) => {
    domManager(node);
  })
};

let domManager = (node) => {
  if (node === undefined) {
    return;
  }
  //is a book block
  if (_.includes(node.classList, "bookMain")) {
    currentId = node.id.split("_")[0];
    highlights[currentId] = {};
    highlights[currentId].selections = [];
    highlights[currentId].bookCover = `http://images.amazon.com/images/P/${currentId}.ZTZZZZZZ.jpg`;
    document.getElementById(node.id).id = currentId;
    addBookCovers(node, currentId);
  }
  //is a highlight block
  if (_.includes(node.classList, "highlightRow") && currentId !== undefined) {
    highlights[currentId].selections.push(node);
    node.remove();
  }
};

var addBookCovers = (node, id) => {
  let bookCover = document.createElement('div');
  bookCover.style.height = "300px";
  bookCover.style.width = "200px";
  bookCover.style.marginBottom = "20px";
  bookCover.style.cursor = "pointer";
  bookCover.style.backgroundSize = "cover";
  bookCover.style.backgroundPosition = "center";
  bookCover.style.backgroundImage = `url('${highlights[id].bookCover}')`;
  bookCover.addEventListener('click', (event) => modal.toggleModal(event, highlights[id]), false);
  node.insertBefore(bookCover, node.firstChild);
};

let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    domManager(mutation.addedNodes[0]);
  });
});

observer.observe(document.getElementById("allHighlightedBooks"), {
  subtree: true,
  childList: true,
  attributes: false,
  characterData: false
});

// run once on page load
pageLoaded();
modal.addModal();
