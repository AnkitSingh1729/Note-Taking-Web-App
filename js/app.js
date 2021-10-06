console.log("Welcome");

// if user adds a note, add it to the local storage

let addBtn = document.getElementById('addBtn');
showNotes();                                                      // Required to update the notes when website is opened for the first time.
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);                                    // Push (.value) of "addTxt" to the array we just created
    localStorage.setItem("notes", JSON.stringify(notesObj));        // Set the array we created(nodeObj) back to localStorage
    addTxt.value = "";                                              // It will remove the text form addTxt area after the addBtn is clicked
    console.log(notesObj);
    showNotes();
})


// This function shows the current localStorage data on the website where it's asked to show it.
// i.e. it updates the innerHTML of a specific element based on current localStorage.
function showNotes() {
    notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {                                                           // Entry coming from localStorage
        // Inplace of this.id, we can also use delete(${index}) directly
        html += `                                                                                   
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${element}</p>
                <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>        
            </div>
        </div>`;
    });

    let notesElm = document.getElementById("notes");                                                        // Pick element with id="notes", we will change its innerHTMl here
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

function deleteNote(index){
    console.log('I am deleting', index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);                                                                              // Delete 1 element at specific index
    localStorage.setItem("notes", JSON.stringify(notesObj));                                                // then set the value of updated array in localStorage after stringify it
    showNotes();                                                                                            // call showNotes() so that the change can reflect on the website  
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
    // This command stores the search value in a variable
    let inputVal = search.value.toLowerCase();                                                              // If searched with uppercase letter in search bar. this command wiil lowercase the input value

    // console.log("Input detected", inputVal);
    let noteCards = document.getElementsByClassName('noteCard');                                            // All the elements with className "noteCard" comes in array/variable named noteCards

    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;                                       // Pick up the innerHTML of element
        if (cardTxt.includes(inputVal)){                                                                    // Check if current innerHTML includes "inputVal"
            element.style.display = "block";                                                                // Show
        }else{
            element.style.display = "none";                                                                 // Hide
        }
    })
})