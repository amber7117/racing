var sid;
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) return decodeURI(r[2]); return null;

}
var uid = GetQueryString('uid');//玩家id
var icon;
var iconArr;
var jinbi;
var name;
var zhushuarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var bianhao = [16, 15, 14, 13, 12, 26, 25, 24, 23, 36, 35, 34, 46, 45, 56];
var shijian = 0;
var yingli = 0;
var jieduan = "下注";
var ainimation;
var audio = $('#sound');
var isPlaying = false;
var audio = $('#sound');
var isPlaying = false;
var jiazai = false;

var LayaSample = (function () {
    var _this;
    (function () {
        _this = this;
        //初始化引擎
        Laya.init(1334, 750);
        //Laya.stage.scaleMode = Laya.Stage.SCALE_NOBORDER;//裁剪
        // Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;//铺满全屏
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_EXACTFIT;//裁剪
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
        Laya.ResourceManager.currentResourceManager.autoRelease = true;
        Laya.ResourceManager.currentResourceManager.autoReleaseMaxSize = 1024 * 1024 * 50;//50M
        //预加载loading条资源


        $(function () {


            document.addEventListener("WeixinJSBridgeReady", function () {
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {

                    laya.media.SoundManager.playMusic("comp/mp3/下注bg.mp3", 0);
                    laya.media.SoundManager.playMusic("comp/mp3/赢.mp3", 0);
                    laya.media.SoundManager.playMusic("comp/mp3/赛马跑.mp3", 0);
                    laya.media.SoundManager.playMusic("comp/mp3/开始.mp3", 0);
                    laya.media.SoundManager.stopAll();
                });
            }, false);
        })
        var proArr = [

            { url: "horse.json" },
            { url: "res/loading......@2x.png" },
            { url: "res/bj@2x.png" },
            { url: "res/progress_time.png" },
            { url: "res/progress_time$bar.png" },
            { url: "res/logo@2x.png" },
            { url: "res/atlas/comp/jiesuanyemian.atlas" },
        ];


        wanjiafun();
        function wanjiafun() {
            $.ajax({
                url: "/member/info",
                type: "POST",
                data: {
                },
                success: function (data) {
                    //console.log(data)
                    icon = data.member.head_image;
                    name = data.member.nickname;
                    uid = data.member.id;
                    jinbi = parseInt(data.member.balance.replace(/,/g, ''));
                    Laya.loader.load(proArr, Laya.Handler.create(this, onLoaded1), null, Laya.Loader.json);
                },
                fail: function (data) {
                    wanjiafun();
                },
            })
        }

        //   Laya.Stat.show(0, 0);
    })();

    kaijiang = function (data) {


        laya.media.SoundManager.playMusic("comp/mp3/开始.mp3", 1);
        Laya.timer.clearAll(ainimation);
        ainimation = new Ainimation(data);

        Laya.stage.addChild(ainimation);
        game.visible = false;
        //console.log( game.visible);  

    }
    xiazhu = function () {
        if (ainimation != null) {
            ainimation.destroy();
            ainimation = null;
            laya.media.SoundManager.playMusic("comp/mp3/下注bg.mp3", 0);
            game.visible = true;
            //  console.log( game.visible);  
        }
        game.getChildByName("提示").visible = false;

    }


    //初始化游戏到舞台

    function onLoaded1() {
        showProgress();
        var json = Laya.loader.getRes("horse.json");
        var proArr = [
            { url: "comp/mp3/下注bg.mp3" },
            { url: "comp/mp3/开始.mp3" },
            { url: "comp/mp3/赢.mp3" },
            { url: "comp/mp3/赛马跑.mp3" },
            { url: "res/atlas/comp/jiesuanyemian.atlas" },
            { url: "res/atlas/comp/jiesuanyemian/chongzhi.atlas" },
            { url: "res/atlas/comp/jiesuanyemian/donghuapaodao.atlas" },
            { url: "res/atlas/comp/jiesuanyemian/shenglishuzi.atlas" },
        ];
        for (var i = 0; i < json.length; i++)
            proArr.push({ url: json[i] })
        //console.log(proArr);

        Laya.loader.load(proArr, null, Laya.Handler.create(this, onProgress, null, false));
    }
    function showProgress() {
        LogoLayer = new Laya.Sprite();

        progressBar = new Laya.ProgressBar("res/progress_time.png");
        zi = new Laya.Image("res/loading......@2x.png");
        bj = new Laya.Image("res/bj@2x.png");
        lg = new Laya.Image("res/logo@2x.png");
        progressBar.width = 500;
        progressBar.height = 36;
        bj.width = 1344;
        bj.height = 750;
        zi.scaleX = 2;
        zi.scaleY = 2;
        lg.pos(480, 20);
        zi.pos(550, 650);
        bj.pos(0, 0);
        progressBar.pos(420, 600);
        progressBar.sizeGrid = "5,5,5,5";
        //当progressBar的value值改变时触发
        progressBar.changeHandler = new Laya.Handler(this, onChange);

        Laya.stage.addChild(bj);
        Laya.stage.addChild(zi);
        Laya.stage.addChild(lg);
        Laya.stage.addChild(LogoLayer);
        LogoLayer.addChild(progressBar);
        Laya.timer.loop(1000, this, this.timefun);

    }
    function onChange(value) {
        //console.log("进度: "+Math.floor(value*100)+"%");
        // console.log(value);
        if (value == 1) {
            progressBar.value = 1;
            jiazai = true;
            //   console.log("加载完成");
            LogoLayer.visible = false;
            zi.visible = false;
            bj.visible = false;
            lg.visible = false;
            onLoaded();
        }
    }
    //游戏资源加载进度函数
    function onProgress(pro) {
        //  console.log("加载了总文件的:" + Math.floor(pro * 100) + "%");
        // if( Math.floor(pro * 100)==95)
        progressBar.value = Math.floor(pro * 100) / 100;
    }

    function onLoaded() {
        socket = io("110.242.68.4:3459", { "connect timeout": 5000 });
        node();
        times = 60;
        //  console.log(11111);
        game = new Game();
        Laya.stage.addChild(game);

        laya.media.SoundManager.playMusic("comp/mp3/下注bg.mp3", 0);
        socket.emit("加入游戏");
        Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, function () { 
            window.location.reload();
            // if (runtimer != null)
            //     clearInterval(runtimer);
        });
    }
})();
function timefun() {
    times = shijian;
    if (this.times > 0)
        this.times--;
    if (this.shijian > 0)
        shijian--;
}
function node() {
    socket.on('connect', function (data) {
        //   console.log("链接成功");
    })

    socket.on('reconnect', function () {

        window.location.href = window.location.href;
    })
    socket.on("uid", function (data) {
        //console.log(data)
        sid = data.sid;
        socket.emit("roomid", { roomid: 8888, id: uid, icon: icon, sid: sid, li: false, jinbi: jinbi, name: name, zhushuarr: zhushuarr, xianum: 0, yingli: 0 })
    })

    socket.on("房间信息", function (data) {
        //  console.log(data, "房间信息")
        RoomUpdata(data);


    })
    socket.on("弹窗", function (data) {
        _this.tanfun(data);
    })
    socket.on("开奖动画", function (data) {
        //  console.log(data);

        kaijiang(data);
    })


    socket.on("下注开始", function (data) {
        xiazhu();
        times = data[0];
        // console.log(data);

    })
    socket.on("用户信息", function (data) {
        UserUpdata(data);

    })
    socket.on("下注更新", function (data) {
        UserUpdata(data);
    })

    socket.on("盈利", function (data) {

        yingli = data;
        // console.log(data);
    })
    function RoomUpdata(data) {
        // console.log(data, "房间信息");
        iconArr = data[7];

        shijian = data[0];
        _this.Bet_Box.getChildByName("在线").getChildByName("在线").value = data[1];
        _this.Bet_Box.getChildByName("总量").getChildByName("总量").value = '/' + data[2];
        for (var i = 0; i < 15; i++) {

            _this.Bet_Box.getChildByName("BG").getChildAt(i).getChildByName("ODOS").value = data[3][14 - i];
        }
        jieduan = data[4];
        for (var i = 0; i < 5; i++) {
            // console.log(data[5]);
            _this.Bet_Box.getChildByName("BG").getChildByName("Record").getChildByName("" + (i + 1)).getChildByName("编号").value = (Math.ceil(bianhao[data[5][i][0]] / 10) - 1) + "-" + (Math.ceil(bianhao[data[5][i][0]] % 10));
            _this.Bet_Box.getChildByName("BG").getChildByName("Record").getChildByName("" + (i + 1)).getChildByName("倍数").value = data[5][i][1];
        }
        var arr2 = [];
        for (var m = 0; m < 9; m++) {

            arr2.push({});

        }
        // _this.getChildByName("排行榜").getChildByName("盈利").value = yingli;
        // _this.getChildByName("排行榜").getChildByName("金币").value = Number(_this.Bet_Box.getChildByName("金币").getChildByName("金币").value) + yingli;
        // _this.getChildByName("排行榜").getChildByName("编号").text = (Math.ceil(bianhao[data[5][4][0]] / 10) - 1) + "-" + (Math.ceil(bianhao[data[5][4][0]] % 10));
        _this.Rank.array = arr2;
        //  console.log((Math.ceil(bianhao[data[5][4][0]] / 10) - 1) + "-" + (Math.ceil(bianhao[data[5][4][0]] % 10)));
        for (var i = 0; i < 3; i++)  {
            _this.Bet_Box.getChildByName("在线").getChildByName("Icon" + (i + 2)).getChildByName("Icon").skin = iconArr[i];
            // console.log(iconArr[i]);
        }
    }


    function UserUpdata(data) {
        //console.log(data, "用户信息");
        for (var i = 0; i < 15; i++) {

            _this.Bet_Box.getChildByName("BG").getChildAt(i).getChildByName("BET").value = data[0][i];
        }
        Object.assign(zhushuarr, data[0])

        _this.Bet_Box.getChildByName("总量").getChildByName("自己").value = data[1];
        _this.Bet_Box.getChildByName("金币").getChildByName("金币").value = data[2];

    }


}