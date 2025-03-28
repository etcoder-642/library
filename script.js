const overlay = document.querySelector('.overlay');
const displaybox = document.querySelector('.displaybox');

let title = document.querySelector('#title');
let author = document.querySelector('#author');
let pages = document.querySelector('#pages');
let readStatus = false;

let myLibrary = [];

function removeAndShift(array, indexToRemove) {
    if (indexToRemove >= 0 && indexToRemove < array.length) {
      array.splice(indexToRemove, 1); // Remove 1 element at indexToRemove
    } else {
      console.error("Invalid index");
    }
}


// Click Event Handler

document.addEventListener('click', (e)=>{
    if(e.target.className === 'btn'){
        title.value = '';
        pages.value = '';
        author.value = '';

        overlay.style.display = 'block';
        displaybox.style.display = 'flex';    
    }else if(e.target.className.includes('readButton')){
        if(readStatus === false){
            readStatus = true;
            e.target.style.justifyContent = 'end';    
        }else {
            readStatus = false;
            e.target.style.justifyContent = 'start';            
        }    
    }else if(e.target.className.includes('box-btn')){
        if(title.checkValidity() && author.checkValidity() && pages.checkValidity()){
            e.preventDefault();
            let newBook = setBookInfo(crypto.randomUUID(), title.value, author.value, pages.value, readStatus);
            myLibrary.push(newBook)
            console.log(myLibrary);
            displayBookInfo(myLibrary);
        
            overlay.style.display = 'none';
            displaybox.style.display = 'none';        
        }
    }else if(e.target.className === 'rmv'){
        for(i=0;i<myLibrary.length;i++){
            if(myLibrary[i].id === e.target.dataset.uniqueId){
                document.querySelector(`[data-unique-id='${myLibrary[i].id}']`).remove();
                removeAndShift(myLibrary, i);
            }
        }
        console.log(myLibrary, 'Here I am from the remove Button');    
    }
})

// The Code that Matters the most


function bookInfo(id, title, author, pages, readStatus){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function setBookInfo(id, title, author, pages, readStatus){
    let newBook = new bookInfo(id, title, author, pages, readStatus);
    return newBook;    
}

let contentList = document.querySelector('.content-list');
let card = document.querySelector('.card');

function displayBookInfo(array){
    let lastItem = array[array.length - 1];
    let main = document.createElement('li');
    let CardClone = card.cloneNode(true);


    CardClone.querySelector('header').textContent = lastItem.title;
    CardClone.querySelector('.author').textContent = `Author: ${lastItem.author}`;
    CardClone.querySelector('.pages').textContent = `Pages: ${lastItem.pages}`;
    CardClone.querySelector('.status').textContent = `Read Status: ${lastItem.readStatus ? 'Read' : 'Not Read'}`; 
    main.id = '';
    main.setAttribute('data-unique-id', lastItem.id);
    CardClone.querySelector('.rmv').setAttribute('data-unique-id', lastItem.id);

    contentList.appendChild(main);
    main.appendChild(CardClone);
    console.log(CardClone, 'clone');
    console.log(myLibrary);
}

myLibrary.push(setBookInfo(crypto.randomUUID(), 'Mere Christianity', 'CS. Lewis', '300', 'Not Read'));
displayBookInfo(myLibrary);




