$(document).ready(function() {
    var text;
    var skip = 0;
    var limit = 4;
    var lesson = false;
    var pageNumber = 1;
    getdata(text, skip, limit, pageNumber);

    $(document).on('keyup', '#search', function() {
        pageNumber = 1;
        skip = 0;
        text = $(this).val();
        getdata(text, skip, limit, pageNumber);


    });


    function getdata(text, skip, limit, pageNumber) {

        $.ajax({
            url: '/allmaster/getdata',
            method: 'post',
            dataType: 'json',
            data: {
                text: text,
                skip: skip,
                limit: limit
            },
            success: function(response) {
                var tbodyEl = $('tbody');
                tbodyEl.html('');
                $('.page').empty();
                if (response.account === '0') {
                    $.each(response.data, function(index, data) {
                        tbodyEl.append('\
                    <tr>\
                    <td><img src="' + data.imageUrl + '" alt=""></td>\
                    <td>' + data.name + '</td>\
                    <td>' + data.address + '</td>\
                    <td><a href="/booking/' + data._id + '">View</a></td>\
                    <td><button class = "addmessage"  value="' + data._id + '">Add to mesage</button></td>\
                  </tr>\
                    ')
                    });
                } else {
                    $.each(response.data, function(index, data) {
                        index += 1;
                        if (response.account.chat.includes(data.chat[0])) {
                            tbodyEl.append('\
                        <tr>\
                        <td><img src="' + data.imageUrl + '" alt=""></td>\
                        <td>' + data.name + '</td>\
                        <td>' + data.address + '</td>\
                        <td><a href="/allmaster/booking/' + data._id + '">View</a></td>\
                        <td></td>\
                      </tr>\
                        ')
                        } else {
                            tbodyEl.append('\
                        <tr>\
                        <td><img src="' + data.imageUrl + '" alt=""></td>\
                        <td>' + data.name + '</td>\
                        <td>' + data.address + '</td>\
                        <td><a href="/allmaster/booking/' + data._id + '">View</a></td>\
                        <td><button class = "addmessage"  value="' + data._id + '">Add to mesage</button></td>\
                      </tr>\
                        ')
                        }


                    });

                }
                if (response.btn === '0') {
                    for (var i = 1; i <= response.numberPage; i++) {
                        $('.page').append('<button class="pageNumber" id="page' + i + '" value="' + i + '">' + i + '</button>')
                    }
                    $('.page').append('<button class="Next" value=""><i class="fas fa-chevron-right"></i></button>')

                }
                if (response.btn === '2') {
                    $('.page').append('<button class="Previous" value=""><i class="fas fa-chevron-left"></i></button>')
                    for (var i = 1; i <= response.numberPage; i++) {
                        $('.page').append('<button class="pageNumber" id="page' + i + '" value="' + i + '">' + i + '</button>')
                    }

                }
                if (response.btn === '1') {
                    $('.page').append('<button class="Previous" value=""><i class="fas fa-chevron-left"></i></button>')
                    for (var i = 1; i <= response.numberPage; i++) {
                        $('.page').append('<button class="pageNumber"  id="page' + i + '" value="' + i + '">' + i + '</button>')
                    }
                    $('.page').append('<button class="Next" value=""><i class="fas fa-chevron-right"></i></button>')

                }

                $('#page' + pageNumber + '').css('background-color', '#2f3640');
                $('#page' + pageNumber + '').css('color', 'white')
                lesson = false;



            },
            error: function(response) {
                alert('server error');
            }
        });
    }
    $(document).on('click', '.Previous', function() {
        if (lesson) return;
        $('.page button').css('background-color', 'white')
        $('.page button').css('color', '#2f3640')
        pageNumber = skip / limit
        skip = skip - limit;
        var text = $('#search').val();
        lesson = true;
        console.log(pageNumber)
        getdata(text, skip, limit, pageNumber);


    })
    $(document).on('click', '.pageNumber', function() {
        if (lesson) return;
        $('.page button').css('background-color', 'white')
        $('.page button').css('color', '#2f3640')
        var pageNumber = $(this).val();
        var text = $('#search').val();
        skip = (pageNumber - 1) * limit;
        lesson = true;
        console.log(pageNumber)
        getdata(text, skip, limit, pageNumber);



    })
    $(document).on('click', '.Next', function() {
        if (lesson) return;
        $('.page button').css('background-color', 'white')
        $('.page button').css('color', '#2f3640')
        pageNumber = skip / limit + 2
        var text = $('#search').val();
        skip = skip + limit;
        lesson = true;
        console.log(pageNumber)
        getdata(text, skip, limit, pageNumber);

    })



    $(document).on('click', '.addmessage', function() {
        var idMaster = $(this).val();
        $('.page button').css('background-color', 'white')
        $('.page button').css('color', '#2f3640')
        var text = $('#search').val();
        lesson = true;
        pageNumber = skip / limit + 1;
        getdata(text, skip, limit, pageNumber);
        $.ajax({
            url: '/allmaster/addtomessage',
            method: 'post',
            dataType: 'json',
            data: { idMaster: idMaster },
            success: function(response) {
                if (response.message === 'You must login') {
                    alert(response.message)
                } else {
                    if (response.mss = 'thanh cong') {
                        getdata(text, skip, limit, pageNumber);
                    }

                }


            }
        })

    })
})