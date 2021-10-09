
$(document).ready(function() {

var role = "fishing"
getdata(role);

$(document).on('click','#addbtn',function(){
    var email = $("#email").val();
    var password = $("#password").val();
    var role = $("#role").val();
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bank = $("#bank").val();
    var name = $("#name").val();
    var stk = $("#stk").val();
    var EmailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   
    if(EmailRegex.test(email)){
        alert('Error Email. Form(...@abc.abc)')
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
    console.log(role)
    getdata(role);
    
    
 } );

function getdata(role){
    
    $.ajax({
        url:'/admin/getaccount',
        method:'post',
        dataType:'json',
        data:{role:role},
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
       <td><img src="/upload/'+data.imageUrl+'" alt=""></td>\
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
    if(confirm("Bạn có muốn xóa tài khoản này không?") == true){
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
      <p><input type="text" id="email" name="email" placeholder="Email"></p>\
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
