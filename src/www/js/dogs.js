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
  var $animalType = $('<div>', {class: 'animal-type'});
  if(dog.animal == 'Cachorro'){
    $animalType.addClass('cachorro');
  } else {
    $animalType.addClass('gato');
  }
  var $animalName = $('<div>', {class: 'animal-title'}).html(dog.name);
  var $title = $('<div>', {class: 'dog-title'}).append($animalType).append($animalName);
  var $img = $('<img>', {
    src : dog.image
  });
  var $imageDiv  = $('<div>', {class: 'img'}).css('background-image', 'url('+ dog.image + ')');
  var $description = $('<div>', {class: 'description'}).text(dog.description);
  $dog.append($imageDiv).append($title).append($description).on('click', (event) => clickDogs($dog, event));
  var $dogContent = $('<div>', {
    class: 'dogContent'
  });
  $dogscontainer.append($dog);
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


function clickDogs($dog, e) {
  console.log($dog);
  var data = $dog.data();
  $.get('/api/dogs/one/' + data.id, (data) => {
    insertModal(data);
  });
}


function insertModal(data) {
  $modal = $('.successModal');
  $modal.find('.modal-title').text(data.name);
  $modal.find('.modal-img').attr('src', data.image);
  $modalText = $modal.find('.modal-text');
  console.log($modalText);
  $.each($modalText.find('.modal-field'), (i, element) => {
    var field = $(element).data().field;
    var value = data[field];
    $(element).find('.value').text(value);
  });
  $('.successModal').modal();
}
