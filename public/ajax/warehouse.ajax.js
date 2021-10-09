$(document).ready(function() {
    var today2 = new Date();
    var datenow = today2.getFullYear()+'-'+(today2.getMonth()+1).toString().padStart(2, "0")+'-'+today2.getDate().toString().padStart(2, "0"); 
    var timenow = today2.getHours().toString().padStart(2, "0")+':'+today2.getMinutes().toString().padStart(2, "0");
    getdata();
    function getdata(){

        $.ajax({
            url:'/allmaster/getwarehouse',
            method:'get',
            dataType:'json',
            success:function(response){
                console.log(response.data)
                var tbodyEl = $('tbody');
                tbodyEl.html('');
                if(response.message === 'You must login'){
                    alert(response.message)
                }else{
                    $.each(response.data,function(index,data){
                        if(data.time === '8 am to 12 am'){
                            today2.setHours(12)
                            today2.setMinutes(00);
                            time2 = today2.getHours().toString().padStart(2, "0")+':'+today2.getMinutes().toString().padStart(2, "0");
    
                            
        
                        }else if(data.time === '2 pm to 6 pm'){
                            today2.setHours(18)
                            today2.setMinutes(00);
                            time2 = today2.getHours().toString().padStart(2, "0")+':'+today2.getMinutes().toString().padStart(2, "0");
    
        
                        }else{
                            today2.setHours(23)
                            today2.setMinutes(59);
                            time2 = today2.getHours().toString().padStart(2, "0")+':'+today2.getMinutes().toString().padStart(2, "0");
                            console.log(time2)
    
        
                        }
                        console.log(data.date,datenow,data.date < datenow,data.date === datenow && timenow > time2)
                        index+=1;
                        if(data.date < datenow || (data.date === datenow && timenow > time2)){
                            tbodyEl.append('\
                        <tr class= "da">\
                        <td>'+data.name+'</td>\
                        <td>'+data.date+'</td>\
                        <td>'+data.time+'</td>\
                        <td>'+data.price+'</td>\
                        <td>'+data.nameMaster.address+'</td>\
                        <td>'+data.nameMaster.bank+'</td>\
                        <td>'+data.nameMaster.name+'</td>\
                        <td>'+data.nameMaster.stk+'</td>\
                        <td>Expired</td>\
                      </tr>\
                        ')
    
                        }else {
                            tbodyEl.append('\
                        <tr>\
                        <td>'+data.name+'</td>\
                        <td>'+data.date+'</td>\
                        <td>'+data.time+'</td>\
                        <td>'+data.price+'</td>\
                        <td>'+data.nameMaster.address+'</td>\
                        <td>'+data.nameMaster.bank+'</td>\
                        <td>'+data.nameMaster.name+'</td>\
                        <td>'+data.nameMaster.stk+'</td>\
                        <td>'+data.type+'</td>\
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
})