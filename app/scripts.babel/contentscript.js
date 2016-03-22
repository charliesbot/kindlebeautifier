'use strict';

// var addBookCovers = () => {
//     console.log('test test paparapa');
//     var books = document.getElementsByClassName('bookMain');
//     console.log(books.length);
//     _.map(books[0], function (node) {
//         console.log(node);
//     })
// };

//addBookCovers(); // run once on page load

let currentId;
let highlights = {};

var addBookCovers = (node, id) => {
  let bookCover = document.createElement('div');
  bookCover.style.height = "300px";
  bookCover.style.width = "200px";
  bookCover.style.marginBottom = "20px";
  bookCover.style.backgroundSize = "cover";
  bookCover.style.backgroundPosition = "center";
  bookCover.style.backgroundImage = `url('http://images.amazon.com/images/P/${id}.ZTZZZZZZ.jpg')`;
  node.insertBefore(bookCover, node.firstChild);
};

let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    let currentNode = mutation.addedNodes[0];
    //is a book block
    if (_.includes(currentNode.classList, "bookMain")) {
      currentId = currentNode.id.split("_")[0];
      highlights[currentId] = [];
      document.getElementById(currentNode.id).id = currentId;
      addBookCovers(currentNode, currentId);
    }
    //is a highlight block
    if (_.includes(currentNode.classList, "highlightRow") && currentId !== undefined) {
      highlights[currentId].push(currentNode);
    }

  });
});

observer.observe(document.getElementById("allHighlightedBooks"), {
  subtree: true,
  childList: true,
  attributes: false,
  characterData: false
});

// debounce the function so it's not running constantly
//var scrollBuzzkill = _.debounce(cleanNewsFeed, 300);
//document.addEventListener("scroll", scrollBuzzkill);