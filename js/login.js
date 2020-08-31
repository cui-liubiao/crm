$(function () {
    $(".submit").click(async function (e) {
        e.preventDefault();
        let account = $(".userName").val().trim();
        let password = $(".userPass").val().trim();

        if (account ===""||password===""){
            alert("账号密码不能为空");
            return;
        }
        password = md5(password);
        // console.log(account,password)
        //发起ajax请求
        let res = await axios.post("/user/login",{account,password})
        if(parseInt(res.code)===0){
            alert("登录成功")
            window.location.href="index.html";
            return ;
        }
        alert("用户名和密码错误")
    })
})