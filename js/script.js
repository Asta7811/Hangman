const listaPalabras = ["SUPERMAN", "DARKSEID", "JOKER", "LINTERNA", "ZOOM", "PINGUINO", "MANHATTAN", "SHAZAM", "ROBIN", "BATMANs"];
let palabraSct;
let intentosRestantes;
let palabraOculta;
let letrasUsadas;
let Ganadas = 0;
let Perdidas = 0;

const elementoPalabra = document.getElementById("palabra");
const elementoIntentos = document.getElementById("intentosRestantes");
const elementoMensaje = document.getElementById("mensaje");
const elementoTeclado = document.getElementById("teclado");
const imgfigura = document.getElementById("imagenAhorcado");

function iniciarJuego() {
    palabraSct = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    intentosRestantes = 10;
    palabraOculta = Array(palabraSct.length).fill("_");
    letrasUsadas = [];

    elementoIntentos.textContent = intentosRestantes;
    elementoMensaje.textContent = "";
    imgfigura.src = `img/base0.png`;
    actualizarPalabraEnPantalla();
    activarTeclado();
}

function actualizarPalabraEnPantalla() {
    elementoPalabra.textContent = palabraOculta.join(" ");
}

function LetraSeleccionada(letra) {
    if (!letrasUsadas.includes(letra)) {
        letrasUsadas.push(letra);

        const boton = elementoTeclado.querySelector(`button[onclick="LetraSeleccionada('${letra}')"]`);

        if (palabraSct.includes(letra)) {
            for (let i = 0; i < palabraSct.length; i++) {
                if (palabraSct[i] === letra) {
                    palabraOculta[i] = letra;
                }
            }
        } else {
            intentosRestantes--;
            elementoIntentos.textContent = intentosRestantes;
            imgfigura.src = `img/base${10 - intentosRestantes}.png`;
        }

        // Desactivar la letra seleccionada
        boton.disabled = true;
        boton.style.backgroundColor = "#d3d3d3";  // Color gris claro
        boton.style.color = "#888";  // Cambiar el texto a gris oscuro

        actualizarPalabraEnPantalla();
        verificarEstadoDelJuego();
    }
}

function verificarEstadoDelJuego() {
    if (palabraOculta.join("") === palabraSct) {
        Ganadas++;
        document.getElementById("txtGanados").value = Ganadas;
        elementoMensaje.textContent = "¡Ganaste! La palabra es " + palabraSct;
        desactivarTeclado();
    } else if (intentosRestantes === 0) {
        Perdidas++;
        document.getElementById("txtPerdidos").value = Perdidas;
        elementoMensaje.textContent = "Perdiste La palabra era " + palabraSct;
        desactivarTeclado();
    }
}

function desactivarTeclado() {
    const botones = elementoTeclado.querySelectorAll("button");
    botones.forEach(boton => {
        boton.disabled = true;
        boton.style.backgroundColor = "#d3d3d3";  // Color gris claro
        boton.style.color = "#888";  // Cambiar el texto a gris oscuro
    });
}

function activarTeclado() {
    const botones = elementoTeclado.querySelectorAll("button");
    botones.forEach(boton => {
        boton.disabled = false;
        boton.style.backgroundColor = "";  // Restaurar el fondo
        boton.style.color = "";  // Restaurar el texto
    });
}

