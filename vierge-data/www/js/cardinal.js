function createXMLHttpRequest(method, url) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    return xhr;
}

function sendPost(url, body, response = function() {}) {
    var xhr = createXMLHttpRequest("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cookies", document.cookie);

    xhr.overrideMimeType('application/json; charset=iso-8859-1');

    xhr.onreadystatechange = function() {
        result(xhr, response);
    };

    body = JSON.stringify(body);
    
    xhr.send(body);
}

function sendGet(url, response = function() {}) {
    var xhr = createXMLHttpRequest("GET", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cookies", document.cookie);

    xhr.overrideMimeType('application/json; charset=iso-8859-1');
    
    xhr.onreadystatechange = function() {
        result(xhr, response);
    };

    xhr.send();
}

function sendPostFormData(url, formData, response = function() {}) {
    var xhr = createXMLHttpRequest("POST", url);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Cookies", document.cookie);

    xhr.onreadystatechange = function() {
        result(xhr, response);
    };
    xhr.send(formData);
}

function result(xhr, response) {
    if(xhr.readyState === 4) {
        try {
            var obj = JSON.parse(xhr.response);
            if(obj != null) {
                response(obj['success'], obj);
            }
        }catch(e) {
            response(false, xhr.response);
        }
    }
}