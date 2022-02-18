let gridContainer = document.getElementById("grid-container");
let clear = document.getElementById("clear");

let value = 16;
let idNum = 1;
for (i = 0; i < value; i++) {
  for (j = 1; j <= value; j++) {
    let grids = document.createElement("div");
    grids.classList.add("grids");
    grids.id = `id${idNum}`;
    gridContainer.appendChild(grids);
    let wh = 500 / value;
    grids.style.width = `${wh}px`;
    grids.style.height = `${wh}px`;
    idNum++;
  }
}

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
