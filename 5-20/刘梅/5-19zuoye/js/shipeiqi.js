/*前后端传值数组的属性名不同时使用的适配器*/
(function (){function dataAdapter(hou,changeKey) {
    var newArr = [];
    for (var i = 0; i < hou.length; i++) {
        var obj = {};
        //对象加数据
        for (var key in changeKey) {
            obj[key] = hou[i][changeKey[key]];
console.log( obj[key])
console.log( changeKey[key])
        }
        newArr.push(obj)
    }
    return newArr
}
   window.adapter=dataAdapter;
})();