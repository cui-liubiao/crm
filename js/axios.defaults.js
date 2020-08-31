//对axios二次封装
axios.defaults.baseURI="http://localhost:8888";
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