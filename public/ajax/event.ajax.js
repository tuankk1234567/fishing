
$(document).ready(function() {
    var skip = 0;
    var limit = 7;
    var lesson = false; 
    var pageNumber = 1;
    getdata(skip,limit,pageNumber);



function getdata(skip,limit,pageNumber){
    var idUser = $('#idUser').val();
    var role = $('#role').val();
    $.ajax({
        url:'/master/getPostData',
        method:'post',
        dataType:'json',
        data:{skip:skip,limit:limit},
        success:function(response){
            console.log(response.data)
            var PostForm = $('.PostForm');

                PostForm.html('');

                 
                    $('.PostForm').show();
                    $.each(response.data,function(index,data){
                        if(role === 'admin' || data.idUser._id === idUser){
                           if(data.imageUrl[0] === undefined){
                               PostForm.append('\
                               <div class= "formevent" id= "'+data._id+'">\
                               <a href="/account/profile/'+data.idUser._id+'"><img class="imgUser" src="'+data.idUser.imageUrl+'" alt="">\
                               <span>'+data.idUser.name+'</span></a>\
                               <span style="font-size:12px;" class="date">'+data.date+':'+data.time+'</span>\
                               <button style="width: 80px;height: 40xp;font-size: 15px;padding: 4px 4px 4px 4px;margin-top:5px; background-color: #2f3640; border-radius: 10px; color: #fff; float: right" class = "delete"  value="'+data._id+'">Delete</button>\
                               <p class = "write">'+data.writePost+'</p>')
                               if(data.like.includes(idUser)){
                                   $('#'+data._id+'').append('<button style="color: blue;" class = "like1"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                }else{
                                   $('#'+data._id+'').append('<button class = "like"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                }
                             
                                
                                
                            }else{
                                PostForm.append('<div class= "formevent" id= "'+data._id+'"></div>')
                                $('#'+data._id+'').append('<a href="/account/profile/'+data.idUser._id+'"><img class="imgUser" src="'+data.idUser.imageUrl+'" alt=""><span>'+data.idUser.name+'</span></a>\
                                <span  style="font-size:12px;" class="date">'+data.date+':'+data.time+'</span>\
                                <button style="width: 80px;height: 40xp;font-size: 15px;padding: 4px 4px 4px 4px;margin-top:5px; background-color: #2f3640; border-radius: 10px; color: #fff; float: right" class = "delete"  value="'+data._id+'">Delete</button>\
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
                                if(data.like.includes(idUser)){
                                   $('#'+data._id+'').append('<button style="color: blue;" class = "like1"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                }else{
                                   $('#'+data._id+'').append('<button class = "like"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                }
                                  
                                                   
                            }
                        }else{
                           if(data.imageUrl[0] === undefined){
                               PostForm.append('\
                               <div class= "formevent" id= "'+data._id+'">\
                               <a href="/account/profile/'+data.idUser._id+'"><img class="imgUser" src="'+data.idUser.imageUrl+'" alt="">\
                               <span>'+data.idUser.name+'</span></a>\
                               <span style="font-size:12px;" class="date">'+data.date+':'+data.time+'</span>\
                               <p class = "write">'+data.writePost+'</p>')
                               if(data.like.includes(idUser)){
                                   $('#'+data._id+'').append('<button style="color: blue;" class = "like1"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                }else{
                                   $('#'+data._id+'').append('<button class = "like"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                }
                             
                                
                                
                            }else{
                                PostForm.append('<div class= "formevent" id= "'+data._id+'"></div>')
                                $('#'+data._id+'').append('<a href="/account/profile/'+data.idUser._id+'"><img class="imgUser" src="'+data.idUser.imageUrl+'" alt=""><span>'+data.idUser.name+'</span></a>\
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
                                if(data.like.includes(idUser)){
                                   $('#'+data._id+'').append('<button style="color: blue;" class = "like1"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                }else{
                                   $('#'+data._id+'').append('<button class = "like"  value="'+data._id+'"><i class="fas fa-thumbs-up"></i><label>('+data.like.length+')Like</label></button><button class="comment" value="'+data._id+'"><i class="fas fa-comments"></i>('+data.comment.length+')Commnet</button>')
                                }
                                  
                                                   
                            }
   
                        }
                        
                        
                        
           
                    });
                    if(response.btn === '0'){
                        PostForm.append('<div class="page"></div> ');
                      for(var i = 1; i <= response.numberPage; i++){
                          $('.page').append('<button class="pageNumber" id="page'+i+'" value="'+i+'">'+i+'</button>')
                      }
                      $('.page').append('<button class="Next" value=""><i class="fas fa-chevron-right"></i></button>')

                    }
                    if(response.btn === '2'){
                        PostForm.append('<div class="page"><button class="Previous" value=""><i class="fas fa-chevron-left"></i></button></div>')
                        for(var i = 1; i <= response.numberPage; i++){
                            $('.page').append('<button class="pageNumber" id="page'+i+'" value="'+i+'">'+i+'</button>')
                        }

                    }
                    if(response.btn === '1'){
                        PostForm.append('<div class="page"><button class="Previous" value=""><i class="fas fa-chevron-left"></i></button> \
                       </div> ')
                        for(var i = 1; i <= response.numberPage; i++){
                            $('.page').append('<button class="pageNumber"  id="page'+i+'" value="'+i+'">'+i+'</button>')
                        }
                        $('.page').append('<button class="Next" value=""><i class="fas fa-chevron-right"></i></button>')

                    }
                    
                    $('#page'+pageNumber+'').css('background-color','#2f3640');
                    $('#page'+pageNumber+'').css('color','white')
                    $('html, body').animate({
                        scrollTop: $('.PostForm').offset().top
                    }, 1000);
                    lesson = false;

                 PostForm.append('<div class="commentForm1"></div>')
                 
             
        },
        error:function(response){
            alert('server error');
        }
    });
}
$(document).on('click','.Previous',function(){
    if(lesson) return;
    $('.page button').css('background-color','white')
    $('.page button').css('color','#2f3640')
    pageNumber = skip/limit
    skip = skip - limit;
    lesson = true;

    getdata(skip,limit,pageNumber);
    

})
$(document).on('click','.pageNumber',function(){
    if(lesson) return;
    $('.page button').css('background-color','white')
    $('.page button').css('color','#2f3640')
    var pageNumber = $(this).val();
    skip = (pageNumber - 1) * limit;
    lesson = true;
    
    getdata(skip,limit,pageNumber);
    
    

})
$(document).on('click','.Next',function(){
    if(lesson) return;
    $('.page button').css('background-color','white')
    $('.page button').css('color','#2f3640')
    pageNumber = skip/limit + 2

    skip = skip + limit;
    lesson = true;
    getdata(skip,limit,pageNumber);

})

$(document).on('click', '.btnAddPost', function() {
    var today= new Date();
    var datenow = today.getFullYear()+'-'+(today.getMonth()+1).toString().padStart(2, "0")+'-'+today.getDate();
    var timenow = today.getHours().toString().padStart(2, "0")+':'+today.getMinutes().toString().padStart(2, "0");
    var writePost = $(".writePost").val();
    var imageUrl = $(".imageUrl").prop('files');
    console.log(writePost,imageUrl)
    var formData = new FormData();
    formData.append("datenow",datenow);
    formData.append("timenow",timenow);
    formData.append("writePost",writePost);
    for(var i = 0;i < imageUrl.length; i++){
        formData.append("imageUrl",imageUrl[i])
    }

    

    $.ajax({
        url:'/master/uploadPost',
        method:'post',
        dataType:'json',
        data:formData,
        async: false,
       cache: false,
       contentType: false,
       enctype: 'multipart/form-data',
       processData: false,
        success:function(response){
            $('.PostForm').empty();
                alert('đăng thành công');
                getdata();    
        },
        error:function(response){
                 alert('server error')   
        }
    });

})
$(document).on('click','.like',function(){
    var idPost = $(this).val();
    console.log(idPost)
    $.ajax({
        url:'/master/like',
        method:'post',
        dataType:'json',
        data:{idPost:idPost},
        success:function(response){
            if(response.message === 'You must login'){
                alert(response.message)
            }else{
                $('#'+idPost+' .like').attr('class','like1');
            $('#'+idPost+' .like1 i').css('color','blue');
            $('#'+idPost+' .like1 label').text('('+response.data.like.length+')Like');

            }

            
            
            
        }
    })
})
$(document).on('click','.like1',function(){
    var idPost = $(this).val();
    console.log(idPost)
    $.ajax({
        url:'/master/notlike',
        method:'post',
        dataType:'json',
        data:{idPost:idPost},
        success:function(response){
            if(response.message === 'You must login'){
                alert(response.message)
            }else{
                $('#'+idPost+' .like1').attr('class','like');
            $('#'+idPost+' .like i').css('color','#2f3640');
            $('#'+idPost+' .like label').text('('+response.data.like.length+')Like');

            }

            
            
            
        }
    })
})


$(document).on('click', '.addcomment', function() {
    alert('You must login')





})


$(document).on('click', '.comment', function() {
    var idPost = $(this).val();


    
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
$(document).on('click','.delete',function(){
    var idPost = $(this).val();
    if(confirm("Bạn có muốn xóa bai viet này không?") == true){
        $.ajax({
            url:'/admin/deletePost',
            method:'delete',
            dataType:'json',
            data:{idPost:idPost},
            success:function(response){
                    alert('data deleted');
                    getdata(skip,limit);    
            },
            error:function(response){
                     alert('server error')   
            }
        });
    }
})
})


