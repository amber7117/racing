<?php

namespace App\Http\Middleware;

use Closure,Session,Request,Config,DB;
use Illuminate\Foundation\Application;

class WechatAuth
{
    /**
     * @param $request
     * @param Closure $next
     * @param null $guard
     * @return mixed
     */
    // public function handle($request, Closure $next, $guard = null)
    // {

    // //   Session::put('member_id',950415);

    //     if(!Session::has('member_id')){
    //         $url = Request::getRequestUri();
    //         $basepath = Config::get('custom.BasePath');
    //         $url = urlencode($url);
    //         $url = $basepath.'/oAuth/index?redirect_url='.$url;
    //         return redirect($url);
    //     }
    //     return $next($request);
    // }

    public function handle($request, Closure $next, $guard = null)
    {
    	                Session::put('member_id', 950420);

        $json = Request::get('json');
        if (!empty($json)){
            $json = json_decode($json);
            //查询是否存在
            $member = DB::table('member')->where('open_id',$json->open_id)->first();
            if (empty($member)){
                // 第一次进来,初始话信息
                $data['open_id'] = $json->open_id;
                $data['head_image'] = $json->head_image;
                $data['city'] = $json->city;
                $data['sex'] = $json->sex;
                $data['nickname'] = $json->nickname;
                $data['create_time'] = $json->create_time;
                $memberId = DB::table('member')->insertGetId($data);
                Session::put('member_id',$memberId);
            }else
                Session::put('member_id', $member->id);
            return redirect('/');
        }

        if(!Session::has('member_id')){
            $url = Request::getRequestUri();
            $basepath = Config::get('custom.BasePath');
            $url = urlencode($basepath.$url);
            $url = 'https://www.modn123.cn/oAuth/indexI?redirect_url='.$url;
            return redirect($url);
        }

        return $next($request);
    }






}
