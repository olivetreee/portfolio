// Contact Form Scripts

function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target[1].value);

    dataBody = {
        message: {
            from_email: e.target[0].value,
            body: e.target[1].value,
        }
    };
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000/api/messages',
        data: dataBody,
        success: function(res) {console.log('success: ',res)},
        error: function(err) {console.log('error: ', err)}
    });
    alert("submitted!");
}

$("#contact form").submit(handleSubmit);