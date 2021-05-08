$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");
  $('#submit-button').on('click', function (event) {
      console.log('clicked submit');
      addInputs();
  });
  
  $('#guess-history').on('click', '#restart-button', function (event) {
    console.log('clicked restart');
    clearInputs();
});
}

function clearInputs() {
  let resetInput = {
    roundNumber: 0,
    player1: 0,
    player1correct: 2,
    player2: 0,
    player2correct: 2,
  } 
  $.ajax({
    method: 'POST',
    url: '/restart',
    data: resetInput,
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
}

function addInputs() {
  let newInputs = {
    roundNumber: 0,
    player1: $('#input1').val(),
    player1correct: 0,
    player2: $('#input2').val(),
    player2correct: 0,
  }
  console.log('Restarting Server', newInputs);
  
  $.ajax({
    method: 'POST',
    url: '/guesses',
    data: newInputs,
  });
    .then(function (response) {
      console.log('added guesses');
      getGuesses();
    });
    .catch( function (error) {
      console.log('error from server', error);
      alert('sorry, could not get guesses. Try again later.');
    });
  $('#input1').val('');
  $('#input2').val('');
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
  console.log(checkedguesses);
  
  $("#round-total").text(`${checkedguesses.length}`);
  $('#total-guesses').empty();
  let string = '';
    for (let guess of checkedguesses){
      console.log(`${guess.player1}, ${guess.player2}`);
      if (guess.player1correct === 1) {
        string = `<p>Player 1: ${guess.player1} , Too high!</p>`;
      } else if (guess.player1correct === -1) {
        string = `<p>Player 1: ${guess.player1} , Too low!</p>`;
      } else {
        string = `<p class="correct">Player 1: ${guess.player1} , Right on!</p> <button id="restart-button">Restart</button>`;
      }

      if (guess.player2correct === 1) {
        string += `<p>Player 2: ${guess.player2} , Too high!</p>`;
      } else if (guess.player2correct === -1) {
        string += `<p>Player 2: ${guess.player2} , Too low!</p>`;
      } else {
        string += `<p class="correct">Player 2: ${guess.player2} , Right on!</p> <button id="restart-button">Restart</button>`;
      }

      $('#total-guesses').append(string);
    }
}