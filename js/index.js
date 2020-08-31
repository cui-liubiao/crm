$(function () {
    init();
    let $plan = $.Callbacks();
    $plan.add((_,baseInfo)=>{
        $(".baseBox>span").html(`你好,${baseInfo.name||''}`)
    })
    $plan.add((power)=>{
        console.log("渲染菜单：",power);
    })
    async function init() {
        let result = await axios.get("http://127.0.0.1:8888/user/login");
        // console.log(result);
        if (result.code!=0){
            alert("你还没有登录，请先登录.....")
            window.location.href="login.html";
            return ;
        }
        let [power,baseInfo] = await axios.all([
            axios.get("http://127.0.0.1:8888/user/power"),
            axios.get("http://127.0.0.1:8888/user/info")
        ])
        // console.log(power)
        // console.log(baseInfo)
        baseInfo.code===0 ? baseInfo = baseInfo.data : null;
        $plan.fire(power,baseInfo);
    }

    $(".baseBox").click(async function () {
        let result = await axios.get("http://127.0.0.1:8888/user/signout")
        if(result.code==0){
            window.location.href="login.html";
            return ;
        }
        alert("网络不给力，稍后再试")
    })
})