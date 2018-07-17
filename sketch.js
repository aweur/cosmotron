/* 
creation de diferante variable 
*/
var camera;
let canvas;
var largeur = 1200
var hauteur=1200
var imagefond
var lim =100
var vert = [0,255,0]
var value = 0;
var secondCR = 6
var play
var photoCR
var listImage =['media/1.jpg','media/2.jpg','media/3.jpg','media/4.jpg','media/5.jpg','media/6.jpg','media/7.jpg']
var positionListe=0
var ninja = false
/*
fonction esentiel qui seront activer une seule fois
creation canvas pour desinner
definit la variable imagefond avec une video
definit la variable camera avec la capture image de la cammera
definit la taille de la camera
cache le retour image de la camera
cache le fond decran de base
definit les fps
creation d'un slide et definition de la variable limSlider
positionnement du sliders
loop de la video
*/
function setup() {
//canvas
  canvas = createCanvas();
  canvas.size(largeur,hauteur)
  //camera et video
  imagefond = loadImage ("media/1.jpg")
  camera = createCapture(VIDEO);
  noStroke();
  camera.size(largeur, hauteur);


//pixelDensity(1)
camera.hide();
//imagefond.hide()
frameRate(20);
  limSlider = createSlider(0,255,255);
  limSlider.position((largeur/3)*2, 20);
  //imagefond.loop()
  //imagefond.volume(0)
  play = true
photoCR = false
  //buton
   buttonSP = createButton('next');
  buttonSP.position(20 , 65);
  buttonSP.mousePressed(next);
  buttonFK = createButton('ninja')
  buttonFK.position(20,105)
  buttonFK.mousePressed(Ninja)
  button = createButton('photo')
  button.position (20,85)
  button.mousePressed(photo)
  buttonGT = createButton ('fullscreen')
  buttonGT.position(20,125)
  buttonGT.mousePressed(grandecran)
  textSize (1000)
  textAlign(CENTER,CENTER)
}
function photo (){
  secondCR = secondCR-1
  if (secondCR==0){
  photoCR=false
  secondCR=6
  save ( canvas, 'photo', 'png')
    }
  else{
    setTimeout(photo,1000)
  photoCR = true
  }

}

function grandecran() {
if (buttonGT.mousePressed) {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}

function Ninja(){
  if(ninja == false){
    buttonSP.hide()
    button.hide()
    limSlider.hide()
    ninja = true
  }
  else{
    buttonSP.show()
    button.show()
    limSlider.show()
    ninja = false
  }
}

function windowResized(){
  largeur = windowWidth
  hauteur = windowHeight
  canvas.size(largeur,hauteur)
  camera.size(largeur,hauteur)
}
function next(){
  if(positionListe<listImage.length-1){
    positionListe++
  }
  else{
    positionListe=0
  }
  chargerIMG()
}
function chargerIMG(){
  imagefond = loadImage (listImage[positionListe])
}
/*function stop (){
  if(play==true){
    imagefond = imagefond.pause()
    play = false
    buttonSP = createButton('play')
    
  }
  else{
    imagefond=imagefond.play()
    play = true
    buttonSP = createButton('stop')
  }
}*/

/*
definit la variable lim avec un sliders
donne un text au slider
*/
function sliders(){
  lim = limSlider.value();
  textSize(50)
  textAlign (RIGHT, CENTER)
  if(ninja == false){
  text("vision", limSlider.x , 50);
  }
}
/*
fonction pour calculer la souris et sa position 
donne un un point sur la position de la souris si la souris clique
crée une variable avec les valeurs du pixel a la posiiton du clique
change les valeurs de la variable vert avec la variable qui lit la couleurs des pixels
 rendre une valeur fause
*/
function mouseClicked(e) {
  if(e.srcElement==canvas.canvas){
  const position1d = (mouseY*largeur + mouseX)*4;
  vert[0]=camera.pixels [position1d+0]
  vert[1]=camera.pixels [position1d+1]
  vert[2]=camera.pixels [position1d+2]
  
  
  return false;
  }
}

function distance(r1,g1,b1,r2,g2,b2){
  return (Math.abs(r2-r1)+Math.abs(g2-g1)+Math.abs(b2-b1))/3
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } 
  else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}

function descamera () {
  if (camera.width == 0){
     camera.width = camera.imageData.width
  camera.height = camera.imageData.height

  }
  //loadPixels();

  
  camera.loadPixels();
  

  if(camera.pixels.length){
    var pixView = camera.pixels

    
    const w = canvas.width;
    const h = canvas.height;
    for (let i = 0; i < w; i++) { 
      for (let j = 0; j < h; j++) {

          const position1dCanvas = (j*w + i)*4;

        const r = pixView[position1dCanvas +0];
        const g = pixView[position1dCanvas +1];
        const b = pixView[position1dCanvas +2]        
          if (distance(r,g,b,vert[0],vert[1],vert[2])>lim){
            pixels[position1dCanvas +0] = r
            pixels[position1dCanvas +1] = g
            pixels[position1dCanvas +2] = b
          }
          else{
            
          }
      }
    }
  }
  updatePixels();

}

function draw() {
      
      image (imagefond, 0 ,0 , largeur, hauteur)
      
      descamera()
      sliders()
      if (photoCR==true){
        textSize(1000)
        textAlign(CENTER,CENTER)
      text (''+secondCR,largeur/2,hauteur/2)
      }
}

