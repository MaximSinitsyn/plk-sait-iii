
module.exports = (cont, el, cssClass, mod) => {
    let elem = document.getElementById(el);

    let visibleHeader = (element) => {
        if (element.scrollTop > 100) {
            elem.classList.add(cssClass + '_' + mod);
        } else {
            elem.classList.remove(cssClass + '_' + mod);
        }
    };

    let container = document.getElementsByClassName(cont)[0];

    container.onscroll = function() {
        visibleHeader(container);
    };
};