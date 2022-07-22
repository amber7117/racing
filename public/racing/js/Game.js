var _this;
var Game = (function (_super) {
    function Game() {
        _this = this;
        //调用父级的构造方法
        Game.super(this);
        this.getChildByName("返回").on(Laya.Event.MOUSE_DOWN, this, function () {
            Laya.timer.clearAll(this);
            window.location.replace("../../platform/index");
        });
        this.Bet_Box.getChildByName("充值").on(Laya.Event.MOUSE_DOWN, this, function () {
            this.getChildByName("充值页面").visible = true;
            var arr2 = [];
            $.ajax({
                url: "/recharge/list",
                type: "POST",
                data: {
                },
                success: function (data) {
                    console.log("充值类型列表", data);

                    for (var m = 0; m < data.list.length; m++) {

                        arr2.push({ "RMB": data.list[m].price + "￥", "金币": "金币" + data.list[m].in_price });

                    }
                    _this.ListRec.array = arr2;
                    console.log(_this.ListRec);
                    for (var i = 0; i < arr2.length; i++) {
                        _this.ListRec.content.getChildByName("item" + i).getChildByName("0").index = data.list[i].id;
                       // _this.ListRec.content.getChildByName("item" + i).getChildByName("0").name = i;
                        console.log(  _this.ListRec.content.getChildByName("item" + i));
                        _this.ListRec.content.getChildByName("item" + i).getChildByName("0").on(Laya.Event.MOUSE_DOWN, this, function (e) {         
                            console.log(e.target.index);
                        zhifu(e.target.index,uid) });
                    }

                }


            });


            // console.log( _this.ListRec.content.getChildByName("item"+i).getChildByName("2"));

            this.getChildByName("充值页面").getChildByName("close").on(Laya.Event.MOUSE_DOWN, this, function () {
                this.getChildByName("充值页面").visible = false;
                this.getChildByName("充值页面").offAll();
            });
        });
        Laya.timer.frameLoop(1, this, this.timefun);
        for (var i = 0; i < 15; i++) {
            this.Bet_Box.getChildByName("BG").getChildAt(i).on(Laya.Event.MOUSE_DOWN, this, this.xiazhu, [i]);
        }

        this.ListRec.scrollBar.hide = true;//隐藏列表的滚动条。
        this.ListRec.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.ListRec.scrollBar.elasticDistance = 200;//设置橡皮筋极限距离。
        // var data = [];
        // for (var m = 0; m < 20; m++) {
        //     data.push({ rName: "aaaa" + m, rOdos: "" + m, rGetgold: "" + m });
        // }
        // this.Rank.array = data;
        // this.Rank.scrollBar.hide = true;//隐藏列表的滚动条。  
        this.Bet_Box.getChildByName("在线").getChildByName("MyIcon").getChildByName("Icon").skin = icon;
    }


    //注册Game类
    Laya.class(Game, "Game", _super);
    var _proto = Game.prototype;
    _proto.xiazhu = function (data) {

        socket.emit("下注", { id: uid, sid: sid, index: data })
        // this.Bet_Box.getChildByName("BG").getChildByName(e.target.name).getChildByName("BET").value++;
        // this.Bet_Box.getChildByName("金币").getChildByName("金币").value--;
        laya.media.SoundManager.playSound("comp/mp3/点击按钮.mp3", 1);
   
    }



    _proto.timefun = function () {
        if (times >= 0)
            this.getChildByName("下注时间").getChildByName("下注时间").value = times;
        for (var i = 1; i < 7; i++) {
            _this.Bet_Box.getChildByName("BG").getChildByName("horse" + i).x += 3;
            if (_this.Bet_Box.getChildByName("BG").getChildByName("horse" + i).x > 1344)
                _this.Bet_Box.getChildByName("BG").getChildByName("horse" + i).x = -1656;
        }
        // console.log(jieduan);
        // if (jieduan == "开奖") {
        //     _this.getChildByName("排行榜").visible = true;
        // }
        // else if (jieduan == "下注") {
        //     _this.getChildByName("排行榜").visible = false;
        // }
    }

    _proto.tanfun = function (data) {
        _this.getChildByName("提示").visible = true;
        _this.getChildByName("提示").getChildAt(1).text = data;
        _this.getChildByName("提示").getChildByName("guanbi").on(Laya.Event.MOUSE_DOWN, this, function () {
            _this.getChildByName("提示").visible = false;
            _this.getChildByName("提示").getChildByName("guanbi").offAll();
        });
    }

    return Game;
})(ui.GameUI);