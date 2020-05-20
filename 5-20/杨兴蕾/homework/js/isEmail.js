/**
 * Created by Administrator on 2020/5/19.
 */
(function () {
    function isEmail() {
        if(this instanceof msgFactory){//instanceof 用于判断对象是否是某个构造函数的实例
            var result = new this[type](value);//this表示是msgFactory对象
            return result;
        }else {
            return  new msgFactory(type,value);

        }
    }
    isEmail.prototype={
        email:function (value) {
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if(!reg.test(value)){
                this.err = "邮箱格式不正确，请重新输入";
                return this.err;
            }
        }
    }
    window.isEmail=isEmail;
})();