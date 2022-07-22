<?php

namespace App\Http\Controllers\Admin\Racing\Log;

use Request, Response, Session, Config, DB, Exception;
use Illuminate\Routing\Controller;

/**
 * Class LogController
 * @package App\Http\Controllers\Admin\Racing\Log
 */
class LogController extends Controller
{

    static $views = 'admin.racing.log.log.';

    /**
     * 首页
     * get: /admin/racing/log/log/index
     */
    public function index()
    {
        return view(self::$views . 'index');
    }

    /**
     * 分页查询
     * get: /admin/racing/log/log/searchPage
     */
    public function searchPage()
    {
        $con['search'] = Request::input('search')['value'];
        $con['length'] = (int)Request::input('length', 10);// 每页显示数量
        $con['start'] = (int)Request::input('start',0);// 查询的起始数 默认为0
        $page = intval($con['start']/$con['length']+1);
        $sql = DB::table('room');
        $arr = ['1-6', '1-5', '1-4', '1-3', '1-2', '2-6', '2-5', '2-4', '2-3', '3-6', '3-5', '3-4', '4-6', '4-5', '5-6'];
        if (!empty($con['search'])){
            $date = strtotime($con['search']);
            $sql = $sql->where('create_time',$date);
        }
        $list = $sql->orderBy('create_time','DESC')->groupBy('create_time')
            ->select('id','create_time','rule','right_choose',DB::raw('FROM_UNIXTIME(create_time,\'%Y-%m-%d %H:%i:%s\') as create_date'))->paginate($con['length'], ['*'], 'page', $page)->toArray();
        foreach ($list['data'] as $k => $v){
            if (empty($v->right_choose) || $v->right_choose == ''){
                $list['data'][$k]->right_str = '未开奖';
            }else{
                $list['data'][$k]->right_str = $arr[$v->right_choose];
            }
            $pers = explode(",", $v->rule);

            $list['data'][$k]->per = $pers[((int)$v->right_choose*2+1)];
        }
        $data['data'] = $list['data'];
        $data['recordsTotal'] = $list['total'];
        $data['recordsFiltered'] =  $list['total'];
        $data['draw'] = (int)Request::input('draw');//请求的次数，不用管;
        return Response::json($data);
    }

    /**
     * 首页
     * get: /admin/racing/log/log/detail
     */
    public function detail()
    {
        $create_time = Request::input('create_time');
        //总下注
        $data = [];
        $arr = ['1-6', '1-5', '1-4', '1-3', '1-2', '2-6', '2-5', '2-4', '2-3', '3-6', '3-5', '3-4', '4-6', '4-5', '5-6'];
        foreach ($arr as $k => $v){
            $data[$v] = DB::table('member_log')->where('room_no',$create_time)
                ->where('choose',$k)->sum('spend_num');
        }

        return view(self::$views . 'detail')->with('data',$data)->with('create_time',$create_time);
    }

    /**
     * 分页查询
     * get: /admin/racing/log/log/detailPage
     */
    public function detailPage()
    {
        $create_time = Request::input('create_time');
        $con['search'] = Request::input('search')['value'];
        $con['length'] = (int)Request::input('length', 10);// 每页显示数量
        $con['start'] = (int)Request::input('start',0);// 查询的起始数 默认为0
        $page = intval($con['start']/$con['length']+1);
        $sql = DB::table('member_log')->leftJoin('member','member.id','=','member_log.m_id')
            ->leftJoin('room','room.create_time','=','member_log.room_no');
        if (!empty($con['search'])){
            $sql = $sql->where('member.id','like','%'.$con['search'].'%');
        }
        $list = $sql->where('member_log.room_no',$create_time)
            ->orderBy('member_log.status','ASC')
            ->orderBy('member_log.num','DESC')
            ->orderBy('member_log.id','DESC')
            ->select('member_log.id','member_log.num','member_log.spend_num','member_log.status',
                'member_log.choose','member_log.right_choose',
                'member_log.m_id','member.nickname','member.head_image','room.rule')
            ->paginate($con['length'], ['*'], 'page', $page)->toArray();
        $arr = ['1-6', '1-5', '1-4', '1-3', '1-2', '2-6', '2-5', '2-4', '2-3', '3-6', '3-5', '3-4', '4-6', '4-5', '5-6'];

        foreach ($list['data'] as $k => $v){
            if (empty($v->right_choose) || $v->right_choose == ''){
                $list['data'][$k]->right_str = '未开奖';
            }else{
                $list['data'][$k]->right_str = $arr[$v->right_choose];
            }
            $pers = explode(",", $v->rule);
            $list['data'][$k]->per = $pers[($v->right_choose*2+1)];
            $list['data'][$k]->choose_str = $arr[$v->choose];
        }
        $data['data'] = $list['data'];
        $data['recordsTotal'] = $list['total'];
        $data['recordsFiltered'] =  $list['total'];
        $data['draw'] = (int)Request::input('draw');//请求的次数，不用管;
        return Response::json($data);
    }
}
