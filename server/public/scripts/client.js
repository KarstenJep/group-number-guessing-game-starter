$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");
  $('#submit-button').on('click', function (event) {
      console.log('clicked');
      
  });
  randomNumber();
}

function addInputs() {
  let newInputs = {
    player1: $('#input1').val(),
    player2: $('#input2').val(),
  }
  console.log('adding inputs', newInputs);
  
  $.ajax({
    method: 'POST',
    url: '/guesses',
    data: newQuote
})
    .then(function (response) {
      console.log('added guesses');
      getQuotes();
    })
    .catch( function (error) {
      console.log('error from server', error);
      alert('sorry, could not get guesses. Try again later.');
    })
  $('#input1').val(''),
  $('#input2').val(''),
}

function randomNumber() {
  return Math.floor(Math.random()* 25);
 };