var app = require('express')();//基础依赖

var http = require('http').Server(app);

var io = require('socket.io')(http);

var mysql = require('mysql');

var _ = require('underscore');


// var c = require('./peizhi_node.js');

// app.get('/', function (req, res) {

//     res.send('<h1>Welcome Realtime Server</h1>');

// });



//数据库配置

var host = "110.242.68.4";

var user = "shujukuyonghu";

var password = "shujukumima";

var database = "shujukuming";



var options = {

  host: host,

  user: user,

  password: password,

  database: database

};

//房间数组
var roomArr = new Array;
//游戏时间
var t = new Array;
var arr2 = [];
var shijian = 50;
var iconArr = [, , , ,];
//开奖记录
var kaijiangRec = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
//房间下注数组
var zhushuarr = [[0, 3], [0, 4], [0, 5], [0, 8], [0, 10], [0, 20], [0, 30], [0, 60], [0, 80], [0, 100], [0, 125], [0, 175], [0, 250], [0, 500], [0, 1000]];
//赔率数组
var Odos = [];
var jia = 0;
io.on('connection', function (socket) {

  var donghuaArr = [30];



  //自己房间的数组
  var OneRoomArr = new Array;
  //自己房间号
  var roomid = 0;
  console.log(socket.id);
  socket.on("心跳测试", function () {
    socket.emit("心跳测试");
  })

  socket.on("加入游戏", function () {
    //向客户端发送自己的id
    socket.emit('uid', { sid: socket.id });
  })
  //添加房间分组
  socket.on('roomid', function (data) {
    // console.log(data, "用户数据");
    if (OneRoomArr.length == 0) {

      roomid = data.roomid;
      if (roomArr[roomid]) {
        OneRoomArr = roomArr[data.roomid].OneRoomArr;
      } else {
        roomArr[data.roomid] = { OneRoomArr: OneRoomArr, timenum: shijian, xiazhuzong: 0, jieduan: "下注", renshu: 1000, Champ: 0, };

        OneRoomArr = roomArr[data.roomid].OneRoomArr;

        shuffle(zhushuarr);
        roomArr[roomid].qishu = Date.parse(new Date()) / 1000;

        var conn = mysql.createConnection(options);

        var sql_cou = 'INSERT INTO room(room_no,rule,status,create_time) VALUES ("' + roomArr[roomid].qishu + '","' + zhushuarr + '","' + 1 + '","' + roomArr[roomid].qishu + '")';
        conn.query(sql_cou, function (ers, res) {
          if (ers) {

             console.log('[INSERT ERROR] - ', ers.message, "增添期号错误");

            return;
            console.log(111111111111);
          }

          t[roomid] = setInterval(timefun, 1000);
          // console.log("创建房间", "期号:", roomArr[roomid].qishu);
        })
        conn.end();
      }

      //加入房间分组
      socket.join(roomid);
      socket.join(socket.id);
      //接收玩家是否在游戏



      var is_zai = false;
      if (OneRoomArr.length > 0) {
        //判断当前账号是否已经在游戏中
        for (var i = 0; i < OneRoomArr.length; i++) {
          if (data.id == OneRoomArr[i].id) {
            OneRoomArr[i].sid = socket.id;
            OneRoomArr[i].li = false;
            roomArr[roomid].renshu = Math.floor(Math.random() * 500) + 500 + OneRoomArr.length;
            io.to(OneRoomArr[i].sid).emit('用户信息', [OneRoomArr[i].zhushuarr, roomArr[roomid].OneRoomArr[i].xianum, roomArr[roomid].OneRoomArr[i].jinbi]);

            io.sockets.in(roomid).emit('房间信息', [roomArr[roomid].timenum, roomArr[roomid].renshu, Number(roomArr[roomid].xiazhuzong + jia), Odos, roomArr[roomid].jieduan, kaijiangRec, arr2, iconArr]);
            let rOdos = Odos;

            is_zai = true;
            return;
          }
        }
      }

      if (!is_zai) {
        iconArr.splice(0, 1);
        iconArr.push(data.icon);
        console.log(data.icon);
        data.zhushuarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        data.yingli = 0;
        data.xianum = 0;
        // console.log(data);
        // 添加到自己房间
        var conn = mysql.createConnection(options);
        var sql_cou = "SELECT first_id,second_id,third_id,fourth_id,fifth_id FROM member WHERE id=" + data.id;
        conn.query(sql_cou, function (ers, res) {
           console.log(res, "上级数据")
          data.shangidarr = [res[0].first_id, res[0].second_id, res[0].third_id, res[0].fourth_id, res[0].fifth_id];
          var conn = mysql.createConnection(options);
          var sql_cou = "SELECT per_first,per_second,per_third,per_fourth,per_fifth FROM platform WHERE id=1";
          conn.query(sql_cou, function (ers, res) {
            // console.log(res, "上级数据")
            data.shangnumberarr = [res[0].per_first, res[0].per_second, res[0].per_third, res[0].per_fourth, res[0].per_fifth];
            OneRoomArr.push(data);
            //进入房间自动准备
            io.to(data.sid).emit('用户信息', [data.zhushuarr, data.xianum, data.jinbi]);

            roomArr[roomid].renshu = Math.floor(Math.random() * 500) + 500 + OneRoomArr.length;
            io.sockets.in(roomid).emit('房间信息', [roomArr[roomid].timenum, roomArr[roomid].renshu, Number(roomArr[roomid].xiazhuzong + jia), Odos, roomArr[roomid].jieduan, kaijiangRec, arr2, iconArr]);
          })
          conn.end();
        })
        conn.end();

      }
    }
  });

  function timefun() {
    let random = Math.random() * 100;
    if (random < 70 && roomArr[roomid].jieduan == "下注") {
      var randnum = Math.floor(Math.random()*5)
      jia += randnum==0?10:randnum==1?20:randnum==2?30:randnum==3?40:50;
      console.log(jia);
      io.sockets.in(roomid).emit('房间信息', [roomArr[roomid].timenum, roomArr[roomid].renshu, Number(roomArr[roomid].xiazhuzong + jia), Odos, roomArr[roomid].jieduan, kaijiangRec, arr2, iconArr]);
    }

    roomArr[roomid].timenum--;
    // console.log(roomArr[roomid].timenum, "倒计时");
    if (roomArr[roomid].timenum <= 0) {
      if (roomArr[roomid].jieduan == "下注") {
        io.sockets.in(roomid).emit('弹窗', "投注结束");
         roomArr[roomid].jieduan = "等待";
        setTimeout(function () {
          clearInterval(t[roomid]);
          var conn = mysql.createConnection(options);
          var sql_cou = "SELECT min,max,bkz FROM platform WHERE id=1";
          conn.query(sql_cou, function (ers, res) {
            console.log(res, "开奖概率");
            if (ers) {
              console.log('[INSERT ERROR] - ', ers.message, "增添期号错误");
              return;
            }
            kaijiangfun(res[0].min, res[0].max, res[0].bkz);
            // console.log("开奖阶段")

          });
          conn.end();
        }, 3000);
      }
      else if (roomArr[roomid].jieduan == "开奖") {
        for (var i = 0; i < OneRoomArr.length; i++) {
          OneRoomArr[i].zhushuarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        clearInterval(t[roomid]);
        roomArr[roomid].jieduan = "下注";
        roomArr[roomid].timenum = shijian;
        t[roomid] = setInterval(timefun, 1000);
        // console.log("下注阶段")
        xiazhufun();
        roomArr[roomid].qishu = Date.parse(new Date()) / 1000;
        var conn = mysql.createConnection(options);
        var sql_cou = 'INSERT INTO room(room_no,rule,status,create_time) VALUES ("' + roomArr[roomid].qishu + '","' + zhushuarr + '","' + 1 + '","' + roomArr[roomid].qishu + '")';
        conn.query(sql_cou, function (ers, res) {
          if (ers) {
            // console.log('[INSERT ERROR] - ', ers.message, "增添期号错误");
            return;
          }
          // console.log("添加期号:", roomArr[roomid].qishu);
        })
        conn.end();
      }
    }
  }


  function kaijiangfun(Rmax, Rmin, Rbkz) {
    //开奖号码
    console.log(Rmax, Rmin, Rbkz);
    var Max = 0;
    var shuaidao = parseInt(Math.random() * 100);

    for (var i = 0; i < 30; i++) {
      donghuaArr[i] = 20 - (Math.random() * 6);
    }
    if (roomArr[roomid].xiazhuzong == 0) {
            let bkzArr = [];
        for (var i = 0; i < 15; i++) {
          if (zhushuarr[i][1] <=30)
            bkzArr.push(i);
        }
        Max = bkzArr[parseInt(Math.random() * 7)];
   
    }
    else {
      let kaijiangR = Math.random() * (Rmax + Rmin + Rbkz);
      console.log(kaijiangR);
      var youyazhuarr = [];
      var meixiazhuarr = [];
      var zuixiaoarr = [];
      var allarr = [];
      for (var i = 0; i < 15; i++) {
        if (zhushuarr[i][0] > 0 && zhushuarr[i][0] * zhushuarr[i][1] <= roomArr[roomid].xiazhuzong) {
          youyazhuarr.push({
            num: zhushuarr[i],
            index: i,
            peichu: zhushuarr[i][0] * zhushuarr[i][1]
          });
        }
        if (zhushuarr[i][0] == 0) {
          meixiazhuarr.push({
            num: zhushuarr[i],
            index: i,
            peichu: zhushuarr[i][0] * zhushuarr[i][1]
          })
        }
        allarr.push({
          num: zhushuarr[i],
          index: i,
          peichu: zhushuarr[i][0] * zhushuarr[i][1]
        })
      }
      youyazhuarr.sort(function (a, b) {
        return b.peichu - a.yingli
      });
      allarr.sort(function (a, b) {
        return b.peichu - a.yingli
      });
      if (kaijiangR <= Rmin)
        if (youyazhuarr.length > 0) {
          Max = youyazhuarr[0].index;
        } else {
          if (meixiazhuarr.length > 0) {
            var randnum = Math.floor(Math.random() * meixiazhuarr.length)
            Max = meixiazhuarr[randnum].index;
          } else {
            Max = allarr[allarr.length - 1].index;
          }
        }
      else if (kaijiangR > Rmin && (kaijiangR <= Rmin + Rmax)) {
        if (youyazhuarr.length > 0) {
          Max = youyazhuarr[youyazhuarr.length - 1].index;
        } else {
          if (meixiazhuarr.length > 0) {
            var randnum = Math.floor(Math.random() * meixiazhuarr.length)
            Max = meixiazhuarr[randnum].index;
          } else {
            Max = allarr[allarr.length - 1].index;
          }
        }
      }
      else if (kaijiangR > Rmin + Rmax && (kaijiangR < Rmin + Rmax + Rbkz)) {
        let bkzArr = [];
        for (var i = 0; i < 15; i++) {
          if (zhushuarr[i][1] <=10)
            bkzArr.push(i);
        }
        Max = bkzArr[parseInt(Math.random() * 5)];
      }
    }
    kaijiangRec.shift();
    let arr = [Max, zhushuarr[Max][1]];

    kaijiangRec.push(arr);
    // console.log(kaijiangRec);
    roomArr[roomid].Champ = Max;



    io.sockets.in(roomid).emit('开奖动画', [roomArr[roomid].Champ, donghuaArr, shuaidao, zhushuarr[Max][1]], );

    var CurMax = Max;
    var CurQihao = roomArr[roomid].qishu;
    var conn = mysql.createConnection(options);
    var sql_cou2 = "UPDATE room SET status = 2,right_choose =" + CurMax + " WHERE room_no =" + CurQihao;
    conn.query(sql_cou2, function (ers, res) {
      if (ers) {
        // console.log('[INSERT ERROR] - ', ers.message, "更换期号", sql_cou2);
        return;
      }
      // console.log("更换期号");
    })
    conn.end();

    for (let i = 0; i < OneRoomArr.length; i++) {
      OneRoomArr[i].yingli = OneRoomArr[i].zhushuarr[Max] * zhushuarr[Max][1];
      OneRoomArr[i].jinbi += OneRoomArr[i].yingli;
      io.to(OneRoomArr[i].sid).emit('盈利', OneRoomArr[i].yingli);
      console.log(OneRoomArr[i].sid, "盈利")
      let User = OneRoomArr[i];
      var conn = mysql.createConnection(options);

      var sql_cou = " UPDATE member SET balance = balance +" + OneRoomArr[i].yingli * 100 + " WHERE id =" + OneRoomArr[i].id;
      conn.query(sql_cou, function (ers, res) {
        // console.log(sql_cou, res, "打印")
        if (ers) {
          // console.log('[INSERT ERROR] - ', ers.message);
          return;
        }
        // console.log('添加金币', 10000, User.id, res, ers);
      })
      conn.end();

      arr2.push({ yingli: OneRoomArr[i].yingli, ODOS: zhushuarr[Max][1], name: OneRoomArr[i].id })
      for (let n = 0; n < 15; n++) {
        if (OneRoomArr[i].zhushuarr[n] != 0)
          shangjifun(OneRoomArr[i], roomArr[roomid].qishu, n, Max);
      }
      // shangjifun2(OneRoomArr[i]);
    }

    arr2.sort(function (a, b) {
      return b.yingli - a.yingli
    });
    io.sockets.in(roomid).emit('房间信息', [roomArr[roomid].timenum, roomArr[roomid].renshu, Number(roomArr[roomid].xiazhuzong + jia), Odos, roomArr[roomid].jieduan, kaijiangRec, arr2, iconArr]);
    roomArr[roomid].jieduan = "开奖";
    roomArr[roomid].timenum = shijian;
    t[roomid] = setInterval(timefun, 1000);
  }

  function xiazhufun() {
    jia = 0;
    for (var i = 0; i < OneRoomArr.length; i++) {
      if (OneRoomArr[i].xianum <= 0 && OneRoomArr[i].li == true) {
        console.log("清理离线用户", OneRoomArr[i].sid);
        OneRoomArr.splice(i, 1);
        io.sockets.in(roomid).emit('房间信息', [roomArr[roomid].timenum, roomArr[roomid].renshu, Number(roomArr[roomid].xiazhuzong + jia), Odos, roomArr[roomid].jieduan, kaijiangRec, arr2, iconArr]);

      }
    }
    io.sockets.in(roomid).emit('下注开始', [roomArr[roomid].timenum, roomArr[roomid].renshu]);
    zhushuarr = [[0, 3], [0, 4], [0, 5], [0, 8], [0, 10], [0, 20], [0, 30], [0, 60], [0, 80], [0, 100], [0, 125], [0, 175], [0, 250], [0, 500], [0, 1000]];
    shuffle(zhushuarr);
    roomArr[roomid].xiazhuzong = 0;

    for (var i = 0; i < OneRoomArr.length; i++) {
      OneRoomArr[i].yingli = 0;
      OneRoomArr[i].zhushuarr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      OneRoomArr[i].xianum = 0;
      io.to(OneRoomArr[i].sid).emit('下注更新', [OneRoomArr[i].zhushuarr, roomArr[roomid].OneRoomArr[i].xianum, roomArr[roomid].OneRoomArr[i].jinbi]);
      console.log(OneRoomArr[i].sid, "下注更新")

    }

    io.sockets.in(roomid).emit('房间信息', [roomArr[roomid].timenum, roomArr[roomid].renshu, Number(roomArr[roomid].xiazhuzong + jia), Odos, roomArr[roomid].jieduan, kaijiangRec, arr2, iconArr]);
    // console.log("下注开始");

  }

  function shangjifun(data1, data2, data3, data4) {
    var conn = mysql.createConnection(options);
    var Res = data3 == data4 ? 2 : 1;
    var Winn = Res == 2 ? data1.yingli : 0;
    var sql_cou = 'INSERT INTO member_log(m_id, room_no, spend_num,  create_time, first_id,first_num, second_id, second_num, third_id, third_num, fourth_id, fourth_num,fifth_id, fifth_num, choose,status,num,right_choose) VALUES("' + data1.id + '","' + data2 + '","' + data1.zhushuarr[data3] * 100 + '","' + data2 + '","' + data1.shangidarr[0] + '","' + data1.shangnumberarr[0] * data1.zhushuarr[data3] + '","' + data1.shangidarr[1] + '","' + data1.shangnumberarr[1] * data1.zhushuarr[data3] + '","' + data1.shangidarr[2] + '","' + data1.shangnumberarr[2] * data1.zhushuarr[data3] + '","' + data1.shangidarr[3] + '","' + data1.shangnumberarr[3] * data1.zhushuarr[data3] + '","' + data1.shangidarr[4] + '","' + data1.shangnumberarr[4] * data1.zhushuarr[data3] + '","' + data3 + '","' + Res + '","' + Winn*100 + '","' + data4 + '")';
    conn.query(sql_cou, function (ers, res) {
      if (ers) {

        // console.log('[INSERT ERROR] - ', ers.message, "下注记录");

      }
      //console.log(res,"下注记录",sql_cou,"==============",data1.shangnumberarr[0]);
    })
    conn.end();


  }
  // function shangjifun2(data1) {

  //   var conn = mysql.createConnection(options);
  //   for (var i = 0; i < data1.shangidarr.length; i++) {
  //     if (data1.shangidarr[i] != 0) {
  //       var sql_cou = "UPDATE member SET balance = balance + " + data1.shangnumberarr[i] * data1.xianum * 100 + " WHERE id = " + data1.shangidarr[i];
  //       conn.query(sql_cou, function (ers, res) {
  //         if (ers) {

  // console.log('[INSERT ERROR] - ', ers.message);

  //           return;

  //         }
  //       });
  //     }
  //   }
  //   conn.end();
  // }
  socket.on("下注", function (data) {
    // console.log(roomArr[roomid], "下注")
    var xiazhunum=1;
    if (roomArr[roomid].jieduan == "下注") {
      if (data.sid == socket.id) {
        var conn = mysql.createConnection(options);
        for (var i = 0; i < OneRoomArr.length; i++) {
          if (data.sid == OneRoomArr[i].sid) {
            var userArr = OneRoomArr[i];
            var conn = mysql.createConnection(options);
            var sql_cou = "SELECT balance FROM member WHERE id=" + userArr.id;
            conn.query(sql_cou, function (ers, res) {
              console.log(res, "上级数据")
              userArr.jinbi = res[0].balance / 100;
              if (userArr.jinbi >= xiazhunum ) {
                var conn = mysql.createConnection(options);
                var find_uid = "UPDATE member SET balance = balance - " + xiazhunum*100 + " WHERE id = " + userArr.id + " and balance >= " + xiazhunum*100 + "";
                conn.query(find_uid, function (err, result) {
                  if (err) {
                    // console.log('[INSERT ERROR] - ', err.message);
                    return;
                  }
                  userArr.jinbi -= xiazhunum;
                  userArr.xianum += xiazhunum;
                  userArr.zhushuarr[data.index] += xiazhunum;
                  zhushuarr[data.index][0] += xiazhunum;
                  roomArr[roomid].xiazhuzong += xiazhunum;
                  io.to(data.sid).emit('下注更新', [userArr.zhushuarr, userArr.xianum, userArr.jinbi]);

                  io.sockets.in(roomid).emit('房间信息', [roomArr[roomid].timenum, roomArr[roomid].renshu, Number(roomArr[roomid].xiazhuzong + jia), Odos, roomArr[roomid].jieduan, kaijiangRec, arr2, iconArr]);
                  // console.log("+++++++++", roomArr[roomid], userArr, "+++++++++");
                });
                var userGetSql = " WHERE id = ";
                conn.end();
              }
              else if (userArr.jinbi < xiazhunum) {
                io.to(data.sid).emit('弹窗', "金币不足");

              }
            })
            conn.end();
          }
        }
      }
    }
    else if( roomArr[roomid].jieduan =="开奖") {
      io.to(data.sid).emit('弹窗', "请等待上局结束");

    }
  })

  //监听用户是否离线
  socket.on('disconnect', function () {
    //房间没人
    console.log("用户离线");
    for (var i = 0; i < OneRoomArr.length; i++) {
      if (socket.id == OneRoomArr[i].sid) {
        OneRoomArr[i].li = true;
      }

    }


  });
});

function shuffle(arr) {

  let i = arr.length;
  Odos = [];
  while (i) {

    let j = Math.floor(Math.random() * i--);

    [arr[j], arr[i]] = [arr[i], arr[j]];
    Odos.push(arr[i][1]);
  }
}
process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});

http.listen(3459, function () {
  console.log('listening on *:3459');
});







