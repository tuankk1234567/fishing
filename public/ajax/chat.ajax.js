var socket = io()
$(document).ready(function(){
    
    getlist();
    function getlist(){
        $.ajax({
            url:'/master/getlist',
            method:'get',
            dataType:'json',
            success:function(response){
              if(response.message === 'You must login'){
                alert(response.message)
            }else{
              for(var i = 0; i < response.data.chat.length; i++){
                console.log(response.data.chat[i]._id,response.data.chat[i].idMaster.name)
                   $('.left').append('<div class="list" id = "'+response.data.chat[i]._id+'"> <img class="imgUser" src="'+response.data.chat[i].idMaster.imageUrl+'" alt=""><span class="name">'+response.data.chat[i].idMaster.name+'</span></div>')

              }
              if(response.data.chat.length > 0){
                socket.emit("tao-room-chat",response.data.chat[0]._id)
                getdatachat(response.data.chat[0]._id);
                $('.left #'+response.data.chat[0]._id+'').css('color','#fbfbfc');
                $('.left #'+response.data.chat[0]._id+'').css('background-color','#2f3640')
              }

            }
              

                
                

            }
        })
    }
    $(document).on('click','.list',function(){
      var id = this.id;
        $('.msger-chat').empty();
        $('.msger-inputarea').empty();
        $('.left .list').css('color','black');
        $('.left .list').css('background-color','white');

        $('.left #'+id+'').css('color','#fbfbfc');
        $('.left #'+id+'').css('background-color','#2f3640')
        socket.emit("tao-room-chat",id)
        getdatachat(id);
    })
    function getdatachat(id){
        var idUser = $('#idUser').val();
        $.ajax({
            url:'/master/getdatachat',
            method:'post',
            dataType:'json',
            data:{id:id},
            success:function(response){
                for(var i = 0; i < response.data.write.length; i++){
                    if(response.data.write[i].idWriter._id === idUser){
                        // $('.msger-chat').append('<div class="csschat1"> <div class= "csschat2"><span>'+response.data.write[i].write+'</span><span>'+response.data.write[i].idWriter.name+'</span></div><img class="imgUser" src="/upload/'+response.data.write[i].idWriter.imageUrl+'" alt=""></div>')
                        $('.msger-chat').append('<div class="msg right-msg">\
                        <div class="msg-img"><img class="imgUser" src="'+response.data.write[i].idWriter.imageUrl+'" alt=""></div>\
                        <div class="msg-bubble">\
                          <div class="msg-info">\
                            <div class="msg-info-name">'+response.data.write[i].idWriter.name+'</div>\
                            <div class="msg-info-time">'+response.data.write[i].date+':'+response.data.write[i].time+'</div>\
                          </div>\
                          <div class="msg-text">\
                          '+response.data.write[i].write+'\
                          </div>\
                        </div>\
                      </div>')
                      $(".msger-chat").scrollTop($(".msger-chat")[0].scrollHeight);
                    }else{
                        // $('.msger-chat').append('<div class="csschat3"> <img class="imgUser" src="/upload/'+response.data.write[i].idWriter.imageUrl+'" alt=""><div class= "csschat4"><span>'+response.data.write[i].idWriter.name+'</span><p>'+response.data.write[i].write+'</p></div></div>')
                        $('.msger-chat').append('\
                        <div class="msg left-msg">\
      <div class="msg-img"><img class="imgUser" src="'+response.data.write[i].idWriter.imageUrl+'" alt=""></div>\
      <div class="msg-bubble">\
        <div class="msg-info">\
          <div class="msg-info-name">'+response.data.write[i].idWriter.name+'</div>\
          <div class="msg-info-time">'+response.data.write[i].date+':'+response.data.write[i].time+'</div>\
        </div>\
        <div class="msg-text">\
        '+response.data.write[i].write+'\
        </div>\
      </div>\
    </div>')
                    }

                }
                $(".msger-chat").scrollTop($(".msger-chat")[0].scrollHeight);
                $('.msger-chat').append('<div class="chatnew"></div>')
                $('.msger-inputarea').append('<input type="text" class="msger-input" name="chat" placeholder="Enter your message..."> <button class="msger-send-btn" value="'+response.data._id+'">Send</button>')

            }
        })

    }
    $(document).on('click','.msger-send-btn',function(){
        var today= new Date();
    var datenow = today.getFullYear()+'-'+(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate();
    var timenow = today.getHours().toString().padStart(2, "0")+':'+today.getMinutes().toString().padStart(2, "0");
        var chat = $('.msger-input').val();
        var id = $(this).val();
    var imageUrl = $('#imageUrl').val();
    var name = $('#name').val();
    var idUser = $('#idUser').val();
    t = {
        idUser:idUser,
        id:id,
        imageUrl:imageUrl,
        name:name,
        chat:chat,
        date:datenow,
        time:timenow
    }
    $(".msger-input").val("");
    console.log(t)
     socket.emit("user-chat",t)
    })
    socket.on("server-chat",function(data){
        var idUser = $('#idUser').val();
        console.log(data)
        if(data.idUser === idUser){
            $('.chatnew').append('<div class="msg right-msg">\
            <div class="msg-img"><img class="imgUser" src="'+data.imageUrl+'" alt=""></div>\
            <div class="msg-bubble">\
              <div class="msg-info">\
                <div class="msg-info-name">'+data.name+'</div>\
                <div class="msg-info-time">'+data.time+'</div>\
              </div>\
              <div class="msg-text">\
              '+data.chat+'\
              </div>\
            </div>\
          </div>')
          $(".msger-chat").scrollTop($(".msger-chat")[0].scrollHeight);

        }else{
            $('.chatnew').append('\
            <div class="msg left-msg">\
<div class="msg-img"><img class="imgUser" src="'+data.imageUrl+'" alt=""></div>\
<div class="msg-bubble">\
<div class="msg-info">\
<div class="msg-info-name">'+data.name+'</div>\
<div class="msg-info-time">'+data.time+'</div>\
</div>\
<div class="msg-text">\
'+data.chat+'\
</div>\
</div>\
</div>')
$(".msger-chat").scrollTop($(".msger-chat")[0].scrollHeight);

        }
    })

})