<!-- 表单验证 -->
<link href="{{ config('oss.AdminOssUrl') }}/doom/css/plugins/bootstrap-validator/bootstrapValidator.min.css" rel="stylesheet">

<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal"
		aria-label="Close">
		<span aria-hidden="true">&times;</span>
	</button>
	<h4 class="modal-title">编辑充值类型</h4>
</div>
<!-- BEGIN 表单-->
<form action="/admin/auth/user/doEdit" id="validation-form" class="form-horizontal">
	<div class="modal-body">
		<input type="hidden" name="id" id="user_id" value="@if(!empty($data)){{$data->id}}@endif" />
		<div class="form-body">
			<div class="form-group">
				<label class="control-label col-md-4">充值类型名称 </label>
				<div class="col-md-5">
					<input type="text" value="@if(!empty($data)){{$data->title}}@endif" id="title" name="title" placeholder="充值类型名称" class="form-control" />
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-md-4">价格 </label>
				<div class="col-md-5">
					<input type="text" name="price" class="form-control"
						   value="@if(!empty($data)){{$data->price/100}}@endif"
						   onkeyup="this.value=this.value.replace(/\D/g,'')"
						   onafterpaste="this.value=this.value.replace(/\D/g,'')">
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-md-4">获得金币 </label>
				<div class="col-md-5">
					<input type="text" name="in_price" class="form-control"
						   value="@if(!empty($data)){{$data->in_price/100}}@endif"
						   onkeyup="this.value=this.value.replace(/\D/g,'')"
						   onafterpaste="this.value=this.value.replace(/\D/g,'')">
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="submit" class="btn btn-primary">保存</button>
		<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	</div>
</form>

<script>
	$(function() {
		//isValid
		$('.form-horizontal').bootstrapValidator({
			fields: {
                title: {
                    validators: {
                        notEmpty: {
                            message: '请输入标题'
                        }
                    }
                },
                price: {
                    validators: {
                        notEmpty: {
                            message: '请输入价格'
                        }
                    }
                },
                in_price: {
					validators: {
						notEmpty: {
							message: '请输入获得金币'
						}
					}
				}
			}
		}).on('success.form.bv', function(e) {
			e.preventDefault();
			var $form = $(e.target);
			var bv = $form.data('bootstrapValidator');
			$.ajax({
				url:'/admin/racing/recharge/doEdit',
				type:'post',
				async:false,
				data:$form.serialize(),
				success:function(data){
					xval = null;
					if(data == 'true'){
						$('.modal').modal('hide');
						table.ajax.reload();
						$.msgbox({msg:"操作成功",icon:"success"});
					}else
						$.msgbox({msg:"操作失败",icon:"error"});
				},
				error:function(){
					alert('与服务器通信失败，请稍后再试！');
				}
			});
		})
	});
</script>
