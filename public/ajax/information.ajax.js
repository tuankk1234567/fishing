$(document).ready(function(){
    getdata();
    var checkUpdate = true;
    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
            return false;
    
        return true;
    }
    $(document).on('keyup','.phone',function(){
        var price = $('.phone').val()
        if(isNumberKey(price)){
            $('.phone').attr('style',' color:black')
            checkUpdate = true;
        }
        if(price.length < 8||price.length > 14){
            $('.phone').attr('style','color:red')
            checkUpdate = false;
        }
        if(!isNumberKey(price)){
            $('.phone').attr('style','color:red')
            checkUpdate = false;
        }


    })
    $(document).on('keyup','.stk',function(){
        var price = $('.stk').val()
        if(isNumberKey(price)){
            $('.stk').attr('style',' color:black')
            checkUpdate = true;
        }
        if(price.length < 8||price.length > 14){
            $('.stk').attr('style','color:red')
            checkUpdate = false;
        }
        if(!isNumberKey(price)){
            $('.stk').attr('style','color:red')
            checkUpdate = false;
        }


    })
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
                         <p><img src="'+response.account.imageUrl+'" alt="Image"></p>\
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
        if(checkUpdate === false){
            alert('You must enter follow form')
            return;
        }
        var name = $(".name").val();
        var phone = $(".phone").val();
        var address = $(".address").val();
        var bank = $(".bank").val();
        var stk = $(".stk").val();
        if(name===''||phone===''||address===''||bank===''||stk===''){
            alert('You must enter all information')
            return;
        }
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
                if(response.message === 'successful'){
                    alert('successful');
                    getdata();

                }
                
                        
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
          <p>Password:</p><input type="password" name="pass" id = "pass">\
          <p>New password:</p><input type="password" name="passnew1" id = "passnew1">\
          <p>New password:</p><input type="password" name="passnew2" id = "passnew2">\
           <p><button id="btnUpdate">Submit</button></p>\
          </div>\
      </div>')

    })
    $(document).on('click','#btnUpdate',function(){
        $('.modal input').attr('style','border-bottom:1px solid #2f3640;')
        var pass = $('#pass').val();
        var passnew1 = $('#passnew1').val();
        var passnew2 = $('#passnew2').val();
        if(pass ===''||passnew1 ===''||passnew2===''){
            alert("You must enter all")
            if(pass ===''){
                $('.modal #pass').attr('style','border-bottom:1px solid red;')
            }
            if(passnew1 ===''){
                $('.modal #passnew1').attr('style','border-bottom:1px solid red;')
            }
            if(passnew2 ===''){
                $('.modal #passnew2').attr('style','border-bottom:1px solid red;')
            }
            return;
            
        }else if(passnew1 != passnew2){
            alert('Password new error')
            $('.modal #passnew1').attr('style','border-bottom:1px solid red;')
            $('.modal #passnew2').attr('style','border-bottom:1px solid red;')
            return;
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
                    
                    if(response.mss === "Incorrect password"){
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