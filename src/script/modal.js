;(function() {
    const form = document.querySelector('.form');
    const submitBtn = document.querySelector('.form__order-btn');


    submitBtn.addEventListener('click', e => {
        e.preventDefault();

        if (validateForm(form)) {
            const data = {
                name: form.elements.name.value,
                phone: form.elements.phone.value,
                comment: form.elements.comment.value,
                to: form.elements.to.value
            }

            console.log(data);


            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify(data));
            xhr.addEventListener('load', () => {
                const status = xhr.status;

                
                const responseForm = document.querySelector('.form-response');
                const modalResponse = document.querySelector('.modal__response-text');


                if (status < 400) {
                    responseForm.classList.add('form-response--active');
                    modalResponse.textContent = 'Сообщение отправлено!';

                    document.querySelectorAll('.form__input').forEach(e => {
                        e.value = "";
                    });

                    
                    document.querySelectorAll('.radio__elem').forEach(e => {
                        e.checked = false;
                    });
                } else {
                    responseForm.classList.add('form-response--active');
                    modalResponse.textContent = 'Произошла ошибка! Повторите попытку позже.';
                }
            });
        }
    });


    const validateForm = form => {
        let valid = true;

        if (!validateField(form.elements.name)) {
            valid = false;
        }

        if (!validateField(form.elements.phone)) {
            valid = false;
        }

        if (!validateField(form.elements.comment)) {
            valid = false;
        }

        if (!validateField(form.elements.to)) {
            valid = false;
        }

        return valid;
    }

    const validateField = field => {
        if (!field.checkValidity()) {
            field.classList.add('form__input-error');
            return false;
        } else {
            field.classList.remove('form__input-error');
            return true;
        }
    }

    const closeBtn = document.querySelector('.modal__close-btn');

    closeBtn.addEventListener('click', e => {
        const responseForm = document.querySelector('.form-response');
        responseForm.classList.remove('form-response--active');
    });
})()
