/**
 * Created by Administrator on 2020/5/20.
 */
(function () {
    function _jquery(selector) {
        this.node =document.querySelectorAll(selector);
        if(this.node .length){
            for(var i=0;i<this.node .length;i++){
                this[i] = this.node [i];
            }
        }else{
            this[0] = this.node;
        }


    }
    var jquery =function (selector) {

        // 设置样式
        function setStyle(dom,property,value) {
            // 判断dom是数组还是对象
            if(dom.length){
                dom.forEach(function (item) {
                    item.style[property] = value;
                })
            }
        }
        // 获得样式
        function getStyle(dom,property) {
            // IE中使用的是obj.currentStyle方法，而FF是用的是getComputedStyle 方法
            // document.defaultView.getComputedStyle('元素', '伪类')；
            var obj =dom.currentStyle || document.defaultView.getComputedStyle(dom,null)
            return obj[property]
        }
        _jquery.prototype.css = function () {

            if(arguments.length==2){//arguments是js内置对象
                // arguments.length==2 设置样式
                setStyle(this.node,arguments[0],arguments[1])
            }else if(arguments.length==1){
                if(typeof arguments[0]=="string"){
                    // 获得样式
                    getStyle(this.node,arguments[0])
                }else if(typeof arguments[0]=="object"){
                    for(var key in arguments[0]){
                        setStyle(this.node,key,arguments[0][key]);
                    }
                }

            }

        };
        _jquery.prototype.html = function () {

        };
        _jquery.prototype.val = function () {

        };
        _jquery.prototype.text = function () {

        };

        return new _jquery(selector)
    };
    jquery.ajax = function () {

    };
    jquery.post = function () {

    };
    jquery.extend  = function (obj) {
        for(var key in obj){
            jquery[key] = obj[key];
        }

    };
    jquery.fn = _jquery.prototype;
    jquery.fn.extend=function (obj) {
        for (var key in obj){
            _jquery.prototype[key] = obj[key];
        }
    };


    window.$=window.jQuery =jquery;
})();