$(function() {
    // 调用用户的信息
    getUserInfo();
    // 给退出按钮绑定点击事件
    $('#btnLogout').on('click', function() {
        layer.confirm('确认退出登录吗?', {
            icon: 3,
            title: '提示'
        }, function(index) {
            // 退出清空token，跳转登录页面
            localStorage.removeItem('token');
            location.href = '/login.html';
            //官方提供关闭询问框
            layer.close(index);
        });
    })
})

var layer = layui.layer;

//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败！');
            }
            renderAvatar(res.data);
        },
        complete: function(res) {
            if (res.responseJSON.message === '身份认证失败！' && res.responseJSON.status === 1) {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    })
}

//渲染用户信息
function renderAvatar(user) {
    // 获取用户昵称
    var name = user.nickname || user.username;
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;' + name);
    // 渲染用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}