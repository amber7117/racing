<?php
namespace App\Http\Controllers\Admin\Index;

use App\Models\GoodsSpecification;
use App\Models\Order;
use App\Repositories\OrderRepository;
use Cache, Session;
use Illuminate\Routing\Controller;

/**
 * 后台权限——首页
 * Date: 2016-11-14
 * Class IndexController
 * @package App\Http\Controllers\Admin\Seventeen\Index
 */
class IndexController extends Controller
{

    static $views = 'admin.index.';




    /**
     * 首页
     * get: /admin/index/index
     */
    public function index()
    {
        return view(self::$views . 'index');
    }


    /**
     * 清除后台session缓存
     * get: /admin/index/index/clearSession
     */
    public function clearSession()
    {
        Session::forget(config('custom.AdminUser'));
        Session::forget(config('custom.AdminMenu'));
        return redirect('/admin/sign');
    }

    /**
     * 清除session缓存,清除全局缓存
     * get: /admin/index/index/clearCache
     */
    public function clearCache()
    {
        Session::forget(config('custom.AdminUser'));
        Session::forget(config('custom.AdminMenu'));
        Cache::flush();
        return redirect('/admin/sign');
    }
}
