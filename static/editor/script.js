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

function getXY() {
    const image = document.getElementById("tileset");
    const coordinates = document.getElementById("coordinate");
    let dropdown = document.getElementById('drop').value
    function handleMouseMove(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        console.log([x,y])
        fetch(`/selection/${x}/${y}/${dropdown}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Set the src attribute of the <img> element to the base64-encoded image data
            const img = document.getElementById("cropped-image");
            img.src = `data:image/jpeg;base64,${data.image_data}`;
        })
        .catch(error => console.error(error));
        image.removeEventListener("mousemove", handleMouseMove);
    }
    image.addEventListener("mousemove", handleMouseMove);
}