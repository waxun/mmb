/*
* @Author: zhuhw
* @Date:   2016-11-28 09:30:15
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-28 12:03:09
*/
/*基于320/40的比例进行的*/
var OHtml = document.documentElement;

function getSize(){
 var screenW = OHtml.offsetWidth;
 if(screenW>=750){
        OHtml.style.fontSize = '93.75px';
        console.log(OHtml.style.fontSize);
    }else if(screenW<=320){
    	OHtml.style.fontSize = '40px';
        console.log(OHtml.style.fontSize);
    }else{
    	OHtml.style.fontSize = screenW/(320/40)+'px';
    	console.log(OHtml.style.fontSize);
    }
}
getSize();
window.addEventListener('resize',getSize);