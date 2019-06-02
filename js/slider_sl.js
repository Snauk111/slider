function myFunction() {
        var sl_inst = document.getElementById("slider_sl");
        if (sl_inst !== null) {
            var elements = sl_inst.children;
            var count_sl = 1;
            var con = document.createElement("div");
            var width_sl = slide_width();
            var elem_sl = sl_inst.offsetWidth;
            var slClass = "item-slider";
            var slClassActive = "item-slider active";
            var slClassPagination = "pagination_sl";
            var slClassDots = "dot_sl";
            var slClassDot = "dot";
            var slClassDotActive = "dot active";
        }

    function slide_constructor() {
        var item_clone = [];
        var elem_clone = [];
        var item_sl = [];
        var elem = elements;
        var s = 0;
        for (var i = 0; i < elem.length; i++) {
            item_sl = document.createElement("div");
            item_sl.className = "item-slider";
            item_sl.style.maxWidth = elem_sl/count_sl;
            item_sl.setAttribute('item_sl-id', i+'');

            item_clone[i] = item_sl;
            con.appendChild(item_clone[i]);
            //item_clone[i].appendChild(elem[i]);
        }
        console.log(elem);



        /*for (var i = 0; i < elements.length; i) {
            item_clone = item_sl.cloneNode(true);
            elem_clone['item'] = elements[i];
            elem_clone['item'].style.width = elem_sl/count_sl;
            item_clone.appendChild(elem_clone['item']);
            con.appendChild(item_clone);
        }*/
    }


    function slide_width() {
        var slides_width = 0;
        for (var i = 0; i < elements.length; i++) {
            slides_width += elements[i].offsetWidth;
        }
        return slides_width;
    }

    function controls() {
        var control = document.createElement("div");
        var prev = document.createElement("a");
        var next = document.createElement("a");
        var elem = 0;
        var s = 0;
        var slTag = elements[0].children;
        var elem_count = elements[0].children.length;
        elem_count -= 1;
        slTag[0].className = slClassActive;
        control.className = "control_sl";
        next.className = "next_sl";
        next.innerHTML = "next";
        next.setAttribute("href", "#");
        prev.className = "prev_sl";
        prev.innerHTML = "prev";
        prev.setAttribute("href", "#");
        control.appendChild(prev);
        control.appendChild(next);
        if (count_sl >= 1 && count_sl <= elem_count) {
            elem_count = Math.round(elem_count/count_sl);
            console.log(elem_count);

        next.onclick = next_count;
        prev.onclick = prev_count;
        }

        function next_count() {
            if (elem_count === s){
                slTag[s].className = slClass;
                s = 0;
                elem = 0;
                slTag[s].className = slClassActive;
                con.style.transform = "translateX(0px)";
            }
            else if (elem_count > s) {
                slTag[s].className = slClass;
                s += 1;
                slTag[s].className = slClassActive;
                elem = elem_sl*s;
                con.style.transform = "translateX(-"+elem+"px)";
            }
            console.log(s+' '+elem_count);
            return false;
        }

        function prev_count() {
            if (s === 0){
                slTag[s].className = slClass;
                s = elem_count;
                elem = width_sl-elem_sl;
                slTag[s].className = slClassActive;
                con.style.transform = "translateX(-"+elem+"px)";
            }
            else if (s > 0) {
                slTag[s].className = slClass;
                s -= 1;
                slTag[s].className = slClassActive;
                elem = elem_sl*s;
                con.style.transform = "translateX(-"+elem+"px)";
            }
            console.log(s+' '+elem_count);
            return false;
        }
        sl_inst.appendChild(control);
    }

    function pagination() {
        var pagination = document.createElement("div");
        var dot_item = document.createElement("div");
        var dot = document.createElement("a");
        var elem_count = elements[0].children.length;
        var array_item = [];
        var elem = 0;
        var slTag = elements[0].children;
        pagination.className = slClassPagination;
        dot_item.className = slClassDots;
        dot.className = slClassDot;
        dot.setAttribute('href', '#');
        if (count_sl >= 1 && count_sl <= elem_count) {
            elem_count = elem_count/count_sl;
        }
        for (var i = 0; i < elem_count; i++) {
            array_item[i] = dot_item.cloneNode(true);
            dot.setAttribute('dot_sl-id', +i+'');
            // dot.innerHTML = i;
            array_item[i].appendChild(dot.cloneNode(true));
            array_item[0].children[0].className = slClassDotActive;
            pagination.appendChild(array_item[i]);
            array_item[i].onclick = function () {
                for (var i = 0; i < array_item.length; i++) {
                    array_item[i].children[0].className = slClassDot;
                    slTag[i].className = slClass;
                }
                var elem_Id = this.children[0].getAttribute('dot_sl-id');
                slTag[elem_Id].className = slClassActive;
                this.children[0].className = slClassDotActive;
                elem = elem_sl*elem_Id;

                con.style.transform = "translateX(-"+elem+"px)";
            }
        }
            sl_inst.appendChild(pagination);
    }

    function resize() {
        con.style.width = width_sl;
    }

    function container() {
        con.className = "slider";
        con.style.display = "flex";
        con.style.transform = "translateX(0px)";
        sl_inst.appendChild(con);
    }

    if (sl_inst !== null && elements.length !== 0) {
        resize();
        slide_constructor();
        container();
        controls();
        pagination();
    }

}
myFunction();