<?php

namespace App\Http\Controllers\Api\Racing;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Tool\Tool;
use DB, Request, Response, Session, Exception;
use EasyWeChat\Factory;

/**
 * Api：赛马接口
 * Date: 2019-04-29
 * Class IndexController
 * @package App\Http\Controllers\Api\Racing
 */
class IndexController extends Controller
{

    protected $status;
    protected $info;

    function __construct()
    {
        $this->status = 1;
        $this->info = '';
    }

    /**
     * 1.1 个人信息
     * post：/member/info
     */
    public function member_info()
    {
        $memberId = Session::get('member_id');//用户id
        $member = DB::table('member')->find($memberId, ['id','first_id', 'nickname', 'head_image', DB::raw('FORMAT(balance/100,2) as balance')]);
        if (!file_exists('uploads/qrcode/qrcodeRes' . $memberId . '.png')) {
            Tool::qrcode($memberId);
        }
        $member->nickname = $this->userTextDecode($member->nickname);
        $withdraw = DB::table('member_withdraw')->where('m_id',$memberId)->orderBy('id','DESC')->first();
        $member->name = '';
        $member->info = '';
   $member->info1 = '';
        if (!empty($withdraw)){
            $member->name = $withdraw->name;
            $member->info = $withdraw->info;
            $member->info1 = $withdraw->info1;
        }
        $member->qrcode = config('custom.BasePath') . '/uploads/qrcode/qrcodeRes' . $memberId . '.png';
        return Tool::formatResponse($this->status, $this->info, $member, 'member');
    }

    /**
     * 1.2 分享回调
     * post：/share/update
     */
    public function share_update()
    {
        $memberId = Session::get('member_id');//用户id
        $beginTime = strtotime(date('Y-m-d'), time());
        $endTime = $beginTime + 24 * 60 * 60;
        $platform = DB::table('platform')->first();
        $shareBalance = 100;
        if (!empty($platform)) {
            $shareBalance = $platform->share_balance;
        }
        $shareCount = DB::table('member_share')->where('m_id', $memberId)->where('create_time', '>=', $beginTime)
            ->where('create_time', '<=', $endTime)->count();
        DB::table('member_share')->insert([
            'm_id' => $memberId,
            'create_time' => time()
        ]);
        $this->info = '分享成功';
        if ($shareCount < 2) {
            DB::table('member')->where('id', $memberId)->increment('balance', $shareBalance);
            $this->info = '分享成功，获得奖励' . $shareBalance / 100;
        }
        return Tool::formatResponse($this->status, $this->info);
    }

    /**
     * 1.3 公告列表
     * post：/notice/list
     */
    public function notice_list()
    {
        $list = DB::table('notice')->orderBy('id','DESC')->get(['id', 'title']);
        return Tool::formatResponse($this->status, $this->info, $list, 'list');
    }

    /**
     * 1.4 平台信息
     * post：/platform/info
     */
    public function platform_info()
    {
        $platform = DB::table('platform')->first();
        $platform->share_balance = round($platform->share_balance/100,2);
        return Tool::formatResponse($this->status, $this->info, $platform, 'platform');
    }

    /**
     * 1.5 充值类型列表
     * post：/recharge/list
     */
    public function recharge_list()
    {
        $list = DB::table('recharge')
            ->get(['id', 'title', DB::raw('FORMAT(price/100,2) as price'), DB::raw('FORMAT(in_price/100,2) as in_price')]);
        return Tool::formatResponse($this->status, $this->info, $list, 'list');
    }

    /**
     * 1.6 提现
     * post：/withdraw/add
     */
    public function withdraw_add()
    {
        $memberId = Session::get('member_id');//用户id
        $spendPrice = (int)Request::input('price') * 100;//金币
        $name = Request::input('name');
        $info = Request::input('info');
        $info1 = Request::input('info1');
        $platform = DB::table('platform')->first();
        $perTx = 1;
        if (!empty($platform)) {
            $perTx = $platform->per_tx;
        }
        $withdraw = DB::table('member_withdraw')->where('m_id',$memberId)
            ->orderBy('id','DESC')->first();
        $wechat_number = '';
if(!empty($info1)){      

            if (!empty($withdraw) && $info1 == $withdraw->info1) {
                $wechat_number = $withdraw->info1;
            } else {
                $wechat_number = $this->base64_image_content($info1, 'uploads');
                if (!$wechat_number) {
                    return Tool::formatResponse(3, '数据错误');
                }
            }
}

        $price = floor($spendPrice / $perTx);//向下取整
        $member = DB::table('member')->find($memberId);
        if ($price <= 0) {
            //小与1元
            return Tool::formatResponse(3, '请输入大于0的值');
        }

        if ($member->balance < $spendPrice) {
            return Tool::formatResponse(3, '余额不足');
        }
        DB::beginTransaction();
        try {
            //添加记录
            if (empty($info)){
                $info = '';
            }
            if (empty($name)){
                $name = '';
            }
            $orderNo = time() . rand(1000, 9999);
            $id = DB::table('member_withdraw')->insertGetId([
                'm_id' => $memberId,
                'order_no' => $orderNo,
                'price' => $price,
                'info' => $info,
                'info1' => $wechat_number,
                'name' => $name,
                'spend_price' => $spendPrice,
                'create_time' => time()
            ]);

            if ($id <= 0) {
                DB::rollBack();
                return Tool::formatResponse(2, '提现失败');
            }
            $row = DB::table('member')->where('id', $memberId)
                ->where('balance', '>=', $spendPrice)->decrement('balance', $spendPrice);
            if (!$row) {
                DB::rollBack();
                return Tool::formatResponse(2, '提现失败');
            }
            $options = [
                'debug' => true,
                'app_id' => config('custom.AppId'),
                'secret' => config('custom.AppSecret'),
                'token' => config('custom.Token'),
                'log' => [
                    'level' => 'debug',
                    'file' => '/tmp/wechat-logcom.log', // XXX: 绝对路径！！！！
                ]
            ];
            $members = DB::table('member')->where('is_admin',1)->where('status',1)->get();

            $app = Factory::officialAccount($options);
            foreach ($members as $m){
                $app->template_message->send([
                    'touser' => $m->open_id,
                    'template_id' => 'yGLR68LVtR-Lfa9xs7nwsNrKi7X1xU77y202_j8RAQM',
                    'url' => config('custom.BasePath'),
                    'data' => [
                        'first' => '您好，你收到新的提现申请',
                        'keyword1' => date('Y年m月d日 H:i'),
                        'keyword2' => $member->id,
                        'keyword3' => ($price/100).'元',
                        'remark' => '请等待客服操作。'
                    ],
                ]);
            }

            DB::commit();
            return Tool::formatResponse(1, '提现成功');
        } catch (Exception $exception) {
            DB::rollBack();
            return Tool::formatResponse(2, '提现失败');
        }
    }

    /**
     * 1.7 游戏记录列表
     * post：/log/list
     */
    public function log_list()
    {
        $memberId = Session::get('member_id');//用户id
        $list = DB::table('member_log')->where('m_id', $memberId)
            ->groupBy('room_no')->orderBy('room_no', 'DESC')
            ->get([DB::raw('FROM_UNIXTIME(room_no,\'%Y-%m-%d %H:%i:%s\') as create_date'), 'room_no',
                DB::raw('FORMAT(sum(num/100),2) as sum'), DB::raw('FORMAT(sum(spend_num/100),2) as spend_sum')]);
        return Tool::formatResponse($this->status, $this->info, $list, 'list');
    }

    /**
     * 1.8 最近10局游戏列表
     * post：/game/list
     */
    public function game_list()
    {
        $list = DB::table('room')
            ->where('status', 2)->orderBy('id', 'DESC')->limit(10)
            ->get(['id', DB::raw('FROM_UNIXTIME(room_no,\'%Y-%m-%d %H:%i:%s\') as create_date'), 'room_no']);
        return Tool::formatResponse($this->status, $this->info, $list, 'list');
    }

    /**
     * 1.9 游戏详情信息
     * post：/game/info
     */
    public function game_info()
    {
        $roomNo = Request::input('room_no');
        $per = 0;
        $room = DB::table('room')->where('room_no', $roomNo)
            ->first(['id', DB::raw('FROM_UNIXTIME(room_no,\'%Y-%m-%d %H:%i:%s\') as create_date'), 'room_no', 'rule', 'right_choose']);
        if (!empty($room->rule)) {
            $pers = explode(",", $room->rule);
            $per = $pers[($room->right_choose*2+1)];
        }
        $list = DB::table('member_log')->where('room_no', $roomNo)
            ->groupBy('m_id')->orderByRaw('sum(num) DESC')->limit(10)
            ->get(['m_id', DB::raw('FORMAT(sum(num/100),2) as sum'), DB::raw('FORMAT(sum(spend_num/100),2) as spend_sum')]);
        foreach ($list as $k => $v) {
            $list[$k]->per = $per;
        }
        return Tool::formatResponse($this->status, $this->info, $list, 'list');
    }

    /**
     * 1.10 团队佣金列表
     * post：/team/profit/list
     */
    public function team_profit_list()
    {
        $memberId = Session::get('member_id');//用户id
        $type = Request::input('type', 1);
        $times = 10;
        $beginTime = strtotime(date('Y-m-d'), time());
        $endTime = $beginTime + 24 * 60 * 60;
        if ($type != 1) {
            $times = 5;
        }
        $arrId = ['first_id', 'second_id', 'third_id', 'fourth_id', 'fifth_id', 'sixth_id', 'seventh_id', 'eighth_id', 'ninth_id', 'tenth_id'];
        $arrNum = ['first_num', 'second_num', 'third_num', 'fourth_num', 'fifth_num'];
        $list = [];
        for ($i = 0; $i < $times; $i++) {
            //总人数
            $allCount = DB::table('member')->where($arrId[$i], $memberId)->count();
            if ($type != 1) {
                //累计佣金
                $allNum = DB::table('member_log')->where($arrId[$i], $memberId)->sum($arrNum[$i]);
                if (empty($allNum)) {
                    $allNum = 0;
                }
                $allNum = round($allNum / 100, 2);
                //今日佣金
                $dayNum = DB::table('member_log')->where('create_time', '>', $beginTime)
                    ->where('create_time', '<', $endTime)->where($arrId[$i], $memberId)->sum($arrNum[$i]);
                if (empty($dayNum)) {
                    $dayNum = 0;
                }
                $dayNum = round($dayNum / 100, 2);
            } else {
                //累计佣金
                $id = 'id' . ($i + 1);
                $num = 'num' . ($i + 1);
                $allNum = DB::table('member_recharge')->where($id, $memberId)->where('status', 2)->sum($num);
                if (empty($allNum)) {
                    $allNum = 0;
                }
                $allNum = round($allNum / 100, 2);
                //今日佣金
                $dayNum = DB::table('member_recharge')->where('create_time', '>', $beginTime)->where('status', 2)
                    ->where('create_time', '<', $endTime)->where($id, $memberId)->sum($num);
                if (empty($dayNum)) {
                    $dayNum = 0;
                }
                $dayNum = round($dayNum / 100, 2);
            }
            $list[] = [
                'level' => '/uploads/level/'.($i + 1).'.png',
                'all_count' => $allCount,
                'all_num' => $allNum,
                'day_num' => $dayNum
            ];
        }
        return Tool::formatResponse($this->status, $this->info, $list, 'list');
    }

    /**
     * 1.11 团队列表
     * post：/team/list
     */
    public function team_list()
    {
        $memberId = Session::get('member_id');//用户id
        $level = Request::input('level', 1);
        $level = $level - 1;
        $arrId = ['first_id', 'second_id', 'third_id', 'fourth_id', 'fifth_id', 'sixth_id', 'seventh_id', 'eighth_id', 'ninth_id', 'tenth_id'];
        $list = DB::table('member')->where($arrId[$level], $memberId)->get(['id', DB::raw('FROM_UNIXTIME(create_time,\'%Y-%m-%d %H:%i:%s\') as create_date')]);
        return Tool::formatResponse($this->status, $this->info, $list, 'list');
    }

    /**
     * 1.12 收益列表
     * post：/profit/list
     */
    public function profit_list()
    {
        $memberId = Session::get('member_id');//用户id
        $level = Request::input('level', 1);
        $level = $level - 1;
        $type = Request::input('type', 1);//1充值 2游戏
        $arrId = ['first_id', 'second_id', 'third_id', 'fourth_id', 'fifth_id', 'sixth_id', 'seventh_id', 'eighth_id', 'ninth_id', 'tenth_id'];
        $arrNum = ['first_num', 'second_num', 'third_num', 'fourth_num', 'fifth_num'];
        $beginTime = strtotime(date('Y-m-d'), time());
        $endTime = $beginTime + 24 * 60 * 60;
        if ($type != 1) {
            $list = DB::table('member_log')->where('create_time', '>', $beginTime)
                ->where('create_time', '<', $endTime)->where($arrId[$level], $memberId)
                ->get(['id', 'm_id', DB::raw('FORMAT(' . $arrNum[$level] . '/100,2) as num'), DB::raw('FROM_UNIXTIME(create_time,\'%Y-%m-%d %H:%i:%s\') as create_date')]);
        } else {
            $id = 'id' . ($level + 1);
            $num = 'num' . ($level + 1);
            $list = DB::table('member_recharge')->where('create_time', '>', $beginTime)
                ->where('create_time', '<', $endTime)->where($id, $memberId)->where('status', 2)
                ->get(['id', 'm_id', DB::raw('FORMAT(' . $num . '/100,2) as num'), DB::raw('FROM_UNIXTIME(create_time,\'%Y-%m-%d %H:%i:%s\') as create_date')]);
        }
        return Tool::formatResponse($this->status, $this->info, $list, 'list');
    }

    /**
     * 1.13 机器人头像列表
     * post：/robot/list
     */
    public function robot_list()
    {
        $list = DB::table('robot')
            ->get(['id', 'head_image']);
        return Tool::formatResponse($this->status, $this->info, $list, 'list');
    }

    /**
     * 1.14 前5局结果列表
     * post：/result/list
     */
    public function result_list()
    {
        $arr = ['1-6', '1-5', '1-4', '1-3', '1-2', '2-6', '2-5', '2-4', '2-3', '3-6', '3-5', '3-4', '4-6', '4-5', '5-6'];
        $list = DB::table('room')
            ->where('status', 2)->orderBy('id', 'DESC')->limit(5)
            ->get(['id', 'room_no', 'rule', 'right_choose']);
        foreach ($list as $k => $v) {
            $list[$k]->title = $arr[$v->right_choose];
            $pers = explode(",", $v->rule);
            $list[$k]->per = $pers[((int)$v->right_choose*2+1)];
        }
        return Tool::formatResponse($this->status, $this->info, $list, 'list');
    }


    /**
     * 1.9 第三方支付
     * post: /pay
     */
    public function pay()
    {
        $id = Request::input('id');
        $memberId = Request::input('member_id');
        $type = Request::input('type',3);
        $member = DB::table('member')->find($memberId);
        if (empty($memberId) || empty($id) || empty($member)) {
            return "<span style='font-size: 100px'>参数不全</span>";
        }
        $recharge = DB::table('recharge')->find($id);
        $orderNo = time() . rand(1000, 9999);
        //生成订单
        $order = [
            'order_no' => $orderNo,
            'm_id' => $memberId,
            'price' => $recharge->price,
            'in_price' => $recharge->in_price,
            'create_time' => time()
        ];

        $platform = DB::table('platform')->find(1);
        $strArr = ['first_id', 'second_id', 'third_id', 'fourth_id', 'fifth_id', 'sixth_id', 'seventh_id', 'eighth_id', 'ninth_id', 'tenth_id'];
        $flag = 1;

        for ($i = 9;$i >= 0;$i--){
            $upId = $strArr[$i];
            if ($member->$upId > 0){
                $order['id'.($i+1)] = $member->$upId;
                $index = 'r'.$flag;
                if ($platform->$index > 30 || $platform->$index < 0){
                    return "<span style='font-size: 100px'>数据错误</span>";
                }
                if ($i == 0){
                    $order['num'.($i+1)] = round($platform->$index * $recharge->in_price/100);
                    break;
                }
                $flag ++;
                $index1 = 'r'.$flag;
                $order['num'.($i+1)] = round(($platform->$index - $platform->$index1) * $recharge->in_price/100);
            }
        }
        $id = DB::table('member_recharge')->insertGetId($order);
        if ($id <= 0) {
            return "<span style='font-size: 100px'>操作失败</span>";
        }
//        $url = config('custom.BathPath').'/phpdemo/codepay.php';
        $url = '/phpdemo/codepay.php?data='.$orderNo.'&type='.$type.'&money='.$recharge->price/100;
        return "<script>window.location.href='" . $url . "'</script>";
    }




    /**
     * post: /notify
     */
    public function notify()
    {
    	

        $ddh = $_POST['ddh']; //支付宝,微信，QQ钱包 订单号

        $key = $_POST['key']; //APPKEY验证，也可以使用签名在软件中开启

        $name = $_POST['name']; //备注信息  接收网关data 参数  支付订单号

        $lb = $_POST['lb']; //分类 =1 支付宝 =2财付通 =3 微信

        $money = $_POST['money'];//金额

        $paytime = $_POST['paytime'];//充值时间


        $key2 = '1e1b5478fbe8b89c87a761f7454c3ee6';//APPKEY 和云端和软件上面保持一致

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
            $order = DB::table('member_recharge')->where('order_no', $name)->first();
            if ($order -> status == 2){
                echo "ok";
            }else {
                DB::table('member_recharge')->where('id', $order->id)
                    ->update([
                        'wechat_no' => $ddh,
                        'status' => 2
                    ]);
                DB::table('member')->where('id', $order->m_id)->increment('balance', $order->in_price);
                for ($i = 0; $i < 10; $i++) {
                    $strId = 'id' . ($i + 1);
                    $strNum = 'num' . ($i + 1);
                    if ($order->$strId > 0 && $order->$strNum > 0) {
                        DB::table('member')->where('id', $order->$strId)->increment('balance', $order->$strNum);
                    }
                }
                echo "ok";
            }
        }else{
            //密匙错误
            echo 'appkey error';
        }
    }




//获取客户端IP地址
    function getIp()
    { //取IP函数
        static $realip;
        if (isset($_SERVER)) {
            if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $realip = $_SERVER['HTTP_X_FORWARDED_FOR'];
            } else {
                $realip = isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : $_SERVER['REMOTE_ADDR'];
            }
        } else {
            if (getenv('HTTP_X_FORWARDED_FOR')) {
                $realip = getenv('HTTP_X_FORWARDED_FOR');
            } else {
                $realip = getenv('HTTP_CLIENT_IP') ? getenv('HTTP_CLIENT_IP') : getenv('REMOTE_ADDR');
            }
        }
        $realip=explode(",",$realip);

        return $realip[0];
    }

    //数组拼接为url参数形式
    function urlparams($params){
        $sign = '';
        foreach ($params AS $key => $val) {
            if ($val == '') continue;
            if ($key != 'sign') {
                if ($sign != '') {
                    $sign .= "&";
                }
                $sign .= "$key=$val"; //拼接为url参数形式
            }
        }
        return $sign;
    }



    /* PHP CURL HTTPS POST */
    function curl_post_https($url,$data){ // 模拟提交数据函数
        $curl = curl_init(); // 启动一个CURL会话
        curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
        curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址
//        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查
//        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 1); // 从证书中检查SSL加密算法是否存在
        curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // 模拟用户使用的浏览器
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
        curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data); // Post提交的数据包
        curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环
        curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回
        $tmpInfo = curl_exec($curl); // 执行操作
        if (curl_errno($curl)) {
            echo 'Errno'.curl_error($curl);//捕抓异常
        }
        curl_close($curl); // 关闭CURL会话
        return $tmpInfo; // 返回数据，json格式
    }

    function parseurl($url="")
    {
        $url = rawurlencode(mb_convert_encoding($url, 'gb2312', 'utf-8'));
        $a = array("%3A", "%2F", "%40");
        $b = array(":", "/", "@");
        $url = str_replace($a, $b, $url);
        return $url;
    }

    /**
     * 解码上面的转义
     */
    function userTextDecode($str){
        $text = json_encode($str); //暴露出unicode
        $text = preg_replace_callback('/\\\\\\\\/i',function($str){
            return '\\';
        },$text); //将两条斜杠变成一条，其他不动
        return json_decode($text);
    }


    //base_64转码
    function base64_image_content($base64_image_content, $path)
    {
        //匹配出图片的格式
        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)) {
            $type = $result[2];
            $new_file = $path . "/" . date('Ymd', time()) . "/";
            if (!file_exists($new_file)) {
                //检查是否有该文件夹，如果没有就创建，并给予最高权限
                mkdir($new_file, 0700);
            }
            $new_file = $new_file . time() . ".{$type}";
            if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)))) {
                return '/' . $new_file;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
