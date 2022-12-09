$(document).ready(function(){
    $('#loguser').focus()
    $('#btn-login').hide()
    $('#fadePass').hide()

    $('#btn-login').on('click', function() {
        loginRequest();
    });
    
    $('.btn').on('click', function() {
        $(location).attr('href', '/view/register/')
    })
    
    $('#loguser').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            if(checkLogin()){
                loginRequest();
            }
        }
        event.stopPropagation();
    });

    $('#logpass').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            if(checkLogin()){
                loginRequest();
            }
        }
        event.stopPropagation();
    });
});


const checkLogin = () => {
    var flag = false

    if ($('#loguser').val() != '') {
        $('#erruser').removeClass('invalid').text('');
        flag = true
    }
    if ($('#loguser').val() == '') {
        $('#erruser').addClass('invalid').text('Please enter your username');
        flag = false
    }

    if ($('#logpass').val() != '') {
        $('#errpass').removeClass('invalid').text('');
        flag = true
    }
    if ($('#logpass').val() == '') {
        $('#errpass').addClass('invalid').text('Please enter your password');
        flag = false
    }

    return flag
}

const loginFunction = () =>{
    var username = $('#loguser').val()
    var password = $('#logpass').val()
    var flag = 0
    if(username.length == 0){
        $('#erruser').addClass('invalid').text('Please enter your username')
    } else if(username.length < 6){
        $('#erruser').addClass('invalid').text('Username must be at least 6 characters')
    } else {
        flag += 1
        $('#fadeUser input').attr('disable')
        $('#fadePass').fadeIn(500)
        $('#erruser').removeClass('invalid').text('')
    } 

    if (password == '') {
        $('#errpass').addClass('invalid').text('Please enter your password');
    } else {
        flag += 1
        $('#errpass').removeClass('invalid').text('')
    }

    if (flag == 2) {
        $('#btn-login').fadeIn(300)
    } else {
        $('#btn-login').hide()
    }
}

const loginRequest = () => {
    $.ajax({
        type: 'POST',
        url: '/src/php/router.php',
        data: {
            choice: 'login',
            loguser: $('#loguser').val(),
            logpass: $('#logpass').val()
        },
        success: function(data) {
            if (data == '200') {
                swal('Logged in Successfully!', {
                    icon: 'success',
                }).then(() => {
                    $('#logpass').val('')
                    $(location).attr('href', '/view/gallery')
                })
            }else{
                swal('Wrong password or username', {
                    icon: 'error',
                }).then(()=>{
                    $('#logpass').focus()
                })
            }
        },
        error: function(data) {
            console.log(data)
        }
    })
}