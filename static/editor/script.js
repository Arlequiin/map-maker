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
        console.log([x,y])
        fetch(`/selection/${x}/${y}/${dropdown}/${tilesize}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const img = document.getElementById("cropped-image");
            img.src = `data:image/jpeg;base64,${data.image_data}`;
            img.classList.add(data.box)
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
  
function generateHtml() {
  var html = document.querySelector('.editor').innerHTML;
  var textarea = document.createElement('textarea');
  textarea.textContent = html;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Code HTML copié dans le presse-papier!');
}
//faire un fetch, un get answer pour regexer l'html et renvoyer une matrice de type [A51, A10...]

