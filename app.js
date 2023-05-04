let myLibrary = [];
let cards = [];
let newBook;

/* Cards and form elements */
const closeFormButton = document.querySelector(".close-form > img");
const openFormButton = document.querySelector(".add-book > img");
const clearAllButton = document.querySelector("button.clear-all");
const addBookForm = document.querySelector(".add-book-form");
const container = document.querySelector(".container");
const bookCardsContainer = document.querySelector(".book-cards-container");
const libraryLogValues = Array.from(
	document.querySelectorAll(".library-log p.value")
);

/* Form elements */
const inputBookTitle = document.getElementById("title");
const inputBookAuthor = document.getElementById("author");
const inputBookPages = document.getElementById("pages");
const inputBookPagesRead = document.getElementById("pages-read");
const inputBookStatusRadios = Array.from(
	document.querySelectorAll(".add-book-form input[name='status'")
);

function setLogInfo() {
	let booksFinished = 0;
	let booksInProgress = 0;
	let booksNotRead = 0;

	for (let book = 0; book < myLibrary.length; book++) {
		if (myLibrary[book].status === "Read") booksFinished++;
		else if (myLibrary[book].status === "Not Read") booksNotRead++;
		else if (myLibrary[book].status === "Reading") booksInProgress++;
	}

	libraryLogValues[0].textContent = myLibrary.length;
	libraryLogValues[1].textContent = booksFinished;
	libraryLogValues[2].textContent = booksInProgress;
	libraryLogValues[3].textContent = booksNotRead;
}

/* Element event handler */
function disableInput(input) {
	input.setAttribute("disabled", "");
	input.removeAttribute("required");
}

function enableInput(input) {
	input.setAttribute("required", "");
	input.removeAttribute("disabled");
}

function radiosEvents(event) {
	if (event.target === inputBookStatusRadios[2]) {
		enableInput(inputBookPagesRead);
	} else {
		disableInput(inputBookPagesRead);
	}
}

for (let i = 0; i < inputBookStatusRadios.length; i++) {
	inputBookStatusRadios[i].addEventListener("input", radiosEvents);
}

function Book(title, author, pages, pagesRead, status) {
	this.index = myLibrary.length;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.pagesRead = pagesRead;
	this.status = status;
}

Book.prototype.logInfo = function () {
	return `${this.index} ${this.title} by ${this.author}, ${this.pages} pages, read ${this.pagesRead}, ${this.status}`;
};

function getCurrentStatus(card) {
	let cardRadios = Array.from(card.querySelectorAll("input[type='radio']"));
	let currentStatus;
	for (let i = 0; i < cardRadios.length; i++) {
		if (cardRadios[i].checked) currentStatus = cardRadios[i].value;
	}
	return currentStatus;
}

function changeBookStatus(event) {
	let statusValue = event.target.value;
	let thisCard = event.target.parentNode.parentNode.parentNode.parentNode;
	let thisCardIndex = thisCard.classList[1];
	let thisBook = myLibrary[thisCardIndex];
	let thisCardPagesRead = thisCard.querySelector(".pages-read");

	if (statusValue === "read") {
		thisCard.style.backgroundColor = "#bef264";
		thisBook.status = "Read";
		thisBook.pagesRead = thisBook.pages;
	} else if (statusValue === "notread") {
		thisCard.style.backgroundColor = "#fca5a5";
		thisBook.status = "Not Read";
		thisBook.pagesRead = 0;
	} else if (statusValue === "reading") {
		thisCard.style.backgroundColor = "#fdba74";
		thisBook.status = "Reading";
		thisBook.pagesRead = prompt("Which page are you currently on?");
	}
	thisCardPagesRead.innerHTML = `<b>Number of Pages Read:</b> ${thisBook.pagesRead}`;
	setLogInfo();
}

function createBookCard(index, title, author, pages, pagesRead, status) {
	let card = document.createElement("div");
	card.className = `card ${index}`;
	card.innerHTML = `
						<div class="card-header">
							<h3 class="title">${title}</h3>
							<button class="delete">
								<img src="img/trash-can.svg" alt="" onclick="deleteCard(event)"/>
							</button>
						</div>	
						<p class="author"><b>Author:</b> ${author}</p>
						<p class="pages"><b>Number of Pages</b>: ${pages}</p>
						<p class="pages-read"><b>Number of Pages Read:</b> ${pagesRead}</p>
						<fieldset class="book-status">
							<legend>Book Status</legend>
							<div class="options">
								<div class="option">
									<label for="status-read-${index}"> Read </label>
									<input
										type="radio"
										id="status-read-${index}"
										name="status-${index}"
										value="read"
										oninput="changeBookStatus(event)"
										${status === "Read" ? "checked" : ""}/>
								</div>
								<div class="option">
									<label for="status-notread-${index}"> Not Read </label>
									<input
										type="radio"
										id="status-notread-${index}"
										name="status-${index}"
										value="notread" 
										oninput="changeBookStatus(event)"
										${status === "Not Read" ? "checked" : ""}/>
								</div>
								<div class="option">
									<label for="status-in-progress-${index}"> Reading </label>
									<input
										type="radio"
										id="status-in-progress${index}"
										name="status-${index}"
										value="reading"
										oninput="changeBookStatus(event)"
										${status === "Reading" ? "checked" : ""}/>
								</div>
							</div>
						</fieldset>`;
	// eslint-disable-next-line no-nested-ternary
	card.style.backgroundColor =
		// eslint-disable-next-line no-nested-ternary
		status === "Read"
			? "#bef264"
			: status === "Not Read"
			? "#fca5a5"
			: "#fdba74";
	return card;
}

function updateIndexes(index) {
	for (let i = index; i < myLibrary.length; i++) {
		myLibrary[i].index -= 1;
	}
}

function displayLibrary() {
	bookCardsContainer.innerHTML = "";
	for (let i = 0; i < myLibrary.length; i++) {
		let card = createBookCard(
			myLibrary[i].index,
			myLibrary[i].title,
			myLibrary[i].author,
			myLibrary[i].pages,
			myLibrary[i].pagesRead,
			myLibrary[i].status
		);
		bookCardsContainer.appendChild(card);
	}
}

function deleteCard(event) {
	let thisCard = event.target.parentNode.parentNode.parentNode;
	let thisCardIndex = thisCard.classList[1];
	myLibrary.splice(thisCardIndex, 1);
	cards.splice(thisCardIndex, 1);
	bookCardsContainer.removeChild(thisCard);
	updateIndexes(thisCardIndex);
	displayLibrary();
	setLogInfo();
}

function addBookFormHide() {
	addBookForm.style = "display: none;";
	container.style = "";
}

function addBookFormDisplay() {
	addBookForm.style = "display: flex;";
	container.style = "filter: blur(5px);";
}

function addCardToScreen(book) {
	let card = createBookCard(
		book.index,
		book.title,
		book.author,
		book.pages,
		book.pagesRead,
		book.status
	);
	cards.push(card);
	bookCardsContainer.appendChild(card);
}

function resetInputForm() {
	addBookForm.reset(); // Reset the whole form
	disableInput(inputBookPagesRead);
}

function generateRandomString(length) {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

function addRandomBookToLibrary(event) {
	let statusList = ["Read", "Not Read", "Reading"];
	newBook = new Book(
		`Random Book #${myLibrary.length}`,
		generateRandomString(10),
		Math.floor(Math.random() * 1000),
		null,
		statusList[Math.floor(Math.random() * 3)]
	);
	// eslint-disable-next-line no-nested-ternary
	newBook.pagesRead =
		// eslint-disable-next-line no-nested-ternary
		newBook.status === "Read"
			? newBook.pages
			: newBook.status === "Not Read"
			? 0
			: newBook.pages - Math.floor(Math.random() * newBook.pages);

	myLibrary.push(newBook);
	addCardToScreen(newBook);
	event.preventDefault(); // Prevent the window from reloading again
	setLogInfo();
	// console.log(newBook);
}

function addBookToLibrary(event) {
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
		} else if (!inputBookPagesRead.required && newBook.status === "Read") {
			newBook.pagesRead = inputBookPages.value;
		} else if (!inputBookPagesRead.required && newBook.status === "Not Read") {
			newBook.pagesRead = 0;
		}
	}
	myLibrary.push(newBook);
	addCardToScreen(newBook);
	event.preventDefault(); // Prevent the window from reloading again
	resetInputForm();
	addBookFormHide();
	setLogInfo();
}

function toggleAddBookForm(event) {
	if (event.target === openFormButton) {
		addBookFormDisplay();
		event.preventDefault();
	} else if (event.target === closeFormButton) {
		resetInputForm();
		addBookFormHide();
		event.preventDefault();
	}
}

addBookForm.addEventListener("submit", addBookToLibrary);
openFormButton.addEventListener("click", toggleAddBookForm);
closeFormButton.addEventListener("click", toggleAddBookForm);

function clearAll() {
	myLibrary.length = 0;
	cards.length = 0;
	bookCardsContainer.innerHTML = "";
	setLogInfo();
}
clearAllButton.addEventListener("click", clearAll);

window.onload = () => {
	setLogInfo();
};
