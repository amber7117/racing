var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var AnimationUI=(function(_super){
		function AnimationUI(){
			
		    this.Anima_Box=null;

			AnimationUI.__super.call(this);
		}

		CLASS$(AnimationUI,'ui.AnimationUI',_super);
		var __proto__=AnimationUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(AnimationUI.uiView);

		}

		AnimationUI.uiView={"type":"View","props":{"width":1344,"height":750},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"Anima_Box","hitTestPrior":true},"child":[{"type":"Box","props":{"y":-20,"x":3,"visible":true,"name":"Map"},"child":[{"type":"Sprite","props":{"y":0,"x":0,"visible":true,"name":"地图","mouseEnabled":true},"child":[{"type":"Image","props":{"y":0,"x":0,"visible":true,"skin":"comp/jiesuanyemian/donghuapaodao/yemian02@2x.png","name":"1","mouseEnabled":true},"child":[{"type":"Image","props":{"y":527,"x":405,"skin":"comp/jiesuanyemian/donghuapaodao/zhihui@2x.png"}}]},{"type":"Image","props":{"y":0,"x":1344,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian01@2x.png","pivotY":0,"name":"2","mouseEnabled":true},"child":[{"type":"Image","props":{"y":628,"x":13,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":0,"x":2688,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian01@2x.png","pivotY":0,"name":"3","mouseEnabled":true},"child":[{"type":"Image","props":{"y":628,"x":13,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":0,"x":4032,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian01@2x.png","name":"4","mouseEnabled":true},"child":[{"type":"Image","props":{"y":629,"x":87,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":0,"x":5376,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian01@2x.png","name":"5","mouseEnabled":true},"child":[{"type":"Image","props":{"y":637,"x":45,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":0,"x":6720,"width":1344,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian01@2x.png","name":"6","mouseEnabled":true,"height":750},"child":[{"type":"Image","props":{"y":639,"x":25,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":0,"x":8064,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian01@2x.png","name":"7","mouseEnabled":true},"child":[{"type":"Image","props":{"y":622,"x":36,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":0,"x":9408,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/wandao@2x.png","name":"8","mouseEnabled":true}},{"type":"Image","props":{"y":1501,"x":8064,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian01@2x.png","name":"9","mouseEnabled":true},"child":[{"type":"Image","props":{"y":621,"x":45,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":1501,"x":6720,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian01@2x.png","name":"10","mouseEnabled":true},"child":[{"type":"Image","props":{"y":620,"x":15,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":1501,"x":5376,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian01@2x.png","name":"11","mouseEnabled":true},"child":[{"type":"Image","props":{"y":617,"x":40,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":1501,"x":4032,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian01@2x.png","name":"12","mouseEnabled":true},"child":[{"type":"Image","props":{"y":616,"x":39,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":1501,"x":2688,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian01@2x.png","name":"13","mouseEnabled":true},"child":[{"type":"Image","props":{"y":618,"x":21,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":1501,"x":1344,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian02@2x.png","name":"14","mouseEnabled":true},"child":[{"type":"Image","props":{"y":7,"x":1088,"skin":"comp/jiesuanyemian/donghuapaodao/paizi@2x.png"}},{"type":"Image","props":{"y":610,"x":28,"skin":"comp/jiesuanyemian/donghuapaodao/caocong-xia@2x.png"}}]},{"type":"Image","props":{"y":1501,"x":0,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian02@2x.png","name":"15","mouseEnabled":true},"child":[{"type":"Image","props":{"y":-15,"x":198,"skin":"comp/jiesuanyemian/donghuapaodao/zhongdiangan@2x.png"}}]},{"type":"Image","props":{"y":1502,"x":-1344,"visible":false,"skin":"comp/jiesuanyemian/donghuapaodao/yemian02@2x.png","name":"16","mouseEnabled":true}}]},{"type":"Animation","props":{"y":103,"x":-67,"width":366,"source":"horse6.ani","name":"horse6","interval":200,"index":1,"height":215,"autoPlay":true,"autoAnimation":"zou"}},{"type":"Animation","props":{"y":162,"x":-86,"width":366,"source":"horse5.ani","name":"horse5","interval":200,"index":3,"height":215,"autoPlay":true,"autoAnimation":"zou"}},{"type":"Animation","props":{"y":214,"x":-233,"width":366,"source":"horse4.ani","name":"horse4","interval":200,"index":0,"height":215,"autoPlay":true,"autoAnimation":"zou"}},{"type":"Animation","props":{"y":282,"x":-216,"width":366,"source":"horse3.ani","name":"horse3","interval":200,"index":2,"height":215,"autoPlay":true,"autoAnimation":"zou"}},{"type":"Animation","props":{"y":333,"x":-368,"width":366,"source":"horse2.ani","name":"horse2","interval":200,"index":3,"height":215,"autoPlay":true,"autoAnimation":"zou"}},{"type":"Animation","props":{"y":385,"x":-324,"width":366,"source":"horse1.ani","name":"horse1","interval":200,"index":2,"height":215,"autoPlay":true,"autoAnimation":"zou"}},{"type":"Image","props":{"y":-21,"x":51,"skin":"comp/jiesuanyemian/donghuapaodao/chufa@2x.png"}}]},{"type":"Box","props":{"y":1,"x":0,"width":855,"name":"界面","height":751},"child":[{"type":"Rect","props":{"y":694,"x":0,"width":1344,"lineWidth":1,"lineColor":"#1e0404","height":56,"fillColor":"#030000"}},{"type":"Image","props":{"y":705,"x":61,"skin":"comp/jiesuanyemian/donghuapaodao/盈利@2x.png"}},{"type":"Image","props":{"y":700,"x":782,"skin":"comp/jiesuanyemian/donghuapaodao/jinbi拷贝@2x.png"}},{"type":"FontClip","props":{"y":710,"x":849,"value":"0","skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","name":"金币","align":"left"}},{"type":"FontClip","props":{"y":710,"x":169,"value":"0","skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","name":"盈利","align":"left"}}]},{"type":"Image","props":{"y":0,"x":1000,"visible":false,"skin":"comp/jiesuanyemian/组77@2x.png","name":"摔倒"},"child":[{"type":"FontClip","props":{"y":23,"x":37,"value":"6","skin":"comp/jiesuanyemian/ziwhite.png","sheet":"0123456789","name":"摔倒"}}]},{"type":"FontClip","props":{"y":202,"x":126,"width":432,"visible":false,"value":"3-5 ","skin":"comp/jiesuanyemian/shenglishuzi/1@2x_2.png","sheet":"123456-","scaleY":1.5,"scaleX":1.5,"name":"champ","height":156,"align":"left"}},{"type":"FontClip","props":{"y":443,"x":704,"width":550,"visible":false,"value":"3","skin":"comp/jiesuanyemian/shenglishuzi/aac582dbf9463282ce9fed027c46f6f.png","sheet":"0123456789","scaleY":0.8,"scaleX":0.8,"pivotY":0,"pivotX":275,"name":"Odos","height":130,"align":"right"},"child":[{"type":"Image","props":{"y":0,"x":542,"skin":"comp/jiesuanyemian/shenglishuzi/7911973311cfe89c8ffcfe4421d695b.png"}}]}]}]};
		return AnimationUI;
	})(View);
var datingUI=(function(_super){
		function datingUI(){
			

			datingUI.__super.call(this);
		}

		CLASS$(datingUI,'ui.datingUI',_super);
		var __proto__=datingUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(datingUI.uiView);

		}

		datingUI.uiView={"type":"View","props":{"width":1344,"height":750},"child":[{"type":"Box","props":{}}]};
		return datingUI;
	})(View);
var GameUI=(function(_super){
		function GameUI(){
			
		    this.Bet_Box=null;
		    this.ListRec=null;
		    this.Rank=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    			View.regComponent("Text",laya.display.Text);

			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":1344,"visible":true,"height":750},"child":[{"type":"Box","props":{"y":750,"x":0,"width":1344,"visible":true,"var":"Bet_Box","pivotY":750,"pivotX":0,"height":750},"child":[{"type":"Image","props":{"skin":"comp/jiesuanyemian/bj@2x.png","name":"BG"},"child":[{"type":"Sprite","props":{"y":318,"x":105,"width":171,"name":"16","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":318,"x":273,"width":171,"name":"15","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":318,"x":441,"width":171,"name":"14","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":318,"x":609,"width":171,"name":"13","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":318,"x":772,"width":171,"name":"12","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":80,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":102,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":383,"x":105,"width":171,"name":"26","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":383,"x":273,"width":171,"name":"25","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":383,"x":441,"width":171,"name":"24","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":387,"x":609,"width":171,"name":"23","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":449,"x":105,"width":171,"name":"36","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":449,"x":273,"width":171,"name":"35","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":449,"x":441,"width":171,"name":"34","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":512,"x":105,"width":171,"name":"46","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":512,"x":273,"width":171,"name":"45","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":579,"x":105,"width":171,"name":"56","height":68},"child":[{"type":"FontClip","props":{"y":3,"x":75,"width":171,"value":"124","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotY":0,"pivotX":85.5,"name":"ODOS","height":35,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":35,"x":99,"width":151,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zirad.png","sheet":"0123456789","scaleY":1.1,"scaleX":1.1,"pivotX":85.5,"name":"BET","height":28,"direction":"horizontal","align":"right"}}]},{"type":"Sprite","props":{"y":258,"x":973,"width":329,"name":"Record","height":401},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":318,"name":"5","height":60},"child":[{"type":"FontClip","props":{"y":5,"x":28,"width":295,"value":"3-6","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zifuwhite.png","sheet":"0123456789/-","scaleY":1,"scaleX":1,"name":"编号","height":49,"direction":"horizontal","align":"left"}},{"type":"FontClip","props":{"y":5,"x":140,"width":124,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.5,"scaleX":1.5,"name":"倍数","height":36,"direction":"horizontal","align":"center"}}]},{"type":"Sprite","props":{"y":80,"x":0,"width":318,"name":"4","height":60},"child":[{"type":"FontClip","props":{"y":5,"x":28,"width":295,"value":"3-6","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zifuwhite.png","sheet":"0123456789/-","scaleY":1,"scaleX":1,"name":"编号","height":49,"direction":"horizontal","align":"left"}},{"type":"FontClip","props":{"y":5,"x":140,"width":124,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.5,"scaleX":1.5,"name":"倍数","height":36,"direction":"horizontal","align":"center"}}]},{"type":"Sprite","props":{"y":160,"x":0,"width":318,"name":"3","height":60},"child":[{"type":"FontClip","props":{"y":5,"x":28,"width":295,"value":"3-6","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zifuwhite.png","sheet":"0123456789/-","scaleY":1,"scaleX":1,"name":"编号","height":49,"direction":"horizontal","align":"left"}},{"type":"FontClip","props":{"y":5,"x":140,"width":124,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.5,"scaleX":1.5,"name":"倍数","height":36,"direction":"horizontal","align":"center"}}]},{"type":"Sprite","props":{"y":240,"x":0,"width":318,"name":"2","height":60},"child":[{"type":"FontClip","props":{"y":5,"x":28,"width":295,"value":"3-6","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zifuwhite.png","sheet":"0123456789/-","scaleY":1,"scaleX":1,"name":"编号","height":49,"direction":"horizontal","align":"left"}},{"type":"FontClip","props":{"y":5,"x":140,"width":124,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.5,"scaleX":1.5,"name":"倍数","height":36,"direction":"horizontal","align":"center"}}]},{"type":"Sprite","props":{"y":320,"x":0,"width":318,"name":"1","height":60},"child":[{"type":"FontClip","props":{"y":5,"x":28,"width":295,"value":"3-6","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zifuwhite.png","sheet":"0123456789/-","scaleY":1,"scaleX":1,"name":"编号","height":49,"direction":"horizontal","align":"left"}},{"type":"FontClip","props":{"y":5,"x":140,"width":124,"value":"0","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.5,"scaleX":1.5,"name":"倍数","height":36,"direction":"horizontal","align":"center"}}]}]},{"type":"Clip","props":{"y":-8,"x":1000,"skin":"comp/jiesuanyemian/donghuapaodao/6号马@2x.png","name":"horse6","interval":300,"index":1,"clipY":1,"clipX":4,"clipWidth":364,"clipHeight":220,"autoPlay":true}},{"type":"Clip","props":{"y":-8,"x":500,"skin":"comp/jiesuanyemian/donghuapaodao/5号马@2x.png","name":"horse5","interval":300,"index":3,"clipY":1,"clipX":4,"clipWidth":364,"clipHeight":220,"autoPlay":true}},{"type":"Clip","props":{"y":-8,"x":0,"skin":"comp/jiesuanyemian/donghuapaodao/4号马@2x.png","name":"horse4","interval":300,"index":2,"clipY":1,"clipX":4,"clipWidth":364,"clipHeight":220,"autoPlay":true}},{"type":"Clip","props":{"y":-8,"x":-500,"skin":"comp/jiesuanyemian/donghuapaodao/3号马@2x.png","name":"horse3","interval":300,"index":0,"clipY":1,"clipX":4,"clipWidth":364,"clipHeight":220,"autoPlay":true}},{"type":"Clip","props":{"y":-8,"x":-1000,"skin":"comp/jiesuanyemian/donghuapaodao/2号马@2x.png","name":"horse2","interval":300,"index":1,"clipY":1,"clipX":4,"clipWidth":364,"clipHeight":220,"autoPlay":true}},{"type":"Clip","props":{"y":-8,"x":-1500,"skin":"comp/jiesuanyemian/donghuapaodao/1号马@2x.png","name":"horse1","interval":300,"index":0,"clipY":1,"clipX":4,"clipWidth":364,"clipHeight":220,"autoPlay":true}}]},{"type":"Image","props":{"y":675,"x":1110,"skin":"comp/jiesuanyemian/chongzhi@2x.png","name":"充值"}},{"type":"Image","props":{"y":695,"x":22,"skin":"comp/jiesuanyemian/zaixian@2x.png","name":"在线"},"child":[{"type":"FontClip","props":{"y":4,"x":126,"width":295,"value":"1354645","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziwhite.png","sheet":"0123456789","scaleY":0.6,"scaleX":0.6,"name":"在线","height":49,"direction":"horizontal","align":"left"}},{"type":"Sprite","props":{"y":-3,"x":326,"width":53,"name":"MyIcon","height":53},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":95,"renderType":"mask","height":88},"child":[{"type":"Circle","props":{"y":26,"x":26,"radius":27,"lineWidth":1,"fillColor":"#ff0000"}}]},{"type":"Image","props":{"y":0,"x":0,"width":50,"name":"Icon","height":50}}]},{"type":"Sprite","props":{"y":-2,"x":394,"width":53,"name":"Icon2","height":53},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":95,"renderType":"mask","height":88},"child":[{"type":"Circle","props":{"y":26,"x":26,"radius":27,"lineWidth":1,"fillColor":"#ff0000"}}]},{"type":"Image","props":{"y":0,"x":0,"width":50,"name":"Icon","height":50}}]},{"type":"Sprite","props":{"y":-1,"x":459,"width":53,"name":"Icon3","height":53},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":95,"renderType":"mask","height":88},"child":[{"type":"Circle","props":{"y":26,"x":26,"radius":27,"lineWidth":1,"fillColor":"#ff0000"}}]},{"type":"Image","props":{"y":0,"x":0,"width":50,"name":"Icon","height":50}}]},{"type":"Sprite","props":{"y":-3,"x":523,"width":53,"name":"Icon4","height":53},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":95,"renderType":"mask","height":88},"child":[{"type":"Circle","props":{"y":26,"x":26,"radius":27,"lineWidth":1,"fillColor":"#ff0000"}}]},{"type":"Image","props":{"y":0,"x":0,"width":50,"name":"Icon","height":50}}]},{"type":"Image","props":{"y":-10,"x":319,"width":66,"skin":"comp/jiesuanyemian/icon.png","height":68}},{"type":"Image","props":{"y":-10,"x":515,"skin":"comp/jiesuanyemian/icon.png"}},{"type":"Image","props":{"y":-10,"x":450,"skin":"comp/jiesuanyemian/icon.png"}},{"type":"Image","props":{"y":-10,"x":385,"skin":"comp/jiesuanyemian/icon.png"}}]},{"type":"Image","props":{"y":597,"x":823,"skin":"comp/jiesuanyemian/zongtouzhu@2x.png","name":"总量"},"child":[{"type":"FontClip","props":{"y":40,"x":-29,"width":129,"value":"100","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zifuwhite.png","sheet":"0123456789/-","scaleY":0.5,"scaleX":0.5,"name":"自己","height":49,"direction":"horizontal","align":"right"}},{"type":"FontClip","props":{"y":40,"x":36,"width":136,"value":"/200","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/zifuwhite.png","sheet":"0123456789/-","scaleY":0.5,"scaleX":0.5,"name":"总量","height":55,"direction":"horizontal","align":"left"}}]},{"type":"Image","props":{"y":675,"x":795,"skin":"comp/jiesuanyemian/jinbi@2x.png","name":"金币"},"child":[{"type":"FontClip","props":{"y":14,"x":76,"width":295,"value":"2000","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","scaleY":1.3,"scaleX":1.3,"name":"金币","height":49,"direction":"horizontal","align":"left"}}]},{"type":"Image","props":{"y":457,"x":615,"skin":"comp/jiesuanyemian/-ODDS@2x.png","cacheAs":"bitmap"}},{"type":"Image","props":{"y":492,"x":615,"skin":"comp/jiesuanyemian/-BET@2x.png","cacheAs":"bitmap"}}]},{"type":"Image","props":{"y":0,"x":1217,"skin":"comp/jiesuanyemian/daojishi@2x.png","name":"下注时间"},"child":[{"type":"FontClip","props":{"y":29,"x":8,"width":75,"value":"60","spaceY":0,"spaceX":0,"skin":"comp/jiesuanyemian/shuizi04/组2@2x.png","sheet":"0123456789","scaleY":0.9,"scaleX":0.9,"name":"下注时间","height":45,"direction":"horizontal","align":"center"}}]},{"type":"Sprite","props":{"y":0,"x":0,"visible":false,"name":"充值页面"},"child":[{"type":"Image","props":{"y":81,"x":117,"skin":"comp/jiesuanyemian/chongzhi/ditukuang@2x.png"}},{"type":"Image","props":{"y":108,"x":89,"skin":"comp/jiesuanyemian/chongzhi/czbiaoti@2x.png"}},{"type":"Image","props":{"y":126,"x":523,"skin":"comp/jiesuanyemian/chongzhi/yuankuang@2x.png"}},{"type":"Image","props":{"y":127,"x":524,"skin":"comp/jiesuanyemian/chongzhi/适度娱乐，理性消费@2x.png"}},{"type":"Image","props":{"y":111,"x":1147,"skin":"comp/jiesuanyemian/chongzhi/x@2x.png","name":"close"}},{"type":"List","props":{"y":203,"x":157,"width":1052,"var":"ListRec","vScrollBarSkin":"comp/jiesuanyemian/vscroll.png","mouseEnabled":true,"height":476},"child":[{"type":"Box","props":{"y":0,"x":0,"width":260,"renderType":"render","name":"render","mouseEnabled":true,"height":373},"child":[{"type":"Image","props":{"y":30,"x":30,"skin":"comp/jiesuanyemian/chongzhi/kuang@2x.png","name":"I1","mouseEnabled":false},"child":[{"type":"Image","props":{"y":116,"x":68,"skin":"comp/jiesuanyemian/chongzhi/jinzi01@2x.png"}}]},{"type":"Image","props":{"y":287,"x":50,"skin":"comp/jiesuanyemian/chongzhi/goumai@2x.png","name":"0"}},{"type":"Label","props":{"y":240,"x":30,"width":224,"text":"金币:100000","name":"金币","height":49,"fontSize":25,"font":"Microsoft YaHei","color":"#fffdfd","bold":true,"align":"center"}},{"type":"Label","props":{"y":40,"x":30,"width":223,"text":"100￥","name":"RMB","height":62,"fontSize":35,"font":"Microsoft YaHei","color":"#fdfdfd","bold":false,"align":"center"}}]}]}]},{"type":"Box","props":{"y":0,"x":0,"visible":false,"name":"排行榜"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"comp/jiesuanyemian/游戏页.png"}},{"type":"Image","props":{"y":63,"x":113,"skin":"comp/jiesuanyemian/xiangqing/kk@2x.png"}},{"type":"Image","props":{"y":11,"x":309,"skin":"comp/jiesuanyemian/2373a3d696bffdb1d3809cfe3b3b366.png"}},{"type":"Image","props":{"y":199,"x":925,"skin":"comp/jiesuanyemian/xiangqing/01@2x.png"}},{"type":"Image","props":{"y":105,"x":361,"skin":"comp/jiesuanyemian/xiangqing/biaoti@2x.png"}},{"type":"Image","props":{"y":200,"x":150,"skin":"comp/jiesuanyemian/xiangqing/03@2x.png"}},{"type":"Image","props":{"y":200,"x":600,"skin":"comp/jiesuanyemian/xiangqing/02@2x.png"}},{"type":"List","props":{"y":266,"x":142,"width":1066,"var":"Rank","vScrollBarSkin":"comp/jiesuanyemian/vscroll.png","spaceY":20,"repeatY":20,"repeatX":1,"height":366},"child":[{"type":"Box","props":{"y":0,"x":0,"width":1047,"rotation":0,"renderType":"render","name":"render","mouseThrough":true,"height":76},"child":[{"type":"Image","props":{"y":0,"x":0,"width":404,"skin":"comp/jiesuanyemian/xiangqing/juxing01@2x.png"}},{"type":"Image","props":{"y":0,"x":425,"skin":"comp/jiesuanyemian/xiangqing/juxing02@2x.png"}},{"type":"Image","props":{"y":0,"x":784,"width":262,"skin":"comp/jiesuanyemian/xiangqing/juxing03@2x.png"}},{"type":"Label","props":{"y":5,"x":801,"width":294,"text":"label","name":"rGetgold","height":73,"fontSize":60,"color":"#ef2e2b"}},{"type":"Label","props":{"y":7,"x":67,"width":294,"text":"label","name":"rName","height":73,"fontSize":60,"color":"#ef2e2b"}},{"type":"Label","props":{"y":8,"x":473,"width":294,"text":"label","name":"rOdos","height":73,"fontSize":60,"color":"#ef2e2b"}}]}]},{"type":"Image","props":{"y":705,"x":60,"skin":"comp/jiesuanyemian/donghuapaodao/盈利@2x.png"}},{"type":"Image","props":{"y":701,"x":792,"skin":"comp/jiesuanyemian/donghuapaodao/jinbi拷贝@2x.png"}},{"type":"FontClip","props":{"y":710,"x":864,"value":"0","skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","name":"金币","align":"left"}},{"type":"FontClip","props":{"y":710,"x":176,"value":"0","skin":"comp/jiesuanyemian/ziyel.png","sheet":"0123456789","name":"盈利","align":"left"}},{"type":"Text","props":{"y":11,"x":517,"width":128,"text":"5-6","name":"编号","height":71,"fontSize":60,"font":"Microsoft YaHei","color":"#f8e61f","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":0,"x":0,"skin":"comp/jiesuanyemian/fanhui@2x.png","name":"返回"}},{"type":"Image","props":{"y":248,"x":378,"visible":false,"skin":"comp/jiesuanyemian/2add7c704e5214659dbd4b975ae0d70.png","name":"提示"},"child":[{"type":"Image","props":{"y":1,"x":516,"skin":"comp/jiesuanyemian/chongzhi/x@2x.png","name":"guanbi"}},{"type":"Label","props":{"y":81,"x":79,"width":429,"text":"金币不足请充值","height":90,"fontSize":60,"font":"Microsoft YaHei","color":"#e7e718","bold":true}}]}]};
		return GameUI;
	})(View);