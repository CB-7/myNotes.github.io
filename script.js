console.log("Welcome to the Notes...");
displayNotes();




// Adding event listener to Search Bar ...i.e... If a type something to search ,it will automatically gives suggestions
let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", function () {
    let search = searchBar.value.toLowerCase();
    let cards = document.getElementsByClassName("myCards");

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i].getElementsByTagName("p")[0].innerText.toLowerCase();
        let title=cards[i].getElementsByTagName("h5")[0].innerText.toLowerCase();
        if (card.includes(search) || title.includes(search))
            cards[i].style.display = "block";
        else
            cards[i].style.display = "none";
    }

});




// Adding event listener to ADD Note Button ...i.e..If a user clicks on Add Button then a new note is created
let addBtn = document.getElementById('addButton');
addBtn.addEventListener('click', function (e) {
    let text = document.getElementById('addText');
    let titleVal = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    let important = localStorage.getItem("important");
    let title = localStorage.getItem("title");

    if (notes == null) {
        notesArray = [];
        important = [];
        title = [];
    }
    else {
        notesArray = JSON.parse(notes);
        important = JSON.parse(important);
        title = JSON.parse(title);
    }


    if (text.value != "") {
        notesArray.push(text.value);
        if (titleVal.value != "")
            title.push(titleVal.value);
        else
            title.push("Note");
        if (document.getElementById("fav").checked && document.getElementById("checkedLink").checked)
            important.push(3);
        else if (document.getElementById("checkedLink").checked)
            important.push(2);
        else if (document.getElementById("fav").checked)
            important.push(1);
        else
            important.push(0);
    }

    // console.log(text.value);
    text.value = "";
    titleVal.value = "";
    localStorage.setItem("notes", JSON.stringify(notesArray));
    localStorage.setItem("important", JSON.stringify(important));
    localStorage.setItem("title", JSON.stringify(title));
    displayNotes();
});




// function to display notes
function displayNotes() {
    let notes = localStorage.getItem("notes");
    let important = localStorage.getItem("important");
    let title = localStorage.getItem("title");
    if (notes == null) {
        notesArray = [];
        important = [];
        title = [];
    }
    else {
        notesArray = JSON.parse(notes);
        important = JSON.parse(important);
        title = JSON.parse(title);
    }

    let imp = "";
    let notImp = "";
    let impLink = "";
    let notImpLink = "";
    for (let i = 0; i < notesArray.length; i++) {
        let text = notesArray[i];
        if (text == "")
            continue;

        if (important[i] == "1") {
            imp += ` 
            <div class="card my-3 mx-3 myCards" style="width: 18rem; border:1px solid black ;background-color:darkgray" >
     
            <div class="card-body container" >
              <h5 class="card-title"  >${title[i]}</h5>
              <p  class="card-text edit"   >${text}</p>
              <button id="${i}" class="btn btn-primary" onclick="deleteNote(this.id)" >Delete</button>
            </div>
          </div> `;
        }
        else if (important[i] == "0") {
            notImp += ` 
            <div class="card my-3 mx-3 myCards" style="width: 18rem; border:1px solid black">
     
            <div class="card-body ">
              <h5 class="card-title">${title[i]}</h5>
              <p  class="card-text edit"   >${text}</p>
              <button id="${i}" class="btn btn-primary" onclick="deleteNote(this.id)" >Delete</button>
            </div>
          </div> `;
        }
        else if (important[i] == "2") {
            notImpLink += ` 
            <div class="card my-3 mx-3 myCards" style="width: 18rem; border:1px solid black ;" >
     
            <div class="card-body container" >
              <h5 class="card-title"  >${title[i]}</h5>
              <p  class="card-text edit"   >${text}</p>
              <button id="${i}" class="btn btn-primary" onclick="deleteNote(this.id)" >Delete</button>
              <button  value="${text}" class="btn btn-primary mx-5" onclick="visit(this.value)" >Visit</button>
            </div>
          </div> `;
        }
        else {
            impLink += ` 
            <div class="card my-3 mx-3 myCards" style="width: 18rem; border:1px solid black ;background-color:darkgray" >
     
            <div class="card-body container" >
              <h5 class="card-title"  >${title[i]}</h5>
              <p  class="card-text edit"   >${text}</p>
              <button id="${i}" class="btn btn-primary" onclick="deleteNote(this.id)" >Delete</button>
              <button  value="${text}" class="btn btn-primary mx-5" onclick="visit(this.value)" >Visit</button>
            </div>
          </div> `;
        }

    }

   
    impLink += imp;
    impLink+=notImpLink;
    impLink += notImp;
    let element = document.getElementById("notesDiv");
    element.innerHTML = impLink;

}



// function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    let important = localStorage.getItem("important");
    let title = localStorage.getItem("title");
    notesArray = JSON.parse(notes);
    important = JSON.parse(important);
    title = JSON.parse(title);
    notesArray.splice(index, 1);
    title.splice(index, 1);
    important.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    localStorage.setItem("title", JSON.stringify(title));
    localStorage.setItem("important", JSON.stringify(important));
    displayNotes();
}


// function to visit a link
function visit(text) {
    let addr = `${text}`;
    location.href = addr;
}


