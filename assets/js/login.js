$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //自定义验证规则
    var form = layui.form;
    form.verify({
        //密码规则
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位,不能输入空格'],
        //确认密码规则
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            //比较
            if (value !== pwd) {
                return "两次密码输入不一致"
            }
        }
    })

    //注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        //阻止表单提交
        e.preventDefault();
        //发送Ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //提交成功后处理代码
                layer.msg('注册成功')
                //切换到登录表单
                $('#link_login').click()
                //重置form表单
                $("form_reg")[0].reset()
            }
        })
    })

    //登录功能 (给form标签绑定事件,button按钮触发提价事件)
    $('#form_login').submit(function (e) {
        e.preventDefault()
        //发送Ajax
        $.ajax({
            method: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                //保存token
                localStorage.setItem('token', res.token);
                //跳转
                location.href = "/index.html"
            }
        })
    })
})