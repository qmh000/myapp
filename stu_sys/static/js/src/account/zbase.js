class StuSysAccount{
    constructor(root){
        this.root = root;

        this.$account = $(`
<div class="stu-sys-account">
    <div class="stu-sys-account-logo">
    </div>
    <br>
    <div class="stu-sys-account-left">
        <div class="stu-sys-account-graph">
        </div>
    </div>
    <div class="stu-sys-account-right">
        <div class="stu-sys-account-headline">
        计算机辅修专业课程管理系统
        </div>
        <div class="stu-sys-account-login">
            <div class="stu-sys-account-title">
                登录
            </div>
            <div class="stu-sys-account-username">
                <div class="stu-sys-account-item">
                    <input type="text" placeholder="用户名">
                </div>
            </div>
            <div class="stu-sys-account-password">
                <div class="stu-sys-account-item">
                    <input type="text" placeholder="密码">
                </div>
            </div>
            <div class="stu-sys-account-submit">
                <div class="stu-sys-account-item">
                    <button>登录</button>
                </div>
            </div>
            <div class="stu-sys-account-error-messages">
            </div>
            <div class="stu-sys-account-option">
                注册
            </div>
        </div>
        <div class="stu-sys-account-register">
            <div class="stu-sys-account-title">
                注册
            </div>
            <div class="stu-sys-account-username">
                <div class="stu-sys-account-item">
                    <input type="text" placeholder="用户名">
                </div>
            </div>
            <div class="stu-sys-account-password">
                <div class="stu-sys-account-item">
                    <input type="text" placeholder="密码">
                </div>
            </div>
            <div class="stu-sys-account-password_confirm">
                <div class="stu-sys-account-item">
                    <input type="text" placeholder="确认密码">
                </div>
            </div>
            <div class="stu-sys-account-submit">
                <div class="stu-sys-account-item">
                    <button>注册</button>
                </div>
            </div>
            <div class="stu-sys-account-error-messages">
            </div>
            <div class="stu-sys-account-option">
                登录
            </div>
        </div>
    </div>
</div>
`);
        this.$login = this.$account.find(".stu-sys-account-login")
        this.$login.hide();
        this.$register = this.$account.find(".stu-sys-account-register")
        this.$register.hide();
        this.root.$stu_sys.append(this.$account);


        this.start();
    }
    start(){
        this.getinfo();
    }
    register() {   // 打开注册界面
        this.$login.hide();
        this.$register.show();
    }

    login() {    // 打开登陆界面
        this.$register.hide();
        this.$login.show();
    }

    getinfo(){
        let outer = this;

        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/account/getinfo/",
            type: "GET",
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {
                    outer.hide();
                    if(resp.identity === "admin"){
                        // 进入管理员页面
                    }else if(resp.identity == "teacher"){
                        // 进入老师页面
                    }else{
                        // 进入学生页面
                    }
                }else {
                    outer.login();
                }
            }

        });
    }

    hide() {
        this.$account.hide();
    }

    show() {
        this.$account.show();
    }
}
