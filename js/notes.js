document.addEventListener("DOMContentLoaded", () =>{
    let notes = window.loadData('dlm_notes', []);

    const notesInput = document.getElementById("notes-input");
    const addNoteBtn = document.getElementById("add-note-btn")
    const notesList = document.getElementById("notes-list");

    if (notesList) {

        function renderNotes(){
            notesList.innerHTML = "";
            notes.forEach((note, index) => {
                const li =document.createElement("li");
                li.className = `list-item fade-in ${note.completed ? 'completed' : ''}`;

                li.innerHTML = `
                    <div class = "item-left">
                        <input type = "checkbox" ${note.completed ? "checked" : ""} data-index="${index}">
                        <span>${note.title}</span>
                    </div>
                    <button class="danger" data-index="${index}">Delete</button>
                    `;
                    notesList.appendChild(li);
            });
        }

        renderNotes();

        addNoteBtn.addEventListener("click", () => {
            const title = notesInput.value.trim();
            if (title) {
                notes.push({title, completed: false});
                window.saveData('dlm_notes', notes);
                notesInput.value = "";
                renderNotes();
            }
        });


        notesList.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            if(index===null) return;

            if(e.target.tagName === "INPUT") {
                
                notes[index].completed = e.target.checked;
                window.saveData('dlm_notes', notes);
                renderNotes();
            }else if (e.target.tagName === "BUTTON") {

                notes.splice(index, 1);
                window.saveData('dlm_notes', notes);
                renderNotes();
            }
        });
    }

});