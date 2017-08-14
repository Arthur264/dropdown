document.addEventListener("DOMContentLoaded", function() {
    var dropdownHeader = document.getElementsByClassName("dropdown__header")[0];
    var dropdownBody = document.getElementsByClassName("dropdown__body")[0];
    var dropdownInput = document.getElementById("dropdownSearch");
    var dropdownText = document.getElementsByClassName("dropdown__text")[0];
    var elem = document.getElementsByClassName("dropdown__item");
    var arrow = document.getElementsByClassName("arrow")[0];
    CreateList();

    function CreateList() {
        for (let i = 0; i < LIST.length; i++) {
            if (LIST[i].population.length <= 6) {
                continue;
            } else {
                var population = Math.round(LIST[i].population / 100000) / 10;
                let dropdowmItem = document.createElement("div");
                dropdowmItem.className = "dropdown__item";
                dropdowmItem.textContent = LIST[i].city + ", населення " + population + " млн";
                dropdowmItem.setAttribute("drop-index", i)
                document.getElementsByClassName("dropdown__body")[0].appendChild(dropdowmItem);
            }
        };
    };

    document.getElementById("OpenCity").addEventListener("click", OpenCity);
    document.getElementById("dropdownSearch").addEventListener("input", SearchCity);

    function AddEventItem() {

        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener("click", ChangeTextHeader);
        }
    }
    AddEventItem();

    function OpenDown() {// відкрити меню 
        dropdownBody.style.height = "auto";
    }

    function OpenCity() {// відкрита міста

        if (dropdownHeader.getAttribute("dropbody") == 'false') {
            dropdownBody.style.border = "1px solid #ccc";
            dropdownBody.style.height = dropdownBody.scrollHeight + "px";
            dropdownHeader.setAttribute("dropbody", 'true');
            arrow.style.transform = "rotate(180deg)";
        } else {
            arrow.style.transform = "rotate(0)";
            CloseCity();

        }
    };

    function ChangeText(text) {//змінити текст
        dropdownText.innerHTML = text;
    }

    function CloseCity() {// закрити блок міст
        dropdownBody.style.border = 0;
        dropdownBody.style.height = 0;
        dropdownHeader.setAttribute("dropbody", 'false');
    }

    function ClearB(elems) {//видалити з елемента <b>
        for (var i = 0; i < elems.length; i++) {
            let textItem = elems[i].innerHTML.split("</b>").join("").split("<b>").join("");
            elems[i].innerHTML = textItem;

        }

    }

    function NothingWasFound(elements) {//функція для "нічого не знайдено"
        var ind = true;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].style.display == "block") {
                ind = false;
                break;
            }
        }
        if (ind == true) {
            let elem = document.createElement("div");
            elem.textContent = "Нічого не знайдено";
            elem.className = "text-center";
            elem.id = "warnText";
            dropdownBody.appendChild(elem);
        }
    }

    function ClearNotFound() {// функція для видалення тексту "нічого не знайдено"

        if (document.getElementById("warnText")) {
            let warnElem = document.getElementById("warnText");
            console.log(warnElem);
            dropdownBody.removeChild(warnElem);;
        }
    }

    function SearchCity() {//пошук міст
        let val = this.value;
        var elements = document.getElementsByClassName("dropdown__item");
        ClearB(elements);
        ClearNotFound();
        for (let i = 0; i < elements.length; i++) {
            let nameCity = elements[i].innerHTML.split(",");
            let textSearch = nameCity[0];
            let indexVal = textSearch.toLowerCase().indexOf(val.toLowerCase());
            let textItem = elements[i].innerHTML;
            if (indexVal > -1) {
                elements[i].style.display = "block";
                let textMark = textItem.slice(0, indexVal) + "<b>" + textItem.slice(indexVal, indexVal+val.length ) + "</b>" + textItem.slice(indexVal + val.length, textItem.length);
                elements[i].innerHTML = textMark;
            } else {
                elements[i].style.display = "none";
            }
        }
        NothingWasFound(elements);
        OpenDown();
    }

    function ClearClass(name, elem) {//видалити клас за ім'ям та елементом
        for (let i = 0; i < elem.length; i++) {
            let tmp = elem[i].className.toString().replace(name, "");
            elem[i].className = tmp;
        }
    }

    function ChangeTextHeader() {//змінити текст шапки 
        let index = this.getAttribute("drop-index");
        ClearClass("active", elem);
        this.className += " active";
        ChangeText(LIST[index].city.toString());
    }

});