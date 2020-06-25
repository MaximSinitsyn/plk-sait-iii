
module.exports = (ajax, classForm) => {
    let forms = [].slice.call(document.getElementsByClassName(classForm));

    forms.forEach(function(item) {
        let formBtn = item.getElementsByClassName('form__btn')[0];
        let formAlert = item.getElementsByClassName('form__alert')[0];

        formBtn.addEventListener('click', function (event) {
            event.preventDefault();

            let nameClient = item.getElementsByClassName('formClient')[0].value;
            let phoneClient = item.getElementsByClassName('formPhone')[0].value;
            let nameForm = item.getElementsByClassName('formName')[0].value;
            let emailForm = item.getElementsByClassName('formEmail')[0].value;

            /* let agreeClient = item.getElementsByClassName('formAgree')[0];

            if (agreeClient.checked)
                agreeClient = 'true';
            else
                agreeClient = 'false';
            */

            let data = {
                nameClient: nameClient,
                phoneClient: phoneClient,
                nameForm: nameForm,
                emailClient: emailForm
            };

            if (!data['nameClient'] || !data['emailClient']) { // || data['agreeClient'] !== 'true'
                formAlert.classList.add('form__alert_visible');
            } else {
                ajax({
                    method: 'POST',
                    url: './scripts/Send_Data.php',
                    async: true,
                    data: data,
                    success: function (req) {
                        item.innerHTML = req.responseText;
                    },
                    error: function (req) {
                        item.innerHTML = req.statusText;
                    }
                });
            }
        });
    });
};
