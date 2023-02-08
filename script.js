const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popupTitle = document.querySelector("header p");
const closeIcon = popupBox.querySelector("header i");
const addBtn = popupBox.querySelector("button");
const titleTag = popupBox.querySelector("input");
const textTag = popupBox.querySelector("textarea");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// getting localstorage notes if exist and parsing them to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  popupBox.classList.remove("show");
  titleTag.value = "";
  textTag.value = "";
  addBtn.innerText = "Add Note"; // after editing the note, we should add these codes to correct new note
  popupTitle.innerText = "Add new note";
});

function showNotes() {
  // there is a bug. when you add a new note, it duplicates all notes
  document.querySelectorAll(".note").forEach((note) => note.remove()); // this is the solution for the bug
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
    <div class="details">
      <p>${note.title}</p>
      <span
        >${note.description}</span
      >
    </div>
    <div class="bottom-content">
      <span>${note.date}</span>
      <div class="settings">
        <i onclick='showMenu(this)' class="uil uil-ellipsis-h"></i>
        <ul class="menu">
          <li onclick="editNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
          <li onclick='deleteNote(${index})'><i class="uil uil-trash"></i>Delete</li>
        </ul>
      </div>
    </div>
  </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    // close the edit/delete by clicking somewhere in the page
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure?");
  if (!confirmDel) return;
  notes.splice(noteId, 1); // remove selected note from array
  // update localstorage
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function editNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title; // the content automaically comes
  textTag.value = desc;
  addBtn.innerText = "Update Note";
  popupTitle.innerText = "Update The Note";
  //   console.log(noteId, title, desc);
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value;
  let noteText = textTag.value;

  if (noteTitle || noteText) {
    let dateObj = new Date();
    let month = months[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteText,
      date: `${month} ${day}, ${year}`,
    };

    if (!isUpdate) {
      notes.push(noteInfo); // adding new note to notes
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo; // updating specified note
    }
    // saving notes to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));

    // once add button clicked, close the popup
    closeIcon.click();
    showNotes();
  }
});
