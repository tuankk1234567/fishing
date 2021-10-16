
$(document).ready(function() {
    var checkEmail = true;
    var checkPhone = true;
    var checkStk = true;
    var text;   
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
        $('#email').attr('style','border-bottom: 1px solid red;')
        checkEmail = false;
    }
    if(EmailRegex.test(email)){
        $('#email').attr('style','border-bottom: 1px solid black;')
        checkEmail = true;
    }


})
$(document).on('keyup','#phone',function(){

    var price = $('#phone').val()
    if(isNumberKey(price)){
        $('#phone').attr('style','border-bottom: 1px solid black;')
        checkPhone = true;
    }
    if(price.length < 8||price.length > 14){
        $('#phone').attr('style','border-bottom: 1px solid red;')
        checkPhone = false;
    }
    if(!isNumberKey(price)){
        $('#phone').attr('style','border-bottom: 1px solid red;')
        checkUpdate = false;
    }


})
$(document).on('keyup','#stk',function(){

    var price = $('#stk').val()
    if(isNumberKey(price)){
        $('#stk').attr('style','border-bottom: 1px solid black;')
        checkStk = true;
    }
    if(price.length < 8||price.length > 14){
        $('#stk').attr('style','border-bottom: 1px solid red;')
        checkStk = false;
    }
    if(!isNumberKey(price)){
        $('#stk').attr('style','border-bottom: 1px solid red;')
        checkStk = false;
    }


})


var role = "fishing"
getdata(text,role);

$(document).on('click','#addbtn',function(){
    if(checkEmail === false,checkPhone === false,checkStk === false){
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
    if(email===''||name===''||phone===''||address===''||bank===''||stk===''){
        alert('You must enter all information')
        if(email===''){
            $('#email').attr('style','border-bottom: 1px solid red;')
        }
        if(password===''){
            $('#password').attr('style','border-bottom: 1px solid red;')
        }
        if(phone===''){
            $('#phone').attr('style','border-bottom: 1px solid red;')
        }
        if(address===''){
            $('#address').attr('style','border-bottom: 1px solid red;')
        }
        if(bank===''){
            $('#bank').attr('style','border-bottom: 1px solid red;')
        }
        if(name===''){
            $('#name').attr('style','border-bottom: 1px solid red;')
        }
        if(stk===''){
            $('#stk').attr('style','border-bottom: 1px solid red;')
        }
        return;
    }



  $.ajax({
      url:'/admin/addmaster',
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
          if(response.message){
              alert(response.message === 'You must login')
          }else{
            $('.formadd').empty();
            alert('User added successfully');
            getdata(role);
          }

          



      },
      error:function(response){
          alert('server error')
      }
  });
});

$(document).on('change','#role',function(){
    var role = $(this).val();
    console.log(text,role)
    getdata(text,role);
    
    
 } );
 $(document).on('keyup','#search',function(){
    var text = $(this).val();
    var role = $('#role').val();
    console.log(text,role);
    getdata(text,role);
    
    
 } );

function getdata(text,role){
    
    $.ajax({
        url:'/admin/getaccount',
        method:'post',
        dataType:'json',
        data:{text:text,role:role},
        success:function(response){
            console.log(response.data)
            $('tr.row').remove()
            if(response.message){
                alert(response.message === 'You must login')
            }else{
                $.each(response.data,function(index,data){
                    index+=1;
       $('tbody').append('\
       <tr class="row">\
       <td>'+ index +'</td>\
       <td><img src="'+data.imageUrl+'" alt=""></td>\
       <td>'+data.email+'</td>\
       <td>'+data.name+'</td>\
       <td>'+data.role+'</td>\
       <td>'+data.phone+'</td>\
       <td>'+data.address+'</td>\
       <td>'+'<button class="del" value="'+data._id+'"><i class="far fa-trash-alt"></i> Delete</button>'+'</td>\
       </tr>'); 
                });
            }
                 
                 
             
        },
        error:function(response){
            alert('server error');
        }
    });
}
$(document).on('click','button.del',function(){
    var _id = $(this).parent().find('button.del').val();
    var role = $('#role').val();
    // alert('delte',id)
    if(confirm("Do you want to delete this account?") == true){
        $.ajax({
            url:'/admin/deleteaccount',
            method:'delete',
            dataType:'json',
            data:{_id:_id},
            success:function(response){
                if(response.message){
                    alert(response.message === 'You must login')
                }else{
                    alert('data deleted');
                    getdata(role); 
                }
                
                       
            },
            error:function(response){
                     alert('server error')   
            }
        });
    }
    
});

$(document).on('click','.btnaddform',function(){
    console.log('co')
    $('.formadd').append('<div id="myModal" class="modal">\
    <div class="modal-content">\
      <span class="close">&times;</span>\
      <p class="text">Add master</p>\
      <p>Name:</p>\
      <p><input type="text" id="name" name="name" placeholder="Name"></p>\
      <p>Email:</p>\
      <p><input type="text" id="email" name="email" placeholder="Email: VD: abc@abc.abc"></p>\
      <p>Password:</p>\
            <p><input type="password" id="password" name="password" placeholder="Password"></p>\
            <p><input type="hidden" id="role" name="role" value="master"></p>\
            <p>Phone:</p>\
            <p><input type="text" id="phone" name="phone" placeholder="Phone"></p>\
            <p>Address:</p>\
            <p><input type="text" id="address" name="address" placeholder="Address"></p>\
            <p>Bank:</p>\
            <p><input type="text" id="bank" name="bank" placeholder="Bank"></p>\
            <p>Account number:</p>\
            <p><input type="text" id="stk" name="stk" placeholder="Account number"></p>\
            <button id="addbtn">Add Master</button>\
      </div>\
  </div>')
})


$(document).on('click','.close',function(){
    $('.formadd').empty();
})
});
