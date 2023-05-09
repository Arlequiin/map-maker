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

function getXY(tilesize) {
    const image = document.getElementById("tileset");
    const coordinates = document.getElementById("coordinate");
    let dropdown = document.getElementById('drop').value
    function handleMouseMove(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        fetch(`/selection/${x}/${y}/${dropdown}/${tilesize}/${tilesize}`)
        .then(response => response.json())
        .then(data => {
            let style_rect = `width: 16px; height: 16px; object-position: -${data.box[0]}px -${data.box[1]}px; object-fit: none;`;
            const img = document.getElementById("cropped-image");
            img.src = `static/data/tilesets/images/${dropdown}`;
            img.style=style_rect;
            img.classList = []; 
            img.classList.add(`${data.box[0]}|${data.box[1]}`)
            //img.classList.add(`width: 16px; height: 16px; background-position: -${data.box[0]}px -${data.box[1]}px; background-image:url(${img.src})`)
        })
        .catch(error => console.error(error));
        image.removeEventListener("mousemove", handleMouseMove);
    }
    image.addEventListener("mousemove", handleMouseMove); 
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
  let coord = prompt("Tile selection (eg. 2,3)");
  coord = coord.split(",");
  tilesizex = parseInt(coord[0])*16;
  tilesizey = parseInt(coord[1])*16;
  const image = document.getElementById("tileset");
    const coordinates = document.getElementById("coordinate");
    let dropdown = document.getElementById('drop').value
    function handleMouseMove(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        fetch(`/selection/${x}/${y}/${dropdown}/${tilesizex}/${tilesizey}`)
        .then(response => response.json())
        .then(data => {
            let style_rect = `width: ${tilesizex}px; height: ${tilesizey}px; object-position: -${data.box[0]}px -${data.box[1]}px; object-fit: none;`;
            const img = document.getElementById("cropped-image");
            img.src = `/static/data/tilesets/images/${dropdown}`;
            img.style=style_rect;
            img.classList = []; 
            img.classList.add(`${data.box[0]}|${data.box[1]}`)
            //img.classList.add(`width: 16px; height: 16px; background-position: -${data.box[0]}px -${data.box[1]}px; background-image:url(${img.src})`)
        })
        .catch(error => console.error(error));
        image.removeEventListener("mousemove", handleMouseMove);
    }
    image.addEventListener("mousemove", handleMouseMove); 
}
