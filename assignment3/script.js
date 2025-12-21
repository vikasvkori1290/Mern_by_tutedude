// Selecting elements from the DOM
const greeting = document.getElementById('greeting');
const nameInput = document.getElementById('userName');
const greetBtn = document.getElementById('greetBtn');
const boxes = document.querySelectorAll('.color-box');

// Function to change greeting text
greetBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name !== "") {
        greeting.textContent = `Hello, ${name}`;
    } else {
        greeting.textContent = "Hello";
    }
});

// Function to fill box colors on click
boxes.forEach(box => {
    box.addEventListener('click', () => {
        // Use the ID (red, blue, etc.) to apply the background color
        box.style.backgroundColor = box.id;
        
        // Improve contrast for dark colors
        if (box.id === 'blue' || box.id === 'red') {
            box.style.color = 'white';
        }
    });
});