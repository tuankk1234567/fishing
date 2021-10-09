$(document).on('click','#btn',function(){
    var password = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    var email = $("#email").val();
    console.log(password,email)
    $.ajax({
        url:'/account/doforgotpassword',
        method:'post',
        dataType:'json',
        data:{email:email,
        password:password},
        success:function(response){
            if(response.mss === "tai khoan khong ton tai"){
                alert(response.mss)
            }else{
                alert(response.mss)
            }

        }
    })
})