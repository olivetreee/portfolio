// Contact Form Scripts

function handleSubmit(e) {
    e.preventDefault();
    alert("submitted!");
    console.log(e);
}

$("#contact form").submit(handleSubmit);