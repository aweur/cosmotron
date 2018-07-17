var lim = 100
var vert = [0, 255, 0]
var value = 0;
var secondCR = 6
var photoCR
var listImage = ['media/1.jpg', 'media/2.jpg', 'media/3.jpg', 'media/4.jpg', 'media/5.jpg', 'media/6.jpg', 'media/7.jpg']
var positionListe = 0
var ninja = false
var limSlider

function setupButton() {

    limSlider = createSlider(0, 255, lim);
    limSlider.position((largeur / 3) , 20);
    limSlider.mouseReleased(move)

    photoCR = false
    buttonSP = createButton('next');
    buttonSP.position(20, 65);
    buttonSP.mousePressed(next);
    buttonFK = createButton('ninja')
    buttonFK.position(20, 105)
    buttonFK.mousePressed(Ninja)
    button = createButton('photo')
    button.position(20, 85)
    button.mousePressed(photo)
    buttonGT = createButton('fullscreen')
    buttonGT.position(20, 125)
    buttonGT.mousePressed(grandecran)

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
        buttonGT.hide()
        ninja = true
    } else {
        buttonSP.show()
        button.show()
        limSlider.show()
        buttonGT.show()
        ninja = false
    }
}

function windowResized() {
    largeur = windowWidth
    hauteur = windowHeight
    canvas.size(largeur, hauteur)
    camera.size(largeur, hauteur)
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

function sliders() {
    lim = limSlider.value();
    textSize(50)
    textAlign(RIGHT, CENTER)
    if (ninja == false) {
        text("vision", limSlider.x, 50);
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
