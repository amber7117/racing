<!-- 表单验证 -->
<link href="{{ config('oss.AdminOssUrl') }}/doom/css/plugins/bootstrap-validator/bootstrapValidator.min.css" rel="stylesheet">

<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal"
		aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
	<h4 class="modal-title">编辑公告</h4>
</div>
<!-- BEGIN 表单-->
<form action="/admin/auth/user/doEdit" id="validation-form" class="form-horizontal">
	<div class="modal-body">
		<input type="hidden" name="id" id="user_id" value="@if(!empty($data)){{$data->id}}@endif" />
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">一级： </label>
				<label class="control-label col-md-5">@if(!empty($data)){{$data->first_id}}@endif</label>
			</div>
		</div>
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">二级： </label>
				<label class="control-label col-md-5">@if(!empty($data)){{$data->second_id}}@endif</label>
			</div>
		</div>
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">三级： </label>
				<label class="control-label col-md-5">@if(!empty($data)){{$data->third_id}}@endif</label>
			</div>
		</div>
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">四级： </label>
				<label class="control-label col-md-5">@if(!empty($data)){{$data->fourth_id}}@endif</label>
			</div>
		</div>
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">五级： </label>
				<label class="control-label col-md-5">@if(!empty($data)){{$data->fifth_id}}@endif</label>
			</div>
		</div>
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">六级： </label>
				<label class="control-label col-md-5">@if(!empty($data)){{$data->sixth_id}}@endif</label>
			</div>
		</div>
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">七级： </label>
				<label class="control-label col-md-5">@if(!empty($data)){{$data->seventh_id}}@endif</label>
			</div>
		</div>
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">八级： </label>
				<label class="control-label col-md-5">@if(!empty($data)){{$data->eighth_id}}@endif</label>
			</div>
		</div>
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">九级： </label>
				<label class="control-label col-md-5">@if(!empty($data)){{$data->ninth_id}}@endif</label>
			</div>
		</div>
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">十级： </label>
				<label class="control-label col-md-5">@if(!empty($data)){{$data->tenth_id}}@endif</label>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		{{--<button type="submit" class="btn btn-primary">保存</button>--}}
		<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	</div>
</form>

