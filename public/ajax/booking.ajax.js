$(document).ready(function() {
    document.getElementById("date4").valueAsDate = new Date();
    getdataTicket();
    var today2 = new Date();
    var datenow = today2.getFullYear() + '-' + (today2.getMonth() + 1).toString().padStart(2, "0") + '-' + today2.getDate().toString().padStart(2, "0");
    var date5 = today2.getFullYear() + '-' + (today2.getMonth() + 2).toString().padStart(2, "0") + '-' + today2.getDate().toString().padStart(2, "0");
    var timenow = today2.getHours().toString().padStart(2, "0") + ':' + today2.getMinutes().toString().padStart(2, "0");
    var timeFishing = '8 am to 12 am';
    getdata(datenow, timeFishing);

    $(document).on('change', '#date4', function() {
        var date4 = $(this).val();
        var timeFishing = $('#timeFishing').val();
        getdata(date4, timeFishing);


    });
    $(document).on('change', '#timeFishing', function() {
        var date4 = $('#date4').val();
        var timeFishing = $('#timeFishing').val();
        getdata(date4, timeFishing);


    });

    //get data ticket vip
    function getdata(date4, timeFishing) {
        var id = $('#id').val();
        $.ajax({
            url: '/allmaster/getticketVip',
            method: 'post',
            dataType: 'json',
            data: { date4: date4, id: id, timeFishing: timeFishing },
            success: function(response) {
                var count = 0;
                //if user is not logged in then count = 0
                if (response.idUser._id === '0') {
                    count = 0;
                } else {
                    //count the number of times a user has been blocked in the block list
                    for (var i = 0; i < response.data1.nameMaster.blocklist.length; i++) {
                        if (response.data1.nameMaster.blocklist[i] === response.idUser._id) {
                            count++;
                        }
                    }

                }
                $('tr.row').remove()
                var tbodyEl = $('#booking');

                tbodyEl.html('');
                var time2;
                var price;
                // based on time to set price for vip ticket.
                if (timeFishing === '8 am to 12 am') {
                    price = response.data1.priceMorning;
                    today2.setHours(08)
                    today2.setMinutes(00);
                    time2 = today2.getHours().toString().padStart(2, "0") + ':' + today2.getMinutes().toString().padStart(2, "0");



                } else if (timeFishing === '2 pm to 6 pm') {
                    price = response.data1.priceAfternoon
                    today2.setHours(14)
                    today2.setMinutes(00);
                    time2 = today2.getHours().toString().padStart(2, "0") + ':' + today2.getMinutes().toString().padStart(2, "0");


                } else {
                    price = response.data1.priceNight
                    today2.setHours(19)
                    today2.setMinutes(00);
                    time2 = today2.getHours().toString().padStart(2, "0") + ':' + today2.getMinutes().toString().padStart(2, "0");


                }
                // start showing tickets.
                for (var i = 1; i <= response.data1.numberOfTent; i++) {
                    //Check that if blocked more than 3 times and the date the user chooses is a holiday, the tickets will be blacked out and cannot be booked.
                    if (count >= 3 || response.data1.dayOff.includes(date4)) {
                        console.log('co')
                        tbodyEl.append('\
                        <tr class = "da">\
                        <td >Tent ' + i + '</td>\
                        <td >' + date4 + '</td>\
                        <td >' + timeFishing + '</td>\
                        <td >' + price + '</td>\
                        <td ></td>\
                      </tr>\
                        ')
                    } else if (response.data.length === 0 && date4 > datenow && date4 < date5) {
                        //If there is no ticket in the database or today the booking time has passed or booking date within 1 month
                        tbodyEl.append('\
                                <tr id = "' + i + '">\
                                <td class = "name">Tent ' + i + '</td>\
                                <td class = "date">' + date4 + '</td>\
                                <td class = "time">' + timeFishing + '</td>\
                                <td class = "price">' + price + '</td>\
                               <td><button class="addbtn" value="' + i + '">Order</button></td>\
                              </tr>\
                                ')
                    } else {
                        var k = 'Tent ' + i

                        function exists(name) {
                            return response.data.some(function(el) {
                                return el.name === name;
                            });
                        }
                        // run loop from 1 to number of tent. If the ticket exists or is on the same date but the booking period has passed and is more than 1 month, it will not be able to book.
                        if (exists(k) || (date4 < datenow) || (date4 === datenow && timenow > time2) || date4 > date5) {
                            tbodyEl.append('\
                                <tr class = "da">\
                                <td >Tent ' + i + '</td>\
                                <td >' + date4 + '</td>\
                                <td >' + timeFishing + '</td>\
                                <td >' + price + '</td>\
                                <td ></td>\
                              </tr>\
                                ')
                        } else {
                            tbodyEl.append('\
                                <tr id = "' + i + '">\
                                <td class = "name">Tent ' + i + '</td>\
                                <td class = "date">' + date4 + '</td>\
                                <td class = "time">' + timeFishing + '</td>\
                                <td class = "price">' + price + '</td>\
                               <td><button class="addbtn" value="' + i + '">Order</button></td>\
                              </tr>\
                                ')

                        }


                    }




                }


            },
            error: function(response) {
                alert('server error');
            }
        });
    }

    $(document).on('click', '.addbtn', function() {
        var id = $(this).val();
        var _id = $('#id').val();
        var name = $('#' + id + ' .name').text();
        var date = $('#' + id + ' .date').text();
        var time = $('#' + id + ' .time').text();
        var price = $('#' + id + ' .price').text();
        console.log(id, name, date)


        $.ajax({
            url: '/allmaster/bookingticket',
            method: 'post',
            dataType: 'json',
            data: {
                _id: _id,
                name: name,
                date: date,
                time: time,
                price: price,
            },
            success: function(response) {
                console.log(response.message)
                if (response.message === 'You must login') {
                    alert(response.message)
                } else {
                    if (response.message === 'Tickets have been booked') {
                        alert(response.message)
                        getdata(date, time);
                    }
                    if (response.message === 'successfull') {
                        alert(response.message)
                        getdata(date, time);
                    }

                }




            },
            error: function(response) {
                alert('server error')
            }
        });
    });

    function getdataTicket() {
        var id = $('#id').val();
        $.ajax({
            url: '/allmaster/getticket',
            method: 'post',
            dataType: 'json',
            data: { id: id },
            success: function(response) {
                $('.left').empty();

                $.each(response.data, function(index, data) {
                    $('.left').append('\
                    <h1>Ticket</h1>\
                    <p>Working time:' + data.time + '</p>\
                    <p>Duration time:' + data.durationTime + ' hour</p>\
                    <p>Price: ' + data.price + ' VND<p/>')

                });

            },
            error: function(response) {
                alert('server error');
            }
        });
    }
})

function back() {
    history.back();
}