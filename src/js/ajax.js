
module.exports = (options) => {
    function createRequest() {
        let req;
        if (window.XMLHttpRequest)
            req = new XMLHttpRequest();                             // normal browser
        else if (window.ActiveXObject) {                            // IE
            try {
                req = new ActiveXObject('Msxml2.XMLHTTP');          // IE разных версий может создавать объект по разному
            } catch (e) {
            }
            try {
                req = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
            }
        }
        return req;
    }

    return (options) =>{
        options.request = createRequest();
        options.request.open(options.method, options.url, options.async);
        options.request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
        if (options.data) {
            options.request.send("data=" + JSON.stringify(options.data));
        } else {
            options.request.send("data");
        }
        options.request.onreadystatechange = function () {
            if (options.request.readyState === 4) {
                if (options.request.status === 200) {
                    options.success(options.request)
                } else {
                    options.error(options.request);
                }
            }
        };
    }
};