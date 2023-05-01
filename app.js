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
