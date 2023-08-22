const DIV_CONTAINER = document.getElementById("card-container");

function load(apiPath, arrayName, imgPath) {
    var resFunc = function(success, obj) {
        if(!success)
            return;

        var sts = obj['result'][arrayName];
        for(var i = 0; i < sts.length; i++) {
            addCard(sts[i], imgPath);
        }

        if(sts.length == 0) {
            addAddCard();
        }
    };

    sendGet(apiPath, resFunc);
}

function addCard(cardObj, imgPath) {
    var div = document.createElement("div");
    div.setAttribute("id", cardObj['id']);
    div.setAttribute("class", "card basic");
    div.setAttribute("onclick", "onClickCard(" + cardObj['id'] + ")")

    var img = document.createElement("img");
    img.setAttribute("class", "card-img");

    img.setAttribute("src", imgPath + "/" + cardObj['id'] + ".jpeg");
    img.setAttribute("onerror", "this.src='" + imgPath + "/default.png'")
    img.setAttribute("class", "img-card")

    var h3 = document.createElement("h3");
    h3.innerText = cardObj['name'];

    div.appendChild(img);
    div.appendChild(h3);
    
    DIV_CONTAINER.appendChild(div);
}

function addAddCard() {
    var div = document.createElement("div");

    div.setAttribute("class", "card basic");
    div.setAttribute("onclick", "addNew()")
    var img = document.createElement("img");
    img.setAttribute("class", "card-img");

    img.setAttribute("src", "images/add.png");
    img.setAttribute("class", "img-card");

    var h3 = document.createElement("h3");
    h3.innerText = "Add new";

    div.appendChild(img);
    div.appendChild(h3);
    
    DIV_CONTAINER.appendChild(div);
}

function addNew() {
    window.location = addRedirect;
}