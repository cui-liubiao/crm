//对axios二次封装
axios.defaults.baseURI="http://127.0.0.1:8888";
axios.defaults.withCredentials = true;
//数据以表单的形式扔给服务器
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data){
    if (!data) return data;
    let result = ``;
    for (let attr in data){
        if (!data.hasOwnProperty(attr)) break;
        result +=`&${attr}=${data[attr]}`;
    }
    return result.substring(1);
}

// 配置响应拦截器
axios.interceptors.response.use(response=> {
    return response.data;
}, reason=> {
    // 如果路径出错了，通过会返回404 还有一些其它错误....
    // console.dir(reason)
    if(reason.response){
        switch (String(reason.response.status)) {
            case "404":
                alert("当前请求的地址不存在！")
                break;
            default:
                break;
        }
    }
    //　直接创建出一个失败的promise
    return Promise.reject(reason);
})
axios.defaults.validateStatus = function (status) {
    return /^(2|3)\d{2}$/.test(status);
}