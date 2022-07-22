<?php

namespace App\Http\Controllers\Wechat;

use App\Http\Controllers\Controller;
use EasyWeChat\Factory;
use Config, Request, Session, DB;

/**
 * Class Tool
 * @package App\Http\Controllers\Wechat
 */
class Wechat extends Controller
{

    /**   获取微信jssdk  */
    public static function getJssdk($bool)
    {
        $options = [
            'debug' => $bool,
            'app_id' => Config::get('custom.AppId'),
            'secret' => Config::get('custom.AppSecret'),
            'token' => Config::get('custom.Token'),
            'log' => [
                'level' => 'debug',
                'file' => '/tmp/wechat-logcom.log', // XXX: 绝对路径！！！！
            ]
        ];
        $app = Factory::officialAccount($options);
        return $app->jssdk->buildConfig(array('onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems','translateVoice','getLocation','openLocation','startRecord','stopRecord','playVoice','stopVoice','uploadVoice','downloadVoice'), false, true);
    }



    /**   项目内授权  */
    public function index()
    {
        $basepath = Config::get('custom.BasePath');
        $url = Request::input('redirect_url');
        $url = urlencode($url);
        $callback = $basepath . '/oAuth/getUserOpenid?w_callback=' . $url;
        $options = [
            'debug' => true,
            'app_id' => Config::get('custom.AppId'),
            'secret' => Config::get('custom.AppSecret'),
            'token' => Config::get('custom.Token'),
            'log' => [
                'level' => 'debug',
                'file' => '/tmp/wechat-logcom.log', // XXX: 绝对路径！！！！
            ],
            'oauth' => [
                'scopes' => ['snsapi_userinfo'],
                'callback' => $callback,
            ]
        ];
        $app = Factory::officialAccount($options);
        $response = $app->oauth->redirect();
        header('location: ' . $response->getTargetUrl(), true, 301); // 跳转到 getUserOpenid
        exit();
    }

    public function getUserOpenid()
    {
        $w_callback = Request::input('w_callback');
        $options = [
            'debug' => true,
            'app_id' => Config::get('custom.AppId'),
            'secret' => Config::get('custom.AppSecret'),
            'token' => Config::get('custom.Token'),
            'log' => [
                'level' => 'debug',
                'file' => '/tmp/wechat-logcom.log', // XXX: 绝对路径！！！！
            ]
        ];
        $app = Factory::officialAccount($options);
        $user = $app->oauth->user();
        $user = $user->toArray();
        $openid = $user['id'];//openid
        $result = $user['original'];
        //根据openID 查找用户是否存在
        $member = DB::table('member')->where('open_id', $openid)->first();//根据 openID 查找 用户 id
        if (!empty($member)) { // 如果用户存在
            Session::put('member_id', $member->id);
        } else {
            // 第一次进来,初始话信息
            $data['open_id'] = $openid;
            $data['head_image'] = $result['headimgurl'];
            $data['city'] = $result['city'];
            $data['sex'] = $result['sex'];
            $data['nickname'] = $this->userTextEncode($result['nickname']);
            $data['create_time'] = time();
            $memberId = DB::table('member')->insertGetId($data);
            Session::put('member_id', $memberId);
        }
        return redirect($w_callback);
    }


    /**   项目外授权  */
    public function indexI()
    {
        $basepath = Config::get('custom.BasePath');
        $url = Request::input('redirect_url');
        $url = urlencode($url);
        $callback = $basepath . '/oAuth/getUserOpenidI?w_callback=' . $url;
        $options = [
            'debug' => true,
            'app_id' => Config::get('custom.AppId'),
            'secret' => Config::get('custom.AppSecret'),
            'token' => Config::get('custom.Token'),
            'log' => [
                'level' => 'debug',
                'file' => '/tmp/wechat-logcom.log', // XXX: 绝对路径！！！！
            ],
            'oauth' => [
                'scopes' => ['snsapi_userinfo'],
                'callback' => $callback,
            ]
        ];
        $app = Factory::officialAccount($options);
        $response = $app->oauth->redirect();
        header('location: ' . $response->getTargetUrl(), true, 301); // 跳转到 getUserOpenid
        exit();
    }

    public function getUserOpenidI()
    {
        $w_callback = Request::input('w_callback');
        $options = [
            'debug' => true,
            'app_id' => Config::get('custom.AppId'),
            'secret' => Config::get('custom.AppSecret'),
            'token' => Config::get('custom.Token'),
            'log' => [
                'level' => 'debug',
                'file' => '/tmp/wechat-logcom.log', // XXX: 绝对路径！！！！
            ]
        ];
        $app = Factory::officialAccount($options);
        $user = $app->oauth->user();
        $user = $user->toArray();
        $openid = $user['id'];//openid
        $result = $user['original'];
        // 第一次进来,初始话信息
        $data['open_id'] = $openid;
        $data['head_image'] = $result['headimgurl'];
        $data['unionid'] = $result['unionid'];
        $data['city'] = $result['city'];
        $data['sex'] = $result['sex'];
        $data['nickname'] = $this->userTextEncode($result['nickname']);
        $data['create_time'] = time();
        $w_callback = urldecode($w_callback);
        $arr = explode("?", $w_callback);
        $w_callback = $arr[0] . "?json=" . json_encode($data);
        //        header('location:'.$w_callback);exit;
        return redirect($w_callback);
    }


    public function redirectShare()
    {
        $url = Request::input('url');
        $url = urldecode($url);
        $w_callback = $url;
        //        header('location:'.$w_callback);exit;
        return redirect($w_callback);
    }

    /**
     *把用户输入的文本转义（主要针对特殊符号和emoji表情）
     */
    function userTextEncode($str)
    {
        if (!is_string($str)) return $str;
        if (!$str || $str == 'undefined') return '';

        $text = json_encode($str); //暴露出unicode
        $text = preg_replace_callback("/(\\\u[ed][0-9a-f]{3})/i", function ($str) {
            return addslashes($str[0]);
        }, $text); //将emoji的unicode留下，其他不动，这里的正则比原答案增加了d，因为我发现我很多emoji实际上是\ud开头的，反而暂时没发现有\ue开头。
        return json_decode($text);
    }


}
