var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;
var progressBar;
var Stat = Laya.Stat;
var vw = $(window).width();//游戏界面的宽
var vh = $(window).height();//游戏界面的高
var loadValue=true;
// console.log(vw, wh)
(function () {
    (function (LayaSample) {
        B = Laya.Browser;
        Laya.MiniAdpter.init();
        Laya.init(1344, 750, Laya.WebGL);
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        // Laya.stage.scaleMode = Laya.Stage.SCALE_NOBORDER;//裁剪
        // Laya.stage.scaleMode = Laya.Stage.SCALE_NOBORDER;//适应高
        // Laya.stage.scaleMode = Laya.Stage.SCALE_NOBORDER;//适应高
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_EXACTFIT;//裁剪

        // Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        // Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;

        Laya.stage.bgColor = "#000";
        //预加载loading条资源
        var proArr = [{ url: "res/progress_time.png" },
        { url: "res/progress_time$bar.png" },

        ];
        px = Laya.Browser.clientWidth;
        py = Laya.Browser.clientHeight;



        Laya.loader.load(proArr, Laya.Handler.create(this, onProLoaded), null, Laya.Loader.ATLAS);
        // Stat.show(0,0);
    })();
})(window.LayaSample || (window.LayaSample = {}));
function onProLoaded() {


    // 将进度条显示到舞台
    showProgress();

    //开始预加载游戏资源
   
    var arr = new Array;
    arr = [
          { url: "res/atlas/切图.png" },
         { url: "res/atlas/切图.atlas" },
 
    ];

    //设置progress Handler的第4个参数为true，根据加载文件个数获取加载进度
    Laya.loader.load(arr, null, Laya.Handler.create(this, onProgress, null, false));
}
// 将进度条显示到舞台
function showProgress() {
    LogoLayer = new Laya.Sprite();
    Laya.stage.addChild(LogoLayer);
    progressBar = new Laya.ProgressBar("res/progress_time.png");
    progressBar.width = 500;
    progressBar.height = 36;
    progressBar.pos(340, 600);
    progressBar.sizeGrid = "5,5,5,5";
    //当progressBar的value值改变时触发
    progressBar.changeHandler = new Laya.Handler(this, onChange);
    LogoLayer.addChild(progressBar);
}
function onChange(value) {
    console.log("进度: "+Math.floor(value*100)+"%",value);
    if (value >= 1) {
        console.log("1gysgf")
        progressBar.value = 1;
        console.log("加载完成");
        LogoLayer.visible = false;
        onAssetLoaded();
    }
}
//游戏资源加载进度函数
function onProgress(pro) {
     console.log("加载了总文件的:"+Math.floor(pro*100)+"%");
    progressBar.value = Math.floor(pro * 100) / 100;
}

function onAssetLoaded() {
    var game = new Game();
    Laya.stage.addChild(game);
}


