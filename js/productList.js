/**
 * Created by  zhuhw on 2016/11/28.
 */

/*
 *  ctrl+shift=r
 *
 *
 *
 * 内网
 *   http://192.168.50.130:8002
 *外网
 http://mmb.ittun.com
 * */
/**
 *
 * @param 上个页面传值过来的url
 * @returns {{}} obj
 */
function subStr(url) {
    var obj = {};
    var str = url.split('?')[1];
    var str2 = str.split('&');
    for (var k in str2) {
        var str3 = str2[k].split('=');
        obj[str3[0]] = str3[1];
    }
    return obj;
}
/*cid = subStr(window.location.href).categoryid;
temppageid = subStr(window.location.href).pageid || 1;*/
cid = subStr('http://mmb.ittun.com/api/getproductlist?categoryid=1&pageid=1').categoryid;
 temppageid = subStr('http://mmb.ittun.com/api/getproductlist?categoryid=1').pageid||1;
console.log(cid, temppageid);
fnAjax(cid, temppageid);
getThreeCategory(cid);
/**
 * 搜索点击事件
 *  1. 判空，进行提示
 *  2. 否则 调取数据
 */
$('.mmm-search-right input').on('click', function () {
    //每次搜索的时候，页码都选进行恢复1
    temppageid = 1;
    cid = $('.mmm-search-text input').val();
    if (!cid) {
        //alert('输入框内容为空');
        $('#productlistUl').html('');
        $('#productReminder').css('display', 'block');
        $('#pagenationId').css('display', 'none');
        return;
    }
    fnAjax(cid, temppageid);
    //console.log(cid);
    getThreeCategory(cid);
});


var temppageid = 1;
var cid;
/**
 *
 *
 * @param cid         categoryid
 * @param temppageid  pageid  默认值给的1
 */
function fnAjax(cid, temppageid) {
    $.ajax({
        type: 'get',
        //url:'http://mmb.ittun.com/api/getproductlist?categoryid='+cid+'&pageid='+temppageid,
        url: 'http://mmb.ittun.com/api/getproductlist',
        data: {
            categoryid: cid,
            pageid: temppageid
        },
        dataType: 'json',
        success: function (obj) {
            if (obj.totalCount == 0) {
                $('#productlistUl').html('');
                $('#productReminder').css('display', 'block');
                $('#pagenationId').css('display', 'none');
                return;
            } else {
                var pags = Math.ceil(obj.totalCount / obj.pagesize);
                var optionsList = '';
                var arr = [];
                for (var i = 0; i < pags; i++) {
                    arr.push('<option value="' + (i + 1) + '">'
                        + '<span>' + (i + 1) + '</span>' + '/' + '<span>' + pags + '</span>' + '</option>');
                }
                ;
                $('.options').html(arr.join());
                var html = template('productListTmpl', {lists: obj.result});

                $('#productlistUl').html(html);
                $('#productReminder').css('display', 'none');
                $('#pagenationId').css('display', 'block');

                $('#options option').eq(temppageid - 1).attr('selected', 'selected');
            }
        },
    });
}
/**
 * 功能说明：
 *      获得下一页数据
 *      1. 当前页码 总数  => 可以进行下一页
 *      2. 否则          => 设置disabled按钮
 *
 */
$('.pagenation-next input').on('click', function () {

    var lengPage = $('#options option').length;
    //console.log(lengPage);
    if (temppageid < lengPage) {
        temppageid++;
        fnAjax(cid, temppageid);
        console.log('next--temppageid=' + temppageid);
    } else {
        $('.pagenation-next input').attr('disabled', "true");
    }
});
/**
 *功能说明：
 *  获得上一页数据
 *  1. 如果当前页码>1  => 当前页面-1，进行获取上一页数据
 *  2. 否则上一页 按钮 => disabled
 *
 */
$('.pagenation-prev input').on('click', function () {
    var lengPage = $('#options option').length;
    if (temppageid > 1) {
        temppageid--;
        console.log('prev--temppageid=' + temppageid);
        fnAjax(cid, temppageid);
    } else {
        $('.pagenation-prev input').attr('disabled', "true");
    }
});
/**
 * 通过页码进行获取数据
 *
 */
$('#options').change(function () {
    //js 中获取select选中的option的下标
    var temp = this.selectedIndex;
    //对应的调用ajax获取数据
    temppageid = temp + 1;
    fnAjax(cid, temppageid);

    console.log('options--temppageid=' + temppageid);
});
//让select标签进行禁用状态
//$('.options').attr('disabled',true);
/*/!*
 * 获取那谁的数
 * 据
 * categoryApi
 * *!/*/
function getThreeCategory(cid) {
    $.ajax({
        type: 'get',
        url: 'http://mmb.ittun.com/api/getcategorybyid',
        data: {
            categoryid: cid
        },
        dataType: 'json',
        success: function (obj) {
            console.log(obj);
            var r = obj.result[0].category;
            $('#categoryApi').html(r);
        }
    });
};




