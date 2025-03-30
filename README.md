# library
A project for the odin project.

# Library System Explanation

This document explains how the library system works, detailing the purpose of each variable, function, and object, and describing the flow of operations when a user interacts with the system.

---

## Overview

The library system is a simple web application that allows users to manage a collection of books. Users can:
1. Add a new book with details such as title, author, number of pages, and read status.
2. View the list of books in the library.
3. Update the read status of a book.
4. Remove a book from the library.

The system is built using HTML, CSS, and JavaScript. It dynamically updates the DOM to reflect changes in the library.

---

## Key Components

### HTML Structure

1. **Overlay (`.overlay`)**: A semi-transparent background that appears when the "Add Book" form is displayed.
2. **Display Box (`.displaybox`)**: A modal box where users input book details.
3. **Content List (`.content-list`)**: A container (`ul`) where book cards are displayed.
4. **Base Card (`#basecard`)**: A hidden template card used to create new book entries dynamically.

### CSS Highlights

1. **Gradients**: Custom gradients are defined using CSS variables for buttons and backgrounds.
2. **Responsive Design**: The `.content-list` uses a grid layout with `auto-fit` to ensure responsiveness.
3. **Hidden Elements**: The `.overlay` and `.displaybox` are initially hidden and displayed dynamically using JavaScript.

---

## JavaScript Functionality

### Variables

1. **DOM Elements**:
   - `overlay`: The semi-transparent background.
   - `displaybox`: The modal box for adding books.
   - `title`, `author`, `pages`: Input fields for book details.
   - `contentList`: The container for displaying book cards.
   - `card`: The template card for creating new book entries.

2. **State Variables**:
   - `readStatus`: A boolean (`false` by default) that tracks whether the book is marked as read or not.
   - `myLibrary`: An array that stores all book objects.

---

### Functions

1. **`removeAndShift(array, indexToRemove)`**
   - Removes an element from the `array` at the specified index.
   - Ensures the library array (`myLibrary`) stays updated when a book is removed.

2. **`bookInfo(id, title, author, pages, readStatus)`**
   - A constructor function that creates a book object with the given properties:
     - `id`: A unique identifier for the book.
     - `title`: The book's title.
     - `author`: The book's author.
     - `pages`: The number of pages in the book.
     - `readStatus`: Whether the book has been read.

3. **`setBookInfo(id, title, author, pages, readStatus)`**
   - A helper function that creates and returns a new book object using the `bookInfo` constructor.

4. **`displayBookInfo(array)`**
   - Dynamically creates and displays a book card for the last book in the `array`.
   - Clones the `card` template, populates it with book details, and appends it to the `contentList`.

---

### Event Listeners

1. **Add Book Button (`.btn`)**
   - Clears the input fields.
   - Displays the `overlay` and `displaybox`.

2. **Read Status Toggle (`.readButton`)**
   - Toggles the `readStatus` variable and updates the button's appearance.

3. **Submit Button (`.box-btn`)**
   - Validates the input fields.
   - Creates a new book object using `setBookInfo`.
   - Adds the book to `myLibrary` and updates the DOM using `displayBookInfo`.
   - Hides the `overlay` and `displaybox`.

4. **Remove Button (`.rmv`)**
   - Finds the book in `myLibrary` using its unique ID.
   - Removes the corresponding DOM element and updates the `myLibrary` array using `removeAndShift`.

---

## Step-by-Step Scenario

### Adding a Book

1. **User Action**: The user clicks the "Add Book" button.
   - The `overlay` and `displaybox` are displayed.
   - Input fields are cleared.

2. **User Input**: The user fills in the book details and clicks "Add Book".
   - The input fields are validated.
   - A new book object is created using `setBookInfo` function which in turn uses the `bookInfo` constructor.
   - The book is added to `myLibrary`.
   - The `displayBookInfo` function creates a new card and appends it to the `contentList`.
   - The `overlay` and `displaybox` are hidden.

### Updating Read Status

1. **User Action**: The user clicks the "Read Status" toggle button on a book card.
   - The `readStatus` variable is toggled.
   - The button's appearance is updated to reflect the new status.

### Removing a Book

1. **User Action**: The user clicks the "Remove" button on a book card.
   - The book's unique ID is used to find it in `myLibrary`.
   - The corresponding DOM element is removed.
   - The book is removed from `myLibrary` using `removeAndShift`.

---

## Example

### Initial State
- `myLibrary` contains one book: "Mere Christianity" by C.S. Lewis.

### Adding a New Book
1. The user clicks "Add Book" and enters:
   - Title: "1984"
   - Author: "George Orwell"
   - Pages: "328"
   - Read Status: "Not Read"
2. A new book object is created and added to `myLibrary`.
3. A new card is displayed in the `contentList`.

### Removing a Book
1. The user clicks "Remove" on the "1984" card.
2. The card is removed from the DOM.
3. The book is removed from `myLibrary`.

---

This system provides a simple and interactive way to manage a library of books.
