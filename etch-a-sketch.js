let size = 16;

const gridContainer = document.querySelector("#grid-container");
const body = document.querySelector("body");
const sizeButton = document.querySelector("#size");
const headerSize = document.querySelector("h1");

sizeButton.addEventListener("click", () => {
    size = parseInt(prompt("Please enter new size of grid (between 1-100)"));
    if (size >= 1 && size <= 100) {
        // console.log(typeof size);
        removeAndGenerate();
    }
    else {
        while (size < 0 || size > 100 || size === null || isNaN(size)) {
            if (size > 100) {
                size = parseInt(prompt("Number too big, please enter a smaller one (between 1-100)"));
            }
            else if (size < 0) {
                size = parseInt(prompt("Number below zero, please enter a positive one (between 1-100)"));
            }
            else if (typeof size === 'string' && isNaN(size) || (size === null || isNaN(size))) {
                size = parseInt(prompt("Invalid input, please enter a number between 1-100"));
            }
            // console.log(size);
            // console.log(typeof size);
        }
        removeAndGenerate();
    }
});

function removeAndGenerate() {
    const rowSelector = document.querySelectorAll("div.row");
    // Removed rows;
    rowSelector.forEach((row) => {
        gridContainer.removeChild(row);
    });
    generateGrid();
}

function generateGrid() {
    // Create a new row for every amount of defined squares in the grid
    //  Ex. 16 squares in a row (inner loop), 16 times (outer loop)
    for (let i = 0; i < size; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < size; j++) {
            const div = document.createElement("div");
            div.classList.add("box");

            // Allows user to hold mousedown to draw when hovering
            // over canvas
            gridContainer.addEventListener("mousedown", (e) => {
                e.preventDefault();

                div.onmousemove = function() {
                    if (!(div.classList.contains("colorBox"))) {
                        div.classList.add("colorBox");
                        console.log("colored")
                    }
                }
            });

            gridContainer.addEventListener("mouseup", () => {
                div.onmousemove = null;
            });
            body.addEventListener("mouseup", () => {
                div.onmousemove = null;
            });


            row.appendChild(div);
        }
        gridContainer.appendChild(row);
    }
    headerSize.textContent = `Size: ${size}x${size}`
}

generateGrid();

const rowSelector = document.querySelectorAll("div.row");
