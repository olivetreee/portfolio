// Contact Form Scripts

function success(res) {
    const successMessage = `
    <p class='success-message'>
    Message received! I'll get back to you asap. Thanks!
    </p>
    `;
    $(".contact-form form").remove();
    $(".contact-form").append(successMessage);
}

function handleSubmit(e) {
    e.preventDefault();
    
    const from_email = e.target[0].value;
    const validEmail = checkEmailPresence(from_email);

    const body = e.target[1].value
    const validMessage = checkBodyPresence(body);

    if (validEmail && validMessage) {
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
            success,
            error: function(err) {console.log('error: ', err)}
        });
    }

}

function checkEmailPresence(from_email) {
    if (from_email === "") {
        const alertElement = $(".email-alert");
        if (alertElement.length === 0) $(".email-input input").addClass('input-danger');
        return false;
    }
    $(".email-input input").removeClass("input-danger");
    return true;
}

function checkBodyPresence(body) {
    if (body === "") {
        const alertElement = $(".body-alert");
        if (alertElement.length === 0) $(".body-input textarea").addClass('input-danger');
        return false;
    }
    $(".body-input textarea").removeClass("input-danger");
    return true;
}


$("#contact form").submit(handleSubmit);