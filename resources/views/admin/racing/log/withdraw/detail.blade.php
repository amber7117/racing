<!-- 表单验证 -->
<link href="{{ config('oss.AdminOssUrl') }}/doom/css/plugins/bootstrap-validator/bootstrapValidator.min.css" rel="stylesheet">

<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal"
		aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
	<h4 class="modal-title">查看详情</h4>
</div>
<!-- BEGIN 表单-->
<form action="/admin/auth/user/doEdit" id="validation-form" class="form-horizontal">
	<div class="modal-body">
		<input type="hidden" name="id" id="user_id" value="@if(!empty($data)){{$data->id}}@endif" />
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">微信收款码 </label>
				<div class="col-md-5">
					<img src="@if(!empty($data)){{$data->info1}}@endif" style="max-width: 500px;
      max-height: 500px;">
				</div>
			</div>

		</div>
	</div>
	<div class="modal-footer">
		{{--<button type="submit" class="btn btn-primary">保存</button>--}}
		<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	</div>
</form>

