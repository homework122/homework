(function () {

    function _jquery(selector) {
        this.node = document.querySelectorAll(selector);
        if (this.node.length) {
            for (var i = 0; i < this.node.length; i++) {
                this[i] = this.node[i];//this[i]的中括号在这里代表的是对象
            }
        } else {
            this[0] = this.node;
        }
    }
    var jquery = function (selector) {

        //设置样式
        function setStyle(dom, perperty, value) {
            //判断dom，是数组还是一个对象
            if (dom.length) {
                dom.forEach(function (item) {
                    item.style[perperty] = value;

                })
            } else {
                dom.style[perperty] = value;
            }
        }

        function getStyle(dom, property) {
            var obj = dom.currentStyle || document.defaultView.getComputedStyle(dom, null)
            return obj[property];

        }

        _jquery.prototype.css = function () {
//$("p").css("color","red")
            //$("p").css("width")
            //$("p").css({color:"red",backgorundColor:"green"});
            if (arguments.length == 2) {
                setStyle(this.node, arguments[0], arguments[1])
            } else if (arguments.length == 1) {
                if (typeof arguments[0] == "string") {
                    if (this.node.length) {
                        return getStyle(this.node[0], arguments[0]);
                    } else {
                        return getStyle(this.node, arguments[0])
                    }
                } else if (typeof arguments[0] == "object") {
                    //$("p").css({color:"red",backgorundColor:"green"})
                    for (var key in arguments[0]) {
                        setStyle(this.node, key, arguments[0][key]);
                    }
                }
            }
        };
        _jquery.prototype.html = function () {

        };
        _jquery.prototype.text = function () {

        };
        _jquery.prototype.val = function () {

        };

        return new _jquery(selector);

    };
    jquery.ajax = function () {

    };
    jquery.post = function () {

    };
    jquery.extend = function (obj) {
        for (var key in obj) {
            jquery[key] = obj[key];
        }
    };
    jquery.fn=_jquery.prototype;
    jquery.fn.extend=function(obj){
        for(var key in obj){
            _jquery.prototype[key]=obj[key];
        }
    };
    window.$ = window.jQuery = jquery;
})();
