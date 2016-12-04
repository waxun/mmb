/*
* @Author: zhuhw
* @Date:   2016-11-28 09:30:15
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-28 12:01:46
*/

'use strict';
        /*
        * 当窗口进行改变的时候resize，进行变换里面的字体的大小对应的rem
        *
        * */
        var OHtml = document.documentElement;

       /*
        * _resize()
        * 计算的页面的基准值，基本的font-size的值
        **/
        function getSize(){
            //设置html的文字的大小
            /*
            设计稿的大小/定死的40 = 变化的屏幕的大小/每个屏幕上变化的fontSize
            变化的fontSize = 变化的屏幕的大小 /（设计稿的大小/定死的40）

            如果是大于640，则设置字体大小是40px
            小于320，则font-size设置字体大小为=320/(750/40) = 17.06px

            在范围内就是
                html.style.fontSize = screenW/(750/40)
                */
            var screenW = OHtml.offsetWidth;//获取屏幕的宽度 或是 screen的宽度，是一样的
            if(screenW>=750){
                //当屏幕大于等于750屏幕，进行直接直接用屏幕的大小除以比例值就是得到的px值
                OHtml.style.fontSize = '40px';
                console.log(OHtml.style.fontSize);
            }else if(screenW<=320){
            	OHtml.style.fontSize = '17.0667px';
                console.log(OHtml.style.fontSize);//17.0667px
            }else{
            	OHtml.style.fontSize = screenW/(750/40)+'px';
            	console.log(OHtml.style.fontSize);
            }
        }
        // 最开始先调用一次
        getSize();
        window.addEventListener('resize',getSize);