var logoname =  ''
var accountname = ''

$(document).ready(function() {
    
    $(".logo").val(logoname);
    $('#acc-name').val(accountname);
    viewName()
    viewImage()
    viewProfile()

    $(document).on('click', '#logout', function() {
      logoutRequest()
    })
  
    $(document).on('click', '#btn-submit', function() {
      if (checkPass()) {
        changePass()
      } else {
        swal('Please enter your Passwords',{
          icon: 'error'
        })
      }
    })
  
    $(document).on('click', '#btn-changeuser', function() {
      if ($('#changeuser').val() != '') {
        newUsername();
      } else {
        swal({
          icon: 'error',
          text: 'Please enter your Username'
        })
        $('#changeuser').addClass('is-invalid')
      }
    })

    // Keypress Enter

    $('#changeuser').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        if ($('#changeuser').val() != '') {
          newUsername();
        }
      }
      event.stopPropagation();
    });
  
  
    $('#changepass1').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        if (checkPass()) {
          changePass()
        }
      }
      event.stopPropagation();
    });
  
    $('#changepass2').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        if (checkPass()) {
          changePass()
        }
      }
      event.stopPropagation();
    });
  
    $('#changepass3').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        if (checkPass()) {
          changePass()
        }
      }
      event.stopPropagation();
    });

    $(document).on('change','#imagefile', event => {
      const [image] = imagefile.files
      if (image) {
        img.src = URL.createObjectURL(image)
      }
    })

    $(document).on('click', '#close', () =>{
      $('#imgName').val('')
      $('#img').attr('src', '')
      $('#imagefile').val('')
      $('#img-upload #uploadLabel').remove()

    })

    $(document).on('click', '.btn-close', () =>{
      $('#imgName').val('')
      $('#img').attr('src', '')
      $('#imagefile').val('')
      $('#img-upload #uploadLabel').remove()

    })

    $(document).on('click', '#clear', () =>{
      $('#imgName').val('')
      $('#img').attr('src', '')
      $('#imagefile').val('')
      $('#img-upload #uploadLabel').remove()
    })
    
    $(document).on('click', '#removeImg', function (e) {
      e.preventDefault()
      var ids = $(this).attr('class');
      var imgpath = $('#' + ids).attr('src')
      removeImage(ids, imgpath)
    })

    $(document).on('click', '#makeProfile', function (e) {
      e.preventDefault()
      var ids = $(this).attr('class');
      var imgpath = $('#' + ids).attr('src')
      useProfile(ids, imgpath)
    })

    $(document).on('click', '#editImg', function(e) {
      e.preventDefault()
      $('#imageModalLabel').text('Change Image')
    })

    $(document).on('click', '#upImg', function(e) {
      e.preventDefault()
      $('#imageModalLabel').text('Upload Image')
    })

    $(document).on('submit', () => {
      if ($('#imagefile').val() == '') {
        $('#imagefile').addClass('is-invalid')   
      } else if($('#imgName').val() == ''){
        $('#imgName').addClass('is-invalid')
      } else {
        var property = document.getElementById('imagefile').files[0]
        var img_name = property.name
        var img_ext = img_name.split('.').pop().toLowerCase()
        if (jQuery.inArray(img_ext, ['jpg', 'png', 'jpeg']) == -1) {
          swal({
            text: 'Invalid image file',
            icon: 'error'
          })
        }
        var img_size = property.size
        if (img_size > 2000000) {
          swal({
            text: 'File is too large',
            icon: 'error'
          })
        } else {
          var formdata = new FormData()
          formdata.append('file', property)
          uploadImage(formdata)
        }
      }
    })
});

const viewProfile = () => {
  $.ajax({
    type: 'POST',
    url: '/src/php/router.php',
    data: {
      choice: 'getProfile'
    },
    success: (data) => {
      var userJSON = JSON.parse(data)
      userJSON.forEach( element => {
        $('#profile').attr('src', element.user_profile)
      })
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(thrownError)
    }
  })
}

const useProfile = (imgID, imgPATH) => {
  $.ajax({
    type: 'POST',
    url: '/src/php/router.php',
    data: {
      choice: 'useProfile',
      id: imgID,
      path: imgPATH
    },
    success: (data) => {
      if(data == "200"){
        swal({
          text: 'You make this image your profile picture',
          icon: 'success'
        })
        $('#profile').load(location.href + ' #profile')
        viewProfile()
      }
    },
    error: (xhr, ajaxOptions, thrownError) => {
      console.log(thrownError)
    }
  })
}

const removeImage = (imgID, imgPath) => {
  $.ajax({
    type: 'POST',
    url: '/src/php/router.php',
    data: {
      choice: 'removeImage',
      imgid: imgID,
      path: imgPath
    },
    success: function (data) {
      console.log(data)
      if (data == "200") {
        swal({
          text: 'Image removed successfully',
          icon: 'success'
        })
        $('#gallery').load(location.href + ' #gallery')
        viewImage()
      }
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError)
    }
  })
}

const uploadImage = (formdata) => {
  $.ajax({
    url: '/src/php/upload.php',
    type: 'POST',
    data: formdata,
    contentType: false,
    processData: false,
    cache: false,
    success: function(data){
      console.log(data);
      if (data == "200") {
        $('#img').attr('src', '')
        $('#imagefile').val('')
        $('#imgName').val('')
        swal({
          text: 'Upload Success',
          icon: 'success',
        })
        $('#gallery').load(location.href + ' #gallery')
        viewImage()
      }
      
    },
    error: function(xhr, ajaxOptions, thrownError){
      console.log(thrownError)
    }
  })
}

const logoutRequest = () => {
  $.ajax({
    type: 'POST',
    url: '/src/php/router.php',
    data: {choice: 'logout'},
    success: function(data) {
      if (data == "200") {
          $(location).attr('href', '/')
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(thrownError)
    }
  })
}

const viewImage = () => {
  $.ajax({
    type: 'POST',
    url: '/src/php/router.php',
    data: {choice: 'displayImage'},
    success: (data) => {
      var image = JSON.parse(data)
      var count = 1
      image_path = '<div class="container">' +
                      '<div class="row">'
      image.forEach(element => {
          image_path += '<div class="col-md-4 col-sm-6">'
          image_path += '<div class="box">'
          image_path += '<img src="'+ element.img_path +'" id="'+ element.id +'" class="img img-thumbnail" title="'+element.uploaded+'"/>'
          image_path += '<ul class="icon">'
          image_path += '<li><a href="#?" class="'+ element.id +'" id="removeImg" aria-label="Remove Image" title="Delete"><i class="fa fa-trash"></i></a></li>'
          image_path += '<li><a href="#?" class="'+ element.id +'" id="makeProfile" aria-label="User as Profile" title="User Profile"><i class="fa fa-user"></i></a></li>'
          image_path += '</ul>'
          image_path += '</div>'
          image_path += '</div>'
          count++
        })
        image_path += '</div>'
        image_path += '</div>'
        $('#gallery').append(image_path);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(thrownError)
    }
  })
}

const viewName = () => {
    $.ajax({
        type: 'POST',
        url: '/src/php/router.php',
        data: {choice: 'view'},
        success: function(data) {
          if (isJSON(data)) {
              var json = JSON.parse(data);
              for (let count = 0; count < json.length; count++) {
                  const theName = json[count].fullname
                  const theNewName = theName.toLowerCase()
                  const theFullname = theNewName.charAt(0).toUpperCase() + theNewName.slice(1)
                  $('.logo').append(
                      "<h2>" + theFullname + "</h2>"
                  )
                  logoname = "<h2>" + theFullname + "</h2>"
                  $('#acc-name').append(
                      "<h3>" + theFullname + "'s Gallery</h3>"
                  )
                  accountname = "<h3>" + theFullname + " Gallery</h3>"
              }
          }else{
            $(location).attr('href', '/Not Found/?Page not found')
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(thrownError)
        }
      })
}

const checkPass = () => {
  var flag = false
  var count = 4
  if($('#changepass1').val() == ''){
    $('#changepass1').addClass('is-invalid')
    count -= 1
  }else{
    $('#changepass1').removeClass('is-invalid').addClass('is-valid')
  }
  if ($('#changepass2').val() == '') {
    $('#changepass2').addClass('is-invalid')
    count -= 1
  } else {
    $('#changepass2').removeClass('is-invalid').addClass('is-valid')
  }
  if ($('#changepass3').val() == '') {
    $('#changepass3').addClass('is-invalid')
    count -= 1
  } else {
    $('#changepass3').removeClass('is-invalid').addClass('is-valid')
  }
  if ($('#changepass3').val() != $('#changepass2').val()) {
    swal('Password does not match', {
      icon: 'error',
    })
    count -= 1
  }

  if (count == 4) {
    flag = true
  }
  return flag
}


const changePass = () => {
  $.ajax({
    type: 'POST',
    url: '/src/php/router.php',
    data: {
      choice: 'changepass', 
      oldpass:$('#changepass1').val(), 
      newpass: $('#changepass2').val()
    },
    success: function(data) {
      if (data == "200") {
        swal('Password changed Successfully!', {
          icon: 'success'
        }).then(() => {
          $('#changepass1').val('').removeClass('is-valid')
          $('#changepass2').val('').removeClass('is-valid')
          $('#changepass3').val('').removeClass('is-valid')
        })
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(thrownError)
    }
  })
}


const newUsername = () => {
  $.ajax({
    type: 'POST',
    url: '/src/php/router.php',
    data: {
      choice: 'changeusername',newUsername: $('#changeuser').val()
    },
    success: function(params) {
      if (params == "200") {
        swal('Username updated Successfully!', {
          icon: 'success'
        }).then(() => {
          $('#changeuser').val('').removeClass('is-valid')
          $('#barname').load(location.href + ' #barname')
          viewName()
        })
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log(thrownError)
    }
  })
}


const isJSON = (jsonFile) =>{
  if (typeof(jsonFile) !== 'string') {
    return false
  }
    try {
      JSON.parse(jsonFile)
    } catch (error) {
      return false
    }
    return true
  
}