$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");
  $('#submit-button').on('click', function (event) {
      console.log('clicked');
      addInputs();
  });
  // randomNumber();
}

let round = 1;

function addInputs() {
  let newInputs = {
    roundNumber: round,
    player1: $('#input1').val(),
    player1correct: 0,
    player2: $('#input2').val(),
    player2correct: 0,
  }
  console.log('adding inputs', newInputs);
  
  $.ajax({
    method: 'POST',
    url: '/guesses',
    data: newInputs,
})
    .then(function (response) {
      console.log('added guesses');
      getGuesses();
    })
    .catch( function (error) {
      console.log('error from server', error);
      alert('sorry, could not get guesses. Try again later.');
    })
  $('#input1').val('');
  $('#input2').val('');
  round++;
}

function getGuesses() {
  $.ajax({
    method: 'GET',
    url: '/guesses'
  })
    .then(function (response) {
        console.log('respone from server', response);
        render(response);
    })
    .catch( function (error) {
        console.log('error from server', error);
        alert('sorry, could not get quotes. Try again later.');
    })
    console.log('After making server request...');
}

function render( checkedguesses ) {
  $('#total-guesses').empty();
  $('#guess-history').empty();
    for (let round of checkedguesses){
      console.log(`${round.player1}, ${round.player2}`);
      $('#total-guesses').append(`
        <div class="guessgame">
        <p>Round ${round.roundNumber}:</p>
        <p>Player 1: ${round.player1}</p>
        <p>Player 2: ${round.player2}</p>
        </div>
      `)
    }
}