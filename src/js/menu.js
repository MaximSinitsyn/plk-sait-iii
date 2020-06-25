
module.exports = (el) => {
    window.onload = function() {
        let elem = document.getElementById(el);
        let body = elem.querySelector('.menu__body');
        let btnWrap = elem.querySelector('.menu__button-wrapper');
        let btn = elem.querySelector('.menu__button');
        let h = elem.offsetHeight;

        let getHeight = () => {
            if (body.offsetHeight > h) {
                btnWrap.classList.add('menu__button-wrapper_visible');
                body.classList.add('menu__body_left');
            } else {
                btnWrap.classList.remove('menu__button-wrapper_visible');
                body.classList.remove('menu__body_left');
            }
        };

        window.onresize = function (event) {
            getHeight();

            if (btn.classList.contains('menu__button_active')) {
                elem.style.height = body.offsetHeight + 'px';
            }
        };

        getHeight();

        btnWrap.onclick = () => {
            if (btn.classList.contains('menu__button_active')) {
                btn.classList.remove('menu__button_active');
                elem.style.height = h + 'px';
            } else {
                btn.classList.add('menu__button_active');
                elem.style.height = body.offsetHeight + 'px';
            }
        };
    };
};
