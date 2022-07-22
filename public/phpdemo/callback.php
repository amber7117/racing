<?php 
/*
优云宝 PHP支付回调接口实例文档

免签收款接口的原理是 当用户支付成功后 软件抓取到记录 发送到 通知地址完成自动充值
所以，接口非常简单，支付后抓取的数据都是付款成功的。

*/

//MYSQL数据库连接开始

/*
省略 自己根据自己的需要编写
*/

      $ddh = $_POST['ddh']; //支付宝,微信，QQ钱包 订单号
       
      $key = $_POST['key']; //APPKEY验证，也可以使用签名在软件中开启
       
      $name = $_POST['name']; //备注信息  接收网关data 参数  支付订单号
       
      $lb = $_POST['lb']; //分类 =1 支付宝 =2财付通 =3 微信
       
      $money = $_POST['money'];//金额
         
      $paytime = $_POST['paytime'];//充值时间
       
	  $key2 = '4ec91e24d9fbf59ddd28a56696aae5bb';//APPKEY 和云端和软件上面保持一致 
	  
	  //使用签名，如果使用签名用 $sing对比  需要在软件配置中  使用签名 钩上
	  $sing =md5('ddh='.$ddh.'&name='.$name.'&money='.$money.'&key='.$key2.'');
	  
        if($key==$key2){//直接对比appkey是否正确
	  //if($key==$sing){//使用签名对比key是否正确
		  //判断支付来源
		  if($lb==1) $leibie='支付宝';//可根据网站自定义数据
		  if($lb==2) $leibie='财付通QQ钱包';//可根据网站自定义数据
		  if($lb==3) $leibie='微信支付';//可根据网站自定义数据
		   /*
		  此处执行你的程序逻辑 回执成功后
		  1、可以做成 判断支付宝订单号是否存在来完成充值
		  2、还可以做成 判断网站订单号(name)来完成充值
		  3、请做好订单号充值判断
		  */
          //执行完毕回执输出ok 字符
          echo "ok";
    
       }else{
		   //密匙错误
		   echo 'appkey error'; 
	   }
	   //上传到网站后 请登陆云端 将异步通知地址改写正确 例如 ：http://www.abc.com/callback.php 然后重启软件
?>