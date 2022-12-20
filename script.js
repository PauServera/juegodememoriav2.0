//Hace que la función principal se ejecute al cargar la página automaticamente.
document.addEventListener('DOMContentLoaded', empezar);

//Función principal del juego
function empezar() {
    document.getElementById("grid").style.visibility = "hidden"; //Escondemos el grid
    document.getElementById("goBtn").addEventListener("click", continua); //Si pulsa el botón ejecuta la función continua.
}

//Hacer visible el grid y esconder el botón una vez iniciado.
function continua() {
    document.getElementById("grid").style.visibility = "visible"; //Grid visible
    document.getElementById("goBtn").style.visibility = "hidden"; //Botón invisible

    //Creamos un vector con los identificadores y las imágenes.

    const cartas = [
        {
            name: 'heladochocolate',
            img: 'img/heladochocolate.png'
        }
        ,
        {
            name: 'heladochocolate',
            img: 'img/heladochocolate.png'
        }
        ,
        {
            name: 'heladoframbuesa',
            img: 'img/heladoframbuesa.png'
        }
        ,
        {
            name: 'heladoframbuesa',
            img: 'img/heladoframbuesa.png'
        }
        ,
        {
            name: 'heladofresa',
            img: 'img/heladofresa.png'
        }
        ,
        {
            name: 'heladofresa',
            img: 'img/heladofresa.png'
        }
        ,
        {
            name: 'heladolila',
            img: 'img/heladolila.png'
        }
        ,
        {
            name: 'heladolila',
            img: 'img/heladolila.png'
        }
        ,
        {
            name: 'heladolima',
            img: 'img/heladolima.png'
        }
        ,
        {
            name: 'heladolima',
            img: 'img/heladolima.png'
        }
        ,
        {
            name: 'heladolimon',
            img: 'img/heladolimon.png'
        }
        ,
        {
            name: 'heladolimon',
            img: 'img/heladolimon.png'
        }
        ,
        {
            name: 'heladonaranja',
            img: 'img/heladonaranja.png'
        }
        ,
        {
            name: 'heladonaranja',
            img: 'img/heladonaranja.png'
        }
        ,
        {
            name: 'heladopitufo',
            img: 'img/heladopitufo.png'
        }
        ,
        {
            name: 'heladopitufo',
            img: 'img/heladopitufo.png'
        }
        ,
        {
            name: 'heladopepitas',
            img: 'img/heladopepitas.png'
        }
        ,
        {
            name: 'heladopepitas',
            img: 'img/heladopepitas.png'
        }
        ,
        {
            name: 'heladonegro',
            img: 'img/heladonegro.png'
        }
        ,
        {
            name: 'heladonegro',
            img: 'img/heladonegro.png'
        }
        ,
        {
            name: 'heladomenta',
            img: 'img/heladomenta.png'
        }
        ,
        {
            name: 'heladomenta',
            img: 'img/heladomenta.png'
        }
        ,
        {
            name: 'heladoblanco',
            img: 'img/heladoblanco.png'
        }
        ,
        {
            name: 'heladoblanco',
            img: 'img/heladoblanco.png'
        }
        ,
        {
            name: 'muerte',
            img: 'img/muerte.png'
        }
        ,

    ]

    //Desordenamos el vector para que las imágenes salgan aleatorias
    cartas.sort(() => 0.5 - Math.random());

    const grid = document.getElementById("grid"); //Guardamos dentro de la constante el identificador grid, para usarlo cuando queramos.
    grid.innerHTML = ''; //Eliminamos el contenido de grid.

    //Mostramos las cartas y hacemos un bucle para recorrer todo el vector de cartas.
    for (let i = 0; i < cartas.length; i++) {
        const carta = document.createElement('img'); //Crear un elemento imagen.

        //Atributos
        carta.setAttribute('src', 'img/tapahelado.png'); //Elegimos la imagen que tapa todas las imagenes.
        carta.setAttribute('data-id', i); //Asociamos un atributo "data-id".
        carta.addEventListener('click', giraCarta); //Le asociamos la función de girar carta.
        grid.appendChild(carta); //Metemos la carta dentro del <div> "grid"
    }

    const elNumeroParejas = document.getElementById("pOK");
    const elNumeroErrores = document.getElementById("pKK")
    //Ponemos los vectores vacios.
    let cartasEscogidas = [];
    let idcartasEscogidas = [];
    let numErrores = 0;
    let numParejas = 0;

    //Creamos la función de girar carta.

    function giraCarta() {
        new Audio("sonidos/giracarta.mp3").play();
        let idCarta = this.getAttribute('data-id'); //Cogemos el data-id y el nombre.
        let nomCarta = cartas[idCarta].name;

        cartasEscogidas.push(nomCarta); //Anotamos el nombre.
        idcartasEscogidas.push(idCarta); //Anotamos en otro vector el id.
        this.setAttribute('src', cartas[idCarta].img); //Mostramos la imagen que tiene asociada.

        //Si le damos click a la muerte nos lleva a la función gameover.
        if (nomCarta == "muerte") {
            setTimeout(gameover1, 500);
        }
        if (cartasEscogidas.length == 2) { //Si ya ha escogido dos cartas comprobará si son la misma.
            setTimeout(mirarCoincidencia, 500);
        }
    }


    //Funcion para añadir 10 errores cuando haces click en la muerte.
    function gameover1() {
        const idPrimera = idcartasEscogidas[0];
        const vectorImagenes = document.querySelectorAll('img');
        if (cartasEscogidas.length === 2) {
            vectorImagenes[idPrimera].setAttribute('src', 'img/muerte.png');
            vectorImagenes[idSegunda].setAttribute('src', 'img/muerte.png');
        } else {
            vectorImagenes[idPrimera].setAttribute('src', 'img/muerte.png');
        }
        cartasEscogidas = [];
        idcartasEscogidas = [];
        numErrores += 10;
        elNumeroErrores.innerHTML = numErrores;
    }


    //Miramos si coinciden
    function mirarCoincidencia() {
        const vectorImagenes = document.querySelectorAll('img'); //Creamos un vector para seleccionar todas las imágenes.
        const idPrimera = idcartasEscogidas[0]; //Index primera carta.
        const idSegunda = idcartasEscogidas[1]; //Index segunda carta.


        //Condición para comprobar si la pareja elegida por el usuario es la correcta.
        if (idPrimera == idSegunda) {
            vectorImagenes[idPrimera].setAttribute('src', 'img/tapahelado.png')
            numErrores++;
        } else if (cartasEscogidas[0] === cartasEscogidas[1]) {
            new Audio("sonidos/correcto.mp3").play();
            vectorImagenes[idPrimera].removeEventListener('click', giraCarta);
            vectorImagenes[idSegunda].removeEventListener('click', giraCarta);
            numParejas++;
            vectorImagenes[idPrimera].style.visibility = "hidden";
            vectorImagenes[idSegunda].style.visibility = "hidden";
        } else {
            new Audio("sonidos/error.m4a").play();
            vectorImagenes[idPrimera].setAttribute('src', 'img/tapahelado.png')
            vectorImagenes[idSegunda].setAttribute('src', 'img/tapahelado.png')
            numErrores++;
        }
        cartasEscogidas = [];
        idcartasEscogidas = [];
        elNumeroParejas.innerHTML = numParejas;
        elNumeroErrores.innerHTML = numErrores;

        //Condición para mostrar puntuación obtenida por el usuario.

        if (numParejas == (cartas.length - 1) / 2) {
            new Audio("sonidos/victoria.mp3").play();
            if (numErrores <= "5") {
                alert("Nivel Jedi");
                location.reload();
            } else if (numErrores >= "6" && numErrores <= "10") {
                alert("Nivel Experto");
                location.reload();
            } else if (numErrores >= "11" && numErrores <= "20") {
                alert("Nivel regular");
                location.reload();
            } else {
                alert("Este juego no es lo tuyo.");
                location.reload();
            }
        }
    }
}

