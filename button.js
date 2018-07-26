var lim = 100
var vert = [0, 255, 0]
var value = 0;
var secondCR = 6
var photoCR
var listImage = ['media/1.jpg', 'media/2.jpg', 'media/3.jpg', 'media/4.jpg', 'media/5.jpg', 'media/6.jpg', 'media/7.jpg']
var positionListe = 0
var anime =['media/muffin.png','muffin_jump']
var ninja = false
var limSlider
var buttonSP
var buttonGT
var button
var buttonFK
var click=true
var muffinTime

   var r=1.25664
var r2=0.628319 
var degre = 0.0174533
var move =[]
var move2 = []; 
var direction = []
var horaire =[]
var ray = []; 
var cercleX
var cercleY 
var cercleR=[]
var nbre_etoiles 
var X =[]
var Y =[]
var starslight=false


    var reso = 0.5
function setupButton() {

   nbre_etoiles = random(25,50)
    for(var i=0; i<=nbre_etoiles; i++){
        move2[i] = random(0.5);
        ray[i] = random(10,30)
        X[i] = random(0,largeur)
        Y[i] = random(0,hauteur)
        move[i] = random(0.5)
        direction[i]=random(0,1)
        cercleR[i]=random(10,((largeur+hauteur)/2)/2)
    }    
    
     
    buttonST = createButton('starslight')
    buttonRO = createSelect()
    buttonSP = createImg('media/next.png','next')
    buttonFK = createImg('media/ninja.png','ninja' )
    button = createImg('media/photo.png','photo')
    limSlider = createSlider(0, 255, lim);
    buttonPosition()
    
    limSlider.mouseReleased(move)

    photoCR = false
     
    fontsize=(100)
    
    
    buttonSP.mouseClicked(next)
    buttonST.mouseClicked(etoile)
    
    buttonRO.option("HD")
    buttonRO.option("SD")
    buttonRO.value()
    buttonRO.changed(changeResolution)
    
    buttonFK.mouseClicked(Ninja)
    
    
    
    button.mouseClicked(photo)
}

function etoile(){
    
    if(starslight==false){
        starslight=true
    }
    else if(starslight==true){
        starslight=false
    }
}

function stars(param_X,param_Y,param_move,param_move2, param_ray,param_cercleR){
    beginShape()

         fill(random(255),random(255),random(255))

            posX=param_X + param_cercleR *cos(r+param_move2) 
            posY=param_Y + param_cercleR*sin(r+param_move2) 
         
           vertex(posX + param_ray*cos(r+param_move),posY + param_ray*sin(r+param_move))
           vertex(posX + param_ray/2*cos(r2*3+param_move),posY + param_ray/2*sin(r2*3+param_move))
           vertex(posX + param_ray*cos(r*2+param_move),posY + param_ray*sin(r*2+param_move))
           vertex(posX + param_ray/2*cos(r2*5+param_move),posY + param_ray/2*sin(r2*5+param_move))
           vertex(posX + param_ray*cos(r*3+param_move),posY + param_ray*sin(r*3+param_move))
           vertex(posX + param_ray/2*cos(r2*7+param_move),posY + param_ray/2*sin(r2*7+param_move))
           vertex(posX + param_ray*cos(r*4+param_move),posY + param_ray*sin(r*4+param_move))
           vertex(posX + param_ray/2*cos(r2*9+param_move),posY + param_ray/2*sin(r2*9+param_move))
           vertex(posX + param_ray*cos(r*5+param_move),posY + param_ray*sin(r*5+param_move))
           vertex(posX + param_ray/2*cos(r2*11+param_move),posY + param_ray/2*sin(r2*11+param_move))
           vertex(posX + param_ray*cos(r+param_move),posY + param_ray*sin(r+param_move))
           vertex(posX + param_ray/2*cos(r2+param_move),posY + param_ray/2*sin(r2+param_move))  
     
        endShape()    
}

function buttonPosition(){
    buttonST.position(largeur/2,20)
    buttonST.size(largeur/10,hauteur/20)
    buttonRO.position(20,hauteur/2)
    buttonRO.size(largeur/10,hauteur/20)
    limSlider.position(largeur-200 , hauteur-hauteur);
    buttonSP.position((largeur-(largeur/10))-25,hauteur/2)
    buttonSP.size (largeur/10, largeur/10)
    button.position(largeur/2-((largeur/10)/2), (hauteur-(largeur/10))-25)
    button.size (largeur/10,largeur/10)
    buttonFK.position(largeur/100, hauteur-hauteur)
    buttonFK.size (largeur/10,largeur/10)
}
function changeResolution(){
var choix = buttonRO.value()
if(choix=="SD"){
    reso=0.5
}
else if (choix=="HD"){
    reso=1
}
else {
    reso=10
}

windowResized()
}
function photo() {
    secondCR = secondCR - 1
    if (secondCR == 0) {

        photoCR = false
        var ninjaCourant = ninja
        ninja = true
        secondCR = 6
        draw()
        save(canvas, hello(), 'png')
        ninja = ninjaCourant
    } else {
        setTimeout(photo, 1000)
        photoCR = true

    }

}

function sauveCouleur() {
    localStorage.setItem("couleurfondR", "" + vert[0]);
    localStorage.setItem("couleurfondG", "" + vert[1]);
    localStorage.setItem("couleurfondB", "" + vert[2]);
}

function hello() {
    var today = new Date()
    var photoDay = zero (today.getDate())
    var photoMonth = zero (today.getMonth() + 1)
    var photoYear = zero (today.getFullYear())
    var photoHour = zero (today.getHours())
    var photoMinute = zero (today.getMinutes())
    var photoSeconde = zero (today.getSeconds())
    var photoFullDay = "" + photoDay + '-' + photoMonth + '-' + photoYear + '-' + photoHour + photoMinute + photoSeconde

    return photoFullDay
}

function zero(nombre) {
    if (nombre < 10) {
        return "0" + nombre
    } else {
        return "" + nombre
    }
}

function Ninja() {
    if (ninja == false) {
        buttonSP.hide()
        button.hide()
        limSlider.hide()
//         buttonGT.hide()
        ninja = true
    } else {
        buttonSP.show()
        button.show()
        limSlider.show()
//         buttonGT.show()
        ninja = false
    }
}

function windowResized() {
    
    buttonPosition()
    largeur = windowWidth
    hauteur = windowHeight
    canvas.size(largeur*reso, hauteur*reso)
   canvas.canvas.style.width =  windowWidth+"px"
    canvas.canvas.style.height =  windowHeight+"px"
    camera.size(largeur*reso, hauteur*reso)

}


function next() {
    if (positionListe < listImage.length - 1) {
        positionListe++
    } else {
        positionListe = 0
    }
    chargerIMG()
}
function chargerIMG() {
    imagefond = loadImage(listImage[positionListe])
}

function animation(){
    if(click==true){
       muffinTime = loadImage(anime[0]) 
    }
    else if(click==false){
        muffinTime = loadImage(anime[1])
    }
    text('I WANNA DIE',largeur/2,hauteur/3,largeur/2,hauteur/2)
    textSize(largeur/10)
    textAlign(CENTER,CENTER)
   

}

function sliders() {
    lim = limSlider.value();
    if (ninja == false) {
        text( limSlider.x, 50);
    }
}

function mouseClicked(e) {
    if (e.srcElement == canvas.canvas) {
        const position1d = (mouseY * largeur + mouseX) * 4;
        vert[0] = camera.pixels[position1d + 0]
        vert[1] = camera.pixels[position1d + 1]
        vert[2] = camera.pixels[position1d + 2]
        sauveCouleur()

        return false;
    }
}

function starss(){
    if(starslight==true){ 
        
    
        for(var i=0; i<nbre_etoiles; i++){
           
            stars(X[i],Y[i],move[i],move2[i],ray[i],cercleR[i])

            if (direction[i]<0.5){
                horaire[i]=true
            }    
            else {
                horaire[i]=false
            }

            if(horaire[i] == true){
                move2[i]+=random(0, 0.1); 
                move[i]+=random(0,1)
                X[i]+=random(0,1)
                Y[i]+=random(0,10)
            }
            else {
                move2[i]+=random(-0.1,0); 
                move[i]+=random(-1,0)
                X[i]+=random(-1,0)
                Y[i]+=random(-10,0)
            }
            
            if(Y[i]<0-ray[i]){
                Y[i]=hauteur+ray[i]
            }
            if(X[i]<0-ray[i]){
                X[i]=largeur+ray[i]
            }
            if(Y[i]>hauteur+ray[i]){
                Y[i]=0-ray[i]
            }

            if (X[i]>(largeur+ray[i])){
                X[i]= 0-ray[i]
            }
        }
    }

}

function grandecran() {
    if (buttonGT.mousePressed) {
        var fs = fullscreen();
        fullscreen(!fs);
    }
}

function drawButton() {
    sliders()
    lim = limSlider.value()
    
    
}
