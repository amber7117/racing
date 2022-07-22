var table = null;
$(function () {

    table = $('#detailTable').DataTable({
        serverSide: true, // 服务器 模式
        processing: true,
        lengthMenu: [[10, 20, 30, 50], [10, 20, 30, 50]],
        pagingType: "full_numbers",//full_numbers ,numbers ,simple,simple_numbers
        sort: false,
        stateSave: true,
        start: 0,  //起始数
        ajax: {
            "url": "/admin/racing/log/log/detailPage?create_time=" + create_time,
            type: 'get', // 默认get吧
            "data": function (data) {
                // data.status = $('#status').val();
            }
        },
        responsive: true,
        autoWidth: false,
        "fnDrawCallback": function () {
            this.api().column(0).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        },
        // initComplete: function() {
        // 	var $filter = $('#logTable_filter');
        // 	var $statusLabel = $('<label></label>');
        //
        //     var $status = $('<select id="status" class="form-control input-sm" name="status"><option value="0">请选择记录类型</option><option value="1">博饼记录</option><option value="2">个人博饼奖励</option></select>');
        //     $filter.append($statusLabel.append($status.on("change", function() {
        //         table.ajax.reload();
        //     })))
        // },
        columns: [
            {"data": null, "sClass": "text-center", "width": "8%"},
            {"data": "m_id", "sClass": "text-center", "width": "10%"},
            {
                "data": "head_image", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    return "<img src='" + data + "' style='width: 50px;height: 50px'/>";
                },
            },
            {"data": "choose_str", "sClass": "text-center", "width": "10%",},
            {
                "data": "spend_num", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    return data / 100;
                }
            },
            {
                "data": "status", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    if (data === 2)
                        return '中奖';
                    else if (data === 1)
                        return '未中奖';
                    else
                        return '未开奖';
                }
            },
            {
                "data": "num", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    if (full['status'] === 2)
                        return data / 100;
                    else
                        return 0;
                }
            },
            {"data": "right_str", "sClass": "text-center", "width": "10%",},
            {"data": "per","sClass" : "text-center","width":"10%",},
        ],
        dom: 'flrtip',
        "oLanguage": {
            'sSearch': '搜索用户会员编号:',
            'sSearchPlaceholder': '请输入关键字',
            "sLengthMenu": "每页显示 _MENU_ 项记录",
            "sZeroRecords": "没有符合项件的数据...",
            "sInfoEmpty": "显示 0 至 0 共 0 项",
            "sInfoFiltered": "(_MAX_)",
            "sInfo": "当前数据为从第 _START_ 到第 _END_ 项数据；总共有 _TOTAL_ 项记录",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上一页",
                "sNext": "下一页",
                "sLast": "末页"
            },
        }

    });

});

function update(url) {
    $('#baseModal').modal({
        remote: url,
        show: false
    }).on('loaded.bs.modal', function (e) {
        $(this).modal('show');
    });
}

