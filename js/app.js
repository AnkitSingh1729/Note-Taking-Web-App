console.log("Welcome");
let endpoint = "cb2a466439754952a56da2f075700dfd";              // Update the endpoint, from crudcrud website in case the limit of 100 reaches


// if user adds a note, add it to the server(crudecrude for now)
let addBtn = document.getElementById('addBtn');
showNotes();                                                      // Required to update the notes when website is opened for the first time.
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTxtValue = addTxt.value;

    const obj = { // Create object to be posted through axios
        addTxtValue,
    };

    axios    // Post data from textbox to server
        .post(`https://crudcrud.com/api/${endpoint}/notesData`, obj)
        .then(res => {
            console.log("Data has been posted to crudcrud");
            console.log(res);
        })
        .catch(err => {
            console.log("Error Message: ");
            console.log(res);
        })

    addTxt.value = "";                                              // It will remove the text form addTxt area after the addBtn is clicked
    showNotes();
})


function showNotes() {
    axios  
        .get(`https://crudcrud.com/api/${endpoint}/notesData`)
        .then(res => {
            console.log(res);
            if (notes == null) {
                notesArr = [];
            } else {
                notesArr = res.data;
            }

            let html = "";
            notesArr.forEach(function (element, index) {                                                           // Entry coming from localStorage
                // Inplace of this.id, we can also use delete(${index}) directly
                html += `                                                                                   
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text">${element.addTxtValue}</p>
                        <button id=${index} onclick="deleteNote('${element._id}')" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
            });                                                                                                     // while passing parameter to onclick=deleteNode(), 
                                                                                                                    // i was missing the (''), which is a Syntax error: Invalid token found                   

            let notesElm = document.getElementById("notes");                                                        // Pick element with id="notes", we will change its innerHTMl here
            if (notesArr.length != 0) {
                notesElm.innerHTML = html
            } else {
                notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
            }
        })
        .catch(err => {
            console.log("Error occured while getting data from server")
            console.log(err);
        })
}

function deleteNote(idx){
    console.log('I am deleting', idx);
    axios  
        .delete(`https://crudcrud.com/api/${endpoint}/notesData/${idx}`)
        .then(res => {
            console.log(`Element with id: ${idx}, deleted`);
            showNotes();
        })
        .catch(err => {
            console.log("Error occured while deleting data from server")
            console.log(err);
        })
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