@extends('admin.base.doom')

{{--页面名,统一名可在doom中修改，此处不引用--}}
@section('title','平台管理')

{{--页面css--}}
@section('css')
    @parent
    <link href="{{ config('oss.AdminOssUrl') }}/doom/css/fileupload/fileUpload.css" rel="stylesheet">
@stop

{{--页面标题,统一标题可在doom中修改，此处不引用--}}
@section('titlename','平台设置')

{{--面包屑部分--}}
@section('crumbs')
    <ol class="breadcrumb">
        <li>
            <a href="/admin/index/index">首页</a>
        </li>
        <li>
            <a>平台管理</a>
        </li>
        <li class="active">
            <strong>平台设置</strong>
        </li>
    </ol>
@stop


{{--页面内容--}}
@section('content')
    @parent
    <!-- BEGIN 表单-->
    <form id="validation-form" class="form-horizontal">
        <div class="modal-body">
            <div class="form-body">
                <div class="alert alert-danger" role="alert" style="display: none"></div>
                <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                <input type="hidden" name="id" id="id" value="@if(!empty($data)){{$data->id}}@endif"/>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label col-md-4">客服二维码</label>
                            <!-- 上传图片 -->
                            <div class="col-md-5">
                                <input type="hidden" class="img-value img-value1" id="qrcode" name="qrcode"
                                       value="@if(!empty($data)){{$data->qrcode}}@endif"/>
                                <img style="width: 200px;height: 180px" id="upload-img1"
                                     @if(!empty($data)) src="@if(!empty($data)){{$data->qrcode}}@endif" @endif>
                                <div class="upload-btn">
                                    <div class="upload-new upload-new1">
                                        <span>添加图片</span>
                                        <input type="file" name="file" class="upload-file" id="upload-file1"
                                               onChange="uploadFile(1)"/>
                                    </div>
                                    <span class="upload-remove upload-remove1">移除图片</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">最小 </label>
                            <div class="col-md-7">
                                <input type="text" name="min" class="form-control"
                                       value="@if(!empty($data)){{$data->min}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">最大 </label>
                            <div class="col-md-7">
                                <input type="text" name="max" class="form-control"
                                       value="@if(!empty($data)){{$data->max}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">不控制 </label>
                            <div class="col-md-7">
                                <input type="text" name="bkz" class="form-control"
                                       value="@if(!empty($data)){{$data->bkz}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">一级收益(下注) </label>
                            <div class="col-md-7">
                                <input type="text" name="per_first" class="form-control"
                                       value="@if(!empty($data)){{$data->per_first}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">二级收益(下注) </label>
                            <div class="col-md-7">
                                <input type="text" name="per_second" class="form-control"
                                       value="@if(!empty($data)){{$data->per_second}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">三级收益(下注) </label>
                            <div class="col-md-7">
                                <input type="text" name="per_third" class="form-control"
                                       value="@if(!empty($data)){{$data->per_third}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">四级收益(下注) </label>
                            <div class="col-md-7">
                                <input type="text" name="per_fourth" class="form-control"
                                       value="@if(!empty($data)){{$data->per_fourth}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">五级收益(下注) </label>
                            <div class="col-md-7">
                                <input type="text" name="per_fifth" class="form-control"
                                       value="@if(!empty($data)){{$data->per_fifth}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">微信分享奖励(2次/日) </label>
                            <div class="col-md-7">
                                <input type="text" name="share_balance" class="form-control"
                                       value="@if(!empty($data)){{$data->share_balance/100}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">提现1元需要金币数 </label>
                            <div class="col-md-7">
                                <input type="text" name="per_tx" class="form-control"
                                       value="@if(!empty($data)){{$data->per_tx}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                        </div>
      <div class="form-group">
                            <label class="control-label col-md-4">最低提现金币数 </label>
                            <div class="col-md-7">
                                <input type="text" name="di" class="form-control"
                                       value="@if(!empty($data)){{$data->di}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="col-md-12">
                            <p class="form-control-static">充值收益请填写小于等于30的值，否则总佣金会超过充值数的30%</p>

                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-4">一级收益(充值) </label>
                            <div class="col-md-4">
                                <input type="text" name="r1" class="form-control"
                                       value="@if(!empty($data)){{$data->r1}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="btn btn-default" onclick="detail(1)">查看收益详情</button>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-4">二级收益(充值) </label>
                            <div class="col-md-4">
                                <input type="text" name="r2" class="form-control"
                                       value="@if(!empty($data)){{$data->r2}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="btn btn-default" onclick="detail(2)">查看收益详情</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">三级收益(充值) </label>
                            <div class="col-md-4">
                                <input type="text" name="r3" class="form-control"
                                       value="@if(!empty($data)){{$data->r3}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="btn btn-default" onclick="detail(3)">查看收益详情</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">四级收益(充值) </label>
                            <div class="col-md-4">
                                <input type="text" name="r4" class="form-control"
                                       value="@if(!empty($data)){{$data->r4}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="btn btn-default" onclick="detail(4)">查看收益详情</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">五级收益(充值) </label>
                            <div class="col-md-4">
                                <input type="text" name="r5" class="form-control"
                                       value="@if(!empty($data)){{$data->r5}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="btn btn-default" onclick="detail(5)">查看收益详情</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">六级收益(充值) </label>
                            <div class="col-md-4">
                                <input type="text" name="r6" class="form-control"
                                       value="@if(!empty($data)){{$data->r6}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="btn btn-default" onclick="detail(6)">查看收益详情</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">七级收益(充值) </label>
                            <div class="col-md-4">
                                <input type="text" name="r7" class="form-control"
                                       value="@if(!empty($data)){{$data->r7}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="btn btn-default" onclick="detail(7)">查看收益详情</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">八级收益(充值) </label>
                            <div class="col-md-4">
                                <input type="text" name="r8" class="form-control"
                                       value="@if(!empty($data)){{$data->r8}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="btn btn-default" onclick="detail(8)">查看收益详情</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">九级收益(充值) </label>
                            <div class="col-md-4">
                                <input type="text" name="r9" class="form-control"
                                       value="@if(!empty($data)){{$data->r9}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="btn btn-default" onclick="detail(9)">查看收益详情</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4">十级收益(充值) </label>
                            <div class="col-md-4">
                                <input type="text" name="r10" class="form-control"
                                       value="@if(!empty($data)){{$data->r10}}@endif"
                                       onkeyup="this.value=this.value.replace(/\D/g,'')"
                                       onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            </div>
                            <div class="col-md-4">
                                <button type="button" class="btn btn-default" onclick="detail(10)">查看收益详情</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-4"><span id="detail-title"></span> </label>
                            <div class="col-md-5">
                                <p class="form-control-static" id="detail-content"></p>
                            </div>
                        </div>

                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="control-label col-md-2">规则 </label>
                            <div class="col-md-9">
                        <textarea class="form-control" name="rule"
                                  rows="6">@if(!empty($data)){{$data->rule}}@endif</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="submit" id="submit" class="btn btn-primary" style="margin-bottom: 50px">提交</button>
        </div>
    </form>

@stop


{{--页面使用的js--}}
@section('js')
    @parent
    <script src="{{ config('oss.AdminOssUrl') }}/doom/js/fileupload/ajaxfileupload.js"></script>
    <script>
        function detail(level) {
            var str = '';
            for (var i = 1; i < level + 1; i++) {
                num = $('[name=r' + i + ']').val();
                if (i === level) {
                    str = "1级收益:" + num + "/30 " + str
                    break;
                }
                num1 = $('[name=r' + (i + 1) + ']').val();
                str = (level - i + 1) + "级收益:" + (num - num1) + "/30 " + str
            }
            $('#detail-title').text(level+"级收益详情")
            $('#detail-content').text(str)
        }


        function uploadFile(id) {
            $.ajaxFileUpload({
                url: '/admin/racing/platform/upload',            //需要链接到服务器地址
                secureuri: false,
                fileElementId: 'upload-file' + id,//文件选择框的id属性
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    $('.img-value' + id).val(data.url);
                    $('#upload-img' + id).attr('src', data.url);
                    //图片移除
                    $('.upload-new' + id + ' span').text('重新上传');
                    $('.upload-remove' + id).show();
                    $('.upload-remove' + id).on('click', function () {
                        $('.img-value' + id).val('');
                        $('#upload-img' + id).attr('src', '');
                        $(this).hide();
                        $('.upload-new' + id + ' span').text('上传图片');
                    });
                },
                error: function (data, status, e) {
                    alert(e);
                }
            });
        }

        $(function () {
            //isValid
            $('.form-horizontal').bootstrapValidator({
                fields: {}
            }).on('success.form.bv', function (e) {
                e.preventDefault();
                var $form = $(e.target);
                var bv = $form.data('bootstrapValidator');
                $.ajax({
                    url: '/admin/racing/platform/doEdit',
                    type: 'post',
                    async: false,
                    data: $form.serialize(),
                    success: function (data) {
                        xval = null;
                        if (data == 'true') {
                            window.location.href = "/admin/racing/platform/index";
                            $.msgbox({msg: "操作成功", icon: "success"});
                        } else
                            $.msgbox({msg: "操作失败", icon: "error"});
                    },
                    error: function () {
                        alert('与服务器通信失败，请稍后再试！');
                    }
                });
            })
        });
    </script>

@stop
