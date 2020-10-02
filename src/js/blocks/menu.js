import "../../scss/blocks/menu.scss";

document.addEventListener('DOMContentLoaded', () => {
    let waitMenu = document.querySelector('.t461'), timer;
    let menuHeight = waitMenu.offsetHeight;
    let isTopOfPage;

    let refresh = () => { waitMenu.classList.remove('slideDwn'); };

    window.addEventListener('scroll', () => {

        isTopOfPage = (window.scrollY || window.pageYOffset) <= 5;

        waitMenu.classList.add('slideDwn');

        if (timer) {
            clearTimeout(timer);
        }

        if (!isTopOfPage) {

            timer = setTimeout( refresh , 600 );
            waitMenu.classList.add('t461_cyan');

        } else {

            waitMenu.classList.remove('t461_cyan');

        }
    });

    window.addEventListener('mousemove', (event) => {

        isTopOfPage = (window.scrollY || window.pageYOffset) <= 5;

        if (event.clientY <= menuHeight) {
            waitMenu.classList.add('slideDwn');
        } else if (!isTopOfPage) {
            waitMenu.classList.remove('slideDwn');
        }

    });

    waitMenu.classList.add('slideDwn');

    $('div[data-record-type="257"]').hover(function(){
        waitMenu.addClass('slideDwn');
        //Обнуляем таймер
        clearTimeout(timer);
    }, function(){
        timer = setTimeout( refresh , 600 );
    });


});
