let myLibrary = [];

function Book(title, author, pages, isRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

Book.prototype.logInfo = function () {
	return `${this.title} by ${this.author}, ${this.pages} pages, have you read?: ${this.isRead}`;
};

function addBookToLibrary() {
	// Add book to library
}

const closeFormButton = document.querySelector(".close-form > img");
const openFormButton = document.querySelector(".add-book > img");
const addBookForm = document.querySelector(".add-book-form");
const container = document.querySelector(".container");

function toggleAddBookForm(event) {
	if (event.target === openFormButton) {
		addBookForm.style = "display: flex;";
		container.style = "filter: blur(5px);";
	} else if (event.target === closeFormButton) {
		addBookForm.style = "display: flex;";
		container.style = "";
	}
}
openFormButton.addEventListener("click", toggleAddBookForm);
closeFormButton.addEventListener("click", toggleAddBookForm);
