var flag = false

document.getElementById("reset").addEventListener('click',  function () {
    var email = document.getElementById('emailadd').value
    var otpNumb = getRamdonNumb()
    
    if (testEmail(email)) {
        sendOtp(email,otpNumb)
    } else {
        swal({
            title: 'Error',
            text: 'Your email is invalid',
            icon: 'error'
        })
    }
})

sendOtp = (emailadd, otpNumb) => {
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "ruthakaza@gmail.com",
        Password : "2A3B8AAA1FE628DB418A9242184F0DB743F7",
        To : emailadd,
        From : "kazhu.korvi@gmail.com",
        Subject : "OTP",
        Body : otpNumb
    }).then(message => {
        if (message.toLowerCase() == 'ok') {
            startCountDown()
            document.getElementById('emailadd').style.display = 'none'
            document.getElementById('reset').id = 'sendcode'
            document.getElementById('thisOtp').style.display = ''
            swal({
                title: 'Success',
                text: '6 Digits OTP code Send Successfully\nCheck your inbox or spam\n\tDo not Refresh the page',
                icon: 'success'
            }).then(()=>{
                document.getElementById("sendcode").addEventListener('click',  function () {
                    var otp = document.getElementById('otpcode').value
                    if (otp != '') {
                        if (otp == otpNumb) {
                            swal({
                                title: 'Succes',
                                text: 'Redirecting',
                                icon: 'success'
                            }).then(()=>{
                                sessionStorage.setItem('email', document.getElementById('emailadd').value)
                                sessionStorage.setItem('statuscode', '200')
                                window.location.href = './pages/reset-password.html'
                            })
                        } else {
                            console.log(otp, otpNumb);
                            swal({
                                title: 'Wrong OTP',
                                text: 'OTP code was incorrect',
                                icon: 'error'
                            })
                        }
                    } else {
                        swal({
                            title: 'Empty OTP',
                            text: message,
                            icon: 'error'
                        })
                    }
                })
            })
        } else {
            swal({
                title: 'Error',
                text: 'Email unknown, cannot send OTP code',
                icon: 'error'
            })
            document.getElementById('emailadd').value = ''
        }
    });
}
var isSetTimmeoutRunning = false;

function startCountDown(){

    if( isSetTimmeoutRunning == false ){
        isSetTimmeoutRunning = true;
        
        var counter = 120;
        
        document.getElementById("demotime").innerHTML = "<b>" + 120 + "</b>";
        var interval = setInterval(function(){
            counter--;
        document.getElementById("demotime").innerHTML = "OTP will expire at <b>" + counter + "</b>";
            if( counter == 0 ){
                flag = true
                otpNumb = 0

                clearInterval(interval);
                swal('OTP Expire').then(() => {
                    document.getElementById("demotime").innerHTML = "Forgot Password?";
                    document.getElementById('emailadd').innerHTML = ''
                    document.getElementById('emailadd').style.display = ''
                    document.getElementById('sendcode').id = 'reset'
                    document.getElementById('thisOtp').innerHTML = ''
                    document.getElementById('thisOtp').style.display = 'none'
                })
            }
        }, 1000);
    }
}

getRamdonNumb = () => {
    var number
    do {
        number = Math.floor(Math.random() * 999999)
    } while (number < 100000);
    return number
}

testEmail = (email) =>{
    const rex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return rex.test(String(email).toLowerCase());
}