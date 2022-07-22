<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8' />
    <title>赛马</title>
    <meta name='viewport' content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
    />
    <meta name="renderer" content="webkit"/>
    <meta name='apple-mobile-web-app-capable' content='yes' />
    <meta name='full-screen' content='true' />
    <meta name='x5-fullscreen' content='true' />
    <meta name='360-fullscreen' content='true' />
    <meta name="laya" screenorientation ="landscape"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta http-equiv='expires' content='0' />
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
</head>
<body>
<!--以下引用了常用类库，如果不使用，可以删除-->

<!--核心包，封装了显示对象渲染，事件，时间管理，时间轴动画，缓动，消息交互,socket，本地存储，鼠标触摸，声音，加载，颜色滤镜，位图字体等-->
<script type="text/javascript" src="libs/laya.core.js"></script>
<!--提供了微信小游戏的适配-->
<script type="text/javascript" src="libs/laya.wxmini.js"></script>
<!--提供了百度小游戏的适配-->
<script type="text/javascript" src="libs/laya.bdmini.js"></script>
<!--封装了webgl渲染管线，如果使用webgl渲染，可以在初始化时调用Laya.init(1000,800,laya.webgl.WebGL);-->
<script type="text/javascript" src="libs/laya.webgl.js"></script>
<!--是动画模块，包含了swf动画，骨骼动画等-->
<script type="text/javascript" src="libs/laya.ani.js"></script>
<!--包含更多webgl滤镜，比如外发光，阴影，模糊以及更多-->
<script type="text/javascript" src="libs/laya.filter.js"></script>
<!--封装了html动态排版功能-->
<script type="text/javascript" src="libs/laya.html.js"></script>
<!--粒子类库-->
<script type="text/javascript" src="libs/laya.particle.js"></script>
<!--提供tileMap解析支持-->
<script type="text/javascript" src="libs/laya.tiledmap.js"></script>
<!--提供了制作UI的各种组件实现-->
<script type="text/javascript" src="libs/laya.ui.js"></script>
<!--自定义的js(src文件夹下)文件自动添加到下面jsfile模块标签里面里，js的顺序可以手动修改，修改后保留修改的顺序，新增加的js会默认依次追加到标签里-->
<!--删除标签，ide不会自动添加js文件，请谨慎操作-->
<!--jsfile--startTag-->
<script>
    var randnum=Math.floor(Math.random()*1000)
</script>

<script src="js/socket.io.min.js?"+randnum></script>
<script src="js/jquery-1.9.1.min.js"></script>
<script src="js/LayaSample.js?"+randnum></script>
<script src="js/ui/layaUI.max.all.js?"+randnum></script>
<script src="js/Ainimation.js?"+randnum></script>
<script src="js/Game.js?"+randnum></script>

<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" charset="utf-8">
    wx.config(<?php echo $js ?>);
</script>
<script type="text/javascript" charset="utf-8">
    wx.ready(function () {
        var base_url = '{{Config::get('custom.BasePath')}}'
        wx.hideMenuItems({
            menuList: ["menuItem:share:qq", "menuItem:share:weiboApp",
                "menuItem:favorite", "menuItem:copyUrl",
                "menuItem:originPage", "menuItem:readMode",
                "menuItem:openWithQQBrowser", "menuItem:openWithSafari",
                "menuItem:share:email", "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
        wx.onMenuShareTimeline({
            title: '快来领钱，每天分享领取金币兑换红包最高金额66，点击进入', // 分享标题
            link: base_url + '/platform/index', // 分享链接
            imgUrl: base_url + '/uploads/share2.png', // 分享图标
            success: function () {
                setTimeout(function(){
                    //回调要执行的代码
                    // 用户确认分享后执行的回调函数
                    $.ajax({
                        url:"/share/update",
                        type:"POST",
                        success:function (data) {

                        }
                    })
                }, 500);
            },
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: '快来领钱，每天分享领取金币兑换红包最高金额66，点击进入', // 分享标题
            desc: '快来领钱，每天分享领取金币兑换红包最高金额66，点击进入', // 分享描述
            link: base_url + '/platform/index', // 分享链接
            imgUrl: base_url + '/uploads/share2.png', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                    //回调要执行的代码
                    // 用户确认分享后执行的回调函数
                    $.ajax({
                        url:"/share/update",
                        type:"POST",
                        success:function (data) {

                        }
                    })
            },
            cancel: function () {
            }
        });
    });
    function zhifu(id,memberId,type) {
        window.location.href="/pay?id="+id+"&member_id="+memberId+"&type="+3
    }
</script>
<!--jsfile--endTag-->
</body>
</html>
