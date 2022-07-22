<?php

namespace App\Http\Controllers\Page\Racing;

use App\Http\Controllers\Controller;
use DB, Request, Session;
use App\Http\Controllers\Wechat\Wechat;

/**
 * Page：游戏模块
 * Date: 2017-03-17
 * Class IndexController
 * @package App\Http\Controllers\Page\Racing
 */
class IndexController extends Controller
{

    /**
     * 大厅
     * post: /platform/index
     */
    public function index()
    {
        $upId = Request::input('id');//上级id
        $memberId = Session::get('member_id');//用户id
        $member = DB::table('member')->find($memberId);//用户
      
        $row = DB::table('member')->where('id',$memberId)->update(
            [
                'is_first' => 2
            ]
        );//用户
        if ($member->is_first == 1) {
            if (!empty($upId) && $upId != $memberId) {
                $memberUp = DB::table('member')->find($upId);//推荐人
                if (empty($memberUp) || empty($member)) {
                    return view('game.seafood.index');
                }
                if (empty($member->first_id)) {
                    //添加上级id
                    $ids = [];
                    $ids['first_id'] = $upId;
                    $arr = ['first_id', 'second_id', 'third_id', 'fourth_id', 'fifth_id', 'sixth_id', 'seventh_id', 'eighth_id', 'ninth_id', 'tenth_id'];
                    foreach ($arr as $k => $v) {
                        if ($k > 0) {
                            $str = $arr[$k - 1];
                            $upId = $memberUp->$str;
                            if (!empty($upId)) {
                                if ($memberId == $upId) {
                                    return view('game.seafood.index');
                                }
                                $ids[$v] = $upId;
                            } else {
                                $ids[$v] = 0;
                            }
                        }

                    }
                    //修改用户上级信息
                    DB::table('member')->where('id', $memberId)->update($ids);
                    DB::table('member')->where('first_id', $memberId)->update([
                        'second_id' => $ids['first_id'],
                        'third_id' => $ids['second_id'],
                        'fourth_id' => $ids['third_id'],
                        'fifth_id' => $ids['fourth_id'],
                        'sixth_id' => $ids['fifth_id'],
                        'seventh_id' => $ids['sixth_id'],
                        'eighth_id' => $ids['seventh_id'],
                        'ninth_id' => $ids['eighth_id'],
                        'tenth_id' => $ids['ninth_id']
                    ]);
                    DB::table('member')->where('second_id', $memberId)->update([
                        'third_id' => $ids['first_id'],
                        'fourth_id' => $ids['second_id'],
                        'fifth_id' => $ids['third_id'],
                        'sixth_id' => $ids['fourth_id'],
                        'seventh_id' => $ids['fifth_id'],
                        'eighth_id' => $ids['sixth_id'],
                        'ninth_id' => $ids['seventh_id'],
                        'tenth_id' => $ids['eighth_id']
                    ]);
                    DB::table('member')->where('third_id', $memberId)->update([
                        'fourth_id' => $ids['first_id'],
                        'fifth_id' => $ids['second_id'],
                        'sixth_id' => $ids['third_id'],
                        'seventh_id' => $ids['fourth_id'],
                        'eighth_id' => $ids['fifth_id'],
                        'ninth_id' => $ids['sixth_id'],
                        'tenth_id' => $ids['seventh_id']
                    ]);
                    DB::table('member')->where('fourth_id', $memberId)->update([
                        'fifth_id' => $ids['first_id'],
                        'sixth_id' => $ids['second_id'],
                        'seventh_id' => $ids['third_id'],
                        'eighth_id' => $ids['fourth_id'],
                        'ninth_id' => $ids['fifth_id'],
                        'tenth_id' => $ids['sixth_id']

                    ]);
                    DB::table('member')->where('fifth_id', $memberId)->update([
                        'sixth_id' => $ids['first_id'],
                        'seventh_id' => $ids['second_id'],
                        'eighth_id' => $ids['third_id'],
                        'ninth_id' => $ids['fourth_id'],
                        'tenth_id' => $ids['fifth_id']
                    ]);
                    DB::table('member')->where('sixth_id', $memberId)->update([
                        'seventh_id' => $ids['first_id'],
                        'eighth_id' => $ids['second_id'],
                        'ninth_id' => $ids['third_id'],
                        'tenth_id' => $ids['fourth_id']
                    ]);
                    DB::table('member')->where('seventh_id', $memberId)->update([
                        'eighth_id' => $ids['first_id'],
                        'ninth_id' => $ids['second_id'],
                        'tenth_id' => $ids['third_id']
                    ]);
                    DB::table('member')->where('eighth_id', $memberId)->update([
                        'ninth_id' => $ids['first_id'],
                        'tenth_id' => $ids['second_id']
                    ]);
                    DB::table('member')->where('ninth_id', $memberId)->update([
                        'tenth_id' => $ids['first_id']
                    ]);
                }
            }
        }
        $js = Wechat::getJssdk(false);

        return view('platform.index')->with('js',$js);
    }

    /**
     * 赛马
     * post: /racing/index
     */
    public function racing()
    {
   $js = Wechat::getJssdk(false);
        return view('racing.index')->with('js',$js);
    }

}
