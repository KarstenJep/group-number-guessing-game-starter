const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// Initialize our guesses array
let guesses = [];

// GET & POST Routes go here

// GET
app.get( '/guesses', (req, res)  => {
  // console.log(`Request for guesses serverside ...  guesses);
  res.send( guesses );
});

// POST
app.post('/guesses', (req, res) => {
  let newInputs = req.body;
  // console.log('Checking format of newInputs', newInputs);
  guesses.push(newInputs);
  editGuesses();
  res.sendStatus(201);
  console.log('got a new Guess, serverside ... ', newInputs);
})

app.post('/restart', (req, res) => {
  guesses = [];
  randomNum = randomNumber();
  console.log('Reinitializing guesses');
  res.sendStatus(201);
})


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

function randomNumber() {
  return Math.floor((Math.random()* 25)+1);
 };

 let randomNum = randomNumber();

 function editGuesses() {
  let guess = guesses[guesses.length - 1];
  guess.roundNumber = guesses.length;
  if ( guess.player1 > randomNum ) {
    guess.player1correct = 1;
  } else if ( guess.player1 < randomNum ) {
    guess.player1correct = -1;
  } else {
    guess.player1correct = 0;
  }

  if ( guess.player2 > randomNum ) {
    guess.player2correct = 1;
  } else if ( guess.player2 < randomNum ) {
    guess.player2correct = -1;
  } else {
    guess.player2correct = 0;
  }
}


