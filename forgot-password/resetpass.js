document.getElementById('email').value = sessionStorage.getItem('email')
var email = sessionStorage.getItem('email')

if (email != null || email != '') {
    document.getElementById('resetpassword').addEventListener('click', function() {
        var password = document.getElementById('password').value
        var confirm_password = document.getElementById('confirm_password').value
    
        if (checkInputs(password, confirm_password)) {
            changePassReq(password)
        } else {
            swal({
                title: 'Error',
                text: 'Passwords does not match',
                icon: 'error'
            })
        }
    })
    
} else {
    window.location.href = '/not-found'
}



changePassReq = (password) => {
    $.ajax({
        type: 'POST',
        url: '/src/php/router.php',
        data: {
            choice: 'resetpassword',
            email: email,
            password: password
        },
        success: (data) => {
            if (data == '200') {
                swal({
                    title: 'Reset Success',
                    text: 'Password reset successfully\nLogin Now!',
                    icon: 'success'
                }).then(()=>{
                    window.location.href = '../../'
                })
            } else if(data == '404') {
                swal({
                    title: 'Email not found',
                    text: 'Your Email is not registered',
                    icon: 'error'
                }).then(()=>{
                    window.location.href = '../../'
                })
            } else {
                window.location.href = '../../'
            }
        }
    })
}

checkInputs = (password, confirm_password) => {
    return (password != '' && confirm_password != '') ? true : (password == confirm_password ) ? true : false
}