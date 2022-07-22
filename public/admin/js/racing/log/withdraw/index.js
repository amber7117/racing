var table = null;
$(function(){

    table = $('#withdrawTable').DataTable({
        serverSide: true, // 服务器 模式
        processing: true,
        lengthMenu: [ [10, 20,30, 50],[10, 20,30, 50]],
        pagingType: "full_numbers",//full_numbers ,numbers ,simple,simple_numbers
        sort:false,
        stateSave: true,
        start:0,  //起始数
        ajax: {
            "url": "/admin/racing/log/withdraw/searchPage",
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
            var $filter = $('#withdrawTable_filter');
            var $search1Label = $('<label>搜索用户ID：</label>');

            var $search1 = $('<input id="search1" class="form-control input-sm" />');
            $filter.append($search1Label.append($search1.on("input", function() {
                table.ajax.reload();
            })))
        },
        columns: [
            {"data": null,"sClass" : "text-center","width":"8%"},
            {"data": "order_no","sClass" : "text-center","width":"10%"},
            {"data": "m_id", "sClass": "text-center", "width": "10%"},
            {
                "data": "spend_price", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    return data/100;
                },
            },
            {
                "data": "price", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    return data/100;
                },
            },
            {"data": "info","sClass" : "text-center","width":"10%"},
            {"data": "info1","sClass" : "text-center","width":"10%",
                "render": function (data, type, full) {
                    return "<img src='"+data+"' width='100px' height='100px' />"
                },
            },
            {"data": "name","sClass" : "text-center","width":"10%"},

            {
                "data": "status", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    if (data === 1){
                        return '未发放'
                    } else if (data === 2){
                        return '已发放'
                    } else
                        return ''
                },
            },
            {"data": "create_date","sClass" : "text-center","width":"10%"},
            {"data": "id","sClass" : "text-center","width":"30%",
                "render":function( data, type, full){
                    var btns = [];
                    var islockBtn = '';
                    if(full["status"] == 1)
                        islockBtn = '<a href="javascript:;" title="发放" onclick="isOpen(\''+data+'\',\'2\');return false;" class="btn default btn-xs"><i class="fa fa-check-circle"></i>发放</a>';
                    // else
                    //     islockBtn = '<a href="javascript:;" title="启用" onclick="isOpen(\''+data+'\',\'1\');return false;" class="btn default btn-xs"><i class="fa fa-check-circle"></i>启用</a>';
                    btns.push(islockBtn);
                    var editBtn = '<a href="javascript:;"  onclick="update(\'/admin/racing/log/withdraw/detail?id=' + data + '\');return false;" title="查看大图" class="btn default btn-xs"><i class="fa fa-edit"></i>查看大图</a>';
                    btns.push(editBtn);
                    return btns.join(' ');
                },
            }
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

//启用/禁用
function isOpen(id,status){
    $.ajax({
        url:'/admin/racing/log/withdraw/isOpen',
        type:'post',
        async:false,
        data:{
            'id':id,
            'status':status
        },
        success:function(data){
            if(data == 'true'){
                table.ajax.reload(null,false);
                $.msgbox({msg:"操作成功",icon:"success"});
            }
            else{
                $.msgbox({msg:"操作失败",icon:"error"});
            }
        },
        error:function(){
            alert('与服务器通信失败，请稍后再试！');
        }
    });
}
