






let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora =0;

const btnPedir = document.querySelector('#btnPedir')
const btnDetener =document.querySelector('#btnDetener')
const btnNuevo = document.querySelector('#btnNuevo')

const puntosHtml = document.querySelectorAll('small')

const divCartasJugador = document.querySelector('#jugador-cartas')
divCartasComputador = document.querySelector('#computadora-cartas')
//crear nuevo mazo
const crearDeck = () => {

    for (let i = 2; i <=10; i++) {
        for(let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

        for(let tipo of tipos) {
            for(let esp of especiales) {  
                deck.push(esp + tipo);
            }
        }
    
    deck  = _.shuffle(deck);
    console.log(deck);
    return deck;
    }

    crearDeck();

    //tomar carta
    const pedirCarta = ()=>{

        if (deck.length === 0) {
            throw 'no hay cartas en el mazo'
        }

        const carta = deck.pop()
        return carta
    }
    //pedirCarta()
    
const valorCarta = (carta)=>{

    const valor = carta.substring(0, carta.length -1);
   return (isNaN(valor)) ? 
   (valor === 'A' ) ? 11 : 10
   : valor * 1;
}


//logica computdor

const turnoComputador =(puntosMinimos) => {

   do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta( carta);
    puntosHtml[1].innerText = puntosComputadora
 //insertar carta

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasComputador.append( imgCarta );

    if( puntosMinimos > 21) {
        break;
    }
    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos<=21));
    setTimeout(()=>{

   
    if( puntosComputadora === puntosMinimos) {
        alert('nadie gana');
    } else if(puntosMinimos>21) {
        alert('computador gana')
    } else if(puntosComputadora>21) {
        alert('jugador gana')
    }
    else{
        alert('pc gana')
    } }, 10)
    
}

// eventos

btnPedir.addEventListener('click', ()=> {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta);
    puntosHtml[0].innerText = puntosJugador
 //insertar carta

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    //logica para pedir cartas hasta max 21 pts
    if(puntosJugador>21) {
        console.warn('pedisdte')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);

    } else if (puntosJugador === 21) {
        console.warn('21, genial')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);
    }
}
);

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputador( puntosJugador);
})

btnNuevo.addEventListener('click', ()=>{

console.clear();
    deck = [];
    deck= crearDeck();
    puntosJugador = 0
    puntosComputadora = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;

    divCartasComputador.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;

});
