<?php

namespace App\Http\Controllers\Admin\Racing\Member;

use Request, Response, DB, Session;
use Illuminate\Routing\Controller;

/**
 * Class IndexController
 * @package App\Http\Controllers\Admin\Racing\Member
 */
class IndexController extends Controller
{

    static $views = 'admin.racing.member.';

    /**
     * 首页
     * get: /admin/racing/member/index
     */
    public function index()
    {
        return view(self::$views . 'index');
    }

    /**
     * 分页查询
     * get: /admin/racing/member/searchPage
     */
    public function searchPage()
    {
        $con['search'] = Request::input('search')['value'];
        $con['length'] = (int)Request::input('length', 10);// 每页显示数量
        $con['start'] = (int)Request::input('start', 0);// 查询的起始数 默认为0
        $page = intval($con['start'] / $con['length'] + 1);
        $sql = DB::table('member');
        if (!empty($con['search'])) {
            $sql = $sql->where('id', 'like', '%' . $con['search'] . '%');
        }
        $list = $sql->where('status', '>', 0)->orderBy('is_admin', 'ASC')->orderBy('id', 'DESC')
            ->select('id', 'status', 'nickname','head_image', 'profit', 'balance','is_admin',
                DB::raw('FROM_UNIXTIME(create_time,\'%Y-%m-%d %H:%i:%s\') as create_date'))
            ->paginate($con['length'], ['*'], 'page', $page)->toArray();
        $data['data'] = $list['data'];
        $data['recordsTotal'] = $list['total'];
        $data['recordsFiltered'] = $list['total'];
        $data['draw'] = (int)Request::input('draw');//请求的次数，不用管;
        return Response::json($data);
    }

    /**
     * 添加减少金币
     * get: /admin/racing/member/balance
     */
    public function balance()
    {
        $id = Request::input('id');
        $num = Request::input('balance')*100;
        $member = DB::table('member')->find($id, ['balance']);
        $row = DB::table('member')->where('id', $id)->update([
            'balance' => $num
        ]);
        $user = Session::get(config('custom.AdminUser'));
        DB::table('balance_log')->insert([
            'm_id' => $id,
            'old' => $member->balance,
            'new' => $num,
            'user_id' => $user->id,
            'create_time' => time(),
        ]);
        if (!$row)
            return 'false';
        return 'true';
    }

    /**
     * 修改状态
     * get: /admin/racing/member/isOpen
     */
    public function isOpen()
    {
        $id = Request::input('id');
        $status = Request::input('status');
        $row = DB::table('member')->where('id', $id)->update([
            'status' => $status
        ]);
        if (!$row)
            return 'false';
        return 'true';
    }

    /**
     * 详情
     * get: /admin/racing/member/update
     */
    public function update()
    {
        $id = Request::input('id');
        $view = view(self::$views . 'update');
        if (!empty($id)){
            $data = DB::table('member')->find($id);
            $view = $view->with('data',$data);
        }
        return $view;
    }

    /**
     * 修改状态
     * get: /admin/racing/member/isAdmin
     */
    public function isAdmin()
    {
        $id = Request::input('id');
        $status = Request::input('status');
        $row = DB::table('member')->where('id', $id)->update([
            'is_admin' => $status
        ]);
        if (!$row)
            return 'false';
        return 'true';
    }


    /**
     * 详情
     * get: /admin/racing/member/balancePage
     */
    public function balancePage()
    {
        $id = Request::input('id');
        $view = view(self::$views . 'balance');
        if (!empty($id)){
            $data = DB::table('member')->find($id);
            $view = $view->with('data',$data);
        }
        return $view;
    }

}
