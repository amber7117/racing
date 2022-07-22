/*
* name;
*/
var Ainimation = (function (_super) {
    var _this;

    function Ainimation(data) {
        _this = this;

        nodeChamp = data[0];
        champ = parseInt(bianhao[data[0]] / 10);
        champ2 = bianhao[data[0]] % 10;
        if (champ > champ2) {
            var save = champ;
            champ = champ2;
            champ2 = save;
        }
      //  console.log(champ, champ2);
        Zhushuarr = [];
        Odos = data[3];
        Object.assign(Zhushuarr, zhushuarr)
        max = [];
        numberS = 0;
        horses = [];
        horsesS = data[1];
        as1 = 0;
        as2 = 0;
        shuaidao = data[2];
        doudong = -15;
        var TwNum = 0;
        numMap = 0;
        numMap2 = 7;
        if (shuaidao == champ - 1 || shuaidao == champ2 - 1)
            shuaidao = 6;
        Ainimation.super(this);

        for (var i = 1; i < 7; i++) {
            var horse = "horse" + i;
            _this.Anima_Box.getChildByName("Map").getChildByName(horse).Tween = false;
            this.Anima_Box.getChildByName("Map").getChildByName(horse).Tween2 = true;
            _this.Anima_Box.getChildByName("Map").getChildByName(horse).speed = horsesS[numberS];

            Laya.Tween.to(_this.Anima_Box.getChildByName("Map").getChildByName(horse), { x: 70 + ((i - 1) * 85) }, 1600, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
                TwNum++;
                _this.Anima_Box.getChildByName("Map").getChildByName("horse" + TwNum).interval = 100;
                _this.Anima_Box.getChildByName("Map").getChildByName("horse" + TwNum).autoAnimation = "pao1";
                // console.log(TwNum);
                if (TwNum == 6) {
                  runtimer = setInterval(this.timefun, 16);
                   //Laya.timer.loop(16, this, this.timefun);
                    laya.media.SoundManager.playMusic("comp/mp3/赛马跑.mp3", 0);
                }


            }));
            _this.Anima_Box.getChildByName("Map").getChildByName(horse).num = i;
            _this.Anima_Box.getChildByName("Map").getChildByName(horse).ave = 0;
            _this.Anima_Box.getChildByName("Map").getChildByName(horse).timers = 1;
            horses.push(_this.Anima_Box.getChildByName("Map").getChildByName(horse))
            numberS++;

        }
        _this.Anima_Box.getChildByName("界面").getChildByName("金币").value = game.Bet_Box.getChildByName("金币").getChildByName("金币").value;
        max2 = _this.Anima_Box.getChildByName("Map").getChildByName("horse1");
        if (shuaidao < 6)
            horses[shuaidao].speed = 15;

        _this.Anima_Box.getChildByName("Map").getChildByName("horse1").play();
        timesss = 0;

        Laya.timer.frameLoop(2, this, function timefun2() {
            timesss++;

            if (Zhushuarr[nodeChamp] >= 60 && timesss < 100) {
                _this.Anima_Box.y += doudong;
                doudong = -1 * doudong;

            }
            else {
                Laya.timer.clear(this, timefun2);
            }





        });





    }
    Laya.class(Ainimation, "Animation", _super);
    var _proto = Ainimation.prototype;
    _proto.timefun = function () {

        //赛马移动
        for (var i = 0; i < horses.length; i++) {


            if (horses[i].x <= 1344 * 7 + 720 + 85 * (i - 1) && horses[i].y < 400) {
                if (horses[i].timers % 200 == 0) {

                    horses[i].speed = horsesS[numberS];
                    if (shuaidao < 6)
                        horses[shuaidao].speed = 15;
                    numberS++;

                }


                horses[i].x += horses[i].speed;
                // horses[i].ave = (horses[i].ave * horses[i].timers+ horses[i].speed) / (horses[i].timers + 1);
                horses[i].timers++;
                if (max2.x < horses[i].x)
                    max2 = horses[i]
            }
            else if (horses[i].Tween == false) {

                horses[i].Tween = true;

                horses[i].autoAnimation = 'guai1z';
                horses[i].ave = (1344 * 7 + 650) / horses[i].timers;
                //console.log(horses[i].timers, "timer");
                //console.log(horses[i].ave, horses[i].num - 1);
                if (champ - 1 == i)
                    as1 = _this.Anima_Box.getChildByName("Map").getChildByName("horse" + champ).ave;
                if (champ2 - 1 == i)
                    as2 = _this.Anima_Box.getChildByName("Map").getChildByName("horse" + champ2).ave;
                max.push(horses[i].ave);
                max.sort();
                //console.log(max);
                Laya.Tween.to(horses[i], { x: 10250 + 120 * i, y: 550 }, 750, Laya.Ease.linearIn, Laya.Handler.create(this, function () {


                    // Laya.Tween.to(_this.Anima_Box.getChildByName("Map").getChildByName(h), { y: 1380 }, 1500, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
                    //     Laya.Tween.to(_this.Anima_Box.getChildByName("Map").getChildByName(h), { x: 1344 * 6 + 720, y: 1589 +((_this.Anima_Box.getChildByName("Map").getChildByName(h).num-1)*65) },  1500, Laya.Ease.linearIn, Laya.Handler.create(this, function () {
                    //         _this.Anima_Box.getChildByName("Map").getChildByName(h).autoAnimation='ani2';
                    //         _this.Anima_Box.getChildByName("Map").getChildByName(h).Tween2=false; 


                    //     }));
                    // }));

                }));
                if (i == shuaidao) {
                    this.Anima_Box.getChildByName("摔倒").visible = true;
                    this.Anima_Box.getChildByName("摔倒").value = shuaidao;
                    this.Anima_Box.getChildByName("摔倒").getChildByName("摔倒").value = shuaidao + 1;
                    horses[shuaidao].visible = false;
                    laya.media.SoundManager.playSound("comp/mp3/摔下马音效.mp3", 1);
                }


            }
            else if (horses[i].x == 10250 + 120 * i && horses[i].y == 550) {
                horses[i].autoAnimation = 'guai2';
                Laya.Tween.to(horses[i], { x: 10500 + 120 * i, y: 850 }, 750, Laya.Ease.linearIn, Laya.Handler.create(this, function () {

                }));
            }
            else if (horses[i].x == 10500 + 120 * i && horses[i].y == 850) {
                Laya.Tween.to(horses[i], { y: 1380 }, 1500, Laya.Ease.linearIn, Laya.Handler.create(this, function () { }));
                horses[i].zOrder = horses[i].num;
                horses[i].autoAnimation = 'guai3';
            }
            else if (horses[i].y == 1380) {

                Laya.Tween.to(horses[i], { x: 1344 * 7 + 650, y: 1580 + ((horses[i].num - 1) * 65) }, 1500, Laya.Ease.linearIn, Laya.Handler.create(this, function () {

                }));


                horses[i].autoAnimation = 'guai1f';
            }

            else if (horses[i].y == 1580 + ((horses[i].num - 1) * 65)) {
                if (horses[i].x == 1344 * 7 + 650)
                    horses[i].autoAnimation = 'pao2';


                horses[i].speed = max[5];



                _this.Anima_Box.getChildByName("Map").getChildByName("horse" + champ).speed = (1344 * 7 + 650) / ((1344 * 7 + 500) / max[5] * 2 - (1344 * 7 + 650) / as1);

                _this.Anima_Box.getChildByName("Map").getChildByName("horse" + champ2).speed = (1344 * 7 + 650) / ((1344 * 7 + 550) / max[5] * 2 - (1344 * 7 + 650) / as2);
                // horses[2].speed =max[5]*2- horses[2].ave+3.0;

                horses[i].x -= horses[i].speed;

                horses[i].timers++;
                if (max2.x > horses[i].x)
                    max2 = horses[i]
                // console.log(  horses[i].ave,  horses[i].num);
            }


        }

        if (_this.Anima_Box.getChildByName("Map").getChildByName("horse" + champ).x <= 0) {
            // Laya.timer.clear(this, this.timefun)
            clearInterval(runtimer);
          
            //console.log(horses[0].timers);
            if (yingli > 0)
                laya.media.SoundManager.playMusic("comp/mp3/赢.mp3", 1);
            _this.Anima_Box.getChildByName("champ").value = champ + "-" + champ2;
            _this.Anima_Box.getChildByName("champ").visible = true;
            _this.Anima_Box.getChildByName("Odos").value = Odos;
            _this.Anima_Box.getChildByName("Odos").visible = true;
            for (var i = 0; i < 6; i++) {
                horses[i].stop();
            }

            _this.Anima_Box.getChildByName("界面").getChildByName("盈利").value = yingli;
            Laya.timer.once(500, this, function () {

                var timess = 0
                var sudu = 1;
                yinglitimer = setInterval(function () {
                    timess++;

                    if (timess > 60)
                        if (_this.Anima_Box.getChildByName("界面").getChildByName("盈利").value > 0) {
                         //   console.log(_this.Anima_Box.getChildByName("界面").getChildByName("金币").value);
                            var yinliV = Number(_this.Anima_Box.getChildByName("界面").getChildByName("盈利").value);
                            yinliV -= sudu;
                            var jinbiV = Number(_this.Anima_Box.getChildByName("界面").getChildByName("金币").value);
                            jinbiV += sudu;
                            _this.Anima_Box.getChildByName("界面").getChildByName("盈利").value = yinliV;
                            _this.Anima_Box.getChildByName("界面").getChildByName("金币").value = jinbiV;

                        }
                        else{
                              clearInterval(yinglitimer);
          
                        }
                }, 32);
                
            });
        }

        //屏幕移动
        if (_this.Anima_Box.getChildByName("Map").x - 20 >= -1344 * 7 - 680 && _this.Anima_Box.getChildByName("Map").y - 10 > -1501) {
           
            if (_this.Anima_Box.getChildByName("Map").x - max2.speed < -1344 * numMap ) {
               // console.log(numMap + 2,"true");
                _this.Anima_Box.getChildByName("Map").getChildByName("地图").getChildByName("" + (numMap + 2)).visible = true;
                if( _this.Anima_Box.getChildByName("Map").getChildByName("地图").getChildByName("" + (numMap ))!=null)
                {
                    _this.Anima_Box.getChildByName("Map").getChildByName("地图").getChildByName("" + (numMap )).visible = false;
                //     console.log(numMap ,"false");
                }
                  
                numMap++;
            }


            _this.Anima_Box.getChildByName("Map").x -= max2.speed;

        }

        else if (_this.Anima_Box.getChildByName("Map").y > -1501) {

            _this.Anima_Box.getChildByName("Map").y -= 6;

            if (max2.y + _this.Anima_Box.getChildByName("Map").y > 350) {

                _this.Anima_Box.getChildByName("Map").y -= 6;
            }

        }

        else if (_this.Anima_Box.getChildByName("Map").x + max2.speed <= 0) {
            //     if( _this.Anima_Box.getChildByName("Map").getChildByName("horse"+champ).x<-(_this.Anima_Box.getChildByName("Map").x-800))
            //     _this.Anima_Box.getChildByName("Map").x += _this.Anima_Box.getChildByName("Map").getChildByName("horse"+champ).speed;
            //     else
            //     _this.Anima_Box.getChildByName("Map").x += max[5];
            _this.Anima_Box.getChildByName("Map").x += max2.speed;
            if (max2.x < -(_this.Anima_Box.getChildByName("Map").x - 50))
                _this.Anima_Box.getChildByName("Map").x += max2.speed;
            // console.log(_this.Anima_Box.getChildByName("Map").getChildByName("horse1").speed, "1")
  
            
             if (_this.Anima_Box.getChildByName("Map").x + max2.speed > -1344 * numMap2) {
               // console.log((7+(7-numMap2) + 2),"true");
                _this.Anima_Box.getChildByName("Map").getChildByName("地图").getChildByName("" + (7+(7-numMap2) + 2)).visible = true;
                 _this.Anima_Box.getChildByName("Map").getChildByName("地图").getChildByName("" + ((7+(7-numMap2) ) )).visible = false;
                 //    console.log((7+(7-numMap2) ) ,"false");
            
                  
                numMap2--;
            }



        }
    }

    return Ainimation;
})(ui.AnimationUI);