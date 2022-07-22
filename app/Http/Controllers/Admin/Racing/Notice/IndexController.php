<?php

namespace App\Http\Controllers\Admin\Racing\Notice;

use Request, Response, Session, Config, DB, Exception;
use Illuminate\Routing\Controller;

/**
 * Class IndexController
 * @package App\Http\Controllers\Admin\Racing\Notice
 */
class IndexController extends Controller
{

    static $views = 'admin.racing.notice.';

    /**
     * 首页
     * get: /admin/racing/notice/index
     */
    public function index()
    {
        return view(self::$views . 'index');
    }

    /**
     * 分页查询
     * get: /admin/racing/notice/searchPage
     */
    public function searchPage()
    {
        $con['search'] = Request::input('search')['value'];
        $con['length'] = (int)Request::input('length', 10);// 每页显示数量
        $con['start'] = (int)Request::input('start',0);// 查询的起始数 默认为0
        $page = intval($con['start']/$con['length']+1);
        $sql = DB::table('notice');
//        if (!empty($con['search'])){
//            $sql = $sql->where('title','LIKE','%'.$con['search'].'%');
//        }
        $list = $sql->orderBy('id','DESC')->paginate($con['length'], ['*'], 'page', $page)->toArray();
        $data['data'] = $list['data'];
        $data['recordsTotal'] = $list['total'];
        $data['recordsFiltered'] =  $list['total'];
        $data['draw'] = (int)Request::input('draw');//请求的次数，不用管;
        return Response::json($data);
    }


    /**
     * 详情
     * get: /admin/racing/notice/update
     */
    public function update()
    {
        $id = Request::input('id');
        $view = view(self::$views . 'update');
        if (!empty($id)){
            $data = DB::table('notice')->find($id);
            $view = $view->with('data',$data);
        }
        return $view;
    }

    /**
     * 编辑
     * get: /admin/racing/notice/doEdit
     */
    public function doEdit()
    {
        $id = Request::input('id');
        $title = Request::input('title');
        if (empty($id))
            $row = DB::table('notice')->insert([
                'title' => $title,
                'create_time' => time()
            ]);
        else
            $row = DB::table('notice')->where('id',$id)->update([
                'title' => $title
            ]);
        if (!$row)
            return 'false';
        return 'true';
    }

    /**
     * 删除
     * get: /admin/racing/notice/delete
     */
    public function delete()
    {
        $id = Request::input('id');
        $row = DB::table('notice')->where('id',$id)->delete();
        if (!$row)
            return 'false';
        return 'true';
    }
}
