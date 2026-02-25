const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");

for (const card of cards) {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
}

for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}

function dragStart(e) {
  // Add target element's id to the data transfer object
  e.dataTransfer.setData("text/plain", e.target.id);
}

function dragEnd(e) {
  console.log("Drag ended");

  // Clear the data transfer object
  e.dataTransfer.clearData();
}

function dragOver(e) {
  // Prevent default to allow drop to work by default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("over");
}

function dragLeave(e) {
  e.preventDefault();
  e.target.classList.remove("over");
}

function dragDrop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  e.target.appendChild(card);
  e.target.classList.remove("over");
}
