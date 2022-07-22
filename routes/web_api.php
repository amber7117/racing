<?php

$racing = 'Api\Racing\IndexController';
Route::any('pay', $racing.'@pay');
Route::post('notify', $racing.'@notify');
Route::any('orderajax', $racing.'@orderajax');


Route::any('/oAuth/index', 'Wechat\Wechat@index');
Route::any('/oAuth/getUserOpenid', 'Wechat\Wechat@getUserOpenid');

Route::group(['middleware' => ['wechatAuth']], function () use ($racing) {
    //1.1 个人信息
    Route::post('/member/info', $racing . '@member_info');
    //1.2 分享回调
    Route::post('/share/update', $racing . '@share_update');
    //1.3 公告列表
    Route::post('/notice/list', $racing . '@notice_list');
    //1.4 平台信息
    Route::post('/platform/info', $racing . '@platform_info');
    //1.5 充值类型列表
    Route::post('/recharge/list', $racing . '@recharge_list');
    //1.6 提现
    Route::post('/withdraw/add', $racing . '@withdraw_add');
    //1.7 游戏记录列表
    Route::post('/log/list', $racing . '@log_list');
    //1.8 最近10局游戏列表
    Route::post('/game/list', $racing . '@game_list');
    //1.9 游戏详情信息
    Route::post('/game/info', $racing . '@game_info');
    //1.10 团队佣金列表
    Route::post('/team/profit/list', $racing . '@team_profit_list');
    //1.11 团队列表
    Route::post('/team/list', $racing . '@team_list');
    //1.12 收益列表
    Route::post('/profit/list', $racing . '@profit_list');
    //1.13 机器人头像列表
    Route::post('/robot/list', $racing . '@robot_list');
    //1.14 前5局结果列表
    Route::post('/result/list', $racing . '@result_list');

});
Route::any('pay', $racing . '@pay');
Route::any('notify', $racing . '@notify');
