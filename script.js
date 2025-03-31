const overlay = document.querySelector('.overlay');
const displaybox = document.querySelector('.displaybox');

let title = document.querySelector('#title');
let author = document.querySelector('#author');
let pages = document.querySelector('#pages');
let readStatus = false;

let myLibrary = [];

// populate the main array(mylibrary) and the displayed information from previously
// ... saved data in the local storage
document.addEventListener('DOMContentLoaded', ()=>{
    let storedBooks = [];
    storedBooks = JSON.parse(localStorage.getItem('Books'));

    if(storedBooks){
        for(i=0;i<storedBooks.length;i++){
            myLibrary.push(storedBooks[i]);
            displayBookInfo(myLibrary[i]);
        }
    }
})


// A function which removes an element of an array provided an index, and shifts the other elements to fill the space
function removeAndShift(array, indexToRemove) {
    if (indexToRemove >= 0 && indexToRemove < array.length) {
      array.splice(indexToRemove, 1); // Remove 1 element at indexToRemove
    } else {
      console.error("Invalid index");
    }
}


// Click Event Handler

document.addEventListener('click', (e)=>{
    // the first add book button is clicked
    if(e.target.className === 'btn'){
        overlay.style.display = 'block';
        displaybox.style.display = 'flex';    
    // for the toggle button that act as radio button in the displayBox
    }else if(e.target.className.includes('readButton')){
        if(readStatus === false){
            readStatus = true;
            e.target.style.justifyContent = 'end';    
        }else {
            readStatus = false;
            e.target.style.justifyContent = 'start';            
        }    
    // When the Add Book button inside the displayBox button is clicked
    }else if(e.target.className.includes('box-btn')){
        if(title.checkValidity() && author.checkValidity() && pages.checkValidity()){
            e.preventDefault();
            setNewBook(crypto.randomUUID(), title.value, author.value, pages.value, readStatus);
            localStorage.setItem('Books', '');
            localStorage.setItem('Books', JSON.stringify(myLibrary));

            overlay.style.display = 'none';
            displaybox.style.display = 'none'; 
            document.querySelector('form').reset();
        }
    // remove button is clicked
    }else if(e.target.className === 'rmv'){
        for(i=0;i<myLibrary.length;i++){
            if(myLibrary[i].id === e.target.dataset.uniqueId){
                document.querySelector(`[data-unique-id='${myLibrary[i].id}']`).remove();
                removeAndShift(myLibrary, i);
            }
        }
        localStorage.setItem('Books', '');
        localStorage.setItem('Books', JSON.stringify(myLibrary));
    // update read status button is clicked
    }else if(e.target.className === 'state'){
        readStatus = !readStatus;
        for(i=0;i<myLibrary.length;i++){
            if(myLibrary[i].id === e.target.dataset.uniqueId){
                myLibrary[i].readStatus = readStatus ? true: false;
                document.querySelector(`[data-status-id='${myLibrary[i].id}']`).textContent = `Read Status: ${myLibrary[i].readStatus ? 'Read' : 'Not Read'}`;
            }
        }
        localStorage.setItem('Books', '');
        localStorage.setItem('Books', JSON.stringify(myLibrary));
    }
})

// All the Important functions

function bookInfo(id, title, author, pages, readStatus){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function setNewBook(id, title, author, pages, readStatus){
    myLibrary.push(new bookInfo(id, title, author, pages, readStatus));
    displayBookInfo(myLibrary[myLibrary.length-1]);
}

let contentList = document.querySelector('.content-list');
let card = document.querySelector('.card');


function displayBookInfo(obj){
    // selects the last item of the array because that is the newly created one
    let main = document.createElement('li');
    let clonedCard = card.cloneNode(true);


    clonedCard.querySelector('header').textContent = obj.title;
    clonedCard.querySelector('.author').textContent = `Author: ${obj.author}`;
    clonedCard.querySelector('.pages').textContent = `Pages: ${obj.pages}`;
    clonedCard.querySelector('.status').textContent = `Read Status: ${obj.readStatus ? 'Read' : 'Not Read'}`; 
    clonedCard.querySelector('.status').setAttribute('data-status-id', obj.id);
    clonedCard.querySelector('.state').setAttribute('data-unique-id', obj.id);

    // this is needed because the template has an id of basecard which have display none, by making the 
    // id empte we are essentially isolating this templates from the base
    main.id = '';
    main.setAttribute('data-unique-id', obj.id);
    clonedCard.querySelector('.rmv').setAttribute('data-unique-id', obj.id);

    contentList.appendChild(main);
    main.appendChild(clonedCard);
}

// checks a localStorage for a certain key exists
function localStorageKeyExists(key) {
    return localStorage.getItem(key) !== null;
}

// Add a preloaded data if a data from the localStorage doesn't exist
if (!localStorageKeyExists('Books')) {
    setNewBook(crypto.randomUUID(), 'Mere Christianity', 'CS. Lewis', '227', false)
    setNewBook(crypto.randomUUID(), '1984', 'George Orwell', '328', false)
    setNewBook(crypto.randomUUID(), 'The Power of His Presence', 'Rogers', '320', true)
}





