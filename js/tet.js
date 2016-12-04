/**
 * Created by  zhuhw on 2016/11/28.
 */
/*上 */


/*
 * 搜索功能：
 *   1. 点击搜索按钮，获取文本框中的categoryid
 *   2. 同时，进行发送ajax请求，将文本框中的id进行当成参数
 *   3. 将数据设置在页面上
 *
 *  分页功能：
 *   1. 点击按钮的时候，后台返回totalCount
 *   2. 用totalCount/pagesize = 可以进行分的页数，向上取余
 *       注意：
 *           要先进行判断totalCount是否是0
 *               如果是0,就是直接进行提示信息并且分页的组件不显示
 *               如果不为空，totalCount/pagesize = 可以进行分的页数，向上取余
 *       2.1 当前的页面/页码的总数
 *   3.
 * */

$('.mmm-search-right input').on('click',function(){
    var cid = $('.mmm-search-text input').val();
    /**/
    /*
     * 如果获取到的值为空的话，直接return，不去发送请求
     * */
    if(!cid){
        alert('输入框内容为空');
        $('#productlistUl').html('');
        return;
    }
    /*
     点击获取下一页数据
     */

    var temppageid = 1;

    /* $('.pagenation-next input').on('click',function(){
     if(){

     }
     });*/
    ajaxPag();
    function ajaxPag(){
        $.ajax({
            type:'get',
            url:'http://mmb.ittun.com/api/getproductlist',
            data:{
                categoryid:cid,
                pageid:temppageid
            },
            dataType:'jsonp',
            success:function(obj){
                //console.log(obj);
                /*
                 * 判断获取的对象的个数是否有值
                 * */
                if(obj.totalCount==0){
                    //alert(0);
                    $('#productlistUl').html('');
                    $('#productReminder').css('display','block');
                    $('#pagenationId').css('display','none');
                    return;
                }else{
                    /*
                     * totalCount 先显示总的页数
                     * 在select里面是动态生成的options的个数，有几个就生成几个
                     * */
                    var pags = obj.totalCount/obj.pagesize;
                    //console.log(pags);
                    pags = Math.ceil(pags);
                    var optionsList='';
                    var arr = [];
                    for(var i=0;i<pags;i++){
                        arr.push('<option value="'+(i+1)+'">'
                            +'<span>'+(i+1)+'</span>'+'/'+'<span>'+pags+'</span>'+'</option>');
                    };
                    //console.log(arr);
                    /*将数组转换成字符串,调用了join方法
                     var arr = [1,2,3,4,5];
                     console.log(arr.toString());//和join的默认方法是等价的
                     console.log(arr.join());*/
                    //console.log(arr.join());
                    $('.options').html(arr.join());



                    var html = template('productListTmpl',{lists:obj.result});
                    //console.log(html);
                    $('#productlistUl').html(html);
                    $('#productReminder').css('display','none');
                    $('#pagenationId').css('display','block');


                    $('.pagenation-next input').on('click',function(){
                        //console.log(obj.totalCount);
                        if(temppageid>pags){
                            return;

                        }else{
                            temppageid++;
                            console.log(temppageid);
                            ajaxPag();
                        }
                        //console.log(temppageid);
                        //并且发送请求

                    });

                }
            }
        });
    }


    /* $('.pagenation-next input').on('click',function(){
     if(){

     }
     });*/
    /*$('.pagenation-next input').on('click',function(){
     console.log(obj.totalCount);
     });*/



    /*
     * 获取那谁的数据
     * */
    $.ajax({
        type:'get',
        url:'http://mmb.ittun.com/api/getcategorybyid',
        data:{
            categoryid : 1
        },
        dataType:'json',
        success: function(obj){
            console.log(obj);
            var r = obj.result[0].category
            console.log(r);
            $('#categoryApi').html(r);
        }
    })
});

