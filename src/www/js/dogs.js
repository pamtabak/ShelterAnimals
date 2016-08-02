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
  $dog.append($title).append($img).on('click', (event) => clickDogs($dog, event));
  var $dogContent = $('<div>', {
    class: 'dogContent'
  });
  $dogscontainer.append($dog);
 // $dogscontainer.append($dogContent);
}

function getDogs() {
  $.get('/api/dogs/4', (data) => {
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
