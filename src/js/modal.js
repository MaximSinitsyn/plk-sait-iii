
module.exports = () => {
    let attrName = "data-modal";
    let modal;
    let obj;

    function iterativeDfs(node, condition) {
        let found = [];
        if (condition(node)) {
            found.push(node);
        }

        let items = Array.prototype.slice.call(node.childNodes);
        let next;
        while (next = items.pop()) {
            if (condition(next)) {
                found.push(next);
            }

            if (next.hasChildNodes && next.hasChildNodes()) {
                items = Array.prototype.concat.call(Array.prototype.slice.call(next.childNodes), items);
            }
        }

        return found;
    }

    document.getElementsByAttribute = function (attr) {
        return iterativeDfs(this.body, function (node) {
            return !!(node.hasAttribute && node.hasAttribute(attr));
        });
    };

    document.getElementsByAttribute(attrName).forEach(function (el) {
        el.onclick = (event) => {
            event.preventDefault ? event.preventDefault() : (event.returnValue=false);

            obj = JSON.parse(el.getAttribute(attrName));
            modal = document.getElementById(obj.name);
            modal.classList.add(obj.name);

            let body = document.getElementsByTagName('body')[0];
            body.classList.add("body_noTouch");

            let close = () => {
                modal.classList.remove('modal_visible');
                modal.classList.remove(obj.name);
                body.classList.remove("body_noTouch");
            };

            modal.addEventListener("click", function(event) {
                if (event.target.classList.contains('modal') || event.target.classList.contains('modal__close')) {
                    close();
                }
            }, true);

            modal.classList.add('modal_visible');
        };
    });
};