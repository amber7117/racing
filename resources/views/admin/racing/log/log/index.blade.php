@extends('admin.base.doom')

{{--页面名,统一名可在doom中修改，此处不引用--}}
@section('title','记录管理')

{{--页面css--}}
@section('css')
	@parent
	<link href="{{ config('oss.AdminOssUrl') }}/doom/css/plugins/dataTables/datatables.min.css" rel="stylesheet">
@stop

{{--页面标题,统一标题可在doom中修改，此处不引用--}}
@section('titlename','游戏记录列表')

{{--面包屑部分--}}
@section('crumbs')
	<ol class="breadcrumb">
		<li>
			<a>记录管理</a>
		</li>
		<li class="active">
			<strong>游戏记录列表</strong>
		</li>
	</ol>
	@stop

{{--页面内容--}}
@section('content')
	@parent
	<div class="wrapper wrapper-content animated fadeInRight">
		<div class="row">
			<div class="col-lg-12">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<div class="row">
							<div class="col-lg-11">
								<h3>游戏记录列表</h3>
							</div>
							<div class="col-lg-1">
							</div>
						</div>
					</div>
					<div class="ibox-content">
						<!-- 表格 -->
						<div class="table-responsive">
							<table class="table table-striped table-bordered table-hover" id="logTable">
								<thead>
								<tr>
									<th>序号</th>
									<th>期数</th>
									<th>结果</th>
									<th>倍数</th>
									<th>操作</th>
								</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 底部 -->
	<!-- 模态框 -->
	<div class="modal fade" id="baseModal">
		<div class="modal-dialog">
			<div class="modal-content">
			</div>
		</div>
	</div>
@stop

{{--页面使用的js--}}
@section('js')
	@parent
	<script src="{{ config('oss.AdminOssUrl') }}/doom/js/plugins/dataTables/datatables.min.js"></script>
	<script src="{{ config('oss.AdminOssUrl') }}/doom/js/plugins/message/message.min.js"></script>
	<script src="{{ config('oss.AdminOssUrl') }}/admin/js/racing/log/log/index.js"></script>
@stop

