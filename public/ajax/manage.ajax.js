$(document).ready(function() {
    var checkEmail = true;
    var checkPhone = true;
    var checkStk = true;
    var checkName = true;
    var checkPassword = true;
    var checkAddress = true;
    var checkBank = true;
    var text;
    var skip = 0;
    var limit = 4;
    var lesson = false;
    var pageNumber = 1;

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
            $('#email').attr('style', 'border-bottom: 1px solid red;')
            checkEmail = false;
            $('.txt_email').css('display', 'block')
        }
        if (EmailRegex.test(email)) {
            $('#email').attr('style', 'border-bottom: 1px solid black;')
            checkEmail = true;
            $('.txt_email').css('display', 'none')
        }


    })
    $(document).on('keyup', '#name', function() {

        var name = $('#name').val()
        if (name.length === 0) {
            $('#name').attr('style', 'border-bottom: 1px solid red;')
            checkName = false;
            $('.txt_name').css('display', 'block')
            return;
        }

        $('#name').attr('style', 'border-bottom: 1px solid #2f3640;')
        checkName = true;
        $('.txt_name').css('display', 'none')



    })
    $(document).on('keyup', '#password', function() {

        var password = $('#password').val()
        if (password.length === 0) {
            $('#password').attr('style', 'border-bottom: 1px solid red;')
            checkPassword = false;
            $('.txt_password').css('display', 'block')
            return;
        }

        $('#password').attr('style', 'border-bottom: 1px solid #2f3640;')
        checkPassword = true;
        $('.txt_password').css('display', 'none')



    })
    $(document).on('keyup', '#phone', function() {

        var price = $('#phone').val()
        if (isNumberKey(price)) {
            $('#phone').attr('style', 'border-bottom: 1px solid black;')
            checkPhone = true;
            $('.txt_phone').css('display', 'none')
        }
        if (price.length < 8 || price.length > 14) {
            $('#phone').attr('style', 'border-bottom: 1px solid red;')
            checkPhone = false;
            $('.txt_phone').css('display', 'block')
        }
        if (!isNumberKey(price)) {
            $('#phone').attr('style', 'border-bottom: 1px solid red;')
            checkUpdate = false;
            $('.txt_phone').css('display', 'block')
        }


    })
    $(document).on('keyup', '#address', function() {

        var address = $('#address').val()
        if (address.length === 0) {
            $('#address').attr('style', 'border-bottom: 1px solid red;')
            checkAddress = false;
            $('.txt_address').css('display', 'block')
            return;
        }

        $('#address').attr('style', 'border-bottom: 1px solid black;')
        checkAddress = true;
        $('.txt_address').css('display', 'none')



    })
    $(document).on('keyup', '#bank', function() {

        var bank = $('#bank').val()
        if (bank.length === 0) {
            $('#bank').attr('style', 'border-bottom: 1px solid red;')
            checkBank = false;
            $('.txt_bank').css('display', 'block')
            return;
        }

        $('#bank').attr('style', 'border-bottom: 1px solid black;')
        checkBank = true;
        $('.txt_bank').css('display', 'none')



    })
    $(document).on('keyup', '#stk', function() {
        var stk = $('#stk').val();
        if (isNumberKey(stk)) {
            $('#stk').attr('style', 'border-bottom: 1px solid black;')
            checkStk = true;
            $('.txt_stk').css('display', 'none')
        }
        if (stk.length < 8 || stk.length > 14) {
            $('#stk').attr('style', 'border-bottom: 1px solid red;')
            checkStk = false;
            $('.txt_stk').css('display', 'block')
        }
        if (!isNumberKey(stk)) {
            $('#stk').attr('style', 'border-bottom: 1px solid red;')
            checkStk = false;
            $('.txt_stk').css('display', 'block')
        }


    })


    var role = "fishing"
    getdata(text, role, skip, limit, pageNumber);
    getNumberAccount(role)

    $(document).on('click', '#addbtn', function() {
        console.log(checkEmail, checkPhone, checkStk, )
        if (checkEmail === false || checkPhone === false || checkStk === false || checkName === false || checkPassword === false || checkAddress === false || checkBank === false) {
            alert('You must enter follow form')
            return;
        }
        var email = $("#email").val();
        var password = $("#password").val();
        var role = $("#role").val();
        var phone = $("#phone").val();
        var address = $("#address").val();
        var bank = $("#bank").val();
        var name = $("#name").val();
        var stk = $("#stk").val();
        if (email === '' || name === '' || phone === '' || address === '' || bank === '' || stk === '') {
            alert('You must enter all information')
            if (email === '') {
                $('#email').attr('style', 'border-bottom: 1px solid red;')
                $('.txt_email').css('display', 'block')
            }
            if (password === '') {
                $('#password').attr('style', 'border-bottom: 1px solid red;')
                $('.txt_password').css('display', 'block')
            }
            if (phone === '') {
                $('#phone').attr('style', 'border-bottom: 1px solid red;')
                $('.txt_phone').css('display', 'block')
            }
            if (address === '') {
                $('#address').attr('style', 'border-bottom: 1px solid red;')
                $('.txt_address').css('display', 'block')
            }
            if (bank === '') {
                $('#bank').attr('style', 'border-bottom: 1px solid red;')
                $('.txt_bank').css('display', 'block')
            }
            if (name === '') {
                $('#name').attr('style', 'border-bottom: 1px solid red;')
                $('.txt_name').css('display', 'block')
            }
            if (stk === '') {
                $('#stk').attr('style', 'border-bottom: 1px solid red;')
                $('.txt_stk').css('display', 'block')
            }
            return;
        }



        $.ajax({
            url: '/admin/addmaster',
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
                if (response.message === 'Email already exists') {
                    alert(response.message)
                    return;
                }
                if (response.message === 'You must login') {
                    alert(response.message)
                } else {
                    $('.formadd').empty();
                    alert('User added successful');
                    role = 'master';
                    $('#role').val('master');
                    getdata(text, role, skip, limit, pageNumber);
                }





            },
            error: function(response) {
                alert('server error')
            }
        });
    });

    $(document).on('change', '#role', function() {
        skip = 0;
        pageNumber = 1;
        var text = $('#search').val();
        var role = $(this).val();
        getdata(text, role, skip, limit, pageNumber);
        getNumberAccount(role)


    });
    $(document).on('keyup', '#search', function() {
        skip = 0;
        pageNumber = 1;
        var text = $(this).val();
        var role = $('#role').val();
        getdata(text, role, skip, limit, pageNumber);


    });

    function getNumberAccount(role) {

        $.ajax({
            url: '/admin/getnumberaccount',
            method: 'post',
            dataType: 'json',
            data: { role: role },
            success: function(response) {
                $('.number_account').remove();
                if (response.message === 'Successful') {
                    if (role === 'fishing') {
                        $('.searchForm').append(' <button class="number_account" value=""><i class="fas fa-users"></i>  ' + response.count + ' Fishing</button>')
                    }
                    if (role === 'master') {
                        $('.searchForm').append(' <button class="number_account" value=""><i class="fas fa-users"></i>  ' + response.count + ' Master</button>')
                    }

                }



            },
            error: function(response) {
                alert('server error');
            }
        });
    }

    function getdata(text, role, skip, limit, pageNumber) {

        $.ajax({
            url: '/admin/getaccount',
            method: 'post',
            dataType: 'json',
            data: {
                text: text,
                role: role,
                skip: skip,
                limit: limit
            },
            success: function(response) {
                $('tr.row').remove()
                $('.page').empty();
                if (response.message) {
                    alert(response.message === 'You must login')
                } else {
                    $.each(response.data, function(index, data) {
                        index += 1;
                        $('tbody').append('\
       <tr class="row">\
       <td>' + index + '</td>\
       <td><img src="' + data.imageUrl + '" alt=""></td>\
       <td>' + data.email + '</td>\
       <td>' + data.name + '</td>\
       <td>' + data.role + '</td>\
       <td>' + data.phone + '</td>\
       <td>' + data.address + '</td>\
       <td>' + '<button class="del" value="' + data._id + '"><i class="far fa-trash-alt"></i> Delete</button>' + '</td>\
       </tr>');
                    });
                    if (response.btn === '0') {
                        for (var i = 1; i <= response.numberPage; i++) {
                            $('.page').append('<button class="pageNumber" id="page' + i + '" value="' + i + '">' + i + '</button>')
                        }
                        $('.page').append('<button class="Next" value=""><i class="fas fa-chevron-right"></i></button>')

                    }
                    if (response.btn === '2') {
                        $('.page').append('<button class="Previous" value=""><i class="fas fa-chevron-left"></i></button>')
                        for (var i = 1; i <= response.numberPage; i++) {
                            $('.page').append('<button class="pageNumber" id="page' + i + '" value="' + i + '">' + i + '</button>')
                        }

                    }
                    if (response.btn === '1') {
                        $('.page').append('<button class="Previous" value=""><i class="fas fa-chevron-left"></i></button>')
                        for (var i = 1; i <= response.numberPage; i++) {
                            $('.page').append('<button class="pageNumber"  id="page' + i + '" value="' + i + '">' + i + '</button>')
                        }
                        $('.page').append('<button class="Next" value=""><i class="fas fa-chevron-right"></i></button>')

                    }

                    $('#page' + pageNumber + '').css('background-color', '#2f3640');
                    $('#page' + pageNumber + '').css('color', 'white')
                    lesson = false;
                }



            },
            error: function(response) {
                alert('server error');
            }
        });
    }

    $(document).on('click', '.Previous', function() {
        if (lesson) return;
        $('.page button').css('background-color', 'white')
        $('.page button').css('color', '#2f3640')
        pageNumber = skip / limit
        skip = skip - limit;
        var text = $('#search').val();
        var role = $('#role').val();
        lesson = true;
        getdata(text, role, skip, limit, pageNumber);


    })
    $(document).on('click', '.pageNumber', function() {
        if (lesson) return;
        $('.page button').css('background-color', 'white')
        $('.page button').css('color', '#2f3640')
        var pageNumber = $(this).val();
        var text = $('#search').val();
        var role = $('#role').val();
        skip = (pageNumber - 1) * limit;
        lesson = true;

        getdata(text, role, skip, limit, pageNumber);



    })
    $(document).on('click', '.Next', function() {
        if (lesson) return;
        $('.page button').css('background-color', 'white')
        $('.page button').css('color', '#2f3640')
        pageNumber = skip / limit + 2
        var text = $('#search').val();
        var role = $('#role').val();
        skip = skip + limit;
        lesson = true;
        getdata(text, role, skip, limit, pageNumber);

    })


    $(document).on('click', 'button.del', function() {
        var _id = $(this).parent().find('button.del').val();
        var role = $('#role').val();
        if (confirm("Do you want to delete this account?") == true) {
            $.ajax({
                url: '/admin/deleteaccount',
                method: 'delete',
                dataType: 'json',
                data: { _id: _id },
                success: function(response) {
                    if (response.message) {
                        alert(response.message === 'You must login')
                    } else {
                        alert('Account deleted');
                        getdata(text, role, skip, limit, pageNumber);
                    }


                },
                error: function(response) {
                    alert('server error')
                }
            });
        }

    });

    $(document).on('click', '.btnaddform', function() {
        $('.formadd').append('<div id="myModal" class="modal">\
    <div class="modal-content">\
      <span class="close">&times;</span>\
      <p class="text">Add master</p>\
      <p class="text2">Name:</p>\
      <p><input type="text" id="name" name="name" placeholder="Name"></p>\
      <p class="txt_name">Name is required!</p>\
      <p class="text2">Email:</p>\
      <p><input type="text" id="email" name="email" placeholder="Email: VD: abc@abc.abc"></p>\
      <p class="txt_email">Email: VD: abc@abc.abc</p>\
      <p class="text2">Password:</p>\
            <p><input type="password" id="password" name="password" placeholder="Password"></p>\
            <p class="txt_password">Password is required!</p>\
            <p><input type="hidden" id="role" name="role" value="master"></p>\
            <p class="text2">Phone:</p>\
            <p><input type="text" id="phone" name="phone" placeholder="Phone"></p>\
            <p class="txt_phone">Phone is required and is number(>8)!</p>\
            <p class="text2">Address:</p>\
            <p><input type="text" id="address" name="address" placeholder="Address"></p>\
            <p class="txt_address">Address is required!</p>\
            <p class="text2">Bank:</p>\
            <p><input type="text" id="bank" name="bank" placeholder="Bank"></p>\
            <p class="txt_bank">Bank is required!</p>\
            <p class="text2">Account number:</p>\
            <p><input type="text" id="stk" name="stk" placeholder="Account number"></p>\
            <p class="txt_stk">Stk is required and is number(>8)!</p>\
            <button id="addbtn">Add Master</button>\
      </div>\
  </div>')
    })


    $(document).on('click', '.close', function() {
        $('.formadd').empty();
    })
});