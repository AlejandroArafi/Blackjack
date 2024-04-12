






let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora =0;

const btnPedir = document.querySelector('#btnPedir')

const puntosHtml = document.querySelectorAll('small')

const divCartasJugador = document.querySelector('#jugador-cartas')
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

// eventos

btnPedir.addEventListener('click', ()=> {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta);
    puntosHtml[0].innerText = puntosJugador


    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');


    divCartasJugador.append( imgCarta );
})

     