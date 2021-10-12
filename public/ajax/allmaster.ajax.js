
$(document).ready(function() {
    getdata();

    $(document).on('keyup','#search',function(){
        var text = $(this).val();
        console.log(text)
        getdata(text);
        
        
     } );
    

    function getdata(text){

        $.ajax({
            url:'/allmaster/getdata',
            method:'post',
            dataType:'json',
            data:{text:text},
            success:function(response){
                var tbodyEl = $('tbody');
                tbodyEl.html('');
                if(response.account === '0'){
                    $.each(response.data,function(index,data){
                    tbodyEl.append('\
                    <tr>\
                    <td>'+data.name+'</td>\
                    <td>'+data.address+'</td>\
                    <td><a href="/booking/'+data._id+'">View</a></td>\
                    <td><button class = "addmessage"  value="'+data._id+'">Add to mesage</button></td>\
                  </tr>\
                    ')
                });
                }else{
                    $.each(response.data,function(index,data){
                        index+=1;
                        if(response.account.chat.includes(data.chat[0])){
                            tbodyEl.append('\
                        <tr>\
                        <td>'+data.name+'</td>\
                        <td>'+data.address+'</td>\
                        <td><a href="/allmaster/booking/'+data._id+'">View</a></td>\
                        <td></td>\
                      </tr>\
                        ')
                        }else{
                            tbodyEl.append('\
                        <tr>\
                        <td>'+data.name+'</td>\
                        <td>'+data.address+'</td>\
                        <td><a href="/allmaster/booking/'+data._id+'">View</a></td>\
                        <td><button class = "addmessage"  value="'+data._id+'">Add to mesage</button></td>\
                      </tr>\
                        ')
                         }
                        
          
                    });

                }
                
                
                 
            },
            error:function(response){
                alert('server error');
            }
        });
    }
    $(document).on('click', '.addmessage', function() {
        var idMaster = $(this).val();
        console.log(idMaster)
        $.ajax({
            url:'/allmaster/addtomessage',
            method:'post',
            dataType:'json',
            data:{idMaster:idMaster},
            success:function(response){
                if(response.message === 'You must login'){
                    alert(response.message)
                }else{
                    if(response.mss='thanh cong'){
                        getdata();
                    }
    
                }
                

            }
        })

    })
})
