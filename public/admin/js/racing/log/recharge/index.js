var table = null;
$(function(){

    table = $('#rechargeTable').DataTable({
        serverSide: true, // 服务器 模式
        processing: true,
        lengthMenu: [ [10, 20,30, 50],[10, 20,30, 50]],
        pagingType: "full_numbers",//full_numbers ,numbers ,simple,simple_numbers
        sort:false,
        stateSave: true,
        start:0,  //起始数
        ajax: {
            "url": "/admin/racing/log/recharge/searchPage",
            type: 'get', // 默认get吧
            "data": function ( data ) {
                data.search1 = $('#search1').val();
            }
        },
        responsive: true,
        autoWidth: false,
        "fnDrawCallback": function(){
            this.api().column(0).nodes().each(function(cell, i) {
                cell.innerHTML =  i + 1;
            });
        },
        initComplete: function() {
            var $filter = $('#rechargeTable_filter');
            var $search1Label = $('<label>搜索用户ID：</label>');

            var $search1 = $('<input id="search1" class="form-control input-sm" />');
            $filter.append($search1Label.append($search1.on("input", function() {
                table.ajax.reload();
            })))
        },
        columns: [
            {"data": null,"sClass" : "text-center","width":"8%"},
            {"data": "order_no","sClass" : "text-center","width":"10%"},
            {"data": "wechat_no","sClass" : "text-center","width":"10%"},

            {"data": "m_id", "sClass": "text-center", "width": "10%"},
            {
                "data": "price", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    return data/100;
                },
            },
            {
                "data": "status", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    if (data === 1){
                        return '未支付'
                    } else if (data === 2){
                        return '已支付'
                    } else
                        return ''
                },
            },
            {"data": "create_date","sClass" : "text-center","width":"10%"},

        ],
        dom: 'flrtip',
        "oLanguage": {
            'sSearch': '搜索订单号:',
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

