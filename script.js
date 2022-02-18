let gridContainer = document.getElementById("grid-container");
let clear = document.getElementById("clear");

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
let defaultGridSizeValue = 8;
displayGrids(defaultGridSizeValue);

document.getElementById("submit-grid-size").addEventListener("click", () => {
  let gridSize = document.getElementById("grid-size");
  let newGridSizeValue = gridSize.value;
  removeGrids();
  displayGrids(newGridSizeValue);
});

// colors the grids with black on hover
let isDrawing = false;
gridContainer.addEventListener("click", (e) => {
  isDrawing = true;
  if (isDrawing === true) {
    if (e.target !== e.currentTarget) {
      let grids = document.getElementById(e.target.id);
      grids.style.backgroundColor = "black";
    }
  }
});

gridContainer.addEventListener("mouseover", (e) => {
  if (isDrawing === true) {
    if (e.target !== e.currentTarget) {
      let grids = document.getElementById(e.target.id);
      grids.style.backgroundColor = "black";
    }
  }
});

gridContainer.addEventListener("dblclick", () => {
  isDrawing = false;
});

// clears the color
clear.addEventListener("click", () => {
  let allgrids = document.querySelectorAll(".grids");
  for (let i = 0; i < allgrids.length; i++) {
    allgrids[i].style.backgroundColor = "transparent";
  }
});
