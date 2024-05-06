
const miModulo =(() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHtml = document.querySelectorAll('small');
  
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for(let i=0; i<numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHtml.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }

    //inicia el juego
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        return _.shuffle(deck);
    }

    //tomar carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'no hay cartas en el mazo'
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }


    //logica computdor

    const acumularPuntos = (carta, turno)=>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta)
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

const crearCArta = (carta, turno)=>{
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);
}
    const determinarGanador = ()=>{

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('nadie gana :(');
            } else if (puntosMinimos > 21) {
                alert('computador gana')
            } else if (puntosComputadora > 21) {
                alert('jugador gana')
            }
            else {
                alert('pc gana')
            }
        }, 100);
    }



    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCArta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }
   
    // eventos

    
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
       
        crearCArta(carta, 0);
        //insertar carta

        //logica para pedir cartas hasta max 21 pts    
        if (puntosJugador > 21) {
            console.warn('pediste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('21, genial');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores [0]);
    });

   

    return {
        nuevoJuego: inicializarJuego
    }

})();





