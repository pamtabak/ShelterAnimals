$(document).ready(() => {

  $('#photo').change(() => {
    console.log('asdasd');
    readURL($('#photo')[0]);
  });

});

function readURL(input){
  if(input.files && input.files[0]){
    console.log('entrei');
    var reader =  new FileReader();

    reader.onload = function(e){
      $('#photoPreview').attr('src', e.target.result)
        .show();

    };

    reader.readAsDataURL(input.files[0]);
  }
}
