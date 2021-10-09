

$(document).ready(function() {
    $(document).on('click','#btn',function(){
        var email = $('#email').val();
        var password = $('#password').val();
        var role = $('#role').val();
        var phone = $('#phone').val();
        var address = $('#address').val();
        var bank = $('#bank').val();
        var name = $('#name').val();
        var stk = $('#stk').val();
        console.log(email,password)
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