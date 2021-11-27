getdata();
getdata2();

function getdata() {
    $.ajax({
        url: '/master/getticketviprequest',
        method: 'get',
        dataType: 'json',
        success: function(response) {
            console.log(response.data)
            $('tr.row').remove()

            $.each(response.data, function(index, data) {
                var url = url + data._id;
                index += 1;
                $('.tbody').append("<tr class='row'><td>" + index + "</td><td>" + data.date + "</td><td>" + data.time + "</td><td>" + data.nameFishing.email + "</td><td>" + data.name + "</td><td>" + data.price + "</td><td>" + "<button class='yes' value='" + data._id + "'><i class='fas fa-check'></i></button>" + "" + "<button class='no' value='" + data._id + "'><i class='fas fa-times'></i></button>" + "</td> </tr>");
            });

        },
        error: function(response) {
            alert('server error');
        }
    });
}

function getdata2() {
    $.ajax({
        url: '/master/getticketvipacept',
        method: 'get',
        dataType: 'json',
        success: function(response) {
            console.log(response.data)
            $('tr.row2').remove()

            $.each(response.data, function(index, data2) {
                console.log(data2)
                index += 1;
                $('.tbody2').append("<tr class='row2'><td>" + index + "</td><td>" + data2.date + "</td><td>" + data2.time + "</td><td>" + data2.nameFishing.email + "</td><td>" + data2.name + "</td><td>" + data2.price + "</td><td>" + "<button class='done' value='" + data2._id + "'>Done</button>" + "</td> </tr>");
            });

        },
        error: function(response) {
            alert('server error');
        }
    });
}

$(document).on('click', 'button.yes', function() {
    var _id = $(this).parent().find('button.yes').val();
    console.log(_id)

    $.ajax({
        url: '/master/acceptticketvip',
        method: 'post',
        dataType: 'json',
        data: { _id: _id },
        success: function(response) {

            alert('đã đồng ý');
            getdata();
            getdata2();
        },
        error: function(response) {
            alert('server error')
        }
    });
});

$(document).on('click', 'button.no', function() {
    var _id = $(this).parent().find('button.no').val();
    console.log(_id)

    $.ajax({
        url: '/master/noticketvip',
        method: 'post',
        dataType: 'json',
        data: { _id: _id },
        success: function(response) {

            alert('đã hủy');
            getdata();
            getdata2();
        },
        error: function(response) {
            alert('server error')
        }
    });
});

$(document).on('click', 'button.done', function() {
    var _id = $(this).parent().find('button.done').val();
    console.log(_id)
    if (confirm("Khác hàng đã đến?") == true) {
        $.ajax({
            url: '/master/doneticketvip',
            method: 'post',
            dataType: 'json',
            data: { _id: _id },
            success: function(response) {

                alert('đã hoàn thành');
                getdata();
                getdata2();
            },
            error: function(response) {
                alert('server error')
            }
        });
    }
});