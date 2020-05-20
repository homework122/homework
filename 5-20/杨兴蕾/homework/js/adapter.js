/**
 * Created by Administrator on 2020/5/20.
 */
(function () {
    function dataAdapter(hou,changKey){
        var newArr =[];
        for(var i=0;i<hou.length;i++){
            var obj ={};
            for(var key in changKey){
                obj[key]=hou[i][changKey[key]];
            }
            newArr.push(obj);
        }
        return newArr;
    }
    window.adapter =dataAdapter;
})();