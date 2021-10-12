$(document).ready(function(){
    var checkEmail = true;
    var checkPhone = true;
    var checkStk = true;
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31
    && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
var EmailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
$(document).on('change','#email',function(){

    var email = $('#email').val()
    if(!EmailRegex.test(email)){
        $('#email').attr('style','border: 1px solid red;')
        checkEmail = false;
    }
    if(EmailRegex.test(email)){
        $('#email').attr('style','border: 1px solid black;')
        checkEmail = true;
    }


})
$(document).on('keyup','#phone',function(){

    var price = $('#phone').val()
    if(isNumberKey(price)){
        $('#phone').attr('style','border: 1px solid black;')
        checkPhone = true;
    }
    if(price.length < 8||price.length > 14){
        $('#phone').attr('style','border: 1px solid red;')
        checkPhone = false;
    }
    if(!isNumberKey(price)){
        $('#phone').attr('style','border: 1px solid red;')
        checkUpdate = false;
    }


})
$(document).on('keyup','#stk',function(){

    var price = $('#stk').val()
    if(isNumberKey(price)){
        $('#stk').attr('style','border: 1px solid black;')
        checkStk = true;
    }
    if(price.length < 8||price.length > 14){
        $('#stk').attr('style','border: 1px solid red;')
        checkStk = false;
    }
    if(!isNumberKey(price)){
        $('#stk').attr('style','border: 1px solid red;')
        checkStk = false;
    }


})


    $(document).on('click','#btn',function(){
        if(checkEmail === false,checkPhone === false,checkStk === false){
            alert('You must enter follow form')
            return;
        }
        $('.signup-form input').attr('style','border: 1px solid black;');
        var email = $('#email').val();
        var password = $('#password').val();
        var role = $('#role').val();
        var phone = $('#phone').val();
        var address = $('#address').val();
        var bank = $('#bank').val();
        var name = $('#name').val();
        var stk = $('#stk').val();
        if(email===''||name===''||phone===''||address===''||bank===''||stk===''){
            alert('You must enter all information')
            if(email===''){
                $('#email').attr('style','border: 1px solid red;')
            }
            if(password===''){
                $('#password').attr('style','border: 1px solid red;')
            }
            if(phone===''){
                $('#phone').attr('style','border: 1px solid red;')
            }
            if(address===''){
                $('#address').attr('style','border: 1px solid red;')
            }
            if(bank===''){
                $('#bank').attr('style','border: 1px solid red;')
            }
            if(name===''){
                $('#name').attr('style','border: 1px solid red;')
            }
            if(stk===''){
                $('#stk').attr('style','border: 1px solid red;')
            }
            return;
        }
        $.ajax({
            url:'/account/doRegister',
            method:'post',
            dataType:'json',
            data:{email:email,
            password:password,
            role:role,
            phone:phone,
            address:address,
            bank:bank,
            name:name,
            stk:stk},
            success:function(response){
                if(response.message === "Email already exists"){
                    alert(response.message)
                }
                if(response.mss === "fishing"){
                    window.location.href = "./account/indexFishing";
                }
                
            }
        })
    })

})