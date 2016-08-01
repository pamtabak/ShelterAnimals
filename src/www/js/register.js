$(document).ready(() => {

  $('#photo').change(() => {
    readURL($('#photo')[0]);
  });

  $('#animalForm').submit((e) => {
    console.log();
    sendData(e, $('#animalForm'), uploadPhoto);
  });

});

function readURL(input){
  if(input.files && input.files[0]){
    var reader =  new FileReader();

    reader.onload = function(e){
      $('#photoPreview').attr('src', e.target.result)
        .show();

    };

    reader.readAsDataURL(input.files[0]);
  }
}

function sendData(e, $form, callback) {
  e.preventDefault();
  var data = $form.serializeArray();
  console.log(data);
  var json = {};
  data.forEach((object) => {
    json[object.name] = object.value;
  });
  $.ajax({
    url: '/api/dogs',
    data: json,
    type: 'post',
    success: function(data) {
      if("error" in data){
        var error = data.error.errors;
        console.log(error);
      } else {
        $('.successModal .modal-title').text('Sucesso !');
        $('.successModal .modal-body').text('A transportadora foi registrada com sucesso !');
        $('.successModal').modal();
        callback(data);
      }
    }
  });
}

function uploadPhoto(data) {
  var _id = data.payload._id;
  var fileUpload = new FormData();
  $.each($('#photo')[0].files, (i,file) => {
    fileUpload.append('file-' + i, file);
  });
  var json = {
    _id: _id,
    file : fileUpload
  };
  $.ajax({
    url: 'api/dogs/photo',
    data: json,
    cache: false,
    contentType: false,
    processData: false,
    type: 'put',
    success: (data) => {
      console.log(data);
    }
  });
}
