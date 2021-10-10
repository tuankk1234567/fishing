$(document).ready(function(){
    getdata();
    getdataEvent()
    function getdata(){
        var _id = $('#_id').val();
    
        $.ajax({
            url:'/account/getprofile',
            method:'post',
            dataType:'json',
            data:{_id:_id},
            success:function(response){
                console.log(response.account.email)
                $('.information').empty();
                var information = $('.information');

                information.html('');
                if(response.account.role === 'master'){
                    information.append('\
                         <div class = "left">\
                         <p><img src="'+response.account.imageUrl+'" alt=""></p>\
                         <p>'+response.account.email+'</p>\
                         <a href="/booking/'+response.account._id+'">Booking</a>\
                         </div>\
                         <div class = "right">\
                         <h1 class="t">Personal information</h1>\
                         <div class="r">\
                         <p>Name:'+response.account.name+'\
                         <p>Phone:'+response.account.phone+'\
                         <p>Address:'+response.account.address+'\
                         <p>Bank:'+response.account.bank+'\
                         <p>Stk:'+response.account.stk+'\
                         </div>\
                         </div>\
                         ') 

                }else{
                    information.append('\
                         <div class = "left">\
                         <p><img src="'+response.account.imageUrl+'" alt=""></p>\
                         <p>'+response.account.email+'</p>\
                         </div>\
                         <div class = "right">\
                         <h1 class="t">Personal information</h1>\
                         <div class="r">\
                         <p>Name:'+response.account.name+'\
                         <p>Phone:'+response.account.phone+'\
                         <p>Address:'+response.account.address+'\
                         <p>Bank:'+response.account.bank+'\
                         <p>Stk:'+response.account.stk+'\
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
    function getdataEvent(){
        var _id = $('#_id').val();
        $.ajax({
            url:'/account/getPostData',
            method:'post',
            dataType:'json',
            data:{_id:_id},
            success:function(response){
                console.log(response.data)
                $('.PostForm').empty();
                var PostForm = $('.PostForm');
    
                    PostForm.html('');
                    if(response.idUser === '0'){
                        $.each(response.data,function(index,data){
                            if(data.imageUrl[0] === undefined){
                                PostForm.append('\
                                <div class= "formevent" id= "'+data._id+'">\
                                <a href="/account/profile/'+data.idUser._id+'"><img class="imgUser" src="'+data.idUser.imageUrl+'" alt="">\
                                <span>'+data.idUser.name+'</span></a>\
                                <span style="font-size:12px;" class="date">'+data.date+':'+data.time+'</span>\
                                <p class = "write">'+data.writePost+'</p>')

                                    $('#'+data._id+'').append('<button class = "like"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                 
                              
                                 
                                 
                             }else{
                                 PostForm.append('<div class= "formevent" id= "'+data._id+'"></div>')
                                 $('#'+data._id+'').append('<a href="/account/profile/'+data.idUser._id+'"><img class="imgUser" src="'+data.idUser.imageUrl+'" alt="">\
                                 <span>'+data.idUser.name+'</span></a>\
                                 <span  style="font-size:12px;" class="date">'+data.date+':'+data.time+'</span>\
                                  <p class = "write">'+data.writePost+'</p>')
                                  $('#'+data._id+'').append('<div id="carouselExampleControls '+data._id+'" class="carousel slide" data-ride="carousel">\
                                  <div class="carousel-inner">\
                                  </div>\
                                  <a class="carousel-control-prev" href="#carouselExampleControls '+data._id+'" role="button" data-slide="prev">\
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>\
                                    <span class="sr-only">Previous</span>\
                                  </a>\
                                  <a class="carousel-control-next" href="#carouselExampleControls '+data._id+'" role="button" data-slide="next">\
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>\
                                    <span class="sr-only">Next</span>\
                                  </a>\
                                </div>')
                                
                                 for(var i = 0; i<data.imageUrl.length;i++){
                                     if(i === 0){
                                        $('#'+data._id+' .carousel-inner').append('\
                                        <div class="carousel-item active">\
                  <img class="d-block w-100" src="'+data.imageUrl[i]+'" alt="First slide">\
                </div>')
                                     }else{
                                        $('#'+data._id+' .carousel-inner').append('\
                                        <div class="carousel-item">\
                  <img class="d-block w-100" src="'+data.imageUrl[i]+'" alt="First slide">\
                </div>')
                                     }
                                    
                                 }

                                    $('#'+data._id+'').append('<button class = "like"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                 
                                   
                                                    
                             }
    
                         
                         
                         
                         
            
                     });

                    }else{
                        $.each(response.data,function(index,data){
                            if(data.imageUrl[0] === undefined){
                                PostForm.append('\
                                <div class= "formevent" id= "'+data._id+'">\
                                <a href="/account/profile/'+data.idUser._id+'"><img class="imgUser" src="'+data.idUser.imageUrl+'" alt="">\
                                <span>'+data.idUser.name+'</span></a>\
                                <span style="font-size:12px;" class="date">'+data.date+':'+data.time+'</span>\
                                <p class = "write">'+data.writePost+'</p>')
                                if(data.like.includes(_id)){
                                    $('#'+data._id+'').append('<button style="color: blue;" class = "like1"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                 }else{
                                    $('#'+data._id+'').append('<button class = "like"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                 }
                              
                                 
                                 
                             }else{
                                 PostForm.append('<div class= "formevent" id= "'+data._id+'"></div>')
                                 $('#'+data._id+'').append('<a href="/account/profile/'+data.idUser._id+'"><img class="imgUser" src="'+data.idUser.imageUrl+'" alt="">\
                                 <span>'+data.idUser.name+'</span></a>\
                                 <span  style="font-size:12px;" class="date">'+data.date+':'+data.time+'</span>\
                                  <p class = "write">'+data.writePost+'</p>')
                                  $('#'+data._id+'').append('<div id="carouselExampleControls '+data._id+'" class="carousel slide" data-ride="carousel">\
                                  <div class="carousel-inner">\
                                  </div>\
                                  <a class="carousel-control-prev" href="#carouselExampleControls '+data._id+'" role="button" data-slide="prev">\
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>\
                                    <span class="sr-only">Previous</span>\
                                  </a>\
                                  <a class="carousel-control-next" href="#carouselExampleControls '+data._id+'" role="button" data-slide="next">\
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>\
                                    <span class="sr-only">Next</span>\
                                  </a>\
                                </div>')
                                
                                 for(var i = 0; i<data.imageUrl.length;i++){
                                     if(i === 0){
                                        $('#'+data._id+' .carousel-inner').append('\
                                        <div class="carousel-item active">\
                  <img class="d-block w-100" src="'+data.imageUrl[i]+'" alt="First slide">\
                </div>')
                                     }else{
                                        $('#'+data._id+' .carousel-inner').append('\
                                        <div class="carousel-item">\
                  <img class="d-block w-100" src="'+data.imageUrl[i]+'" alt="First slide">\
                </div>')
                                     }
                                    
                                 }
                                 if(data.like.includes(_id)){
                                    $('#'+data._id+'').append('<button style="color: blue;" class = "like1"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                 }else{
                                    $('#'+data._id+'').append('<button class = "like"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                 }
                                   
                                                    
                             }
    
                         
                         
                         
                         
            
                     });
                    }
    

                        
                     PostForm.append('<div class="commentForm1"></div>')
                 
            },
            error:function(response){
                alert('server error');
            }
        });
    }
    $(document).on('click', '.comment', function() {
        var idPost = $(this).val();
        console.log(idPost)
        
        $.ajax({
            url:'/master/getcomment',
            method:'post',
            dataType:'json',
            data:{idPost:idPost},
            success:function(response){
                console.log(response.data)
                var commentForm = $('.commentForm1');
    
                    commentForm.html('');
                    commentForm.append('<div id="myModal" class="modal1">\
                     <div class="modal-content1">\
                     <span class="close">&times;</span>\
                     <div class="commentForm"></div>\
                     </div>\
                     </div>')
    
    
                    for(var i = 0; i < response.data.comment.length; i++){
                        $('.commentForm').append('<div class="datacomment1"><img src="'+response.data.comment[i].idUserC.imageUrl+'" alt=""><div class= "comment1" id="'+response.data.comment[i]._id+'"></div></div>')
                        $('#'+response.data.comment[i]._id+'').append('<p>'+response.data.comment[i].idUserC.name+' <span class="date">'+response.data.comment[i].date+':'+response.data.comment[i].time+'</span></p>\
                        <p class="commentdata">'+response.data.comment[i].writeComment+'</p>')
    
                     }
                     $('.commentForm').append('<div class="commentnew"></div>')
                     $('.commentForm').append('<textarea class="commentPost" name="commentPost" rows="1" cols="65"></textarea>\
                     <button class="addcomment" value="'+response.data._id+'">Comment</button>')
                     
    
    
            }
    
        })
    
    
    })
    $(document).on('click','.close',function(){
        $('.commentForm1').empty();
    })
    

    

})
function back(){
    history.back();
}