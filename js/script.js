"use strict"

document.addEventListener('DOMContentLoaded', function() {
    let menuBtn = document.querySelector('.header-burger-button'); // header burger menu
    let menu = document.querySelector(".header-burger-menu")

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    })


    const swiper = new Swiper('.swiper',{
        navigation: {
            nextEl: '.feedback-button-next',
            prevEl: '.feedback-button-prev'
        },
        loop: true,                         //loop
        slidesPerView: 1,                   //number of slides to show
        centeredSlides : true,              //put acctive slide center
        spaceBetween: 100,                   //space between slides  
        initialSlide: 1,
        autoplay: {                         
            delay: 3000,  
        },
        speed: 1000,
    })





    let qaBtn = document.querySelectorAll('.qa-question-button') // open QA item
    let qaItem = document.querySelectorAll('.qa-item')
    let qaAnswer = document.querySelectorAll('.qa-answer')


    for(let i = 0; i < qaBtn.length; i++){
        qaBtn[i].addEventListener('click', () => {
            qaBtn[i].classList.toggle('active');
            qaItem[i].classList.toggle('active');
            qaAnswer[i].classList.toggle('active');
        })
    }






    const form = document.getElementById('form'); //form submit
    
    form.addEventListener('submit', formSend);

    async function formSend(e){
        e.preventDefault();  //запрещаем стандартную отправку формы
        let error = formValidate(form);

        let formData = new FormData(form)
        if(error === 0) {
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if(response.ok){
                form.reset();
            }
            let result = await response.text()
            alert(result)
        }
    }

    function formValidate(e) {
        let error = 0;
        let formReq = document.querySelectorAll('._req')


        for(let i = 0 ; i < formReq.length; i++){
            const input = formReq[i];
            formRemoveError(input);

            if(input.classList.contains('_phone')) {
                if(!telTest(input)){
                    formAddError(input);
                    error++;
                }
            }else if(input.classList.contains('_class')){
                if(input.value !== '' && !classTest(input)){
                    formAddError(input);
                    error++; 
                }
            }
        }
        return error
    }



    function formAddError(input) {
        input.parentElement.classList.add('_error')
        input.classList.add('_error')
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error')
        input.classList.remove('_error')
    }
    function telTest(input) {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(input.value);
    }
    function classTest(input) {
        return Number.isInteger(+input.value) && 11>=+input.value>=1
    }
})




