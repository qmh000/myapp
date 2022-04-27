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
                    <input type="password" placeholder="密码">
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
                    <input type="password" placeholder="密码">
                </div>
            </div>
            <div class="stu-sys-account-password-confirm">
                <div class="stu-sys-account-item">
                    <input type="password" placeholder="确认密码">
                </div>
            </div>
            <div class="stu-sys-account-identity">
                <input type="radio" name="identity" value="管理员">管理员
                <input type="radio" name="identity" value="老师">老师
                <input type="radio" name="identity" value="学生">学生
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
        this.$login = this.$account.find(".stu-sys-account-login");
        this.$login.hide();
        this.$register = this.$account.find(".stu-sys-account-register");
        this.$register.hide();
        this.root.$stu_sys.append(this.$account);

        this.$login_username = this.$login.find(".stu-sys-account-username input");
        this.$login_password = this.$login.find(".stu-sys-account-password input");
        this.$login_submit = this.$login.find(".stu-sys-account-submit button");
        this.$login_error_messages = this.$login.find(".stu-sys-account-error-messages");
        this.$login_register = this.$login.find(".stu-sys-account-option");

        this.$register_username = this.$register.find(".stu-sys-account-username input");
        this.$register_password = this.$register.find(".stu-sys-account-password input");
        this.$register_password_confirm = this.$register.find(".stu-sys-account-password-confirm input");
        this.$register_submit = this.$register.find(".stu-sys-account-submit button");
        this.$register_error_messages = this.$register.find(".stu-sys-account-error-messages");
        this.$register_login = this.$register.find(".stu-sys-account-option");

        this.start();
    }
    start(){
        this.getinfo();

        this.add_listening_events();
    }

    add_listening_events() {
        this.add_listening_events_login();
        this.add_listening_events_register();
    }

    add_listening_events_login() {
        let outer = this;
        this.$login_register.click(function(){
            outer.register();
        });

        this.$login_submit.click(function(){
            outer.login_on_remote();
        });
    }

    add_listening_events_register() {
        let outer = this;

        this.$register_login.click(function(){
            outer.login();
        });

        this.$register_submit.click(function() {
            outer.register_on_remote();
        });
    }

    login_on_remote() {     // 登录远程服务器
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_messages.empty();

        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/account/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {
                    location.reload();
                }else{
                    outer.$login_error_messages.html(resp.result);
                }
            }
        });
    }

    register_on_remote() {       // 在远程服务器上注册
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        let identity = $("input[name='identity']:checked").val();
        this.$register_error_messages.empty();
        console.log(identity);
        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/account/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
                identity: identity,
            },
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {
                    location.reload();
                }else {
                    outer.$register_error_messages.html(resp.result);
                }
            }
        });
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
                    if(resp.identity === "管理员"){
                        outer.hide();
                        outer.root.admin.show();
                    }else if(resp.identity == "老师"){
                        outer.hide();
                        outer.root.teacher.show();
                    }else{
                        outer.hide();
                        outer.root.student.show();
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
class StuSysAdmin{
    constructor(root){
        this.root = root;

        this.$admin = $(`
<div class="stu-sys-admin">
    <div class="stu-sys-head">
        <div class="stu-sys-head-logo"></div>
        <div class="stu-sys-head-welcome"></div>
    </div>
    <div class="stu-sys-content">
        <div class="stu-sys-left">
            <div class="stu-sys-navigation">
                <div class="stu-sys-navigation-item stu-sys-navigation-item-notification">
                    通知公告
                </div>
                <div class="stu-sys-navigation-item">
                    学生管理
                </div>
                <div class="stu-sys-navigation-item">
                    教师管理
                </div>
                <div class="stu-sys-navigation-item">
                    课程管理
                </div>
                <div class="stu-sys-navigation-item">
                    退出登录
                </div>
            </div>
        </div>
        <div class="stu-sys-right">
            <div class="stu-sys-right-graphfield">
                <div class="stu-sys-right-graphfield-graph"></div>
            </div>
            <div class="stu-sys-right-admin-notification">
                <div class="stu-sys-right-admin-notification-title">通知公告</div>
                <div class="stu-sys-right-admin-notification-addition">您可以在此页发布有关通知</div>
                <div class="stu-sys-right-admin-notification-table">
                    <table id="table-notification" class="row-border table-notification-style">
                        <thead>
                            <tr>
                                <th class="table-notification-style-th1">通知公告</th>
                                <th class="table-notification-style-th2">发布时间</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <input type="button" class="admin-notification-add" value="添加">
                    <input type="button" class="admin-notification-delete" value="删除">
                </div>
            </div>
        </div>
    </div>
    <div class="stu-sys-foot">
        <div id="stu-sys-foot-date"></div>
    </div>
</div>
`)

        this.$stu_sys_right_graphfield = this.$admin.find(".stu-sys-right-graphfield");

        this.$stu_sys_right_admin_notification = this.$admin.find(".stu-sys-right-admin-notification");
        this.$stu_sys_right_admin_notification.hide();
        this.root.$stu_sys.append(this.$admin);

        this.$head_welcome = this.$admin.find(".stu-sys-head-welcome");
        this.$foot_date = this.$admin.find(".stu-sys-foot-date");

        this.$admin_notification = this.$admin.find(".stu-sys-navigation-item-notification");
        this.$admin_notification_add = this.$admin.find(".admin-notification-add");
        this.$admin_notification_delete = this.$admin.find(".admin-notification-delete");

        this.start();
    }

    start(){
        var data = [
            [
                "第一条通知",
                "2022-4-27",
            ],
            [
                "第二条通知",
                "2022-4-27",
            ]
        ];

        $(document).ready(function(){
            $('#table-notification').DataTable({
                data: data,
                select: true,
            });
        });


        this.get_foot_date();
        this.get_head_name();

        this.add_listening_events();
    }

    add_listening_events(){
        this.add_listening_events_notification();
    }

    add_listening_events_notification(){
        let outer = this;

        this.$admin_notification.click(function() {
            outer.$stu_sys_right_graphfield.hide();
            outer.$stu_sys_right_admin_notification.show();
        });

        this.$admin_notification_add.click(function(){
            outer.add_notification_to_remote();
        });
    }

    add_notification_to_remote(){
        let table = $('#table-notification').DataTable();
        console.log(table.rows({selected: true}).data());
    }

    get_head_name(){
       // 需要学生表
    }

    get_foot_date(){
        document.getElementById("stu-sys-foot-date").innerHTML = (new Date()).format1st("yyyyMd");
    }

    show(){
        this.$admin.show();
    }

    hide(){
        this.$admin.hide();
    }
}
class StuSysStudent{
    constructor(root){
        this.root = root;

        this.$student = $(`
<div>学生界面</div>
`)
        this.hide();
        this.root.$stu_sys.append(this.$student);
        this.start();
    }

    start(){
    }

    show(){
        this.$student.show();
    }

    hide(){
        this.$student.hide();
    }
}
class StuSysTeacher{
    constructor(root){
        this.root = root;

        this.$teacher = $(`
<div>老师界面</div>
`)
        this.hide();
        this.root.$stu_sys.append(this.$teacher);
        this.start();
    }

    start(){
    }

    show(){
        this.$teacher.show();
    }

    hide(){
        this.$teacher.hide();
    }
}
class StuSys{
    constructor(id){
        this.id = id;
        this.$stu_sys = $('#' + id);
        this.account = new StuSysAccount(this);
        this.admin = new StuSysAdmin(this);
        this.teacher = new StuSysTeacher(this);
        this.student = new StuSysStudent(this);

        this.start();
    }

    start(){
    }
}
