<?php

#后台通用路由配置
Route::group(array('prefix' => 'admin'), function () {
    #登录页面
    Route::get('/sign', 'Admin\Sign\SignController@index');
    #后台验证码
    Route::get('/sign/captcha/{tmp}', 'Admin\Sign\SignController@captcha');
    #登录
    Route::post('/signup', 'Admin\Sign\SignController@signup');
    Route::get('sign/logout', 'Admin\Sign\SignController@logout'); // 退出
    Route::get('index/index/clearSession', 'Admin\Index\IndexController@clearSession'); // 清楚会话
    Route::get('index/index/clearCache', 'Admin\Index\IndexController@clearCache'); // 清楚全部缓存

    Route::get('sign/forgotPassword', 'Admin\Sign\SignController@forgotPassword'); // 找回密码页
    Route::post('/sign/getcode', 'Admin\Sign\SignController@getcode'); // 获取验证码
    Route::post('/sign/updatePassword', 'Admin\Sign\SignController@updatePassword'); // 修改密码

    #注册中间件
    Route::group(['middleware' => ['admin']], function () {
        Route::get('index/index', 'Admin\Index\IndexController@index');

        /*--------------------------------------用户管理------------------------------------------------ */
        #帐号管理
        Route::get('auth/user/index', 'Admin\Auth\UserController@index');
        Route::get('auth/user/searchPage', 'Admin\Auth\UserController@searchPage');
        Route::post('auth/user/isOpen', 'Admin\Auth\UserController@isOpen');
        Route::get('auth/user/update', 'Admin\Auth\UserController@update');
        Route::post('auth/user/validataName', 'Admin\Auth\UserController@validataName');
        Route::post('auth/user/validataPhone', 'Admin\Auth\UserController@validataPhone');
        Route::post('auth/user/doEdit', 'Admin\Auth\UserController@doEdit');
        Route::get('auth/user/choose', 'Admin\Auth\UserController@choose');
        Route::post('auth/user/doChooseRole', 'Admin\Auth\UserController@doChooseRole');
        Route::post('auth/user/delete', 'Admin\Auth\UserController@delete');
        Route::get('auth/user/password', 'Admin\Auth\UserController@password');
        Route::post('auth/user/editPassword', 'Admin\Auth\UserController@editPassword');
        Route::post('auth/user/getInfo', 'Admin\Auth\UserController@getInfo');

        #用户组
        Route::get('auth/role/index', 'Admin\Auth\RoleController@index');
        Route::get('auth/role/searchPage', 'Admin\Auth\RoleController@searchPage');
        Route::post('auth/role/isOpen', 'Admin\Auth\RoleController@isOpen');
        Route::post('auth/role/delete', 'Admin\Auth\RoleController@delete');
        Route::get('auth/role/update', 'Admin\Auth\RoleController@update');
        Route::post('auth/role/doEdit', 'Admin\Auth\RoleController@doEdit');
        Route::get('auth/role/authorize', 'Admin\Auth\RoleController@authorize');
        Route::post('auth/role/doAuthorize', 'Admin\Auth\RoleController@doAuthorize');

        #后台菜单
        Route::get('auth/menu/index', 'Admin\Auth\MenuController@index');
        Route::get('auth/menu/searchPage', 'Admin\Auth\MenuController@searchPage');
        Route::post('auth/menu/isOpen', 'Admin\Auth\MenuController@isOpen');
        Route::get('auth/menu/update', 'Admin\Auth\MenuController@update');
        Route::post('auth/menu/doEdit', 'Admin\Auth\MenuController@doEdit');
        Route::post('auth/menu/del', 'Admin\Auth\MenuController@del');
        Route::post('auth/menu/sortUpdate', 'Admin\Auth\MenuController@sortUpdate');
    });

});


#后台项目路由配置
Route::group(array('prefix' => 'admin/racing'), function () {
    #注册中间件
    Route::group(['middleware' => ['admin']], function () {
        #会员管理
        Route::group(array('prefix' => 'member'), function () {
            $route = 'Admin\Racing\Member\IndexController';
            Route::get('index', $route . '@index');
            Route::get('searchPage', $route . '@searchPage');
            Route::post('balance', $route . '@balance');
            Route::post('isOpen', $route . '@isOpen');
            Route::get('update', $route . '@update');
            Route::post('isAdmin', $route . '@isAdmin');
            Route::get('balancePage', $route . '@balancePage');

        });
        #平台管理
        Route::group(array('prefix' => 'platform'), function () {
            $route = 'Admin\Racing\Platform\IndexController';
            Route::get('index', $route . '@index');
            Route::post('doEdit', $route . '@doEdit');
            Route::post('upload', $route . '@upload');
        });
        #记录管理
        Route::group(array('prefix' => 'log'), function () {
            Route::group(array('prefix' => 'recharge'), function () {
                $route = 'Admin\Racing\Log\RechargeController';
                Route::get('index', $route . '@index');
                Route::get('searchPage', $route . '@searchPage');
            });
            Route::group(array('prefix' => 'withdraw'), function () {
                $route = 'Admin\Racing\Log\WithdrawController';
                Route::get('index', $route . '@index');
                Route::get('searchPage', $route . '@searchPage');
                Route::post('isOpen', $route . '@isOpen');
                Route::get('detail', $route . '@detail');

            });
            Route::group(array('prefix' => 'log'), function () {
                $route = 'Admin\Racing\Log\LogController';
                Route::get('index', $route . '@index');
                Route::get('searchPage', $route . '@searchPage');
                Route::get('detail', $route . '@detail');
                Route::get('detailPage', $route . '@detailPage');
            });
        });
        #充值类型管理
        Route::group(array('prefix' => 'recharge'), function () {
            $route = 'Admin\Racing\Recharge\IndexController';
            Route::get('index', $route . '@index');
            Route::get('searchPage', $route . '@searchPage');
            Route::get('update', $route . '@update');
            Route::post('doEdit', $route . '@doEdit');
            Route::post('delete', $route . '@delete');
        });
        #公告管理
        Route::group(array('prefix' => 'notice'), function () {
            $route = 'Admin\Racing\Notice\IndexController';
            Route::get('index', $route . '@index');
            Route::get('searchPage', $route . '@searchPage');
            Route::get('update', $route . '@update');
            Route::post('doEdit', $route . '@doEdit');
            Route::post('delete', $route . '@delete');
        });
        #机器人头像管理
        Route::group(array('prefix' => 'robot'), function () {
            $route = 'Admin\Racing\Robot\IndexController';
            Route::get('index', $route . '@index');
            Route::get('searchPage', $route . '@searchPage');
            Route::get('update', $route . '@update');
            Route::post('doEdit', $route . '@doEdit');
            Route::post('upload', $route . '@delete');
        });
    });

});
