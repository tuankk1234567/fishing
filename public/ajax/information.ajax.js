$(document).ready(function(){
    getdata();
    function getdata(){
    
        $.ajax({
            url:'/account/getdata',
            method:'get',
            dataType:'json',
            success:function(response){
                console.log(response.account.email)
                $('.information').empty();
                var information = $('.information');

                information.html('');
                if(response.account === '0'){
                    alert('You must login')
                }else{
                    information.append('\
                         <div class = "left">\
                         <p><img src="/upload/'+response.account.imageUrl+'" alt=""></p>\
                         <p>'+response.account.email+'</p>\
                         </p><button type="submit" id="update">Update</button>\
                         </p><button type="submit" id="ChangePassword">Change Password</button>\
                         </div>\
                         <div class = "right">\
                         <h1 class="t">Personal information</h1>\
                         <div class="r">\
                         <p><label for="name">Name:</label><input type="text" name="name" class="name" value="'+response.account.name+'">\
                         <p><label for="phone">Phone:</label><input type="text" name="phone" class="phone" value="'+response.account.phone+'"></p>\
                         <p><label for="address">Address:</label><input type="text" name="address" class="address" value="'+response.account.address+'"></p>\
                         <p><label for="bank">Bank:</label><input type="text" name="bank" class="bank" value="'+response.account.bank+'"></p>\
                         <p><label for="stk">Stk:</label><input type="text" name="stk" class="stk" value="'+response.account.stk+'"></p>\
                         <input type="file" name="imageUrl" class="imageUrl">\
                         </div>\
                         </div>\
                         ') 
                }
                

                           

                
                 
            },
            error:function(response){
                alert('server error');
            }
        });
    }
    $(document).on('click', '#update', function() {
        var name = $(".name").val();
        var phone = $(".phone").val();
        var address = $(".address").val();
        var bank = $(".bank").val();
        var stk = $(".stk").val();
        var imageUrl = $(".imageUrl").prop('files');
        var formData = new FormData();
        formData.append("name",name);
        formData.append("phone",phone);
        formData.append("address",address);
        formData.append("bank",bank);
        formData.append("stk",stk);
        for(var i = 0;i < imageUrl.length; i++){
            formData.append("imageUrl",imageUrl[i])
        }
    
        
    
        $.ajax({
            url:'/account/doupdate',
            method:'post',
            dataType:'json',
            data:formData,
            async: false,
           cache: false,
           contentType: false,
           enctype: 'multipart/form-data',
           processData: false,
            success:function(response){
                
                    alert('đăng thành công');
                    getdata();    
            },
            error:function(response){
                     alert('server error')   
            }
        });
    
    })
    $(document).on('click', '#ChangePassword', function() {
        var formchange = $('.formchange');
        formchange.html('');
        formchange.show();

        formchange.append('<div id="myModal" class="modal">\
        <div class="modal-content">\
          <span class="close">&times;</span>\
          <p class="text"> Change password</p>\
          <p><label for="pass">Password:</label><input type="password" name="pass" id = "pass"></p>\
          <p><label for="passnew1">New password:</label><input type="password" name="passnew1" id = "passnew1"></p>\
          <p><label for="passnew2">New password:</label><input type="password" name="passnew2" id = "passnew2"></p>\
          <input type="submit" id="btnUpdate" value="Submit">\
          </div>\
      </div>')

    })
    $(document).on('click','#btnUpdate',function(){
        var pass = $('#pass').val();
        var passnew1 = $('#passnew1').val();
        var passnew2 = $('#passnew2').val();
        if(pass ===''||passnew1 ===''||passnew2===''){
            alert("hãy nhập vào các chỗ trống ")
        }else if(passnew1 != passnew2){
            alert('2 mã không giống')
        }else{
            $.ajax({
                url:'/account/dochangepass',
                method:'post',
                dataType:'json',
                data:{
                    pass:pass,
                    passnew1:passnew1
                },
                success:function(response){
                    console.log(response.mss)
                    
                    if(response.mss === "Mật khẩu không đúng"){
                        alert(response.mss)
                    }else{
                        $('.formchange').empty();
                        alert(response.mss)

                    }
            },
            error:function(response){
                     alert('server error')   
            }

            })
        }
    })
    $(document).on('click','.close',function(){
        $('.formchange').empty();
    })
    

})