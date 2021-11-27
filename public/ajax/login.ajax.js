$(document).ready(function() {
    $(document).on('click', '#btn', function() {
        var email = $('#email').val();
        var password = $('#password').val();
        console.log(email, password)
        $.ajax({
            url: '/account/dologin',
            method: 'post',
            dataType: 'json',
            data: {
                email: email,
                password: password
            },
            success: function(response) {
                if (response.message === "Email or password is invalid") {
                    alert(response.message)
                }
                if (response.mss === "admin") {
                    window.location.href = "./account/indexAdmin";
                }
                if (response.mss === "master") {
                    window.location.href = "./account/indexMaster";
                }
                if (response.mss === "fishing") {
                    window.location.href = "./account/indexFishing";
                }

            }
        })
    })
})