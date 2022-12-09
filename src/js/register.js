$(document).ready(function(){

    $('#regname').focus()
    $('#btn-reg').on('click', function () {
        if(validityChecker()){
            registerRequest();
        }
    });

    $('#btn-sign').on('click', function(){
        $(location).attr('href', '/')
    });

    $('#regname').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            if(validityChecker()){
                registerRequest();
            }    
        }
        event.stopPropagation();
    });

    $('#regemail').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            if(validityChecker()){
                registerRequest();
            }    
        }
        event.stopPropagation();
    });
    
    $('#reguser').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            if(validityChecker()){
                registerRequest();
            }    
        }
        event.stopPropagation();
    });

    $('#regpass').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            if(validityChecker()){
                registerRequest();
            }    
        }
        event.stopPropagation();
    });

    $('#regpass2').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            if(validityChecker()){
                registerRequest();
            }    
        }
        event.stopPropagation();
    });
});



const registerRequest = () => {

    $.ajax({
        type: 'POST',
        url: '/src/php/router.php',
        data: {choice: 'register', regname: $('#regname').val().toUpperCase(), reguser: $('#reguser').val(), regpass: $('#regpass').val(), regemail: $('#regemail').val()},
        success: function(data){
            
            if (data == "200") {
                swal("Successfuly registered!", {
                    text: 'Log in Now!',
                    icon: "success",
                }).then(() =>{
                    $(location).attr('href', '/');
                });
            }
            if(data == "501"){
                swal({
                    title: "Something's wrong!",
                    text: "Username and Email already exist!",
                    icon: "error",
                })
            }
        },
        error: function(xhr, ajaxOptions, thrownError){
            console.log(thrownError)
        }
    })

}




var validityChecker = () => {
    var flag = false
    var count = 5;
    // Password
    if ($('#regpass').val() != '') {
        $('#errorpass').removeClass('invalid').text('');
    }else{
        $('#errorpass').addClass('invalid').text('Enter your password');
        count -= 1;
    }
    // console.log('Password ', count)
    
    // Confirm password
    if ($('#regpass2').val() != '') {
        if ($('#regpass2').val() === $('#regpass').val()) {
            $('#errorpass2').removeClass('invalid').text('');
        }else{
            $('#errorpass2').addClass('invalid').text('Password does not');
            count -= 1
        }
    }else{
        $('#errorpass2').addClass('invalid').text('Confirm your password');
        count -= 1
    }
    // console.log('Confirm password ', count)


    // Fullname
    if ($('#regname').val() != '') {
        $('#errorname').removeClass('invalid').text('');  
    }else{
        $('#errorname').addClass('invalid').text('Enter your fullname!');
        count -= 1
    }
    // console.log('Fullname ', count)
    
    // Username
    if ($('#reguser').val() != '') {
        $('#erroruser').removeClass('invalid').text('')
    }else{
        $('#erroruser').addClass('invalid').text('Enter your username')
        count -= 1
    }
    // console.log('Username ', count)
    
    // Email
    if ($('#regemail').val() != '') {
        if (testEmail($('#regemail').val())) {
            $('#erroremail').removeClass('invalid').text('')
        }else{
            $('#erroremail').addClass('invalid').text('Invalid email')
            count -= 1
        }
    }else{
        $('#erroremail').addClass('invalid').text('Enter your email')
        count -= 1
    }
    // console.log('Email ', count)
    
    if(count == 5){
        flag = true
    }
    
    return flag;
}

const testEmail = (email) =>{
    const rex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return rex.test(String(email).toLowerCase());
}