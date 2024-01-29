let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 5;
let maximoJuegos = 3;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos == 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //Usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', `El número secreto es menor`)
        } else {
            asignarTextoElemento('p', `El número secreto es mayor`)
        }
        intentos++;
        limpiarCaja();
        if (intentos > maximoJuegos){
            asignarTextoElemento('p', `Llegaste al máximo permitido de ${maximoJuegos} intentos`);
            document.getElementById('verificar').setAttribute('disabled',true);
            document.getElementById('valorUsuario').setAttribute('disabled',true);
        }
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles')
        document.getElementById('verificar').setAttribute('disabled',true);
        document.getElementById('valorUsuario').setAttribute('disabled',true);
    } else { //Seguimos jugando
        //Si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    asignarTextoElemento('h1', 'Juego del número secreto');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //Limpiar la caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números
    //Generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', true);
}

condicionesIniciales();