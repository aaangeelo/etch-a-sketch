// GLOBAL VALUES
let gridContainer = document.getElementById("grid-container");
let isDrawing = false;

// CREATE AND REMOVE GRIDS
function displayGrids(gridSizeValue) {
  let idNum = 1;
  for (i = 1; i <= gridSizeValue; i++) {
    for (j = 1; j <= gridSizeValue; j++) {
      let grids = document.createElement("div");
      gridContainer.appendChild(grids);
      grids.classList.add("grids");
      // modifies the width and height of the grids
      let wh = 500 / gridSizeValue;
      grids.style.width = `${wh}px`;
      grids.style.height = `${wh}px`;
      // adds ID to each grids
      grids.id = `id${idNum}`;
      idNum++;
    }
  }
}

function removeGrids() {
  let grids = document.getElementsByClassName("grids");
  while (grids.length > 0) {
    grids[0].parentNode.removeChild(grids[0]);
  }
}

// COLORS THE GRID
function colorGrids(color, e) {
  if (isDrawing === true) {
    if (e.target !== e.currentTarget) {
      let grids = document.getElementById(e.target.id);
      if (typeof color === "function") {
        grids.style.backgroundColor = color();
        grids.style.borderColor = "transparent";
      } else {
        grids.style.backgroundColor = color;
        grids.style.borderColor = "transparent";
      }
    }

    e.stopPropagation();
  }
}

// RANDOM COLOR
function getColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function activateColorizer(color) {
  gridContainer.addEventListener("click", (e) => {
    isDrawing = true;
    colorGrids(color, e);
  });

  gridContainer.addEventListener("mouseover", (e) => {
    colorGrids(color, e);
  });

  gridContainer.addEventListener("dblclick", () => {
    isDrawing = false;
  });
}

function decolorizeGrids(e) {
  isDrawing = false;
  let grids = document.getElementById(e.target.id);
  grids.style.backgroundColor = "transparent";
  grids.style.borderColor = "black";
}

function selectMode() {
  if (this.value === document.getElementById("clear").value) {
    isDrawing = false;
    gridContainer.addEventListener("click", (e) => {
      decolorizeGrids(e);
    });
    let allgrids = document.querySelectorAll(".grids");
    for (let i = 0; i < allgrids.length; i++) {
      allgrids[i].style.backgroundColor = "transparent";
      allgrids[i].style.borderColor = "black";
    }
  } else if (this.value === document.getElementById("erase").value) {
    isDrawing = false;
    gridContainer.addEventListener("click", (e) => {
      if (e.target !== e.currentTarget) {
        decolorizeGrids(e);
      }
    });
  } else if (this.value === document.getElementById("black").value) {
    activateColorizer("black");
  } else if (this.value === document.getElementById("rgb").value) {
    activateColorizer(getColor);
  }
}

// EXECUTIONS AREA
let defaultGridSizeValue = 8;
displayGrids(defaultGridSizeValue);

document.getElementById("submit-grid-size").addEventListener("click", () => {
  let newGridSizeValue = document.getElementById("grid-size").value;
  removeGrids();
  displayGrids(newGridSizeValue);
});

let modes = document.querySelectorAll('input[name="mode"]');
for (const mode of modes) {
  mode.addEventListener("change", selectMode);
}
