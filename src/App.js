import { Component } from 'react';
import './App.css';
import MemoryCard from './components/MemoryCard';

function generateDeck() {
  var symbols = ['∆','ß','£','§','•', '$', '+', 'ø'];
  var deck = [];

  for (let i = 0; i < 16; i++) {
    deck.push({
      isFlipped: false,
      symbol: symbols[i % 8]
    })
  }

  shuffle(deck);
  return deck;
}

function shuffle(deck) {
  var j, x, i;
  for (i = deck.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = deck[i];
      deck[i] = deck[j];
      deck[j] = x;
  }
  return deck;
}

class App extends Component {
  constructor() {
    super();

    this.state = { 
      deck: generateDeck(),
      pickedCards: []
    };
  }

  pickCard(cardIndex) {
    if(this.state.deck[cardIndex].isFlipped) {
      return;
    }
    
    var cardToFlip = {...this.state.deck[cardIndex]};
    cardToFlip.isFlipped = true;
    var newPickedCards = this.state.pickedCards.concat(cardIndex);
    var newDeck = this.state.deck.map((card, index) => {
      if(cardIndex === index) {
        return cardToFlip;
      }
      return card;
    });

    if (newPickedCards.length === 2) {
      var card1Index = newPickedCards[0];
      var card2Index = newPickedCards[1];

      if(newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
        setTimeout(this.unflipCards.bind(this,card1Index, card2Index), 1000);
      }
      console.log(newDeck);

      newPickedCards = [];
    }
 
    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards
    });
    
  }
  
  unflipCards(card1Index, card2Index) {
    var card1 = {...this.state.deck[card1Index]};
    var card2 = {...this.state.deck[card2Index]};
    card1.isFlipped = false;
    card2.isFlipped = false;

    var newDeck = this.state.deck.map((card, index) => {
      if(card1Index === index) {
        return card1;
      }
      if(card2Index === index) {
        return card2;
      }
      return card;
    });


    console.log(newDeck);
    this.setState({ deck: newDeck });
   
  }

  render () {
    var cardsJSX = this.state.deck.map((card, index) =>
    {
      return <MemoryCard 
        symbol={card.symbol}
        isFlipped={card.isFlipped}
        key={index}
        pickCard={this.pickCard.bind(this, index)}
      />
    });

    return (
      <div className="App" title="">
       
        <header className="App-header">
          <h1>Memory Game</h1>
          <subtitle>Match Cards to Win</subtitle>
        </header>
        <div>
          {cardsJSX.slice(0,4)}
        </div>
        <div>
          {cardsJSX.slice(4,8)}
        </div>
        <div>
          {cardsJSX.slice(8,12)}
        </div>
        <div>
          {cardsJSX.slice(12,16)}
        </div>
      </div>
    );
  };
}



export default App;