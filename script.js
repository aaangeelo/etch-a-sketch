let gridContainer = document.getElementById("grid-container");

let value = 16;

for (i = 0; i < value; i++) {
  for (j = 1; j <= value; j++) {
    let grids = document.createElement("div");
    grids.classList.add("grids");
    grids.setAttribute("id", "grids");
    gridContainer.appendChild(grids);
    let wh = 500 / value;
    grids.style.width = `${wh}px`;
    grids.style.height = `${wh}px`;
  }
}
