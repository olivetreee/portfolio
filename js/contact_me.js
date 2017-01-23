// Contact Form Scripts

$(".contact-form").submit(handleSubmit);
$(".contact-form").keyup(handleKeypress);

function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target[2].value);
    
    const fromEmail = e.target[0].value;
    const validEmail = checkEmailPresence(fromEmail);

    const body = e.target[1].value;
    const validMessage = checkBodyPresence(body);

    const captchaKey = e.target[2].value;
    const validCaptcha = checkCaptchaPresence(captchaKey);

    if (validEmail && validMessage && validCaptcha) {
        dataBody = {
            message: {
                from_email: fromEmail,
                body: body,
                captcha_key: captchaKey
            }
        };

        function success(res) {
            const successMessage = `
            <h3 class='success-message'>
            Message received! I'll get back to you asap. Thanks!
            </h3>
            `;
            $(".contact-form form").remove();
            $(".contact-form").append(successMessage);
            console.log(res);
        }

        function error(res) {
            const errorMessage = `
            <h3 class='error-message'>
            Oops... something went wrong. Mind trying again?
            </h3>
            `;
            $(".contact-form").prepend(errorMessage);
            console.log(res);
        }

        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/api/messages',
            data: dataBody,
            success,
            error: function(err) {console.log('error: ', err)}
        });
    }
}

function checkEmailPresence(fromEmail) {
    if (!(/.+@.+\..{2,}/.test(fromEmail))) { //Expects an e-mail in the form a@a.co
        $(".email-input input").addClass('input-danger');
        return false;
    }
    $(".email-input input").removeClass("input-danger");
    return true;
}

function checkBodyPresence(body) {
    if (body === "") {
        $(".body-input textarea").addClass('input-danger');
        return false;
    }
    $(".body-input textarea").removeClass("input-danger");
    return true;
}

function checkCaptchaPresence(captchaKey) {
    if (captchaKey === "") {
        $(".captcha-submit .g-recaptcha").addClass('input-danger');
        return false;
    }
    $(".captcha-submit .g-recaptcha").removeClass('input-danger');
    return true;
}

function handleKeypress(e) {
    if (e.target.id === "email") {
        checkEmailPresence(e.target.value);
    } else {
        checkBodyPresence(e.target.value);
    }
}