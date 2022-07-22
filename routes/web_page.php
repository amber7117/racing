<?php

Route::get('/', function (){
    return redirect('/platform/index');
});


Route::group(['middleware' => ['wechatAuth']], function () {
    Route::get('/platform/index', 'Page\Racing\IndexController@index');
    Route::get('/racing/index', 'Page\Racing\IndexController@racing');
});
