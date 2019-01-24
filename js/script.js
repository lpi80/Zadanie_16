const url = 'http://api.icndb.com/jokes/random';

const button = document.getElementById('get-joke');
button.addEventListener('click', function(){
  getJoke();
});

const paragraph = document.getElementById('joke');

function getJoke() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function(){
      let response = JSON.parse(xhr.response);
      paragraph.innerHTML = response.value.joke || 'Something went wrong';
    });
    xhr.send();
  }

  document.addEventListener('DOMContentLoaded', function() {
    getJoke();
  });