$.ajaxPrefilter(function(options) {
    //发起ajax请求时，统一拼接根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    //统一为有权限的接口设置headers请求头
    options.headers = {
        Authorization: localStorage.getItem('token') || ''
    }

})