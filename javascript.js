const container = document.querySelector(".container");
const addBtn = document.querySelector(".add-btn");
const addDialog = document.querySelector(".add-dialog");
const addForm = document.querySelector("#add-form");
const submitButton = document.querySelector(".submit-btn");

const myLibrary = new Map();

function Book(author, year, pages, stars) {
  if (!new.target) {
    throw Error("Book needs to be called with 'new' keyword");
  }
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.stars = stars;
}

function addBookToLibrary(author, year, pages, stars) {
  const id = crypto.randomUUID();
  const newBook = new Book(author, year, pages, stars);
  myLibrary.set(id, newBook);
  return id;
}

addBookToLibrary("bob", 2022, 222, 8);
addBookToLibrary("leroy", 2010, 37, 7);
addBookToLibrary("can win", 2025, 777, 10);
console.log(myLibrary);
displayBooks();

function displayBooks() {
  for (const [key, book] of myLibrary) {
    console.log();
    displayBook(book);
  }
}

function displayBook(book) {
  const newBook = document.createElement("div");

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

  newBook.classList = "card";
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
      form.stars.value
    );
    displayBook(myLibrary.get(newBook));
    addForm.reset();
  }
  submited = false;
  console.log("submited");
});

submitButton.addEventListener("click", () => {
  submited = true;
});
