
const container = document.querySelector(".container");

const myLibrary = [];

function Book(author, year, pages, stars){

    if(!new.target){
        throw Error("Book needs to be called with 'new' keyword");
    }
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.stars = stars;
}

function addBookToLibrary(author, year, pages, stars){

    const id = crypto.randomUUID();
    const newBook = new Book(author, year, pages, stars);
    myLibrary.push(newBook);
}

addBookToLibrary("bob", 2022, 222, 8);
addBookToLibrary("leroy", 2010, 37, 7);
addBookToLibrary("can win", 2025, 777, 10);
console.log(myLibrary)
displayBooks();

function displayBooks(){
    for(book in myLibrary){
        const newBook = document.createElement("div");
        newBook.classList = "card";
        container.appendChild(newBook);
    }
}