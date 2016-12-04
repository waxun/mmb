/**
 * Created by  zhuhw on 2016/11/30.
 */
/*
 *
 * 内网
 *   http://192.168.50.130:8002
 *
 * 外网
 *   http://mmb.ittun.com
 *
 * */
/**
 *
 * @param url  搜索页过来的数据
 * @returns {{}}
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
var itemid = subStr(window.location.search).productid;

/*
 *
 *http://mmb.ittun.com/api/getproduct
 * 根据商品id获取商品的详细信息然后渲染到页面上
 * */
mainAjax();
/**
 * 根据productid，进行渲染页面
 */
function mainAjax() {
    $.ajax({
        type: 'get',
        url: 'http://mmb.ittun.com/api/getproduct?productid=' + itemid,
        dataType: 'json',
        success: function (result) {
            $('.product-info-name').html(result.result[0].productName);
            $('.product-info-img a').html(result.result[0].productImg);
            $('.mmm-detail-product-price-top').html(result.result[0].bjShop);
            var catId = result.result[0].categoryId;
            //获取三级标题
            $.ajax({
                type: 'get',
                url: 'http://mmb.ittun.com/api/getcategorybyid',
                data: {
                    categoryid: catId
                },
                dataType: 'json',
                success: function (result) {
                    //console.log(result.result[0].category);
                    $('.mmm-container-bread-left a').eq(2).html(result.result[0].category);
                }
            });
        }
    });
};

/*商品评价接口
 * http://mmb.ittun.com/api/getproductcom
 * 传入api的参数 productid ： 商品id   ( Number类型)
 */
findCommentInfoList();
function findCommentInfoList() {
    $.ajax({
        type: 'get',
        url: 'http://mmb.ittun.com/api/getproductcom',
        data: {
            productid: itemid
        },
        dataType: 'json',
        success: function (datas) {
            //模板ok
            var html = template('commonTmpl', {lists: datas.result});
            //console.log(html);
            //datas.result
            //console.log(datas.result.length);
            if(datas.result.length==0){
                $('.product-common-list-container').html('<li id="nullTips">该商品暂无评价信息~快来抢沙发吧</li>');
            }else{
                $('.product-common-list-container').html(html);
            };

            $('.product-tab-common .commonnum').html(datas.result.length);
        }
    });
};

/*
 * 点击搜索，获取对应的商品详情及其评价信息
 * */
$('.mmm-search-right input').on('click', function () {
    //alert(1);
    if ($('.mmm-search-text input').val()) {
        var catagoryId = $('.mmm-search-text input').val();
        //window.location.href="http://localhost/project/productList.html?categoryid="+catagoryId;
        window.location.href = "http://localhost/project/productList.html?categoryid=" + catagoryId;
    }
});


