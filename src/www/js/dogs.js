$(document).ready(function() {
  getDogs();
  $(window).scroll(() => {
    if($(window).scrollTop() + $(window).height() == $(document).height()){
      getEndDogs();
    }
  });
});

function addDog(dog) {
  var $dogscontainer = $('#dogscontainer');
  var $dog = $('<div>', {
    class: "dog",
    'data-id': dog._id
  });
  var $title = $('<h1>').html(dog.name);
  var $img = $('<img>', {
    src : dog.image
  });
  var $imageDiv  = $('<div>', {class: 'img'});
  $dog.append($title).append($imageDiv.append($img));
  $dogscontainer.append($dog);
}

function getDogs() {
  $.get('/api/dogs/', (data) => {
    data.forEach((dog) => addDog(dog));
  });
}

function getEndDogs() {
  var $lastDog =  $('.dog').last();
  var last = $lastDog.data('id');
  console.log(last);
  var size = 5;
  $.get('/api/dogs/'+ last + '/' + size, (data) => {
    data.forEach( (dog) => addDog(dog));
  });
}
