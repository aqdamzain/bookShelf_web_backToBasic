const _localBookShelf = 'BOOK_SHELF';
const _listBookData = [];

const _incompleteBookshelf = document.getElementById('incompleteBookshelfList');
const _completeBookshelf = document.getElementById('completeBookshelfList');
const _submitBookAction = document.getElementById('inputBook');
const _searchAction = document.getElementById('searchBook');

document.addEventListener('DOMContentLoaded', function () {
    onLoadInit();
    _submitBookAction.addEventListener('submit', function (event) {
        addBookHandler();
        event.preventDefault();
    });
    _searchAction.addEventListener('submit', function(event) {
        SearchBookHandler();
        event.preventDefault();
    });

});

function deleteBook(id){

    //search book in list & delete it
    let i = 0;
    for(let bookData of _listBookData){
        if(bookData.id == id){
            _listBookData.splice(i, 1);
        }
        i += 1;
    }
    localBookDataSave(_listBookData);

    //mengubah list book view setelah delete book
    const bookElement = document.getElementById(id);
    bookElement.remove();
}

function moveBook(book){
    book.isComplete = !book.isComplete;

    //search book in list & change it
    let i = 0;
    for(let bookData of _listBookData){
        if(bookData.id == book.id){
            _listBookData[i] = book;
        }
        i += 1;
    }
    localBookDataSave(_listBookData);

    //mengubah list book view setelah move book
    const bookElement = document.getElementById(book.id);
    bookElement.remove();
    if(book.isComplete){
        showListCompleteBook([book]);
    }else {
        showListIncompleteBook([book]);
    }

}

function showListIncompleteBook(listBook){

    if(listBook[0]){   //check if blank array
        //initiate book HTML tag

        let newBook;
        let title;
        let author;
        let year;

        let action;
        let buttonMoveBook;
        let buttonDeleteBook;

        //populate data
        for(book of listBook){
            newBook = document.createElement('article');
            newBook.setAttribute('class', 'book_item');
            newBook.setAttribute('id', `${book.id}`);

            title = document.createElement('h3');
            title.innerText = book.title;
            newBook.appendChild(title);

            author = document.createElement('p');
            author.innerText = `Penulis: ${book.author}`;
            newBook.appendChild(author);

            year = document.createElement('p');
            year.innerText = `Tahun: ${book.year}`;
            newBook.appendChild(year);


            action = document.createElement('div');
            action.setAttribute('class', 'action');
    
            buttonMoveBook = document.createElement('button');
            buttonMoveBook.setAttribute('class', 'green');
            buttonMoveBook.setAttribute('onClick', `moveBook(${JSON.stringify(book)})`);
            buttonMoveBook.innerText = 'Selesai dibaca';
            action.appendChild(buttonMoveBook);
    
            buttonDeleteBook = document.createElement('button');
            buttonDeleteBook.setAttribute('class', 'red');
            buttonDeleteBook.setAttribute('onClick', `deleteBook(${book.id})`);
            buttonDeleteBook.innerText = 'Hapus buku';
            action.appendChild(buttonDeleteBook);


            newBook.appendChild(action);

            _incompleteBookshelf.appendChild(newBook);
        }
    }
}


function showListCompleteBook(listBook){

    if(listBook[0]){   //check if blank array
        //initiate book HTML tag

        let newBook;
        let title;
        let author;
        let year;

        let action;
        let buttonMoveBook;
        let buttonDeleteBook;

        //populate data
        for(book of listBook){
            newBook = document.createElement('article');
            newBook.setAttribute('class', 'book_item');
            newBook.setAttribute('id', `${book.id}`);

            title = document.createElement('h3');
            title.innerText = book.title;
            newBook.appendChild(title);

            author = document.createElement('p');
            author.innerText = `Penulis: ${book.author}`;
            newBook.appendChild(author);

            year = document.createElement('p');
            year.innerText = `Tahun: ${book.year}`;
            newBook.appendChild(year);


            action = document.createElement('div');
            action.setAttribute('class', 'action');
    
            buttonMoveBook = document.createElement('button');
            buttonMoveBook.setAttribute('class', 'green');
            buttonMoveBook.setAttribute('onClick', `moveBook(${JSON.stringify(book)})`);
            buttonMoveBook.innerText = 'Belum selesai dibaca';
            action.appendChild(buttonMoveBook);
    
            buttonDeleteBook = document.createElement('button');
            buttonDeleteBook.setAttribute('class', 'red');
            buttonDeleteBook.setAttribute('onClick', `deleteBook(${book.id})`);
            buttonDeleteBook.innerText = 'Hapus buku';
            action.appendChild(buttonDeleteBook);


            newBook.appendChild(action);

            _completeBookshelf.appendChild(newBook);
        }
    }
}


function addBookHandler(){    
    const completeBox = document.getElementById("inputBookIsComplete");
    const book = {};
    book.id = ""+Number(new Date());
    book.title = document.getElementById('inputBookTitle').value;
    book.author = document.getElementById('inputBookAuthor').value;
    book.year = Number(document.getElementById('inputBookYear').value);
    book.isComplete = completeBox.checked;

    _listBookData.push(book);
    localBookDataSave(_listBookData);

        //mengupdate list book view berdasarkan buku yang ditambahkan
        _completeBookshelf.innerHTML = "";
        _incompleteBookshelf.innerHTML = "";
        showListCompleteBook(_listBookData.filter(book => book.isComplete));
        showListIncompleteBook(_listBookData.filter(book => !book.isComplete));
    
}

function SearchBookHandler(){
    const searchTitle = document.getElementById('searchBookTitle').value;
    if(!searchTitle==""){
        const listBookFound = _listBookData.filter(book => book.title.toLowerCase() == searchTitle.toLowerCase());

        //mengubah list book view berdasarkan buku yang dicari
        _completeBookshelf.innerHTML = "";
        _incompleteBookshelf.innerHTML = "";
        showListCompleteBook(listBookFound.filter(book => book.isComplete));
        showListIncompleteBook(listBookFound.filter(book => !book.isComplete));

    }
}


function localBookDataSave(listBook){
    const BookShelf = JSON.stringify(listBook);
    localStorage.setItem(_localBookShelf, BookShelf);
    
}


function localBookDataLoad(){

    // Jika item pada local storage belum ada 
    // maka akan diberi return []
    const Arr = [];
    if (typeof (Storage) !== 'undefined') {
        if (localStorage.getItem(_localBookShelf) === null) {
          return Arr;
        }

        const BookShelf = localStorage.getItem(_localBookShelf);
        const listBook = JSON.parse(BookShelf);

        return listBook;
    }

    return Arr;
}


function onLoadInit(){

    const listBook = localBookDataLoad();
    _listBookData.push(...listBook);

    showListCompleteBook(_listBookData.filter(book => book.isComplete));
    showListIncompleteBook(_listBookData.filter(book => !book.isComplete));

}

