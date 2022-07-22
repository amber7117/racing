var table = null;
$(function(){

	table = $('#logTable').DataTable({
		serverSide: true, // 服务器 模式
		processing: true,
		lengthMenu: [ [10, 20,30, 50],[10, 20,30, 50]],
		pagingType: "full_numbers",//full_numbers ,numbers ,simple,simple_numbers
		sort:false,
		stateSave: true,
		start:0,  //起始数
		ajax: {
			"url": "/admin/racing/log/log/searchPage",
			type: 'get', // 默认get吧
			"data": function ( data ) {
				// data.status = $('#status').val();
			}
		},
		responsive: true,
		autoWidth: false,
		"fnDrawCallback": function(){
			this.api().column(0).nodes().each(function(cell, i) {
				cell.innerHTML =  i + 1;
			});
		},
		columns: [
			{"data": null,"sClass" : "text-center","width":"8%"},
            {"data": "create_date","sClass" : "text-center","width":"10%"},
            {"data": "right_str","sClass" : "text-center","width":"10%"},
            {"data": "per","sClass" : "text-center","width":"10%"},
            {
                "data": "create_time", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    var btns = [];
                    var editBtn = '<a href="/admin/racing/log/log/detail?create_time=' + data + '"  title="详情" class="btn default btn-xs">详情</a>';
                    btns.push(editBtn);
                    return btns.join(' ');
                },
            }
        ],
		dom: 'flrtip',
		"oLanguage": {
			'sSearch': '搜索期数:',
			'sSearchPlaceholder': '请输入关键字',
			"sLengthMenu": "每页显示 _MENU_ 项记录",
			"sZeroRecords": "没有符合项件的数据...",
			"sInfoEmpty": "显示 0 至 0 共 0 项",
			"sInfoFiltered": "(_MAX_)",
			"sInfo": "当前数据为从第 _START_ 到第 _END_ 项数据；总共有 _TOTAL_ 项记录",
			"oPaginate" : {
				"sFirst" : "首页",
				"sPrevious" : "上一页",
				"sNext" : "下一页",
				"sLast" : "末页"
			},
		}

	});

});
function update(url){
	$('#baseModal').modal({
		remote: url,
		show:false
	}).on('loaded.bs.modal', function (e) {
		$(this).modal('show');
	});
}

