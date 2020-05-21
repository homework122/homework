/**
 * Created by 98088 on 2020/5/20.
 */
(function () {
    var jquery=function (selector) {
        function _jquery(selector) {
           this.node = document.querySelectorAll(selector);
           if(this.node.length){
               for(var i=0 ;i<this.node.length;i++){
                    this[i] = this.node[i]
               }
           }else {
               this[0]=this.node;
           }
        }
        function setStyle(dom,per,value) {
            if(dom.length){
                dom.forEach(function (item) {
                    item.style[per]=value
                })
            }else {
                dom.style[per]
                
            }
        }
        function getStyle(dom,per) {
            var obj = dom.currentStyle||document.defaultView.getComputedStyle(dom,null)
            return obj.style[per]
        }
        function getHtml(dom){
            return dom.innerHTML
        }
        function setHtml(dom,value){
            if (dom.length){
                dom.forEach(function (item) {
                    item.innerHTML = value
                })
            }else {
                dom.innerHTML = value
            }


        }

        function getText(dom){
            return dom.innerText
        }
        function setText(dom,value){
            if (dom.length){
                dom.forEach(function (item) {
                    item.innerText = value
                })
            }else {
                dom.innerText = value
            }
        }
        function setValue(dom,value){
            if (dom.length){
                dom.forEach(function (item) {
                    item.value = value
                })
            }else {
                dom.value = value
            }


        }
        function getValue(dom){
            return dom.value
        }

        _jquery.prototype.css=function () {
                if(arguments.length==2){
                     setStyle(this.node,arguments[0],arguments[1])
                }else if(arguments.length==1){
                    if(typeof arguments[0]=='string'){
                   if(this.node.length){
                       return getStyle(this.node[0],arguments[0])
                   }else {
                       return getStyle(this.node,arguments[0])
                   }
                    }else if(typeof arguments[0]=='object'){
                        for (var key in arguments[0]){
                          setStyle(this.node,key,arguments[0][key])
                        }
                    }
                }
        }
        _jquery.prototype.html=function (dom) {
            if (arguments.length ==1){
                setHtml(this.node,arguments[0])
            }else if (arguments.length==0){
                if (this.node.length){
                    return getHtml(this.node[0])
                }else {
                    return getHtml(this.node)
                }
            }
        }
        _jquery.prototype.text=function () {
            if (arguments.length ==1){
                setText(this.node,arguments[0])
            }else if (arguments.length==0){
                if (this.node.length){
                    return getText(this.node[0])
                }else {
                    return getText(this.node)
                }
            }
        }
        _jquery.prototype.val=function () {
            if (arguments.length ==1){
                setValue(this.node,arguments[0])
            }else if (arguments.length==0){
                if (this.node.length){
                    return getValue(this.node[0])
                }else {
                    return getValue(this.node)
                }

            }
        }

        return new _jquery;
    }
    jquery.ajax=function () {

    }
    jquery.post=function () {

    }
    jquery.extend=function (obj) {
            for (var key in obj){
                jquery[key]=obj[key]
            }
    }
    jquery.Fn=_jquery.prototype
    jquery.Fn.extend=function (obj) {
        for (var key in obj){
            _jquery.prototype[key]=obj[key]
        }
    }
    window.$=window.JQuery=jquery
})();