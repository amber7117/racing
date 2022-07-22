<?php

namespace App\Http\Controllers\Admin\Racing\Platform;

use Request, Response, Session, Config, DB, Exception;
use Illuminate\Routing\Controller;

/**
 * Class IndexController
 * @package App\Http\Controllers\Admin\Racing\Platform
 */
class IndexController extends Controller
{

    static $views = 'admin.racing.platform.';

    /**
     * 首页
     * get: /admin/racing/platform/index
     */
    public function index()
    {
        $data = DB::table('platform')->first();
        return view(self::$views . 'index')->with('data', $data);
    }

    /**
     * 添加
     * get: /admin/racing/platform/doEdit
     */
    public function doEdit()
    {
        $id = Request::input('id');
        $data = [
            'qrcode' => Request::input('qrcode'),
            'rule' => Request::input('rule'),
            'per_first' => Request::input('per_first'),
            'per_second' => Request::input('per_second'),
            'per_third' => Request::input('per_third'),
            'per_fourth' => Request::input('per_fourth'),
            'per_fifth' => Request::input('per_fifth'),
            'r1' => Request::input('r1'),
            'r2' => Request::input('r2'),
            'r3' => Request::input('r3'),
            'r4' => Request::input('r4'),
            'r5' => Request::input('r5'),
            'r6' => Request::input('r6'),
            'r7' => Request::input('r7'),
            'r8' => Request::input('r8'),
            'r9' => Request::input('r9'),
            'r10' => Request::input('r10'),
            'share_balance' => Request::input('share_balance')*100,
            'per_tx' => Request::input('per_tx'),
            'max' => Request::input('max'),
            'min' => Request::input('min'),
            'bkz' => Request::input('bkz'),
    'di' => Request::input('di')
        ];
        if (empty($id)) {
            $row = DB::table('platform')->insert($data);
        } else {
            $row = DB::table('platform')->where('id', $id)->update($data);
        }
        if (!$row)
            return "false";
        return "true";
    }

    /**
     * 图片上传
     * post: /admin/racing/platform/upload
     */
    public function upload()
    {
        $file = Request::file('file');
        $dir = 'uploads/';
        $file_ex = $file->getClientOriginalExtension(); //获取文件的后缀名
        $file_name = time() . rand(1000, 9999) . '.' . $file_ex;
        $file->move($dir, $file_name);
        $url = '/' . $dir . $file_name;
        return Response::json(['url' => $url]);
    }
}
