/**
 * Created by Administrator on 2020/5/20.
 */
(function () {
    function email(emailArr,search) {
        var result=[];
        for(var i=0;i<emailArr.length;i++){
            if(emailArr[i].indexOf(search)>=0){
                result.push(emailArr[i])
            }
        }
        return result
    }
    window.email=email;
})()