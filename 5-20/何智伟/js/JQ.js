(function () {
    function _jquery(selector) {
        this.nodes = document.querySelectorAll(selector)
        if(this.nodes.length){
            for(var i=0;i<this.nodes.length;i++){
                this[i] = this.nodes[i]
            }
        }else {
            this[0] = this.nodes
        }

    }
    function jquery(selector) {
//样式
        function setStyle(dom,property,value){
            //判断dom是数组函数对象
            if(dom.length){
                dom.forEach(function (item) {
                    item.style[property] = value;
                })
            }else {
                dom.style[property] = value;
            }

        }
        function getStyle(dom,property){
            var obj = window.getComputedStyle(dom, null) || dom.currentStyle;

            return obj[property]

        }
//html
        function setHtml(dom,value){
            if (dom.length){
                dom.forEach(function (item) {
                    item.innerHTML = value
                })
            }else {
                dom.innerHTML = value
            }


        }
        function getHtml(dom){
            return dom.innerHTML
        }
//文本
        function setText(dom,value){
            if (dom.length){
                dom.forEach(function (item) {
                    item.innerText = value
                })
            }else {
                dom.innerText = value
            }


        }
        function getText(dom){
            return dom.innerText
        }
//表单
        function setVal(dom,value){
            if (dom.length){
                dom.forEach(function (item) {
                    item.value = value
                })
            }else {
                dom.value = value
            }


        }
        function getVal(dom){
            return dom.value
        }



        _jquery.prototype.css = function () {

            if (arguments.length==2){
                console.log(arguments[0])
                setStyle(this.nodes,arguments[0],arguments[1])
            }else if (arguments.length==1){
                if (typeof arguments[0] =="string"){
                    if(this.nodes.length){
                       return  getStyle(this.nodes[0],arguments[0])
                    }else {
                        return  getStyle(this.nodes,arguments[0])
                    }

                }else if(typeof arguments[0] == "object") {
                    for (var key in arguments[0]){
                        setStyle(this.nodes,key,arguments[0][key])
                    }

                }
            }

        }
        _jquery.prototype.html=function () {
            if (arguments.length ==1){
                setHtml(this.nodes,arguments[0])
            }else if (arguments.length==0){
                if (this.nodes.length){
                    return getHtml(this.nodes[0])
                }else {
                    return getHtml(this.nodes)
                }

            }

        }
        _jquery.prototype.text=function () {
            if (arguments.length ==1){
                setText(this.nodes,arguments[0])
            }else if (arguments.length==0){
                if (this.nodes.length){
                    return getText(this.nodes[0])
                }else {
                    return getText(this.nodes)
                }

            }

        }
        _jquery.prototype.val=function () {
            if (arguments.length ==1){
                setVal(this.nodes,arguments[0])
            }else if (arguments.length==0){
                if (this.nodes.length){
                    return getVal(this.nodes[0])
                }else {
                    return getVal(this.nodes)
                }

            }

        }

        return new _jquery(selector);
    }

   function  createXmlhttp () {
        //创建对象
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp=new XMLHttpRequest();
        }
        else {
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlhttp;

    }

   function ajaxFn(obj){
       var xmlhttp = createXmlhttp();

       if (typeof obj.param =="object" ){
           var arr=[]
           for(var key in obj.param ){
               arr[key] = obj.param[key]
           }
           console.log(arr)
           obj.param = arr.join("&")
       }

       if(obj.method.toLowerCase()=="get" && obj.param){
           obj.url = obj.url+'?'+obj.param;
       }

       //设置请求
       xmlhttp.open(obj.method,obj.url,obj.async);

       //接收响应回来的数据
       xmlhttp.onreadystatechange=function() {
           if (xmlhttp.readyState==4 && xmlhttp.status==200) {
               obj.success(xmlhttp.responseText);
           }
       }

       //发起请求

       if(obj.method.toLowerCase()=="post"){

           xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded")
           xmlhttp.send(obj.param);
       }else {
           xmlhttp.send(null);
       }
   }




    jquery.ajax = function(obj){
        ajaxFn(obj)

    }
    jquery.post = function(obj){
        obj.method = "post";
        ajaxFn(obj)
    }
    jquery.get = function(obj){
        obj.method = "get";
        ajaxFn(obj)
    }

    jquery.extend = function(obj){
        for (var key in obj){
            jquery[key] = obj[key]
        }
    }
    jquery.fn = jquery.prototype;

    jquery.fn.extend = function(obj){
        for (var key in obj){
            _jquery.prototype[key] = obj[key]
        }
    }


    window.$ = window.jQuery = jquery;
})()