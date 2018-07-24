var camera;
let canvas;
var largeur = 1200
var hauteur = 900
var imagefond
var lim = parseFloat(localStorage.getItem("valeurslider"))
var vert = [parseFloat(localStorage.getItem("couleurfondR")),parseFloat(localStorage.getItem("couleurfondG")),parseFloat(localStorage.getItem("couleurfondB"))];
var value = 0;

//var secondCR = 6
//var play
//var photoCR
//var listImage = ['media/1.jpg', 'media/2.jpg', 'media/3.jpg', 'media/4.jpg', 'media/5.jpg', 'media/6.jpg', 'media/7.jpg']
//var positionListe = 0
//var ninja = false

function setup() {
    
    largeur = windowWidth
    hauteur = windowHeight
    pixelDensity(1)
    canvas = createCanvas();
    canvas.size(largeur, hauteur)
    setupButton()
    drawButton()
    imagefond = loadImage("media/1.jpg")
    camera = createCapture(VIDEO);
    noStroke();
    camera.size(largeur, hauteur);

    camera.hide();

    frameRate(60);

    play = true
    photoCR = false
}

function distance(r1, g1, b1, r2, g2, b2) {
    return (Math.abs(r2 - r1) + Math.abs(g2 - g1) + Math.abs(b2 - b1)) / 3
}

function move(){
    localStorage.setItem("valeurslider",""+lim)
}
function descamera() {
    if (camera.width == 0) {
        camera.width = camera.imageData.width
        camera.height = camera.imageData.height

    }

    camera.loadPixels();

    if (camera.pixels.length) {
        var pixView = camera.pixels

        const w = canvas.width;
        const h = canvas.height;
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {

                const position1dCanvas = (j * w + i) * 4;

                const r = pixView[position1dCanvas + 0];
                const g = pixView[position1dCanvas + 1];
                const b = pixView[position1dCanvas + 2]
                if (distance(r, g, b, vert[0], vert[1], vert[2]) > lim) {
                    pixels[position1dCanvas + 0] = r
                    pixels[position1dCanvas + 1] = g
                    pixels[position1dCanvas + 2] = b
                } else {
                }
            }
        }
    }
    updatePixels();

}

function draw() {

    image(imagefond, 0, 0, largeur, hauteur)
    loadPixels()
    descamera()
    if (photoCR==true){
        textSize(1000)
        textAlign(CENTER,CENTER)
      text (''+secondCR,largeur/2,hauteur/2)
      }
      drawButton()
    
    
      
      
//     console.log("number" ,nbre_etoiles)
}
