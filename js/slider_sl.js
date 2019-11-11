slider = (function(box, options){
    "use string";

    let nodeContainer = document.querySelector(box) ?  document.querySelector(box) : false;
    let nameSlider = "init-slider";
    let unit = "px";
    let block = {
        Container : nodeContainer,
        Width : typeof(nodeContainer.offsetWidth) == "number" ? nodeContainer.offsetWidth : 0,
        Class : box.substring(1)
    };

    // Кол-во выводимых элементов на экран
    let quantity = typeof(options.quantity) == "number" && options.quantity > 0 ? options.quantity : 1;

    // Настройки для елементов
    let elementsOptions = {
        Item : nodeContainer.children,
        Class : "item",
        Active : "active",
        atrData : "data-slide-id",
        blockClass : 'list'
    };

    // Настройки для пагинации
    let paginationOptions = {
        Active : options.dot ? options.dot : false,
        Class : "pagination",
        dotClass : options.dotClass ? options.dotClass : "dot",
        dotActive : "active"
    };

    // Настройки для навигации
    let navOptions = {
        Container : "control",
        Active : options.nav ? options.nav : false,
        nextClass : "next",
        prevClass : "prev",
        loop : options.loop ? options.loop : false
    }


    function container() {
        block.Container.className = block.Container.className+" "+nameSlider;
    }
    
    function elementsInit() {
        let list = document.createElement('div');
        let item = [];
        list.className = block.Class+"__"+elementsOptions.blockClass;
        list.style.transform = "translateX(0px)";
        list.style.width = sliderWidth()+"px";
        for (let i = 0; i < elementsOptions.Item.length; i++) {
            item[i] = document.createElement("div");
            item[i].className = block.Class + "__" + elementsOptions.Class;
            item[i].style.width = block.Width / quantity + unit;
            item[i].setAttribute(elementsOptions.atrData, i);
            item[i].insertAdjacentHTML("afterbegin", elementsOptions.Item[i].outerHTML);
        }
        block.Container.innerHTML = "";
        for (let i = 0; i < item.length; i++) {
            list.appendChild(item[i]);
        }
        block.Container.appendChild(list);
    }

    function sliderWidth() {
        let result = 0;
        for (let i = 0; i < elementsOptions.Item.length; i++) {
            result += (elementsOptions.Item[i].offsetWidth / quantity);
        }
        return result;
    }

    function controlInit() {
        let list = block.Container.querySelector('.'+block.Class+"__"+elementsOptions.blockClass);
        let control = document.createElement("div");
        let prev = document.createElement("a");
        let next = document.createElement("a");
        let elemCount = list.children.length;
        let step = 0;
        control.className =  block.Class +"__"+navOptions.Container;
        next.className = block.Class+"_"+navOptions.Container+"__"+navOptions.nextClass;
        next.innerHTML = "next";
        next.setAttribute("href", "javascript:void(0)");
        prev.className = block.Class+"_"+navOptions.Container+"__"+navOptions.prevClass;
        prev.innerHTML = "prev";
        prev.setAttribute("href", "javascript:void(0)");
        control.appendChild(prev);
        control.appendChild(next);
        elementSelect(list, quantity, elementsOptions.Active, 0, quantity);
            next.addEventListener('click', function (ev) {
                if (elemCount-quantity <= step && navOptions.loop === false) {
                    return false;
                } else {
                    step = nextCount(list, elemCount, step);
                }
            });
            prev.addEventListener('click', function (ev) {
                if (step == 0 && navOptions.loop === false) {
                    return false;
                } else {
                    step = prevCount(list, elemCount, step);
                }
            });
        block.Container.insertBefore(control, list);
    }

    function nextCount(list, elemCount, step) {
        let widthStep = 0;
        let quantityItems = quantity;
        step += quantity;
        quantityItems += step;
        if (elemCount <= step || (quantity === 1 && elemCount < step)) {
            step = 0;
            quantityItems = quantity;
            list.style.transform = "translateX(0px)";
        }
        if (elemCount >= step) {
            widthStep = list.children[step].offsetWidth*step;
            list.style.transform = "translateX(-"+widthStep+"px)";
        }
        elementSelect(list, quantityItems, elementsOptions.Active, step, elemCount);
        return step;
    }


    function prevCount(list, elemCount, step) {
        let widthStep = 0;
        let quantityItems = quantity;
        step -= quantity;
        quantityItems += step;
        if (step < 0) {
            step = elemCount - quantity;
            quantityItems = step + quantity;
            widthStep = list.children[step].offsetWidth*step;
            list.style.transform = "translateX(-"+widthStep+"px)";
        }
        widthStep = list.children[step].offsetWidth*step;
        list.style.transform = "translateX(-"+widthStep+"px)";

        elementSelect(list, quantityItems, elementsOptions.Active, step, elemCount);
        return step;
    }

    // function prevCount() {
    //     if (s === 0){
    //         slTag[s].className = slClass;
    //         s = elem_count;
    //         elem = width_sl-elem_sl;
    //         slTag[s].className = slClassActive;
    //         con.style.transform = "translateX(-"+elem+"px)";
    //     }
    //     else if (s > 0) {
    //         slTag[s].className = slClass;
    //         s -= 1;
    //         slTag[s].className = slClassActive;
    //         elem = elem_sl*s;
    //         con.style.transform = "translateX(-"+elem+"px)";
    //     }
    //     console.log(s+" "+elem_count);
    //     return false;
    // }
    
    function elementSelect(list, quantityItems, active, step, count) {
        console.log(step,'-',count,'-', quantityItems);
        for (let i = 0; i < count; i++) list.children[i].className = block.Class + "__" + elementsOptions.Class;
        for (let i = step; i < count; i++) {
            if (i < quantityItems) {
                list.children[i].className = list.children[i].className +" "+ active;

            }

        }
    }

    if (nodeContainer) {
        elementsInit();
        container();
        if (navOptions.Active === true) controlInit();
    } else {
        return false;
    }

    if (nodeContainer) {
        elementsInit();
        container();
        if (navOptions.Active === true) controlInit();
    } else {
        return false;
    }


});


// function myFunction() {
//         var sl_inst = document.getElementById("slider_sl");
//         if (sl_inst !== null) {
//             var elements = sl_inst.children;
//             var count_sl = 1;
//             var con = document.createElement("div");
//             var width_sl = slide_width();
//             var elem_sl = sl_inst.offsetWidth;
//             var slClass = "item-slider";
//             var slClassActive = "item-slider active";
//             var slClassPagination = "pagination_sl";
//             var slClassDots = "dot_sl";
//             var slClassDot = "dot";
//             var slClassDotActive = "dot active";
//         }
//     function slide_constructor() {
//         var item_clone = [];
//         var elem_clone = [];
//         var item_sl = [];
//         var elem = elements;
//         var s = 0;
//         for (var i = 0; i < elem.length; i++) {
//             item_sl = document.createElement("div");
//             item_sl.className = "item-slider";
//             item_sl.style.maxWidth = elem_sl / count_sl;
//             item_sl.setAttribute("item_sl-id", i + "");
//             item_clone[i] = item_sl;
//             // con.appendChild(item_clone[i]);
//             // item_clone[i].appendChild(elem[i]);
//             console.log(elem[i]);
//         }
//         /*for (var i = 0; i < elements.length; i) {
//             item_clone = item_sl.cloneNode(true);
//             elem_clone["item"] = elements[i];
//             elem_clone["item"].style.width = elem_sl/count_sl;
//             item_clone.appendChild(elem_clone["item"]);
//             con.appendChild(item_clone);
//         }*/
//     }
//     function slide_width() {
//         var slides_width = 0;
//         for (var i = 0; i < elements.length; i++) {
//             slides_width += elements[i].offsetWidth;
//         }
//         return slides_width;
//     }
//     function controls() {
//         var control = document.createElement("div");
//         var prev = document.createElement("a");
//         var next = document.createElement("a");
//         var elem = 0;
//         var s = 0;
//         var slTag = elements[0].children;
//         var elem_count = elements[0].children.length;
//         elem_count -= 1;
//         slTag[0].className = slClassActive;
//         control.className = "control_sl";
//         next.className = "next_sl";
//         next.innerHTML = "next";
//         next.setAttribute("href", "#");
//         prev.className = "prev_sl";
//         prev.innerHTML = "prev";
//         prev.setAttribute("href", "#");
//         control.appendChild(prev);
//         control.appendChild(next);
//         if (count_sl >= 1 && count_sl <= elem_count) {
//             elem_count = Math.round(elem_count/count_sl);
//             console.log(elem_count);
//         next.onclick = next_count;
//         prev.onclick = prev_count;
//         }
//         function next_count() {
//             if (elem_count === s){
//                 slTag[s].className = slClass;
//                 s = 0;
//                 elem = 0;
//                 slTag[s].className = slClassActive;
//                 con.style.transform = "translateX(0px)";
//             }
//             else if (elem_count > s) {
//                 slTag[s].className = slClass;
//                 s += 1;
//                 slTag[s].className = slClassActive;
//                 elem = elem_sl*s;
//                 con.style.transform = "translateX(-"+elem+"px)";
//             }
//             console.log(s+" "+elem_count);
//             return false;
//         }
//         function prev_count() {
//             if (s === 0){
//                 slTag[s].className = slClass;
//                 s = elem_count;
//                 elem = width_sl-elem_sl;
//                 slTag[s].className = slClassActive;
//                 con.style.transform = "translateX(-"+elem+"px)";
//             }
//             else if (s > 0) {
//                 slTag[s].className = slClass;
//                 s -= 1;
//                 slTag[s].className = slClassActive;
//                 elem = elem_sl*s;
//                 con.style.transform = "translateX(-"+elem+"px)";
//             }
//             console.log(s+" "+elem_count);
//             return false;
//         }
//         sl_inst.appendChild(control);
//     }
//     function pagination() {
//         var pagination = document.createElement("div");
//         var dot_item = document.createElement("div");
//         var dot = document.createElement("a");
//         var elem_count = elements[0].children.length;
//         var array_item = [];
//         var elem = 0;
//         var slTag = elements[0].children;
//         pagination.className = slClassPagination;
//         dot_item.className = slClassDots;
//         dot.className = slClassDot;
//         dot.setAttribute("href", "#");
//         if (count_sl >= 1 && count_sl <= elem_count) {
//             elem_count = elem_count/count_sl;
//         }
//         for (var i = 0; i < elem_count; i++) {
//             array_item[i] = dot_item.cloneNode(true);
//             dot.setAttribute("dot_sl-id", +i+"");
//             // dot.innerHTML = i;
//             array_item[i].appendChild(dot.cloneNode(true));
//             array_item[0].children[0].className = slClassDotActive;
//             pagination.appendChild(array_item[i]);
//             array_item[i].onclick = function () {
//                 for (var i = 0; i < array_item.length; i++) {
//                     array_item[i].children[0].className = slClassDot;
//                     slTag[i].className = slClass;
//                 }
//                 var elem_Id = this.children[0].getAttribute("dot_sl-id");
//                 slTag[elem_Id].className = slClassActive;
//                 this.children[0].className = slClassDotActive;
//                 elem = elem_sl*elem_Id;
//                 con.style.transform = "translateX(-"+elem+"px)";
//             }
//         }
//             sl_inst.appendChild(pagination);
//     }
//     function resize() {
//         con.style.width = width_sl;
//     }
//     function container() {
//         con.className = "slider";
//         con.style.display = "flex";
//         con.style.transform = "translateX(0px)";
//         sl_inst.appendChild(con);
//     }
//     if (sl_inst !== null && elements.length !== 0) {
//         resize();
//         container();
//         slide_constructor();
//         controls();
//         pagination();
//     }
// }
// myFunction();














