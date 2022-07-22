<?php

namespace App\Http\Controllers\Admin\Racing\Log;

use Request, Response, Session, Config, DB, Exception;
use Illuminate\Routing\Controller;

/**
 * Class RechargeController
 * @package App\Http\Controllers\Admin\Racing\Log
 */
class RechargeController extends Controller
{

    static $views = 'admin.racing.log.recharge.';

    /**
     * 首页
     * get: /admin/racing/log/recharge/index
     */
    public function index()
    {
        return view(self::$views . 'index');
    }

    /**
     * 分页查询
     * get: /admin/racing/log/recharge/searchPage
     */
    public function searchPage()
    {
        $con['search'] = Request::input('search')['value'];
        $con['length'] = (int)Request::input('length', 10);// 每页显示数量
        $con['start'] = (int)Request::input('start',0);// 查询的起始数 默认为0
        $page = intval($con['start']/$con['length']+1);
        $sql = DB::table('member_recharge')->where('status',2);
        if (!empty($con['search'])){
            $sql = $sql->where('order_no','like','%'.$con['search'].'%');
        }
        $con['search1'] = Request::input('search1');
        if (!empty($con['search1'])){
            $sql = $sql->where('m_id','like','%'.$con['search1'].'%');
        }
        $list = $sql->orderBy('id','DESC')
            ->select('id','price','order_no','status','wechat_no','m_id','in_price',DB::raw('FROM_UNIXTIME(create_time,\'%Y年%m月%d日 %H:%i:%s\') as create_date'))->paginate($con['length'], ['*'], 'page', $page)->toArray();
        $data['data'] = $list['data'];
        $data['recordsTotal'] = $list['total'];
        $data['recordsFiltered'] =  $list['total'];
        $data['draw'] = (int)Request::input('draw');//请求的次数，不用管;
        return Response::json($data);
    }

}
