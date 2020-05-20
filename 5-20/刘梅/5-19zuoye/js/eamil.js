(function () {
    function checkEmail(emailarr,sezrch) {
        var result=[];
        for (var i=0;i<emailarr.length;i++){
            if(emailarr[i].indexOf(sezrch)>=0){
                result.push(emailarr[i])
            }
        }
        return result
    }
    window.email=checkEmail;
})();