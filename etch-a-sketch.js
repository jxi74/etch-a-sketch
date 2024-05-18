let size = 16;
let tool = "red";
let lastSelected = "colorRed";
let lastSize = 16;

const gridContainer = document.querySelector("#grid-container");
const body = document.querySelector("body");
const sizeButton = document.querySelector("#size");
const headerSize = document.querySelector("h1");

sizeButton.addEventListener("click", () => {
    size = prompt("Please enter new size of grid (between 1-100)");
    if (Number(size) >= 1 && Number(size) <= 100) {
        console.log(size);
        console.log(typeof size);
        lastSize = size;
        removeAndGenerate();
    }
    else {
        while (isNaN(Number(size)) || Number(size) < 1 || Number(size) > 100) {
            console.log(size);
            console.log(typeof size);
            if (Number(size) > 100) {
                size = prompt("Number too big, please enter a smaller one (between 1-100)");
            }
            else if (size === null) {
                console.log("cancel");
                size = lastSize;
                console.log("size = lastSelected")
                return;
            }
            else if (Number(size) < 1) {
                size = prompt("Number is zero or below, please enter a positive one (between 1-100)");
            }
            else if (isNaN(Number(size))) {
                size = prompt("Invalid input, please enter a number between 1-100");
            }
        }
        if (size !== null) {
            //console.log("lastSize = size");
            lastSize = size;
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

            addPaintListener(div);

            row.appendChild(div);
        }
        gridContainer.appendChild(row);
    }
    headerSize.textContent = `Size: ${size}x${size}`
}

function addPaintListener(div) {
    // console.log(lastSelected);
    // console.log(tool);
    // Allows user to hold mousedown to draw when hovering
    // over canvas
    gridContainer.addEventListener("mousedown", (e) => {
        e.preventDefault(); // To prevent dragging of div

        div.onmousemove = function() {
            switch(tool) {
                case "black":
                    if (!(div.classList.contains("colorBlack"))) {
                        div.classList.remove("colorRed");
                        div.classList.remove("colorBlue");
                        div.classList.remove("colorGreen");
                        div.classList.remove("colorYellow");
                        div.classList.add("colorBlack");
                        //console.log("colored black")
                    }
                    break;
                case "red":
                    if (!(div.classList.contains("colorRed"))) {
                        div.classList.remove("colorBlack");
                        div.classList.remove("colorBlue");
                        div.classList.remove("colorGreen");
                        div.classList.remove("colorYellow");
                        div.classList.add("colorRed");
                        //console.log("colored red")
                    }
                    break;
                case "green":
                    if (!(div.classList.contains("colorGreen"))) {
                        div.classList.remove("colorBlack");
                        div.classList.remove("colorBlue");
                        div.classList.remove("colorRed");
                        div.classList.remove("colorYellow");
                        div.classList.add("colorGreen");
                        //console.log("colored green")
                    }
                    break;
                case "yellow":
                    if (!(div.classList.contains("colorYellow"))) {
                        div.classList.remove("colorBlack");
                        div.classList.remove("colorBlue");
                        div.classList.remove("colorRed");
                        div.classList.remove("colorGreen");
                        div.classList.add("colorYellow");
                        //console.log("colored yellow")
                    }
                    break;
                case "eraser":
                    if (!(div.classList.contains("colorBlue"))) {
                        div.classList.remove("colorBlack");
                        div.classList.remove("colorRed");
                        div.classList.remove("colorGreen");
                        div.classList.remove("colorYellow");
                        div.classList.add("colorBlue");
                        //console.log("erased")
                    }
                    break;
                case "reset":
                    div.classList.remove("colorBlack");
                    div.classList.remove("colorRed");
                    div.classList.remove("colorGreen");
                    div.classList.remove("colorYellow");
                    div.classList.remove("colorBlue");

                    if (lastSelected === "colorBlue") {
                        //console.log("eraser changed")
                        lastSelected = "colorRed";
                        div.classList.add("colorRed");
                    } else {
                        div.classList.add(lastSelected);
                    }
                    break;
            }
        }
    });

    gridContainer.addEventListener("mouseup", () => {
        div.onmousemove = null;
    });
    body.addEventListener("mouseup", () => {
        div.onmousemove = null;
    });
}

function removeShadows() {
    //console.log(lastSelected)
    tools.forEach((chosenTool) => {
        if (lastSelected === "colorBlue") {
            eraserBlock.classList.remove("shadow");
            redBlock.classList.add("shadow");
        } else {
            chosenTool.classList.remove("shadow");
        }
    });
}

function changeTool(chosenTool) {
    switch(chosenTool.id) {
        case "black-block":
            tool = "black";
            lastSelected = "colorBlack";
            break;
        case "red-block":
            tool = "red";
            lastSelected = "colorRed";
            break;
        case "green-block":
            tool = "green";
            lastSelected = "colorGreen";
            break;
        case "yellow-block":
            tool = "yellow";
            lastSelected = "colorYellow";
            break;
        case "eraser":
            tool = "eraser";
            lastSelected = "colorBlue";
            break;
        case "reset":
            tool = "reset"
            removeAndGenerate();
            break;
    }
    if (tool !== "reset") {
        chosenTool.classList.add("shadow");
        boxes.forEach((box) => {
            addPaintListener(box);
        });
    }
}

generateGrid();

const boxes = document.querySelectorAll(".box");
const eraserBlock = document.querySelector("#eraser");
const redBlock = document.querySelector("#red-block");

const tools = document.querySelectorAll(".hov");
tools.forEach((chosenTool) => {
    chosenTool.addEventListener("click", function() {
        if (chosenTool.id !== "reset" || lastSelected === "colorBlue") {
            removeShadows();
        }
        changeTool(chosenTool);
    });
});

const rowSelector = document.querySelectorAll("div.row");
