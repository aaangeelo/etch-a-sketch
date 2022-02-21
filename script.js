// GLOBAL VALUES
let gridContainer = document.getElementById("gridContainer");
let isDrawing = false;
let color;

// CREATES GRIDS
function displayGrids(gridSizeValue) {
  gridContainer.style.gridTemplateColumns = `repeat(${gridSizeValue}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSizeValue}, 1fr)`;
  for (i = 1; i <= gridSizeValue * gridSizeValue; i++) {
    let grids = document.createElement("div");
    gridContainer.appendChild(grids);
    grids.classList.add("grids");
    grids.id = `id${i}`;
  }
}

function removeGrids() {
  let grids = document.getElementsByClassName("grids");
  while (grids.length > 0) {
    grids[0].parentNode.removeChild(grids[0]);
  }
}

// GENERATES RANDOM COLOR
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// COLORS THE GRIDS
function colorGrids(e) {
  isDrawing = true;
  if (e.target !== e.currentTarget) {
    let grids = document.getElementById(e.target.id);
    typeof color === "function"
      ? (grids.style.backgroundColor = color())
      : (grids.style.backgroundColor = color);

    grids.style.borderColor = "transparent";
  }

  e.stopPropagation();
}

function activateColorizer(colour) {
  color = colour;

  gridContainer.addEventListener("click", colorGrids);

  gridContainer.addEventListener("mouseover", (e) => {
    if (isDrawing === true) colorGrids(e);
  });

  gridContainer.addEventListener("dblclick", () => {
    isDrawing = false;
  });
}

function decolorizeGrids(e) {
  let grids = document.getElementById(e.target.id);
  grids.style.backgroundColor = "white";
  grids.style.borderColor = "black";
  console.log(isDrawing, "decolorizeGrids");
}

function selectMode() {
  isDrawing = false;
  if (this.value === document.getElementById("clear").value) {
    gridContainer.removeEventListener("click", colorGrids);
    let allgrids = document.querySelectorAll(".grids");
    for (let i = 0; i < allgrids.length; i++) {
      allgrids[i].style.backgroundColor = "white";
      allgrids[i].style.borderColor = "black";
    }
  } else if (this.value === document.getElementById("erase").value) {
    gridContainer.removeEventListener("click", colorGrids);
    gridContainer.addEventListener("click", decolorizeGrids);
  } else if (this.value === document.getElementById("black").value) {
    gridContainer.removeEventListener("click", decolorizeGrids);
    activateColorizer("black");
  } else if (this.value === document.getElementById("rgb").value) {
    gridContainer.removeEventListener("click", decolorizeGrids);
    activateColorizer(getRandomColor);
  }
}

// EXECUTIONS AREA
window.onload = () => {
  let gridSlider = document.getElementById("customGridSlider");
  let displayGridSize = document.getElementById("displayGridSize");

  displayGridSize.textContent = `${gridSlider.value}x${gridSlider.value}`;
  displayGrids(gridSlider.value);

  gridSlider.addEventListener("input", () => {
    displayGridSize.textContent = `${gridSlider.value}x${gridSlider.value}`;
    removeGrids();
    displayGrids(gridSlider.value);
  });

  let modes = document.querySelectorAll('input[name="mode"]');
  for (const mode of modes) {
    mode.addEventListener("change", selectMode);
  }
};
