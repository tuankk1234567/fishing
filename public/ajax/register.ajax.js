$(document).ready(function() {
    var checkEmail = true;
    var checkPhone = true;
    var checkStk = true;
    var checkName = true;
    var checkPassword = true;
    var checkAddress = true;
    var checkBank = true;


    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode != 46 && charCode > 31 &&
            (charCode < 48 || charCode > 57))
            return false;

        return true;
    }
    var EmailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    $(document).on('change', '#email', function() {

        var email = $('#email').val()
        if (!EmailRegex.test(email)) {
            $('#email').attr('style', 'border: 1px solid red;')
            checkEmail = false;
            $('.txt_email').css('display', 'block')

        }
        if (EmailRegex.test(email)) {
            $('#email').attr('style', 'border: 1px solid black;')
            checkEmail = true;
            $('.txt_email').css('display', 'none')
        }


    })

    $(document).on('keyup', '#name', function() {

        var name = $('#name').val()
        if (name.length === 0) {
            $('#name').attr('style', 'border: 1px solid red;')
            checkName = false;
            $('.txt_name').css('display', 'block')
            return;
        }

        $('#name').attr('style', 'border: 1px solid black;')
        checkName = true;
        $('.txt_name').css('display', 'none')



    })
    $(document).on('keyup', '#password', function() {

        var password = $('#password').val()
        if (password.length === 0) {
            $('#password').attr('style', 'border: 1px solid red;')
            checkPassword = false;
            $('.txt_password').css('display', 'block')
            return;
        }

        $('#password').attr('style', 'border: 1px solid black;')
        checkPassword = true;
        $('.txt_password').css('display', 'none')



    })
    $(document).on('keyup', '#phone', function() {

        var phone = $('#phone').val()
        if (isNumberKey(phone)) {
            $('#phone').attr('style', 'border: 1px solid black;')
            checkPhone = true;
            $('.txt_phone').css('display', 'none')
        }
        if (phone.length < 8 || !isNumberKey(phone)) {
            $('#phone').attr('style', 'border: 1px solid red;')
            checkPhone = false;
            $('.txt_phone').css('display', 'block')
        }


    })
    $(document).on('keyup', '#address', function() {

        var address = $('#address').val()
        if (address.length === 0) {
            $('#address').attr('style', 'border: 1px solid red;')
            checkAddress = false;
            $('.txt_address').css('display', 'block')
            return;
        }

        $('#address').attr('style', 'border: 1px solid black;')
        checkAddress = true;
        $('.txt_address').css('display', 'none')



    })
    $(document).on('keyup', '#bank', function() {

        var bank = $('#bank').val()
        if (bank.length === 0) {
            $('#bank').attr('style', 'border: 1px solid red;')
            checkBank = false;
            $('.txt_bank').css('display', 'block')
            return;
        }

        $('#bank').attr('style', 'border: 1px solid black;')
        checkBank = true;
        $('.txt_bank').css('display', 'none')



    })
    $(document).on('keyup', '#stk', function() {

        var price = $('#stk').val()
        if (isNumberKey(price)) {
            $('#stk').attr('style', 'border: 1px solid black;')
            checkStk = true;
            $('.txt_stk').css('display', 'none')
        }
        if (price.length < 8 || !isNumberKey(price)) {
            $('#stk').attr('style', 'border: 1px solid red;')
            checkStk = false;
            $('.txt_stk').css('display', 'block')
        }


    })


    $(document).on('click', '#btn', function() {
        if (checkEmail === false, checkPhone === false, checkStk === false, checkName === false, checkPassword === false, checkAddress === false, checkBank === false) {
            alert('You must enter follow form')
            return;
        }
        $('.signup-form input').attr('style', 'border: 1px solid black;');
        var email = $('#email').val();
        var password = $('#password').val();
        var role = $('#role').val();
        var phone = $('#phone').val();
        var address = $('#address').val();
        var bank = $('#bank').val();
        var name = $('#name').val();
        var stk = $('#stk').val();
        if (email === '' || name === '' || phone === '' || address === '' || bank === '' || stk === '') {
            alert('You must enter all information')
            if (email === '') {
                $('#email').attr('style', 'border: 1px solid red;')
                $('.txt_email').css('display', 'block')
            }
            if (password === '') {
                $('#password').attr('style', 'border: 1px solid red;')
                $('.txt_password').css('display', 'block')
            }
            if (phone === '') {
                $('#phone').attr('style', 'border: 1px solid red;')
                $('.txt_phone').css('display', 'block')
            }
            if (address === '') {
                $('#address').attr('style', 'border: 1px solid red;')
                $('.txt_address').css('display', 'block')
            }
            if (bank === '') {
                $('#bank').attr('style', 'border: 1px solid red;')
                $('.txt_bank').css('display', 'block')
            }
            if (name === '') {
                $('#name').attr('style', 'border: 1px solid red;')
                $('.txt_name').css('display', 'block')
            }
            if (stk === '') {
                $('#stk').attr('style', 'border: 1px solid red;')
                $('.txt_stk').css('display', 'block')
            }
            return;
        }
        $.ajax({
            url: '/account/doRegister',
            method: 'post',
            dataType: 'json',
            data: {
                email: email,
                password: password,
                role: role,
                phone: phone,
                address: address,
                bank: bank,
                name: name,
                stk: stk
            },
            success: function(response) {
                if (response.message === "Email already exists") {
                    alert(response.message)
                }
                if (response.mss === "fishing") {
                    window.location.href = "./account/indexFishing";
                }

            }
        })
    })

})