let myLibrary = [];
let totalBooks = 0;
let booksFinished = 0;
let booksInProgress = 0;
let booksNotRead = 0;
let totalPages = 0;
let newBook;

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
const inputBookStatusRadios = Array.from(
	document.querySelectorAll(".add-book-form input[name='status'")
);

/* Element event handler */
function radiosEvents(event) {
	if (event.target === inputBookStatusRadios[2]) {
		inputBookPagesRead.removeAttribute("disabled");
		inputBookPagesRead.setAttribute("required", "");
	} else {
		inputBookPagesRead.setAttribute("disabled", "");
		inputBookPagesRead.removeAttribute("required");
	}
}

for (let i = 0; i < inputBookStatusRadios.length; i++) {
	inputBookStatusRadios[i].addEventListener("input", radiosEvents);
}

function Book(title, author, pages, pagesRead, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.pagesRead = pagesRead;
	this.status = status;
}

function clearInputForm() {}

function createBookCard(index, title, author, pages, pagesRead, status) {
	let card = document.createElement("div");
	card.className = `card ${index}`;
	card.innerHTML = `
						<div class="card-header">
							<h3 class="title">${title}</h3>
							<button class="delete">
								<img src="img/trash-can.svg" alt="" />
							</button>
						</div>	
						<p class="author">Author: ${author}</p>
						<p class="pages">Number of Pages: ${pages}</p>
						<p class="pages-read">Number of Pages Read: ${pagesRead}</p>
						<fieldset class="book-status">
							<legend>Book Status</legend>
							<div class="options">
								<div class="option">
									<label for="status-read-${index}"> Read </label>
									<input
										type="radio"
										id="status-read-${index}"
										name="status"
										value="read" 
										${status === "Read" ? "checked" : ""}/>
								</div>
								<div class="option">
									<label for="status-notread-${index}"> Not Read </label>
									<input
										type="radio"
										id="status-notread-${index}"
										name="status"
										value="notread" 
										${status === "Not Read" ? "checked" : ""}/>
								</div>
								<div class="option">
									<label for="status-in-progress-${index}"> Reading </label>
									<input
										type="radio"
										id="status-in-progress${index}"
										name="status"
										value="reading"
										${status === "Reading" ? "checked" : ""}/>
								</div>
							</div>
						</fieldset>`;

	return card;
}

function addBookFormHide() {
	addBookForm.style = "display: none;";
	container.style = "";
}

function addBookFormDisplay() {
	addBookForm.style = "display: flex;";
	container.style = "filter: blur(5px);";
}

function addBookToLibrary(event) {
	if (!addBookForm.validity.valid) {
		event.preventDefault();
	} else {
		newBook = new Book(
			inputBookTitle.value,
			inputBookAuthor.value,
			inputBookPages.value,
			null,
			null
		);
		for (let i = 0; i < inputBookStatusRadios.length; i++) {
			if (inputBookStatusRadios[i].checked) {
				newBook.status = inputBookStatusRadios[i].value;
			}
			if (inputBookPagesRead.required) {
				newBook.pagesRead = inputBookPagesRead.value;
			}
		}
		myLibrary.push(newBook);
		addBookForm.reset(); // Reset the whole form
		addBookFormHide();
		event.preventDefault(); // Prevent the window from reloading again
	}
}

addBookForm.addEventListener("submit", addBookToLibrary);

/*
	Loop through the library list and display books on the screen.
	@param library: list of book objects.
*/
function displayLibrary() {
	let card = createBookCard(1, "Cosmos", "Carl Sagan", 245, 232, "Reading");
	bookCardsContainer.appendChild(card);
}

function toggleAddBookForm(event) {
	if (event.target === openFormButton) {
		addBookFormDisplay();
		event.preventDefault();
	} else if (event.target === closeFormButton) {
		addBookFormHide();
		event.preventDefault();
	}
}

openFormButton.addEventListener("click", toggleAddBookForm);
closeFormButton.addEventListener("click", toggleAddBookForm);

displayLibrary();
