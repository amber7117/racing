var _this;
var leixing = 2;
var yue = 0;
var yinxiao = 2;
var tixian_num = 0;
var zhanghao = "";
var xingming = "";
var istixian = false;

var Game = (function (_super) {
    function Game() {
        _this = this;
        Game.super(this);

        this.gonggao(1, 2);
        // file = Laya.Browser.document.createElement("input");    
        // file.type = "file";
        // file.style.position = "left:100px;top:150px;";
        // file.style.zIndex = 999;
        // // console.log(px, py)
        var left = (115 / 375) * px;
        var top = (320 / 603) * py;
        var inputHeight = (py / 603) * 75;
        var inputWidth = (px / 375) * 75;
        // file.style.position = "absolute";
        // file.style.position = "absolute";

        exampleInputFile2.style = "opacity:0;position:absolute;left:" + left + "px;top:" + top + "px;height:" + inputHeight + "px;width:" + inputWidth + "px;z-index: 99999999;filter:alpha=0;";
        // console.log(file);
        // Laya.Browser.document.body.appendChild(file);//添加到舞台


        // // file = Laya.Browser.document.createElement("input");
        // // file.type = "file";

        // // file.style.zIndex = 999;
      
        $("#exampleInputFile2").hide();
        fileReader = new Laya.Browser.window.FileReader();
        sp = new Laya.Image();
        exampleInputFile2.onchange = function (e) {
            if (exampleInputFile2.files.length) {
                fileReader.readAsDataURL(exampleInputFile2.files[0]);
            }
        };
        fileReader.onload = function (evt) {
            if (Laya.Browser.window.FileReader.DONE == fileReader.readyState) {
                
                _this.erweima.getChildByName("上传").skin=  fileReader.result;
               // sp.loadImage(fileReader.result, 0, 0, 241, 241);
                // this.erweima.skin=sp;
                //_this.erweima=sp;
                Base64 = fileReader.result;
                
            }
        }
        console.log(exampleInputFile2);

        this.tab.selectHandler = new Laya.Handler(this, function (index) {
            // tab.selectedIndex ：当前选择的项索引,默认值为-1。回调函数 index 同样表示当前选择的索引，都是从 0 开始
            console.log(index);
            this.viewStack.selectedIndex = index;

            if (index == 0) {

                $('#exampleInputFile2').show();

            }

            else {
                $("#exampleInputFile2").hide();

            }

        });
        this.TeamTab.selectHandler = new Laya.Handler(this, function (index) {
            // tab.selectedIndex ：当前选择的项索引,默认值为-1。回调函数 index 同样表示当前选择的索引，都是从 0 开始
            console.log(index);

            this.TeamVS.selectedIndex = index;

        });
        console.log(_this.list_chongzhi);
        _this.list_chongzhi.vScrollBarSkin = "";
        _this.list_chongzhi.scrollBar.hide = true;//隐藏列表的滚动条。
        _this.list_ss.scrollBar.hide = true;//隐藏列表的滚动条。
        _this.l_list.scrollBar.hide = true;//隐藏列表的滚动条。
        _this.list_chongzhi.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        _this.list_chongzhi.scrollBar.elasticDistance = 200;//设置橡皮筋极限距离。

        _this.TeamVS.getChildByName("item0").scrollBar.hide = true;//隐藏列表的滚动条。
        _this.TeamVS.getChildByName("item1").scrollBar.hide = true;//隐藏列表的滚动条。

        this.yongfufun();
        this.reset();
        Laya.SoundManager.playMusic("res/beijing.mp3", 0);
        this.bottom_anniu.getChildByName("充值").on(Laya.Event.MOUSE_DOWN, this, this.czfun);
        this.dating.getChildByName("分享").on(Laya.Event.MOUSE_DOWN, this, this.tuiguangfun);
        this.bottom_anniu.getChildByName("团队").on(Laya.Event.MOUSE_DOWN, this, this.tuanduifun);
        this.bottom_anniu.getChildByName("记录").on(Laya.Event.MOUSE_DOWN, this, this.jilufun);
        this.bottom_anniu.getChildByName("兑换").on(Laya.Event.MOUSE_DOWN, this, this.duihuanfun);
        this.bottom_anniu.getChildByName("设置").on(Laya.Event.MOUSE_DOWN, this, this.shezhifun);
        this.bottom_anniu.getChildByName("推广").on(Laya.Event.MOUSE_DOWN, this, this.tuiguangfun);
        this.xinxi.getChildByName("充值").on(Laya.Event.MOUSE_DOWN, this, this.czfun);
        // this.td.getChildByName("押注").on(Laya.Event.MOUSE_DOWN, this, this.tuanduifun, [2]);
        // this.td.getChildByName("充值").on(Laya.Event.MOUSE_DOWN, this, this.tuanduifun, [1]);
        this.dating.getChildByName("说明").on(Laya.Event.MOUSE_DOWN, this, function () {
            this.gz.visible = true;
            console.log(111);
            this.gzfun();
        });
        this.gz.getChildByName("关闭").on(Laya.Event.MOUSE_DOWN, this, function () {
            this.gz.visible = false;
        });
        this.dating.getChildByName("信息").on(Laya.Event.MOUSE_DOWN, this, function () {
            this.kf.visible = true;

            this.kffun();
        });
        this.kf.getChildByName("关闭").on(Laya.Event.MOUSE_DOWN, this, function () {
            this.kf.visible = false;
            $('#kfewm').hide();
        });

        this.dh_txz.getChildByName("确定").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }

            this.dh.visible = false;
            this.dh_txz.visible = false;
            $("#exampleInputFile2").hide();
            istixian = false;
            // this.dh.getChildByName("二维码").getChildByName("微信").visible = true;
            // this.dh.getChildByName("二维码").getChildByName("支付宝").visible = true;
            // this.dh.getChildByName("二维码").getChildByName("文字").visible = true;
            // this.dh.getChildByName("二维码").getChildByName("账号").visible = false;
            // this.dh.getChildByName("二维码").getChildByName("账号").text = "";
            this.dh.getChildByName("兑换比").getChildByName("金币").text = "";
        });
        this.jl_bsxq.getChildByName("关闭").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
            this.jl_bsxq.visible = false;
        });
        this.dh.getChildByName("取消").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
            $('#exampleInputFile2').hide();
            this.dh.visible = false;
            this.dating.visible = true;
     
        });
        this.dh.getChildByName("确定").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }

            this.duihuan();
        });
        this.dh.getChildByName("关闭").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
            $('#exampleInputFile2').hide();
            this.dh.visible = false;
            this.dating.visible = true;
  
        });
        this.td_yj.getChildByName("关闭").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
            this.td_yj.visible = false;
        });
        this.td_rs.getChildByName("关闭").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
            this.td_rs.visible = false;
        });
        // this.td.getChildByName("信息").getChildByName("首页").on(Laya.Event.MOUSE_DOWN, this, function () {
        //     if (yinxiao == 2) {
        //         Laya.SoundManager.playSound("res/dianji.mp3", 1)
        //     }
        //     this.td.visible = false;
        //     this.dating.visible = true;
        // });
        this.jl.getChildByName("记录").getChildByName("倍数").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
            this.jl_bs.visible = true;
            this.beishufun();
        });
        this.jl_bs.getChildByName("关闭").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
            this.jl_bs.visible = false;
        });
        // this.sc0.getChildByName("首页").on(Laya.Event.MOUSE_DOWN, this, function () {
        //     if (yinxiao == 2) {
        //         Laya.SoundManager.playSound("res/dianji.mp3", 1)
        //     }
        //     this.jl.visible = false;
        //     this.dating.visible = true;
        // });
        this.sz.getChildByName("关闭").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
            this.sz.visible = false;
        });
        this.sz.getChildByName("音乐").getChildByName("开").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
            console.log("关闭音乐");
            this.sz.getChildByName("音乐").getChildByName("开").visible = false;
            this.sz.getChildByName("音乐").getChildByName("关").visible = true;
            Laya.SoundManager.stopMusic();
        });
        this.sz.getChildByName("音乐").getChildByName("关").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
            console.log("打开音乐");
            this.sz.getChildByName("音乐").getChildByName("开").visible = true;
            this.sz.getChildByName("音乐").getChildByName("关").visible = false;
            Laya.SoundManager.playMusic("res/beijing.mp3", 0);
        });
        this.sz.getChildByName("声音").getChildByName("开").on(Laya.Event.MOUSE_DOWN, this, function () {
            this.sz.getChildByName("声音").getChildByName("开").visible = false;
            this.sz.getChildByName("声音").getChildByName("关").visible = true;
            Laya.SoundManager.stopAllSound();
            yinxiao = 1;
            console.log("关闭声音");
        });
        this.sz.getChildByName("声音").getChildByName("关").on(Laya.Event.MOUSE_DOWN, this, function () {
            this.sz.getChildByName("声音").getChildByName("开").visible = true;
            this.sz.getChildByName("声音").getChildByName("关").visible = false;
            yinxiao = 2;
            console.log("打开声音");
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
        });
        this.dating.getChildByName("赛马").on(Laya.Event.MOUSE_DOWN, this, function () {
            window.location.replace("../../racing/index");
        });
        Laya.timer.frameLoop(1, this, this.timefun);
    }
    Laya.class(Game, "Game", _super)
    var _proto = Game.prototype;
    var movenum = 0;
    var move_num = 0;
    var ln = 0;
    _proto.timefun = function () {
        movenum++;
        // if (movenum == 200) {
        //     Laya.Tween.to(this.gg_txt, { y: -25 }, 400);
        //     Laya.timer.once(400, this, function () {
        //         this.gg_txt.y = 0;
        //         console.log(ln)
        //         move_num = move_num + 1 < ln ? move_num + 1 : 0;
        //         this.gg_txt.text = arr_gg[move_num].txt;
        //         Laya.Tween.to(this.gg_txt, { y: 0 }, 400);
        //         Laya.timer.once(400, this, function () {
        //             movenum = 0;
        //         })
        //     })
        // }

    }
    _proto.gonggao = function (g1, g2) {
        var gonggaoArr = ["a", "b", "王", "d", "李", "f", "张"];
        var suiji = parseInt(Math.random() * 7)
        var suiji2 = parseInt(Math.random() * 500)
        this.dating.getChildByName("公告" + g1).getChildByName("内容").text = gonggaoArr[suiji] + "**在赛马中获得了" + suiji2 + "金币";

        suiji = parseInt(Math.random() * 7)
        this.dating.getChildByName("公告" + g2).getChildByName("内容").text = gonggaoArr[suiji] + "**在赛马中获得了" + suiji2 + "金币";
        suiji = parseInt(Math.random() * 7)
        Laya.Tween.to(this.dating.getChildByName("公告" + g1), { y: 94, alpha: 0 }, 3000, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
            this.dating.getChildByName("公告" + g1).y = 176;

            this.dating.getChildByName("公告" + g1).getChildByName("内容").text = gonggaoArr[suiji] + "**在赛马中获得了" + suiji2 + "金币";

        }));
        Laya.Tween.to(this.dating.getChildByName("公告" + g2), { y: 130, alpha: 1 }, 3000, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
            Laya.timer.once(1000, this, function () {
                _this.gonggao(g2, g1);
            });
        }));
    }
    //初始化方法
    _proto.reset = function () {
        console.log("初始化方法");
        // var _tmp = str.match(/\.\d+0+/)[0].replace(/0+$/, '');
        // console.log(str.replace(/\.\d+0+/, _tmp));
        $.ajax({
            url: "/notice/list",
            type: "POST",
            data: {
            },
            success: function (data) {
                console.log("公告列表", data);
                ln = data.list.length;
                arr_gg = [];
                for (var i = 0; i < data.list.length; i++) {
                    arr_gg.push({
                        txt: data.list[i].title,
                    })
                }
                //_this.gg_txt.text = arr_gg[0].txt;
            }
        })
        $.ajax({
            url: "/platform/info",
            type: "POST",
            data: {
            },
            success: function (data) {
                console.log("平台信息", data)
                _this.bili.text = data.platform.per_tx + "金币可兑换1RMB";
            }
        })
    }
    //分享成功
    _proto.fenxiangOK = function () {

        var getJinbi = 0;
        $.ajax({
            url: "/platform/info",
            type: "POST",
            data: {
            },
            success: function (data) {
                console.log(data, "分享成功", data.platform.share_balance)
                _this.yongfufun();
                return data.platform.share_balance

            }
        });

    }
    //获取用户信息
    _proto.yongfufun = function () {
        $.ajax({
            url: "/member/info",
            type: "POST",
            data: {
            },
            success: function (data) {
                yue = (data.member.balance).replace(",", "");
                console.log(data)
                // if (data.member.name != "") {
                //     _this.dh.getChildByName("二维码").getChildByName("微信").visible = false;
                //     _this.dh.getChildByName("二维码").getChildByName("支付宝").visible = false;
                //     _this.dh.getChildByName("二维码").getChildByName("文字").visible = false;
                //     _this.dh.getChildByName("二维码").getChildByName("账号").visible = true;
                //     _this.dh.getChildByName("二维码").getChildByName("姓名").visible = true;
                //     _this.dh.getChildByName("二维码").getChildByName("账号").text = data.member.info;
                //     _this.dh.getChildByName("二维码").getChildByName("姓名").text = data.member.name;
                // }
                _this.xinxi.getChildByName("头像").getChildByName("头像").skin = data.member.head_image;
                _this.xinxi.getChildByName("名字").text = data.member.nickname;
                _this.xinxi.getChildByName("id").text = "ID:" + data.member.id;
                _this.xinxi.getChildByName("数量").text = data.member.balance;
                _this.td.getChildByName("上级ID").text = "上级ID：" + data.member.first_id;
                //sp.skin=data.member.info1;
                //sp.loadImage("" + data.member.info1, 0, 0, 241, 241);
                _this.erweima.getChildByName("上传").skin=  data.member.info1;
                Base64 = data.member.info1;
       

                _this.alipayAcc.text = data.member.info;
                _this.alipayName.text = data.member.name;
                
       
                // _this.sc0.getChildByName("头像").skin = data.member.head_image;
                // _this.sc0.getChildByName("信息").getChildByName("昵称").text = data.member.nickname;
                // _this.sc0.getChildByName("信息").getChildByName("id").text = data.member.id;
                // _this.sc0.getChildByName("金币").getChildByName("数量").text = data.member.balance;
                // _this.td.getChildByName("信息").getChildByName("头像").skin = data.member.head_image;
                // _this.td.getChildByName("信息").getChildByName("昵称").getChildByName("名字").text = data.member.nickname;
                // _this.td.getChildByName("信息").getChildByName("昵称").getChildByName("id").text = data.member.id;
                // _this.td.getChildByName("信息").getChildByName("昵称").getChildByName("id").text = data.member.id;
                // _this.td.getChildByName("信息").getChildByName("金币").getChildByName("数量").text = data.member.balance;
                _this.dh.getChildByName("头像").getChildByName("头像").skin = data.member.head_image;
                _this.dh.getChildByName("名字").text = data.member.nickname;
                _this.dh.getChildByName("id").getChildByName("id").text = data.member.id;

            }
        })
    }
    //充值方法
    _proto.czfun = function () {
        // $('#kfewm').hide();
        // this.kf.visible = false;
        // console.log("充值方法")
        // if (yinxiao == 2) {
        //     Laya.SoundManager.playSound("res/dianji.mp3", 1)
        // }
        // this.chongzhi.visible = true;
        // $.ajax({
        //     url: "/recharge/list",
        //     type: "POST",
        //     data: {
        //     },
        //     success: function (data) {
        //         console.log("充值类型列表", data);
        //         arr_cz = [];
        //         for (var i = 0; i < data.list.length; i++) {
        //             arr_cz.push({
        //                 jiage: data.list[i].price + "￥", jinbi: "金币" + data.list[i].in_price
        //             })
        //         }
        //         _this.list_chongzhi.vScrollBarSkin = "";
        //         _this.list_chongzhi.array = arr_cz;
        //         // for (var i = 0; i < data.list.length; i++) {
        //         //     _this.chongzhi.getChildByName("leixing").getChildAt(i).getChildAt(0).text = data.list[i].price + "￥";
        //         //     _this.chongzhi.getChildByName("leixing").getChildAt(i).getChildAt(2).text = "金币" + data.list[i].in_price;
        //         // }
        //     }
        // })

        this.getChildByName("chongzhi").visible = true;
        var arr2 = [];
        $.ajax({
            url: "/recharge/list",
            type: "POST",
            data: {
            },
            success: function (data) {
                console.log("充值类型列表", data);

                for (var m = 0; m < data.list.length; m++) {

                    arr2.push({ "jiage": data.list[m].price + "￥", "jinbi": "金币" + data.list[m].in_price });

                }
                _this.list_chongzhi.array = arr2;
                console.log(_this.list_chongzhi);
                for (var i = 0; i < arr2.length; i++) {

                    _this.list_chongzhi.content.getChildByName("item" + i).getChildByName("0").index = data.list[i].id;
                    console.log(_this.list_chongzhi.content.getChildByName("item" + i));
                    _this.list_chongzhi.content.getChildByName("item" + i).getChildByName("0").on(Laya.Event.MOUSE_DOWN, this, function (e) {
                        console.log(e.target.index);
                        _this.getChildByName("chongzhi").getChildByName("payChoose").visible = true;
                        console.log(_this.dh.getChildByName("id").getChildByName("id").text);
                        var index = e.target.index;
                        _this.getChildByName("chongzhi").getChildByName("payChoose").getChildByName("alipay").on(Laya.Event.MOUSE_DOWN, this, function () {

                            zhifu(index, _this.dh.getChildByName("id").getChildByName("id").text, 1);

                        });

                        _this.getChildByName("chongzhi").getChildByName("payChoose").getChildByName("weixin").on(Laya.Event.MOUSE_DOWN, this, function () {
                            zhifu(index, _this.dh.getChildByName("id").getChildByName("id").text, 3);

                        });
                        _this.getChildByName("chongzhi").getChildByName("payChoose").getChildByName("close").on(Laya.Event.MOUSE_DOWN, this, function () {
                            _this.getChildByName("chongzhi").getChildByName("payChoose").visible = false;

                        });
                    });
                }

            }


        });


        // console.log( _this.ListRec.content.getChildByName("item"+i).getChildByName("2"));

        this.getChildByName("chongzhi").getChildByName("关闭").on(Laya.Event.MOUSE_DOWN, this, function () {
            if (yinxiao == 2) {
                Laya.SoundManager.playSound("res/dianji.mp3", 1)
            }
            this.getChildByName("chongzhi").visible = false;
            this.getChildByName("chongzhi").offAll();
        });


    }
    //设置方法
    _proto.shezhifun = function () {
        $('#kfewm').hide();
        this.kf.visible = false;
        if (yinxiao == 2) {
            Laya.SoundManager.playSound("res/dianji.mp3", 1)
        }
        this.sz.visible = true;
    }
    //推广二维码
    _proto.tuiguangfun = function () {
        $('#kfewm').hide();
        this.kf.visible = false;
        if (yinxiao == 2) {
            Laya.SoundManager.playSound("res/dianji.mp3", 1)
        }
        $.ajax({
            url: "/member/info",
            type: "POST",
            data: {
            },
            success: function (data) {
                console.log("获取用户信息", data.member.qrcode);
                console.log("推广二维码")
                $('#ewm').show();
                $('#guanbi').show();
                $("#tishi").show();
                $('#ewm').attr("src", data.member.qrcode);
            }
        })
    }
    //记录列表
    _proto.jilufun = function () {
        this.jl.getChildByName("记录").getChildByName("guan").on(Laya.Event.MOUSE_DOWN, this, function () {
            this.jl.visible = false;
        });
        $('#kfewm').hide();
        this.kf.visible = false;
        if (yinxiao == 2) {
            Laya.SoundManager.playSound("res/dianji.mp3", 1)
        }
        console.log("记录列表");
        this.jl.visible = true;
        $.ajax({
            url: "/log/list",
            type: "POST",
            data: {
            },
            success: function (data) {
                if (data.status == 1) {
                    console.log("获取游戏记录", data.list);
                    if (data.list.length > 0) {
                        _this.h_list.visible = true;
                        _this.h_list.vScrollBarSkin = "";
                        arr_jilu = [];
                        for (var i = 0; i < data.list.length; i++) {
                            arr_jilu.push({
                                sj: data.list[i].create_date, shuying: parseInt(data.list[i].sum), jinbi: parseInt(data.list[i].spend_sum)
                            })
                        }
                        _this.h_list.array = arr_jilu;
                        _this.h_list.selectEnable = true;
                    } else {
                        _this.h_list.visible = false;
                    }
                }
                else {
                    alert(data.info)
                }
            }
        })
    }
    //查看倍数
    _proto.beishufun = function () {
        if (yinxiao == 2) {
            Laya.SoundManager.playSound("res/dianji.mp3", 1)
        }
        $.ajax({
            url: "/game/list",
            type: "POST",
            data: {
            },
            success: function (data) {
                if (data.status == 1) {
                    console.log("倍数列表", data)
                    arr_zuijin = [];
                    for (var i = 0; i < data.list.length; i++) {
                        arr_zuijin.push({
                            jushu: data.list[i].create_date,
                        })
                    }
                    _this.jx_list.vScrollBarSkin = "";
                    _this.jx_list.visible = true;
                    _this.jx_list.array = arr_zuijin;
                    _this.jx_list.selectEnable = true;
                    _this.jx_list.mouseHandler = new Laya.Handler(this, onMouse_jx_list);
                    function onMouse_jx_list(e, index) {
                        var num2 = data.list[index].room_no;
                        if (e.type == "click") {
                            if (e.target.name == "xiangqing") {
                                _this.jl_bs.visible = false;
                                _this.jl_bsxq.visible = true;
                                $.ajax({
                                    url: "/game/info",
                                    type: "POST",
                                    data: {
                                        room_no: num2,
                                    },
                                    success: function (data) {
                                        if (data.status == 1) {
                                            if (data.list.length > 0) {
                                                arr_xiangqing = [];
                                                for (var i = 0; i < data.list.length; i++) {
                                                    arr_xiangqing.push({
                                                        wanjia: data.list[i].m_id, beishu: data.list[i].sum, jinbi: data.list[i].per
                                                    })
                                                }
                                                _this.q_list.visible = true;
                                                _this.q_list.array = arr_xiangqing;
                                                _this.q_list.selectEnable = true;
                                            } else {
                                                _this.q_list.visible = false;
                                            }
                                        } else {
                                            alert(data.info);
                                        }
                                    }
                                })
                            }
                        }
                    }
                } else {
                    alert(data.info);
                }
            }
        })
    }
    //我的团队
    _proto.tuanduifun = function () {

        //$('#kfewm').hide();
        if (yinxiao == 2) {
            Laya.SoundManager.playSound("res/dianji.mp3", 1)
        }
        this.td.getChildByName("guan").on(Laya.Event.MOUSE_DOWN, this, function () {
            _this.td.visible = false;
        });

        _this.td.visible = true;
        console.log(_this.TeamVS.getChildByName("item0"));



        $.ajax(
            {

                url: "/team/profit/list",
                type: "POST",
                data: {

                    type: 2,
                },
                success: function (data) {
                    console.log("我的团队", data);


                    var arr_team = [];
                    for (var i = 0; i < data.list.length; i++) {
                        arr_team.push({
                            level: i + 1 + "级", renshu: data.list[i].all_count, yongjin1: data.list[i].all_num, yongjin2: data.list[i].day_num,
                        })
                    }

                    _this.TeamVS.getChildByName("item" + 0).array = arr_team;
                    // _this.TeamVS.getChildByName("item0").mouseHandler = new Laya.Handler(this, onMouse_jilu);
                    // function onMouse_jilu(e, index) {
                    //     if (e.type == "click") {
                    //         // console.log(e)
                    //         console.log(index,arr_team[index])
                    //         if(e.target.name=="chakan1"){
                    //             console.log(111)
                    //         }
                    //         if(e.target.name=="chakan2"){
                    //             console.log(222)
                    //         }
                    //     }
                    // }

                    // _this.TeamVS.getChildByName("item"+i).selectEnable = true;

                    for (var i = 0; i < data.list.length; i++) {
                        console.log(_this.TeamVS.getChildByName("item" + 0).content.getChildByName("item" + i), i);
                        _this.TeamVS.getChildByName("item" + 0).content.getChildByName("item" + i).getChildByName("查看1").index = i + 1;
                        _this.TeamVS.getChildByName("item" + 0).content.getChildByName("item" + i).getChildByName("查看2").index = i + 1;
                        _this.TeamVS.getChildByName("item" + 0).content.getChildByName("item" + i).getChildByName("查看1").on(Laya.Event.MOUSE_DOWN, this, function (e) {
                            console.log("点击查看1", e.target.index);
                            _this.td_rs.visible = true;
                            $.ajax({
                                url: "/team/list",
                                type: "POST",
                                data: {

                                    level: e.target.index,
                                },
                                success: function (data) {
                                    console.log(data);
                                    if (data.list.length > 0) {
                                        _this.list_ss.visible = true;
                                        arr_renshu = [];
                                        for (var i = 0; i < data.list.length; i++) {
                                            arr_renshu.push({
                                                id: data.list[i].id, sj: data.list[i].create_date
                                            })
                                        }
                                        _this.list_ss.array = arr_renshu;
                                        //  _this.list_ss.selectEnable = true;
                                    } else {
                                        _this.list_ss.visible = false;
                                    }
                                }
                            })
                        });
                        // console.log(_this.TeamVS.getChildByName("item" + m).content.getChildByName("item" + i).getChildByName("查看2"));
                        _this.TeamVS.getChildByName("item" + 0).content.getChildByName("item" + i).getChildByName("查看2").on(Laya.Event.MOUSE_DOWN, this, function (e) {
                            console.log("点击查看2", e.target.index);
                            _this.td_yj.visible = true;
                            $.ajax({
                                url: "/profit/list",
                                type: "POST",
                                data: {
                                    type: 2,
                                    level: e.target.index,
                                },
                                success: function (data) {
                                    console.log(data);
                                    if (data.list.length > 0) {
                                        _this.l_list.visible = true;
                                        arr_jinri2 = [];
                                        for (var i = 0; i < data.list.length; i++) {
                                            arr_jinri2.push({
                                                id: data.list[i].m_id, sj: data.list[i].create_date, yj: data.list[i].num
                                            })
                                        }
                                        _this.l_list.array = arr_jinri2;
                                        // _this.l_list.selectEnable = true;
                                    } else {
                                        _this.l_list.visible = false;
                                    }
                                }
                            })
                        });
                    }
                }
            });
        $.ajax(
            {

                url: "/team/profit/list",
                type: "POST",
                data: {

                    type: 1,
                },
                success: function (data) {
                    console.log("我的团队", data);


                    var arr_team = [];
                    for (var i = 0; i < data.list.length; i++) {
                        arr_team.push({
                            level: i + 1 + "级", renshu: data.list[i].all_count, yongjin1: data.list[i].all_num, yongjin2: data.list[i].day_num,
                        })
                    }

                    _this.TeamVS.getChildByName("item" + 1).array = arr_team;
                    // _this.TeamVS.getChildByName("item0").mouseHandler = new Laya.Handler(this, onMouse_jilu);
                    // function onMouse_jilu(e, index) {
                    //     if (e.type == "click") {
                    //         // console.log(e)
                    //         console.log(index,arr_team[index])
                    //         if(e.target.name=="chakan1"){
                    //             console.log(111)
                    //         }
                    //         if(e.target.name=="chakan2"){
                    //             console.log(222)
                    //         }
                    //     }
                    // }

                    // _this.TeamVS.getChildByName("item"+i).selectEnable = true;

                    for (var i = 0; i < data.list.length; i++) {
                        console.log(_this.TeamVS.getChildByName("item" + 1).content.getChildByName("item" + i), i);
                        _this.TeamVS.getChildByName("item" + 1).content.getChildByName("item" + i).getChildByName("查看1").index = i + 1;
                        _this.TeamVS.getChildByName("item" + 1).content.getChildByName("item" + i).getChildByName("查看2").index = i + 1;
                        _this.TeamVS.getChildByName("item" + 1).content.getChildByName("item" + i).getChildByName("查看1").on(Laya.Event.MOUSE_DOWN, this, function (e) {
                            console.log("点击查看1", e.target.index);
                            _this.td_rs.visible = true;
                            $.ajax({
                                url: "/team/list",
                                type: "POST",
                                data: {
                                    level: e.target.index,
                                },
                                success: function (data) {
                                    console.log(data);
                                    if (data.list.length > 0) {
                                        _this.list_ss.visible = true;
                                        arr_renshu = [];
                                        for (var i = 0; i < data.list.length; i++) {
                                            arr_renshu.push({
                                                id: data.list[i].id, sj: data.list[i].create_date
                                            })
                                        }
                                        _this.list_ss.array = arr_renshu;
                                        _this.list_ss.selectEnable = true;
                                    } else {
                                        _this.list_ss.visible = false;
                                    }
                                }
                            })
                        });
                        // console.log(_this.TeamVS.getChildByName("item" + m).content.getChildByName("item" + i).getChildByName("查看2"));
                        _this.TeamVS.getChildByName("item" + 1).content.getChildByName("item" + i).getChildByName("查看2").on(Laya.Event.MOUSE_DOWN, this, function (e) {
                            console.log("点击查看2", e.target.index);
                            _this.td_yj.visible = true;
                            $.ajax({
                                url: "/profit/list",
                                type: "POST",
                                data: {
                                    type: 1,
                                    level: e.target.index,
                                },
                                success: function (data) {
                                    console.log(data.list.length);
                                    if (data.list.length > 0) {
                                        _this.l_list.visible = true;
                                        arr_jinri1 = [];
                                        for (var i = 0; i < data.list.length; i++) {
                                            arr_jinri1.push({
                                                id: data.list[i].m_id, sj: data.list[i].create_date, yj: data.list[i].num
                                            })
                                        }
                                        console.log(_this.l_list);
                                        _this.l_list.array = arr_jinri1;
                                        _this.l_list.selectEnable = true;
                                    } else {
                                        _this.l_list.visible = false;
                                    }
                                }
                            })
                        });
                    }
                }
            });


    }
    //兑换页面
    _proto.duihuanfun = function () {
        $('#kfewm').hide();
        if (this.viewStack.selectedIndex == 0) {

            $('#exampleInputFile2').show();

        }
        this.kf.visible = false;
        if (yinxiao == 2) {
            Laya.SoundManager.playSound("res/dianji.mp3", 1)
        }
        this.dh.visible = true;
        this.dh_txz.visible = false;
        // this.dh.getChildByName("二维码").getChildByName("微信").visible = true;
        // this.dh.getChildByName("二维码").getChildByName("支付宝").visible = true;
        // this.dh.getChildByName("二维码").getChildByName("文字").visible = true;
        // this.dh.getChildByName("二维码").getChildByName("账号").visible = false;
        // this.dh.getChildByName("二维码").getChildByName("账号").text = "";
        this.dh.getChildByName("兑换比").getChildByName("金币").text = "";
        // $('#exampleInputFile2').show();
        // $('#exampleInputFile2').click(function () {
        //     $('#exampleInputFile2').hide();
        //     _this.dh.getChildByName("二维码").getChildByName("微信").visible = false;
        //     _this.dh.getChildByName("二维码").getChildByName("支付宝").visible = false;
        //     _this.dh.getChildByName("二维码").getChildByName("文字").visible = false;
        //     _this.dh.getChildByName("二维码").getChildByName("账号").visible = true;
        //     _this.dh.getChildByName("二维码").getChildByName("姓名").visible = true;
        // })
    }
    _proto.duihuan = function () {
        // if (!istixian) {
        if (yinxiao == 2) {
            Laya.SoundManager.playSound("res/dianji.mp3", 1)
        }
        $.ajax({
            url: "/platform/info",
            type: "POST",
            data: {
            },
            success: function (data) {


                tixian_num = parseInt(_this.dh.getChildByName("兑换比").getChildByName("金币").text);
                if (tixian_num >= data.platform.di) {

                    zhanghao = _this.alipayAcc.text;
                    xingming = _this.alipayName.text;
                    console.log("提现", tixian_num, zhanghao)
                    console.log(_this.viewStack.selectedIndex)
                    if (_this.viewStack.selectedIndex == 1) {
                        console.log(11111);
                        _this.dh.visible = false;
                        if (_this.dh.getChildByName("兑换比").getChildByName("金币").text != "" && _this.alipayAcc.text != "" && _this.alipayName.text != ""
                            && _this.alipayAcc.text.length >= 3 && _this.alipayAcc.text.length > 1 && tixian_num <= parseFloat(yue)) {
                            istixian = true;
                            console.log(_this.dh.getChildByName("兑换比").getChildByName("金币").text);
                            $.ajax({
                                url: "/withdraw/add",
                                type: "POST",
                                data: {
                                    price: tixian_num,
                                    info: zhanghao,
                                    name: xingming,
                                },
                                success: function (data) {
                                    console.log("提现信息", data)
                                    if (data.status == 1) {
                                        console.log(data.info);
                                        _this.yongfufun();
                                        _this.dh_txz.visible = true;
                                    }
                                    else {
                                        alert(data.info)
                                    }

                                }
                            })
                        }
                        else {
                            alert("请输入正确信息")
                        }
                    }

                    else if (_this.viewStack.selectedIndex == 0) {

                        var shoukuanma = sp;
                        // var htmlCanvas = shoukuanma.drawToCanvas(241, 241, 0, 0);//把精灵绘制到canvas上面
                        // var canvas = htmlCanvas.getCanvas();//获取原生的canvas对象
                        //
                        //    

                        //  function isBase64(str) {
                        //     if (str === '' || str.trim() === '') { return false; }
                        //         try {
                        //         return btoa(atob(str)) == str;
                        //     } catch (err) {
                        //         return false;
                        //     }
                        // }
                        // ISBase64 =isBase64(Base64);


                        // console.log(String(Base64),String(Base64).length,"changdu ");

                        if (String(Base64).length > 20 && tixian_num <= parseFloat(yue)) {
                            istixian = true;
                            _this.dh.visible = false;
                            $("#exampleInputFile2").hide();
                            $.ajax({
                                url: "/withdraw/add",
                                type: "POST",
                                data: {
                                    price: tixian_num,
                                    info1: Base64,
                                },
                                success: function (data) {
                                    console.log("提现信息", data)
                                    if (data.status == 1) {
                                        console.log(data.info);
                                        _this.yongfufun();
                                        _this.dh_txz.visible = true;
                                       // alert(Base64);
                                    }
                                    else {
                                        alert(data.info)
                                    }

                                }
                            })
                        }
                        else {
                            alert("请完善收款信息")
                        }
                    }
                } else {
                    alert("金额必须大于等于" + data.platform.di)
                }

            }
        });

    }
    //规则内容
    _proto.gzfun = function () {
        $('#kfewm').hide();
        this.kf.visible = false;
        $.ajax({
            url: "/platform/info",
            type: "POST",
            data: {
            },
            success: function (data) {
                console.log("平台信息", data)
                _this.gz.getChildByName("规则内容").text = data.platform.rule;
            }
        })
    }
    //联系客服
    _proto.kffun = function () {
        $.ajax({
            url: "/platform/info",
            type: "POST",
            data: {
            },
            success: function (data) {
                console.log("平台信息", data);
                console.log(data.platform.qrcode)
                $('#kfewm').show();
                $('#kfewm').attr("src", data.platform.qrcode);
                // _this.kefu.skin = data.platform.qrcode;
            }
        })
    }
    return Game;

})(ui.gameUI);
