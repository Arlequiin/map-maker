console.log("Hello js")
const coordinates = document.getElementById("coordinate");

document.getElementById("tileset").addEventListener("mousemove", function(event) {
    coordinates.innerHTML = `X: ${event.offsetX}, Y: ${event.offsetY}`;
});

function round_to(rounded, num) {
  return parseInt(rounded * Math.ceil(parseFloat(num) / rounded));
}

function syncImage(){
    let dropdown = document.getElementById('drop')
    let image = document.getElementById('tileset')
    image.src = `/static/data/tilesets/images/${dropdown.value}`
}

function getSelection() {
    console.log("Getting selection")
    const image = document.getElementById("tileset");
    const coordinates = document.getElementById("coordinate");

    image.addEventListener("mousemove", function(event) {
        const x = event.offsetX;
        const y = event.offsetY;
    });
    alert(x);
    alert(y);
  fetch(`/selection/${x}/${y}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}


function getXY(){
  getSelectionTile(16,16)
}
function getSelectionTile(tilesizex,tilesizey) {
  const tileset_img = document.getElementById("tileset");
const dropdown = document.getElementById('drop').value
    function handleMouseMove(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        console.log(x,y)
        fetch(`/selection/${x}/${y}/${dropdown}/${tilesizex}/${tilesizey}`)
        .then(response => response.json())
        .then(data => {
            let style_rect = `width: ${tilesizex}px; height: ${tilesizey}px; object-position: -${data.box[0]}px -${data.box[1]}px; object-fit: none;`;
            const img = document.getElementById("cropped-image");
            img.src = `static/data/tilesets/images/${dropdown}`;
            img.style=style_rect;
            img.classList = []; 
            img.classList.add(`${data.box[0]}|${data.box[1]}`)
            document.getElementById("idc").textContent=`${data.box[0]/16+15*(data.box[1]/16)}`
        })
        .catch(error => console.error(error));
        tileset_img.removeEventListener("mousemove", handleMouseMove);
    }
    tileset_img.addEventListener("mousemove", handleMouseMove); 
}


function updateGrid() {
    const is_grid = document.getElementById('grid').checked;
    const tiles = document.querySelectorAll('.tile');
    
    if (is_grid) {
      tiles.forEach(tile => {
        tile.style.border = '1px solid #0000ff';
      });
    } else {
      tiles.forEach(tile => {
        tile.style.border = 'none';
      });
    }
  }
  

  function updateGridTileset() {
    const is_grid = document.getElementById('gridtileset').checked;
    const tiles = document.querySelector('.tile-overlay');
    
    if (is_grid) {
        tiles.style.zIndex = '5';
    } else {
        tiles.style.zIndex = '-1';
    }
  }
  

  function getTileprompt() {
    const tileset_img = document.getElementById("tileset");
    let coord = prompt("Tile selection (eg. 2,3)");
    coord = coord.split(",");
    tilesizex = parseInt(coord[0])*16;
    tilesizey = parseInt(coord[1])*16;
    let dropdown = document.getElementById('drop').value
    function handleMouseMove(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      console.log(x,y)
      fetch(`/selection/${x}/${y}/${dropdown}/${tilesizex}/${tilesizey}`)
      .then(response => response.json())
      .then(data => {
          let style_rect = `width: ${tilesizex}px; height: ${tilesizey}px; object-position: -${data.box[0]}px -${data.box[1]}px; object-fit: none;`;
          const img = document.getElementById("cropped-image");
          img.src = `static/data/tilesets/images/${dropdown}`;
          img.style=style_rect;
          img.classList = []; 
          img.classList.add(`${data.box[0]}|${data.box[1]}`)
      })
      .catch(error => console.error(error));
      tileset_img.removeEventListener("mousemove", handleMouseMove);
  }
  tileset_img.addEventListener("mousemove", handleMouseMove); 
};
  
function setGrid(width,length){
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzαβψδεφγηιξκλμνοπ;ρστθωςχυζΑΒΨΔΕΦΓΗΙΞΚΛΜΝΟΠ;ΡΣΤΘΩΣΧΥΖ";
  const container = document.getElementById("container-canva");
  for(let i = 0; i < length; i++) {
    for(let j = 0; j < width; j++) {
      const tile = document.createElement("div");
      tile.setAttribute("id", `${alphabet[i]}${j}`);
      tile.setAttribute("title", `${i}|${j}`);
      tile.setAttribute("onmouseout", `setDrawMode('${alphabet[i]}${j}')`);
      tile.setAttribute("onclick", `setSelected('${alphabet[i]}${j}')`);
      tile.classList.add("tile");
      container.appendChild(tile);
      let image = document.createElement('img');
      tile.appendChild(image)
    }
  }
  container.style.gridTemplateRows=`repeat(${length},16px)`;
  container.style.gridTemplateColumns=`repeat(${width},16px)`;
}
  setGrid(50,40)


function resizeEditor(){
l=parseInt(document.getElementById("length").value);
w=parseInt(document.getElementById("width").value);
resizeEditorNoLW(w,l)
}

function resizeEditorNoLW(w,l){
const container = document.getElementById("container-canva")
container.innerHTML=''
container.style.height=`${l*16}px`
container.style.width=`${w*16}px`
console.log(container.style.gridTemplateRows)
setGrid(w,l)
}

function setSelected(id) {
const selectedTile = document.getElementById(id);
const croppedImage = document.getElementById("cropped-image");
const region = croppedImage.classList[0].split("|")
let bg_style = `background-image:url(${croppedImage.src});width: 16px; height: 16px; background-position: -${region[0]}px -${region[1]}px;`
let img_style = `width: 16px; height: 16px; object-position: -${region[0]}px -${region[1]}px; object-fit: none;`;
if (document.getElementById("tile_mode").value == "middle"){
if (croppedImage.complete) {
  if (selectedTile.classList.length==1){
    selectedTile.style = bg_style
    selectedTile.classList.add("M"+document.getElementById("drop").value+"["+region+"]");
    } else {
      selectedTile.style = bg_style
      selectedTile.classList.replace(selectedTile.classList[1],"M"+document.getElementById("drop").value+"["+region+"]")
    }
} else {
  croppedImage.onload = function() {
    if (selectedTile.classList.length==1){
      selectedTile.style = bg_style
    selectedTile.classList.add("M"+document.getElementById("drop").value+"["+region+"]");
    } else {
      selectedTile.style = bg_style
      selectedTile.classList.replace(selectedTile.classList[1],"M"+document.getElementById("drop").value+"["+region+"]")
    }
  }
} 
} else {
let image = selectedTile.getElementsByTagName('img')[0];
if (croppedImage.complete) {
  if (selectedTile.classList.length==2){
    image.src = croppedImage.src;
  image.style=img_style;
  selectedTile.classList.add("U"+document.getElementById("drop").value+"["+region+"]");
  image.src = croppedImage.src;
  image.style=img_style;
  } else if (selectedTile.classList.length==1){
    alert("You can't put an upper tile without a middle tile, please fill the blank.")
  } else if (selectedTile.classList.length==3){
    image.src = croppedImage.src;
    image.style=img_style;
    console.log("U"+document.getElementById("drop").value+"["+region+"]")
    selectedTile.classList.replace(selectedTile.classList[2],"U"+document.getElementById("drop").value+"["+region+"]")
    console.log(selectedTile.classList)


  }
} else {
  croppedImage.onload = function() {
    if (selectedTile.classList.length==2){
    image.src = croppedImage.src;
  image.style=img_style;
  selectedTile.classList.add("U"+document.getElementById("drop").value+"["+region+"]");
  image.src = croppedImage.src;
  image.style=img_style;
  } else if (selectedTile.classList.length==1){
    alert("You can't put an upper tile without a middle tile, please fill the blank.")
  } else if (selectedTile.classList.length==3){
    image.src = croppedImage.src;
    image.style=img_style;
    console.log("U"+document.getElementById("drop").value+"["+region+"]")
    selectedTile.classList.replace(selectedTile.classList[2],"U"+document.getElementById("drop").value+"["+region+"]")


  }
  }
}

}
}

document.getElementById('importButton').addEventListener('click', function() {
importMap()
});


function setDrawMode(id){
let draw = document.getElementById("draw").checked;
if (draw){
    setSelected(id)
}
}
document.addEventListener('keydown', evt => {
if (evt.key === 'P' || evt.key == 'p') {
    toggleDrawMode();
}
});

function toggleDrawMode(event) {
const drawCheckbox = document.getElementById('draw');
drawCheckbox.checked = !drawCheckbox.checked;
}

function fill() {
const is_grid = document.getElementById('grid').checked;
const tiles = document.querySelectorAll('.tile');
const croppedImage = document.getElementById("cropped-image");
const region = croppedImage.classList[0].split("|")
let bg_style = `background-image:url(${croppedImage.src});width: 16px; height: 16px; background-position: -${region[0]}px -${region[1]}px;`
  tiles.forEach(tile => {
    if (tile.classList.length==1){
      tile.style = bg_style
    tile.classList.add("M"+document.getElementById("drop").value+"["+region+"]");
    } else {
      tile.style = bg_style
      tile.classList.replace(tile.classList[1],"M"+document.getElementById("drop").value+"["+region+"]")
    }
  });
}


function exportMap() {
l=parseInt(document.getElementById("length").value);
w=parseInt(document.getElementById("width").value);
let map = `${l},${w}`
const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile => {
map = map + tile.classList;
});

const blob = new Blob([map], { type: 'text/plain' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'untitled.map';
a.click();
}

async function importMap() {
Clear();
let fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.onchange = async function(event) {
let file = event.target.files[0];
let reader = new FileReader();
reader.onload = async function(event) {
  let fileContent = event.target.result;
  fileContent = fileContent.toString();
  Classes = fileContent.split("tile");
  console.log(Classes)
  fileContent = fileContent.split("tile");
  let dimensions = fileContent[0].split(",");
  resizeEditorNoLW(parseInt(dimensions[1]),parseInt(dimensions[0]))
  for (let i = 1; i < fileContent.length; i++) {
    fileContent[i]=fileContent[i].replaceAll(" ","").replace('M','').split('U')
    fileContent[i][0]=fileContent[i][0].split('.png')
    fileContent[i][0][1]=JSON.parse(fileContent[i][0][1].split("M")[0])
    if (fileContent[i].length==2){
    fileContent[i][1]=fileContent[i][1].split('.png')
    fileContent[i][1][1]=JSON.parse(fileContent[i][1][1].split("M"))
    }
  }
  let count = 0;
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(async tile => {
    count++
    // middle tile
    let bg_style = `background-image:url(static/data/tilesets/images/${fileContent[count][0][0]}.png);width: 16px; height: 16px; background-position: -${fileContent[count][0][1][0]}px -${fileContent[count][0][1][1]}px;`
    tile.classList.add("tile")
    console.log(Classes[count].split(" ")[1])
    tile.classList.add(Classes[count].split(" ")[1])
  tile.style=bg_style;
   // upper tile
    if (fileContent[count].length == 2) {
      let img_style = `width: 16px; height: 16px; object-position: -${fileContent[count][1][1][0]}px -${fileContent[count][1][1][1]}px; object-fit: none;`;
      tile.getElementsByTagName('img')[0].src=`static/data/tilesets/images/${fileContent[count][1][0]}.png`;
      tile.getElementsByTagName('img')[0].style=img_style
      console.log("upper",Classes[count].split(" ")[2])
      tile.classList.add(Classes[count].split(" ")[2])
    };
    
  });
};
reader.readAsText(file);
};
fileInput.click();
}

function Clear(){
const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile => {
tile.style.backgroundImage = '';
tile.style='';
tile.getElementsByTagName('img')[0].src='';
tile.getElementsByTagName('img')[0].style='';
});
}
