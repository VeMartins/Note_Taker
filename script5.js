const note = document.getElementById("newNote");
const notesMainDiv = document.querySelector(".notePrint");
let notesArr = [];

const popContent = document.getElementById("popContent");
const closePop = document.getElementById("popCloseBtn");
popContent.appendChild(closePop);

const addNote = () => {
  createNoteDiv(note.value);
  saveLocalNote(note.value);
  note.value = "";
};
const createNoteDiv = (data) => {
  //creating individual note
  let noteBox = document.createElement("div");
  noteBox.setAttribute("class", "noteBox");
  notesMainDiv.appendChild(noteBox);
  notesArr.push(noteBox);

  let parag = document.createElement("p");
  parag.setAttribute("class", "noteTxt");
  let txt = document.createTextNode(data);
  parag.appendChild(txt);
  noteBox.appendChild(parag);
  //creating remove note button
  let closeBtn = document.createElement("span");
  closeBtn.setAttribute("id", "closeBtn");
  closeBtn.innerHTML = "&times;";
  noteBox.appendChild(closeBtn);

  //creating details button
  let detailBtn = document.createElement("button");
  detailBtn.setAttribute("id", "detailBtn");
  let btnTxt = document.createTextNode("View details");
  detailBtn.appendChild(btnTxt);
  noteBox.appendChild(detailBtn);

  eventDelBtn(closeBtn);
  detailBtn.addEventListener("click", popTheBox);
};

const eventDelBtn = (closeBtn) => {
  closeBtn.addEventListener("click", closeNote);
};

const openBox = (detailBtn) => {
  popContent.style.display = "grid";
  detailBtn.stopPropagation();
};

// Event Listeners
const popTheBox = (detailBtn) => {
  if (closePop.nextElementSibling) {
    closePop.nextElementSibling.remove();
  } // to remove 1st cloned <p> if detailBtn is clicked twice(if popBox is not closed 1st)
  let targt = detailBtn.target.parentNode.firstChild;
  let cln = targt.cloneNode(true);
  cln.setAttribute("class", "clone");
  popContent.appendChild(cln);

  openBox(detailBtn);
  closePop.addEventListener("click", closePopBox);
};

const closeNote = (closeBtn) => {
  closeBtn.stopPropagation();
  let boxNote = closeBtn.target.parentNode;
  removeLocalNotes(boxNote);
  boxNote.parentNode.removeChild(boxNote);
};

const closePopBox = () => {
  let clone = document.querySelector(".clone");
  clone.remove();
  popContent.style.display = "none";
};

document.addEventListener("DOMContentLoaded", getNotes);

// Saving to LocalStorage

function saveLocalNote(data) {
  e;
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  notes.push(data);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotes() {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  notes.forEach((data) => createNoteDiv(data));
}

function removeLocalNotes(data) {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  const dataIndex = data.children[0].innerText;
  notes.splice(notes.indexOf(dataIndex), 1);
  localStorage.setItem("notes", JSON.stringify(notes));
}
