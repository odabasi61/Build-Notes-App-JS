const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const closeIcon = popupBox.querySelector('header i');
const addBtn = popupBox.querySelector('button');
const titleTag = popupBox.querySelector('input');
const textTag = popupBox.querySelector('textarea');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

addBox.addEventListener('click', () => {
    popupBox.classList.add('show');
})

closeIcon.addEventListener('click', () => {
    popupBox.classList.remove('show');
})

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteText = textTag.value;

    if (noteTitle || noteText) {
        let dateObj = new Date();
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteText, date: `${month} ${day}, ${year}`
        };
        const notes = [];
        notes.push(noteInfo); // adding new note to notes
    }
})