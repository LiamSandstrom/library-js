const container = document.querySelector(".container");
const addBtn = document.querySelector(".add-btn");
const addDialog = document.querySelector(".add-dialog");
const addForm = document.querySelector("#add-form");
const submitButton = document.querySelector(".submit-btn");
const closeBtn = document.querySelector(".close-btn");

const myLibrary = new Map();

function Book(author, year, pages, stars, read) {
  if (!new.target) {
    throw Error("Book needs to be called with 'new' keyword");
  }
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.stars = stars;
  this.read = read;
}

Book.prototype.readswap = function(){
    this.read = !this.read;
}

function addBookToLibrary(author, year, pages, stars, read) {
  const id = crypto.randomUUID();
  const newBook = new Book(author, year, pages, stars, read);
  myLibrary.set(id, newBook);
  return id;
}

addBookToLibrary("bob", 2022, 222, 8, true);
addBookToLibrary("leroy", 2010, 37, 7, false);
addBookToLibrary("can win", 2025, 777, 10, true);
console.log(myLibrary);
displayBooks();

function displayBooks() {
  for (const [key, book] of myLibrary) {
    console.log();
    displayBook(key);
  }
}

function displayBook(key) {
  const newBook = document.createElement("div");
  const book = myLibrary.get(key);
  newBook.classList = "card";

  if (book.author != "") {
    const author = document.createElement("h2");
    author.textContent = "Author: " + book.author;
    newBook.appendChild(author);
  }

  if (book.year != "") {
    const year = document.createElement("h2");
    year.textContent = "Year: " + book.year;
    newBook.appendChild(year);
  }

  if (book.pages != "") {
    const pages = document.createElement("h2");
    pages.textContent = "Pages: " + book.pages;
    newBook.appendChild(pages);
  }

  if (book.stars != "") {
    const stars = document.createElement("h2");
    stars.textContent = "Stars: " + book.stars;
    newBook.appendChild(stars);
  }

  const read = document.createElement("h2");
  read.textContent = "Read: " + book.read;
  newBook.appendChild(read);

  const readBtn = document.createElement("button");
  readBtn.textContent = "ReadSwapper"
  readBtn.classList = "read-btn";
  readBtn.addEventListener("click", () => {
    book.readswap();
    read.textContent = "Read: " + book.read;
    console.log(book)
  });
  newBook.appendChild(readBtn);

  const delBtn = document.createElement("button");
  delBtn.textContent = "X"
  delBtn.classList = "close-btn"
  delBtn.addEventListener("click", () => {
    myLibrary.delete(key);
    container.removeChild(newBook);
  });
  newBook.appendChild(delBtn);

  container.appendChild(newBook);
}

addBtn.addEventListener("click", () => {
  console.log("click");
  addDialog.showModal();
});

let submited = false;

addForm.addEventListener("submit", (e) => {
  if (submited == true) {
    event.preventDefault();
    const form = e.target;
    const newBook = addBookToLibrary(
      form.author.value,
      form.year.value,
      form.pages.value,
      form.stars.value,
      form.read.checked,
    );
    displayBook(newBook);
    addForm.reset();
    addDialog.close();
  }
  submited = false;
  console.log("submited");
});

submitButton.addEventListener("click", () => {
  submited = true;
});

closeBtn.addEventListener("click", () => {
    addDialog.close();
});

