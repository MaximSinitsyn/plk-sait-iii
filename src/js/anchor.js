
module.exports = (cont) => {
    let menu = document.getElementById('menu');
    let container = document.getElementsByClassName(cont)[0];
    let coordYMenu = menu.getBoundingClientRect().top;

    const anchors = [].slice.call(menu.querySelectorAll('a[href*="#"]')),
        animationTime = 300;

    function scrollTo(element, to, duration) {
        if (duration <= 0) return;
        if(element.scrollTop === 0) element = document.documentElement;
        let difference = to - element.scrollTop;
        let perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    }

    anchors.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            let id = item.getAttribute('href').slice(1);
            let block = document.getElementById(id);

            item.parentNode.classList.add('menu__item_active');

            scrollTo(container, block.offsetTop + coordYMenu, animationTime);
        });
    });
};