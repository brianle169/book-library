let myLibrary = [];
let totalBooks = 0;
let booksFinished = 0;
let booksInProgress = 0;
let booksNotRead = 0;
let totalPages = 0;

const closeFormButton = document.querySelector(".close-form > img");
const openFormButton = document.querySelector(".add-book > img");
const submitFormButton = document.querySelector(".add-book-form .submit-form");
const addBookForm = document.querySelector(".add-book-form");
const container = document.querySelector(".container");
const bookCardsContainer = document.querySelector(".book-cards-container");

/* Form elements */
const inputBookTitle = document.getElementById("title");
const inputBookAuthor = document.getElementById("author");
const inputBookPages = document.getElementById("pages");
const inputBookPagesRead = document.getElementById("pages-read");
const inputBookStatusRead = document.getElementById("read");
const inputBookStatusNotread = document.getElementById("notread");
const inputBookStatusInProgress = document.getElementById("in-progress");
const inputRadios = Array.from(
	document.querySelectorAll("input[name='status'")
);

/* Element event handler */

function radiosEvents(event) {
	if (event.target === inputRadios[2]) {
		inputBookPagesRead.setAttribute("required", "");
	} else {
		inputBookPagesRead.removeAttribute("required");
	}
}

for (let i = 0; i < inputRadios.length; i++) {
	inputRadios[i].addEventListener("input", radiosEvents);
}

function Book(title, author, pages, pagesRead, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.pagesRead = pagesRead;
	this.status = status;
}

function addBookToLibrary() {
	// Add book to library
}

function addBookFormValidation(event) {}

function createBook(event) {
	let newBook = new Book(
		inputBookTitle.value,
		inputBookAuthor.value,
		inputBookPages.value,
		null,
		null
	);
	return newBook;
}

/*
	Loop through the library list and display books on the screen.
	@param library: list of book objects.
*/
function displayLibrary(library) {}

function toggleAddBookForm(event) {
	if (event.target === openFormButton) {
		addBookForm.style = "display: flex;";
		container.style = "filter: blur(5px);";
	} else if (event.target === closeFormButton) {
		addBookForm.style = "display: none;";
		container.style = "";
	}
}
openFormButton.addEventListener("click", toggleAddBookForm);
closeFormButton.addEventListener("click", toggleAddBookForm);
