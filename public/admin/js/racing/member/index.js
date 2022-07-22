var table = null;
$(function () {
    table = $('#memberTable').DataTable({
        serverSide: true, // 服务器 模式
        processing: true,
        pagingType: "full_numbers",//full_numbers ,numbers ,simple,simple_numbers
        sort: false,
        start: 0,  //起始数
        ajax: {
            "url": "/admin/racing/member/searchPage",
            type: 'GET', // 默认get吧
            "data": function (data) {
            }
        },
        "lengthMenu": [[10, 20, 30, 50], [10, 20, 30, 50]],
        responsive: true,
        autoWidth: false,
        // scrollX: true,
        "columns": [
            {"data": "id", "sClass": "text-center", "width": "10%"},
            {"data": "nickname", "sClass": "text-center", "width": "10%"},
            {"data": "head_image", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    return '<img style="width: 50px;height: 50px;" src="'+data+'" />';
                },
            },
            {"data": "balance", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                return data/100;
                    // return '<div class="input-group"><input value="' + data/100 + '" type="text" style="width:100%" class="form-control">' +
                    //     '<span class="input-group-btn" onclick="setBalance(\'' + full['id'] + '\',this)"> <button type="button"  class="btn btn-primary"><i class="fa fa-check"></i></button> </span></div>';
                },
            },
            {"data": "profit", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    return data/100;
                },
            },
            {"data": "status", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    if(data == 2)
                        return ' <span class="label label-sm label-danger"> 禁用 </span>';
                    else if(data == 1)
                        return '<span class="label label-sm label-success"> 启用 </span>';
                    return "";
                },
            },
            {"data": "is_admin", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    if(data == 2)
                        return ' <span class="label label-sm label-danger"> 普通用户 </span>';
                    else if(data == 1)
                        return '<span class="label label-sm label-success"> 模板消息管理员 </span>';
                    return "";
                },
            },
            {"data": "create_date", "sClass": "text-center", "width": "10%"},
            {
                "data": "id", "sClass": "text-center", "width": "10%",
                "render": function (data, type, full) {
                    var btns = [];
                    var editBtn ='<a href="javascript:;"  onclick="update(\'/admin/racing/member/update?id='+data+'\');return false;" title="详情" class="btn default btn-xs">详情</a>';
                    btns.push(editBtn);
                    var edit1Btn ='<a href="javascript:;"  onclick="update(\'/admin/racing/member/balancePage?id='+data+'\');return false;" title="修改余额" class="btn default btn-xs">修改余额</a>';
                    btns.push(edit1Btn);
                    var islockBtn = '';
                    if(full["status"] === 1)
                        islockBtn = '<a href="javascript:;" title="禁用" onclick="isOpen(\''+data+'\',\'2\');return false;" class="btn default btn-xs"><i class="fa fa-minus-circle"></i>禁用</a>';
                    else
                        islockBtn = '<a href="javascript:;" title="启用" onclick="isOpen(\''+data+'\',\'1\');return false;" class="btn default btn-xs"><i class="fa fa-check-circle"></i>启用</a>';
                    btns.push(islockBtn);
                    var isAdminBtn = '';
                    if(full["is_admin"] === 1)
                        isAdminBtn = '<a href="javascript:;" title="取消管理员" onclick="isAdmin(\''+data+'\',\'2\');return false;" class="btn default btn-xs"><i class="fa fa-minus-circle"></i>取消管理员</a>';
                    else
                        isAdminBtn = '<a href="javascript:;" title="设置管理员" onclick="isAdmin(\''+data+'\',\'1\');return false;" class="btn default btn-xs"><i class="fa fa-check-circle"></i>设置管理员</a>';
                    btns.push(isAdminBtn);
                    var delBtn = '<a href="javascript:;" title="删除" onclick="isOpen(\''+data+'\',\'-1\');return false;" class="btn default btn-xs"><i class="fa fa-remove"></i>删除</a>';
                    btns.push(delBtn);
                    return btns.join(' ');
                },
            }
        ],
        dom: 'flrtip',
        "oLanguage": {
            'sSearch': '查询会员编号:',
            'sSearchPlaceholder': '请输入关键字',
            "sLengthMenu": "每页显示 _MENU_ 项记录",
            "sZeroRecords": "没有符合项件的数据...",
            "sInfo": "当前数据为 _START_ - _END_ 条数据；总共 _TOTAL_ 项记录",
            "sInfoEmpty": "显示 0 至 0 共 0 项",
            "sInfoFiltered": "(_MAX_)",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上一页",
                "sNext": "下一页",
                "sLast": "末页"
            },
        },

    });

});

// 模态框
function update(url) {
    $('#baseModal').modal({
        remote: url,
        show: false
    }).on('loaded.bs.modal', function (e) {
        $(this).modal('show');
    });
}

function setBalance(id,dom){
    var num = $(dom).prev().val();
    $.ajax({
        url:'/admin/racing/member/balance',
        type:'post',
        async:false,
        data:{
            'id':id,
            'num':num
        },
        success:function(data){
            if(data == 'true') {
                window.location.reload();
                $.msgbox({msg: "修改成功", icon: "success"});
            } else
                $.msgbox({msg:"修改失败",icon:"error"});

        },
        error:function(){
            alert('与服务器通信失败，请稍后再试！');
        }
    });
}


//修改状态
function isOpen(id,status) {
    if (status < 0){
        if (confirm('您确定要删除吗？')) {
            $.ajax({
                url: '/admin/racing/member/isOpen',
                type: 'post',
                async: false,
                data: {
                    'id': id,
                    'status': status
                },
                success: function (data) {
                    if (data == 'true') {
                        table.ajax.reload();
                        $.msgbox({msg: "操作成功", icon: "success"});
                    }
                    else
                        $.msgbox({msg: "操作失败", icon: "error"});
                },
                error: function () {
                    alert('与服务器通信失败，请稍后再试！');
                }
            });
        }
    } else{
        $.ajax({
            url: '/admin/racing/member/isOpen',
            type: 'post',
            async: false,
            data: {
                'id': id,
                'status': status
            },
            success: function (data) {
                if (data == 'true') {
                    table.ajax.reload();
                    $.msgbox({msg: "操作成功", icon: "success"});
                }
                else
                    $.msgbox({msg: "操作失败", icon: "error"});
            },
            error: function () {
                alert('与服务器通信失败，请稍后再试！');
            }
        });
    }

}


//修改状态
function isAdmin (id,status) {
        $.ajax({
            url: '/admin/racing/member/isAdmin',
            type: 'post',
            async: false,
            data: {
                'id': id,
                'status': status
            },
            success: function (data) {
                if (data == 'true') {
                    table.ajax.reload();
                    $.msgbox({msg: "操作成功", icon: "success"});
                }
                else
                    $.msgbox({msg: "操作失败", icon: "error"});
            },
            error: function () {
                alert('与服务器通信失败，请稍后再试！');
            }
        });

}
