$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link-login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 给注册表单添加规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        //自定义一个pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //验证两次密码是否一致
        repwd: function(value) {
            //value：表单的值、
            var pwd = $('.reg-box [name="password"]').val();
            if (pwd !== value) {
                return '两次密码输入不一致！';
            }
        }
    });

    // 注册事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val()
        }
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！');
                //注册成功后将登录账号与密码清空
                $('#form_login [name="username"]').val('');
                $('#form_login [name="password"]').val('');
                $('#link-login').click();
            }
        });
    });

    //登录事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        });
    });

});