

$(document).ready(function() {
    document.getElementById("date4").valueAsDate = new Date();
    var checkUpdate = true;
    var  checkForm = true;
    
    var today2 = new Date();
    var datenow = today2.getFullYear()+'-'+(today2.getMonth()+1).toString().padStart(2, "0")+'-'+today2.getDate().toString().padStart(2, "0"); 
    var timeFishing = '8 am to 12 am';
    getdataTicketVip(datenow,timeFishing);
    getdataTicket();
    getdatacalendar();
//vadidate update
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
            return false;
    
        return true;
    }
    $(document).on('keyup','.dataticket .price',function(){
        var price = $('.dataticket .price').val()
        if(isNumberKey(price)){
            $('.dataticket .price').attr('style',' border:none')
            checkUpdate = true;
        }
        if(!isNumberKey(price)){
            $('.dataticket .price').attr('style','border:1px solid red')
            checkUpdate = false;
        }
        var priceUpdate = price.replace(/,/g, '')
        console.log(priceUpdate)
        
        var priceUpdate = numberWithCommas(priceUpdate);
        

           
        $('.dataticket .price').val(''+priceUpdate+'')


    })
    $(document).on('keyup','.datacalendar .priceMorning',function(){
        var price = $('.datacalendar .priceMorning').val()
        if(isNumberKey(price)){
            $('.datacalendar .priceMorning').attr('style',' border:none')
            checkUpdate = true;
        }
        if(!isNumberKey(price)){
            $('.datacalendar .priceMorning').attr('style','border:1px solid red')
            checkUpdate = false;
        }
        var priceUpdate = price.replace(/,/g, '')
        console.log(priceUpdate)      
        var priceUpdate = numberWithCommas(priceUpdate);      
        $('.datacalendar .priceMorning').val(''+priceUpdate+'')


    })
    $(document).on('keyup','.datacalendar .priceAfternoon',function(){
        var price = $('.datacalendar .priceAfternoon').val()
        if(isNumberKey(price)){
            $('.datacalendar .priceAfternoon').attr('style',' border:none')
            checkUpdate = true;
        }
        if(!isNumberKey(price)){
            $('.datacalendar .priceAfternoon').attr('style','border:1px solid red')
            checkUpdate = false;
        }
        var priceUpdate = price.replace(/,/g, '')
        console.log(priceUpdate)
        
        var priceUpdate = numberWithCommas(priceUpdate);
        

           
        $('.datacalendar .priceAfternoon').val(''+priceUpdate+'')


    })
    $(document).on('keyup','.datacalendar .priceNight',function(){
        var price = $('.datacalendar .priceNight').val()
        if(isNumberKey(price)){
            $('.datacalendar .priceNight').attr('style',' border:none')
            checkUpdate = true;
        }
        if(!isNumberKey(price)){
            $('.datacalendar .priceNight').attr('style','border:1px solid red')
            checkUpdate = false;
        }
        var priceUpdate = price.replace(/,/g, '')
        console.log(priceUpdate)
        
        var priceUpdate = numberWithCommas(priceUpdate);
        

           
        $('.datacalendar .priceNight').val(''+priceUpdate+'')


    })
    //vadidate form add
    $(document).on('keyup','.formAdd .price',function(){
        var price = $('.formAdd .price').val()
        if(isNumberKey(price)){
            $('.formAdd .price').attr('style',' border:none')
            checkForm = true;
        }
        if(!isNumberKey(price)){
            $('.formAdd .price').attr('style','border:1px solid red')
            checkForm = false;
        }
        var priceUpdate = price.replace(/,/g, '')
        console.log(priceUpdate)
        
        var priceUpdate = numberWithCommas(priceUpdate);
        

           
        $('.formAdd .price').val(''+priceUpdate+'')


    })
    $(document).on('keyup','.formAdd .time3',function(){
        var price = $('.formAdd .time3').val()
        if(isNumberKey(price)){
            $('.formAdd .time3').attr('style',' border:none')
            checkForm = true;
        }
        if(!isNumberKey(price)){
            $('.formAdd .time3').attr('style','border:1px solid red')
            checkForm = false;
        }



    })
    $(document).on('keyup','#price1',function(){
        var price = $('#price1').val()
        if(isNumberKey(price)){
            $('#price1').attr('style',' border:none')
            checkForm = true;
        }
        if(!isNumberKey(price)){
            $('#price1').attr('style','border:1px solid red')
            checkForm = false;
        }
        var priceUpdate = price.replace(/,/g, '')
        console.log(priceUpdate)      
        var priceUpdate = numberWithCommas(priceUpdate);      
        $('#price1').val(''+priceUpdate+'')


    })
    $(document).on('keyup','#price2',function(){
        var price = $('#price2').val()
        if(isNumberKey(price)){
            $('#price2').attr('style',' border:none')
            checkForm = true;
        }
        if(!isNumberKey(price)){
            $('#price2').attr('style','border:1px solid red')
            checkForm = false;
        }
        var priceUpdate = price.replace(/,/g, '')
        console.log(priceUpdate)
        
        var priceUpdate = numberWithCommas(priceUpdate);
        

           
        $('#price2').val(''+priceUpdate+'')


    })
    
    $(document).on('keyup','#price3',function(){
        var price = $('#price3').val()
        if(isNumberKey(price)){
            $('#price3').attr('style',' border:none')
            checkForm = true;
        }
        if(!isNumberKey(price)){
            $('#price3').attr('style','border:1px solid red')
            checkForm = false;
        }
        var priceUpdate = price.replace(/,/g, '')
        console.log(priceUpdate)
        
        var priceUpdate = numberWithCommas(priceUpdate);
        

           
        $('#price3').val(''+priceUpdate+'')


    })


//function
$(document).on('change','#date4',function(){
    var date4 = $(this).val();
    var timeFishing = $('#timeFishing').val();
    console.log(date4,timeFishing)
    getdataTicketVip( date4,timeFishing);
    
    
 } );
 $(document).on('change','#timeFishing',function(){
    var date4 = $('#date4').val();
    var timeFishing = $('#timeFishing').val();
    console.log(date4,timeFishing)
    getdataTicketVip(date4,timeFishing);
    
    
 } );
$(document).on('click','.addFormticket',function(){
    $('.formAdd').append('<div id="myModal" class="modal">\
    <div class="modal-content-1">\
      <span class="close">&times;</span>\
      <p class="text"> Add ticket</p>\
      <p>Open time:</p>\
      <p><input type="time" class="time1" id="time1" name="time1" ></p>\
      <p>Close time:</p>\
    <p><input type="time" class="time2" id="time2" name="time2"></p>\
    <p>Sentence time:</p>\
    <p><input type="text" class="time3" id="time3" name="time3" placeholder="Sentence time..." ></p>\
    <p>Price:</p>\
    <p><input type="text" class="price" name="price" id="price" placeholder="Price..."></p>\
    <button class="btnaddticket">Submit</button>\
      </div>\
  </div>')
})


$(document).on('click','.addFormCalendar',function(){
    $('.formAdd').append('<div id="myModal" class="modal">\
    <div class="modal-content-2">\
      <span class="close">&times;</span>\
      <p class="text"> Add ticket</p>\
      <p><label for="price1">Price(8 am to 12 am):</label><input type="text" class="price1" id="price1" name="price1" placeholder="Price(8 am to 12 am)"></p>\
    <p><label for="price2">Price(2 pm to 6 pm):</label><input type="text" class="price2" id="price2" name="price2" placeholder="Price(2 pm to 6 pm)"></p>\
    <p><label for="price3">Price(7 pm to 11 pm):</label><input type="text" class="price3" id="price3" name="price3" placeholder="Price(7 pm to 11 pm)"></p>\
    <p><label for="numberOfTent">Number tent</label><input type="number" class="numberOfTent" name="numberOfTent" id="numberOfTent" placeholder="Tent"></p>\
    <button class="btnaddCalendar">Submit</button>\
      </div>\
  </div>')
})
$(document).on('click','.addFormDayOff',function(){
    $('.formAdd').append('<div id="myModal" class="modal">\
    <div class="modal-content-3">\
      <span class="close">&times;</span>\
      <p class="text"> Add day off</p>\
      <p><label for="dayoff">Date off:</label><input type="date" class="dayoff" id="dayoff" name="dayoff"></p>\
    <button class="btnadddayoff">Submit</button>\
      </div>\
  </div>')
})

function getdataTicketVip(date4,timeFishing){
    $.ajax({
        url:'/master/getticketvip',
        method:'post',
        dataType:'json',
        data:{date4:date4,
            timeFishing},
        success:function(response){
            console.log(response.data)
            $('.table1').empty();

                 
                 $.each(response.data,function(index,data){
                     index+=1;
                     console.log(data)
                     $('.table1').append('\
                     <tr id="'+index+'" class= "da">\
                     <td>'+index+'</td>\
                     <td>'+data.date+'</td>\
                     <td>'+data.name+'</td>\
                     <td>'+data.time+'</td>\
                     <td>'+data.price+'</td>\
                     <td class="type">'+data.type+'</td>\
                     <td>'+data.nameFishing.name+'</td>\
                     <td><p><button class="del" value="'+data._id+'"><i class="far fa-trash-alt"></i> Delete</button></p>\
                     <input type="hidden" value="'+data.nameFishing._id+'" class="idUser">\
                     <p><button class="payment-confirmation" value="'+data._id+'"><i class="fab fa-cc-amazon-pay"></i> Payment confirmation</button></p>\
                     <p><button class="add-to-black-list" value="'+index+'"><i class="fas fa-user-lock"></i></i> Add to block list</button></p>\
                     </td>\
                   </tr>\
                     ')
       
                 });
             
        },
        error:function(response){
            alert('server error');
        }
    });
}
$(document).on('click','.payment-confirmation',function(){
    var _id = $(this).val();
    var date4 = $('#date4').val();
    var timeFishing = $('#timeFishing').val();
    
    console.log(date4,timeFishing)
    
console.log(_id)
if(confirm("Đã thanh toán?") == true){
    $.ajax({
        url:'/master/paymentconfirmation',
        method:'post',
        dataType:'json',
        data:{_id:_id},
        success:function(response){
            if(response.msg === 'success'){
                getdataTicketVip(date4,timeFishing);
            }
            
                  
        },
        error:function(response){
                 alert('server error')   
        }
    });
}
});
$(document).on('click','.add-to-black-list',function(){
    var index = $(this).val();
    var idUser = $('#'+index+' .idUser').val();
    var idTicket = $('#'+index+' .del').val();
    var type = $('#'+index+' .type').text();
    console.log(type)
    var date4 = $('#date4').val();
    var timeFishing = $('#timeFishing').val();

if(confirm("Bạn có muốn thêm vào black list?") == true){
    if(type === 'payment confirmation'){
        alert('they paid you can not add to blacklist')

    }else{
        $.ajax({
            url:'/master/addtoblacklist',
            method:'post',
            dataType:'json',
            data:{idUser:idUser,
            idTicket:idTicket},
            success:function(response){
                if(response.msg === 'success'){
                    getdataTicketVip(date4,timeFishing);  
                }
                    
            },
            error:function(response){
                     alert('server error')   
            }
        });

    }
    
}
});
function getdataTicket(){
    $.ajax({
        url:'/master/getticket',
        method:'get',
        dataType:'json',
        success:function(response){
            console.log(response.data)
            $('.dataticket').empty();
                 
                 $.each(response.data,function(index,data){
                    $('.dataticket').append('\
                    <h1>Ticket</h1>\
                    <p>Work time:<input type="text" value="'+data.time+'" class="timeTicket"></p>\
                    <p>Duration:<input type="text" value="'+data.sentenceTime+'" class="sentenceTime"></p>\
                    <p>Price: <input type="text" value="'+data.price+'" class="price"><p/>')
       
                 });
             
        },
        error:function(response){
            alert('server error');
        }
    });
}
function getdatacalendar(){
    $.ajax({
        url:'/master/getdatacalendar',
        method:'get',
        dataType:'json',
        success:function(response){
            
            $('.datacalendar').empty();
            $('.formDayoff').empty();
                 

                    $('.datacalendar').append('\
                    <h1>Calendar</h1>\
                    <p>Price(8 am to 12 am):<input type="text" value="'+response.data.priceMorning+'" class="priceMorning"></p>\
                    <p>Price(2 pm to 6 pm):<input type="text" value="'+response.data.priceAfternoon+'" class="priceAfternoon"></p>\
                    <p>Price(7 pm to 11 pm):<input type="text" value="'+response.data.priceNight+'" class="priceNight"></p>\
                    <p>Number tent:<input type="text" value="'+response.data.numberOfTent+'" class="numberOfTent"></p>\
                    ')
                    if(response.data.dayOff.length > 0){
                        $('.formDayoff').append('<table class="table"><thead><tr>\
                        <th>Date off</th>\
                        <th>Action</th>\
                        </tr></thead>\
                        <tbody class="table2">\
                        </tbody>\
                        </table>')
                        

                        for(var i = 0; i<response.data.dayOff.length; i++){
                            console.log(response.data.dayOff[i],datenow,response.data.dayOff[i] > datenow)
                            if(response.data.dayOff[i] >= datenow){
                                $('.table2').append('<tr>\
                                <th>'+response.data.dayOff[i]+'</th>\
                                <th><button class="delete" value="'+response.data.dayOff[i]+'"><i class="far fa-trash-alt"></i> Delete</button></th>\
                                </tr>')
                            }
                            

                        }
                    }
                   
       
             
        },
        error:function(response){
            alert('server error');
        }
    });
}

$(document).on('click','.delete',function(){
    var dayoff = $(this).val();
if(confirm("Bạn có muốn xóa không?") == true){
    $.ajax({
        url:'/master/deletedayoff',
        method:'delete',
        dataType:'json',
        data:{dayoff:dayoff},
        success:function(response){
            if(response.message === 'successful'){
                alert('data deleted');
                $('.formDayoff').empty();
                getdatacalendar();   

            }else{
                alert('err')
            }
            
                
        },
        error:function(response){
                 alert('server error')   
        }
    });
}
});
$(document).on('click','.btnupdate',function(){
    if(checkUpdate === false){
        alert('You must enter follow form')
        return;
    }
    var timeTicket = $('.dataticket .timeTicket').val();
    var sentenceTime = $('.dataticket .sentenceTime').val();
    var price = $('.dataticket .price').val();
    
    var priceMorning = $('.datacalendar .priceMorning').val();
    var priceAfternoon = $('.datacalendar .priceAfternoon').val();
    var priceNight = $('.datacalendar .priceNight').val();
    var numberOfTent = $('.datacalendar .numberOfTent').val();
    // xóa các thuộc tính 
    $('.dataticket input').attr('style','border:none')
    $('.datacalendar input').attr('style','border:none')
    if(timeTicket ===''||sentenceTime ===''||price ===''||priceMorning ===''||priceAfternoon ===''||priceNight ===''||numberOfTent ===''){
    alert('Enter full information')
    if(timeTicket ===''){
        $('.dataticket .timeTicket').attr('style','border:1px solid red')
    }
    if(sentenceTime ===''){
        $('.dataticket .sentenceTime').attr('style','border:1px solid red')
    }
    if(price ===''){
        $('.dataticket .price').attr('style','border:1px solid red')
    }
    if(priceMorning ===''){
        $('.datacalendar .priceMorning').attr('style','border:1px solid red')
    }
    if(priceAfternoon ===''){
        $('.datacalendar .priceAfternoon').attr('style','border:1px solid red')
    }
    if(priceNight ===''){
        $('.datacalendar .priceNight').attr('style','border:1px solid red')
    }
    if(numberOfTent ===''){
        $('.datacalendar .numberOfTent').attr('style','border:1px solid red')
    }

    return;
    }
    
    $.ajax({
        url:'/master/updatemanageticket',
        method:'post',
        dataType:'json',
        data:{
            timeTicket:timeTicket,
            sentenceTime:sentenceTime,
            price:price,
            priceMorning:priceMorning,
            priceAfternoon:priceAfternoon,
            priceNight:priceNight,
            numberOfTent:numberOfTent},
        success:function(response){
            if(response.message === 'successful'){
                alert(response.message)
                getdataTicket();
                getdatacalendar();
            }
            else{
              alert('err');
              

            }
  
            
  
  
  
        },
        error:function(response){
            alert('server error')
        }
    });

})



$(document).on('click','.btnadddayoff',function(){
    var dayoff = $(".dayoff").val();
    if(dayoff === ''){
        $(".dayoff").attr('style','border:1px solid red')
        return
    }
    $.ajax({
        url:'/master/adddayoff',
        method:'post',
        dataType:'json',
        data:{
            dayoff:dayoff},
        success:function(response){
            if(response.message === 'You must create can calendar'){
                alert(response.message)
            }else if(response.message === 'already exist'){
                alert(response.message)
            }
            else{
              alert(response.message);
              $('.formAdd').empty();
              $('.formDayoff').empty();
              getdatacalendar();

            }
  
            
  
  
  
        },
        error:function(response){
            alert('server error')
        }
    });

})




$(document).on('click','button.del',function(){
    var _id = $(this).parent().find('button.del').val();
console.log(_id)
if(confirm("Bạn có muốn xóa không?") == true){
    $.ajax({
        url:'/master/deleteticketvip',
        method:'delete',
        dataType:'json',
        data:{_id:_id},
        success:function(response){
            
                alert('data deleted');
                getdataTicketVip();    
        },
        error:function(response){
                 alert('server error')   
        }
    });
}
});
$(document).on('click','.btnaddticket',function(){
    if(checkForm === false){
        alert('You must enter follow form')
        return;
    }
    var time1 = $("#time1").val();
    var time2 = $("#time2").val();
    var time3 = $("#time3").val();
    var time = time1 + " to "+ time2;
    var price = $("#price").val();
    $('.formAdd input').attr('style','border:none')
    if(time1===''||time2===''||time3===''||price===''){
        alert('Enter full information')
        if(time1===''){
            $("#time1").attr('style','border:1px solid red')

        }
        if(time2===''){
            $("#time2").attr('style','border:1px solid red')

        }
        if(time3===''){
            $("#time3").attr('style','border:1px solid red')

        }
        if(price===''){
            $("#price").attr('style','border:1px solid red')

        }
        return;

    }
    $.ajax({
        url:'/master/addticket',
        method:'post',
        dataType:'json',
        data:{
          time:time,
          time3:time3,
          price:price},
        success:function(response){
            if(response.message){
                alert(response.message)
            }else{
              alert('TicketVip added successfully');
              $('.formAdd').empty();
              getdataTicket();
            }
  
            
  
  
  
        },
        error:function(response){
            alert('server error')
        }
    });

})

$(document).on('click','.btnaddCalendar',function(){
    if(checkForm === false){
        alert('You must enter follow form')
        return;
    }
    $('.formAdd input').attr('style','border:none')
    var price1 = $("#price1").val();
    var price2 = $("#price2").val();
    var price3 = $("#price3").val();
    var numberOfTent = $('#numberOfTent').val();
    if(price1===''||price2===''||price3===''||numberOfTent===''){
        alert('Enter full information')
        if(price1===''){
            $("#price1").attr('style','border:1px solid red')
        }
        if(price2===''){
            $("#price2").attr('style','border:1px solid red')
        }
        if(price3===''){
            $("#price3").attr('style','border:1px solid red')
        }
        if(numberOfTent===''){
            $("#numberOfTent").attr('style','border:1px solid red')
        }
        return;
    }
    console.log(price1)
    $.ajax({
        url:'/master/addcalendar',
        method:'post',
        dataType:'json',
        data:{
            price1:price1,
            price2:price2,
            price3:price3,
            numberOfTent:numberOfTent},
        success:function(response){
            if(response.message === 'da co'){
                alert(response.message)
            }else{
              alert(response.message);
              $('.formAdd').empty();
              getdatacalendar();

            }
  
            
  
  
  
        },
        error:function(response){
            alert('server error')
        }
    });

})
$(document).on('click','.close',function(){
    $('.formAdd').empty();
})
})