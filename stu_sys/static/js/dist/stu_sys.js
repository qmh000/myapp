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

    logout_on_remote() {     // 在远程服务器上登出
        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/account/logout/",
            type: "GET",
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {
                    location.reload();
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
                <div class="stu-sys-navigation-item admin-navigation-item-notification">
                    通知公告
                </div>
                <div class="stu-sys-navigation-item admin-navigation-item-student">
                    学生管理
                </div>
                <div class="stu-sys-navigation-item admin-navigation-item-teacher">
                    教师管理
                </div>
                <div class="stu-sys-navigation-item admin-navigation-item-course">
                    课程管理
                </div>
                <div class="stu-sys-navigation-item admin-navigation-item-logout">
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
                    <table id="admin-notification-table" class="row-border table-notification-style">
                        <thead>
                            <tr style="width=100% !important">
                                <th class="table-notification-style-th1">通知公告</th>
                                <th class="table-notification-style-th2">发布时间</th>
                            </tr>
                        </thead>
                    </table>
                    <input type="button" class="admin-notification-detail" value="查看">
                    <input type="button" class="admin-notification-add" value="添加">
                    <input type="button" class="admin-notification-delete" value="删除">
                </div>
            </div>
            <div class="stu-sys-right-admin-notification-form">
                <form>
                    <h3>通知公告</h3>
                    <div class="stu-sys-right-form-item">
                        <label>标题:</label>
                        <input type="text" placeholder="请输入通知标题"></div>
                    <div class="stu-sys-right-form-item">
                        <label>通知内容:</label>
                        <textarea rows=6%></textarea>
                    </div>
                    <span class="stu-sys-right-form-button stu-sys-right-admin-notification-form-button">提交</span>
                </form>
            </div>
            <div class="stu-sys-right-admin-student-manage">
                <div class="stu-sys-right-admin-student-manage-title">学生管理</div>
                <div class="stu-sys-right-admin-student-manage-addition">您可以在此页面检索学生信息，修改学生信息</div>
                <div class="stu-sys-right-admin-student-manage-search">
                    <select class="stu-sys-right-admin-student-manage-select" id="admin-student-manage-select-minior">
                        <option>所有专业</option>
                        <option>计算机科学与技术</option>
                        <option>软件工程</option>
                        <option>人工智能</option>
                    </select>
                    <select class="stu-sys-right-admin-student-manage-select" id="admin-student-manage-select-class">
                        <option>所有班级</option>
                        <option>2018级1班</option>
                        <option>2019级1班</option>
                        <option>2020级1班</option>
                    </select>
                    <select class="stu-sys-right-admin-student-manage-select" id="admin-student-manage-select-dept">
                        <option>所有学院</option>
                        <option>文学与传媒学院</option>
                        <option>历史学院</option>
                        <option>化学化工学院</option>
                        <option>旅游学院</option>
                        <option>艺术学院</option>
                        <option>教师教育学院</option>
                        <option>外国语学院</option>
                        <option>数学与统计学院</option>
                        <option>物理与电子工程学院</option>
                    </select>
                    <input type="button" value="检索" class="stu-sys-right-admin-student-manage-search-button">
                </div>
                <div class="stu-sys-right-admin-student-manage-table">
                    <table id="admin-student-manage-table" class="display">
                        <thead>
                            <tr>
                                <th>学生姓名</th>
                                <th>性别</th>
                                <th>年龄</th>
                                <th>学院</th>
                                <th>辅修专业</th>
                                <th>辅修班级</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <input type="button" value="修改" class="stu-sys-right-admin-student-manage-modify-button">
                </div>
            </div>
            <div class="stu-sys-right-admin-student-manage-form">
                <form>
                    <div style="font-weight: bold;">个人信息</div>
                    <div class="stu-sys-right-form-item">
                        <label id="admin-student-info-form-show-name">姓名:</label>
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label id="admin-student-info-form-show-sex">性别:</label>
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label id="admin-student-info-form-show-age">年龄:</label>
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label id="admin-student-info-form-show-dept">所属院系:</label>
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>辅修专业:</label>
                        <input type="text" class="admin-student-info-modify-minor" placeholder="请输入辅修专业">
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>辅修班级:</label>
                        <input type="text" class="admin-student-info-modify-class" placeholder="请输入辅修班级">
                    </div>
                    <span class="stu-sys-right-form-button admin-student-info-modify-submit">提交</span>
                </form>
            </div>
            <div class="stu-sys-right-admin-course-manage">
                <div class="stu-sys-right-admin-course-manage-title">课程管理</div>
                <div class="stu-sys-right-admin-course-manage-addition">您可以在此页面查询课程，添加课程，删除课程</div>
                <div class="stu-sys-right-admin-course-manage-table">
                    <table id="admin-course-manage-table" class="row-border">
                        <thead>
                            <tr>
                                <th>课程名称</th>
                                <th>任课老师</th>
                                <th>学时</th>
                                <th>学分</th>
                                <th>开课班级</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <input type="button" class="admin-course-info-button-add" value="添加">
                    <input type="button" class="admin-course-info-button-delete" value="删除">
                </div>
            </div>
            <div class="stu-sys-right-admin-course-info-add">
                <form>
                    <div style="font-weight: bold;">课程信息</div>
                    <div class="stu-sys-right-form-item">
                        <label>课程名称:</label>
                        <input type="text" class="course-info-input-name" placeholder="请输入课程名称">
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>任课老师工号:</label>
                        <input type="text" class="course-info-input-tuser" placeholder="请输入任课老师的工号">
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>学时:</label>
                        <input type="text" class="course-info-input-period" placeholder="请输入学时">
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>学分:</label>
                        <input type="text" class="course-info-input-credit" placeholder="请输入学分">
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>开课班级:</label>
                        <input type="text" class="course-info-input-open-class" placeholder="请输入开课班级">
                    </div>
                    <span class="stu-sys-right-form-button stu-sys-right-admin-course-info-add-submit">提交</span>
                </form>
            </div>
            <div class="stu-sys-right-admin-teacher-manage">
                <div class="stu-sys-right-admin-teacher-manage-title">教师管理</div>
                <div class="stu-sys-right-admin-teacher-manage-addition">您可以在此页面检索教师信息，修改教师信息</div>
                <div class="stu-sys-right-admin-teacher-manage-search">
                    <select class="stu-sys-right-admin-teacher-manage-select" id="admin-teacher-manage-select-dept">
                        <option>所有学院</option>
                        <option>信息科学技术学院</option>>
                        <option>数学与统计学院</option>
                        <option>物理与电子工程学院</option>
                    </select>
                    <input type="button" value="检索" class="stu-sys-right-admin-teacher-manage-search-button">
                </div>
                <div class="stu-sys-right-admin-teacher-manage-table">
                    <table id="admin-teacher-manage-table" class="display">
                        <thead>
                            <tr>
                                <th>教师姓名</th>
                                <th>所属院系</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <input type="button" value="修改" class="stu-sys-right-admin-teacher-manage-modify-button">
                </div>
            </div>
            <div class="stu-sys-right-admin-teacher-manage-modify">
                <form>
                    <h3>修改教师信息</h3>
                    <div class="stu-sys-right-form-item">
                        <label id="admin-teacher-info-show-name"></label>
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>所属院系:</label>
                        <input type="text" class="admin-teacher-info-modify-dept" placeholder="请输入您所属的院系">
                    </div>
                    <span class="stu-sys-right-form-button stu-sys-right-admin-teacher-manage-modify-submit">提交</span>
                </form>
            </div>
        </div>
    </div>
    <div class="stu-sys-foot">
        <div id="stu-sys-admin-foot-date"></div>
    </div>
</div>
`)
        this.root.$stu_sys.append(this.$admin);
        this.$head_welcome = this.$admin.find(".stu-sys-head-welcome");
        this.$foot_date = this.$admin.find(".stu-sys-foot-date");
        //页面
        this.$stu_sys_right_graphfield = this.$admin.find(".stu-sys-right-graphfield");
        this.$stu_sys_right_admin_notification = this.$admin.find(".stu-sys-right-admin-notification");
        this.$stu_sys_right_admin_notification.hide();
        this.$stu_sys_right_admin_notification_form = this.$admin.find(".stu-sys-right-admin-notification-form");
        this.$stu_sys_right_admin_notification_form.hide();
        this.$stu_sys_right_admin_student_manage = this.$admin.find(".stu-sys-right-admin-student-manage");
        this.$stu_sys_right_admin_student_manage.hide();
        this.$stu_sys_right_admin_student_manage_table = this.$admin.find(".stu-sys-right-admin-student-manage-table");
        this.$stu_sys_right_admin_student_manage_table.hide();
        this.$stu_sys_right_admin_student_manage_form = this.$admin.find(".stu-sys-right-admin-student-manage-form");
        this.$stu_sys_right_admin_student_manage_form.hide();
        this.$stu_sys_right_admin_course_manage = this.$admin.find(".stu-sys-right-admin-course-manage");
        this.$stu_sys_right_admin_course_manage.hide();
        this.$stu_sys_right_admin_course_info_add = this.$admin.find(".stu-sys-right-admin-course-info-add");
        this.$stu_sys_right_admin_course_info_add.hide();
        this.$stu_sys_right_admin_teacher_manage = this.$admin.find(".stu-sys-right-admin-teacher-manage");
        this.$stu_sys_right_admin_teacher_manage.hide();
        this.$stu_sys_right_admin_teacher_manage_table = this.$admin.find(".stu-sys-right-admin-teacher-manage-table");
        this.$stu_sys_right_admin_teacher_manage_table.hide();
        this.$stu_sys_right_admin_teacher_manage_modify = this.$admin.find(".stu-sys-right-admin-teacher-manage-modify");
        this.$stu_sys_right_admin_teacher_manage_modify.hide();
        //按钮
        this.$navigation_item_notification = this.$admin.find(".admin-navigation-item-notification");
        this.$navigation_item_student = this.$admin.find(".admin-navigation-item-student");
        this.$navigation_item_teacher = this.$admin.find(".admin-navigation-item-teacher");
        this.$navigation_item_course = this.$admin.find(".admin-navigation-item-course");
        this.$navigation_item_logout = this.$admin.find(".admin-navigation-item-logout");
        this.$admin_notification_add = this.$admin.find(".admin-notification-add");
        this.$admin_notification_detail = this.$admin.find(".admin-notification-detail");
        this.$admin_notification_delete = this.$admin.find(".admin-notification-delete");
        this.$notification_submit = this.$admin.find(".stu-sys-right-admin-notification-form-button");
        this.$admin_student_manage_search_button = this.$admin.find(".stu-sys-right-admin-student-manage-search-button");
        this.$admin_student_manage_modify_button = this.$admin.find(".stu-sys-right-admin-student-manage-modify-button");
        this.$student_info_submit = this.$admin.find(".admin-student-info-modify-submit");
        this.$course_info_button_add = this.$admin.find(".admin-course-info-button-add");
        this.$course_info_button_delete = this.$admin.find(".admin-course-info-button-delete");
        this.$course_info_add_submit = this.$admin.find(".stu-sys-right-admin-course-info-add-submit");
        this.$admin_teacher_manage_search_button = this.$admin.find(".stu-sys-right-admin-teacher-manage-search-button");
        this.$admin_teacher_manage_modify_button = this.$admin.find(".stu-sys-right-admin-teacher-manage-modify-button");
        this.$teacher_info_submit = this.$admin.find(".stu-sys-right-admin-teacher-manage-modify-submit");
        //文本信息
        this.$notification_title = this.$admin.find(".stu-sys-right-admin-notification-form-item input");
        this.$notification_detail = this.$admin.find(".stu-sys-right-admin-notification-form-item textarea");
        this.$admin_student_info_modify_minor = this.$admin.find(".admin-student-info-modify-minor");
        this.$admin_student_info_modify_class = this.$admin.find(".admin-student-info-modify-class");
        this.$admin_course_info_add_name = this.$admin.find(".course-info-input-name");
        this.$admin_course_info_add_tuser = this.$admin.find(".course-info-input-tuser");
        this.$admin_course_info_add_period = this.$admin.find(".course-info-input-period");
        this.$admin_course_info_add_credit = this.$admin.find(".course-info-input-credit");
        this.$admin_course_info_add_open_class = this.$admin.find(".course-info-input-open-class");
        this.$admin_teacher_info_modify_dept = this.$admin.find(".admin-teacher-info-modify-dept");

        this.hide();
        this.start();

    }

    start(){
        this.get_foot_date();
        this.get_head_name();

        this.add_listening_events();
    }

    add_listening_events(){
        this.add_listening_events_notification();
        this.add_listening_events_student();
        this.add_listening_events_teacher();
        this.add_listening_events_course();
        this.add_listening_events_logout();
    }

    add_listening_events_teacher() {
        let outer = this;

        this.$navigation_item_teacher.click(function(){
            outer.hide_all();
            outer.$stu_sys_right_admin_teacher_manage.show();
        });
        this.$admin_teacher_manage_search_button.click(function(){
            outer.$stu_sys_right_admin_teacher_manage_table.show();
            $(document).ready(function(){
                $('#admin-teacher-manage-table').DataTable({
                    select: 'single',
                    ajax: {
                        url: "http://43.138.22.107:8080/stu_sys/adminn/get_teacher_info/",
                        type: "GET",
                        dataType: 'json',
                        data: {
                            'dept': $("#admin-teacher-manage-select-dept").val(),
                        },
                    },
                    "columns": [
                        {"data": "name"},
                        {"data": "dept"},
                    ],
                    language: {
                        zeroRecords:'抱歉,没有检索到数据',
                        search:'检索',  // 将英文search改为中文
                        searchPlaceholder:'请输入',//搜索框提示功能
                        lengthMenu:'每页显示_MENU_条记录',
                        info:'显示第_START_到第_END_条记录，共_TOTAL_条',
                        paginate:{'next':'下页','previous':'下页','first':'第一页','last':'最后一页'},
                        infoEmpty:'没有数据',
                        infoFiltered:"(从_MAX_条数据检索)",
                    },
                    /* scrollY: 150 */
                });
            });
        });
        this.$admin_teacher_manage_modify_button.click(function(){
            let table = $('#admin-teacher-manage-table').DataTable();
            let name = table.rows({selected: true}).data()[0]['name'];
            document.getElementById("admin-teacher-info-show-name").innerHTML = "姓名："+name;
            outer.hide_all();
            outer.$stu_sys_right_admin_teacher_manage_modify.show();
        });
        this.$teacher_info_submit.click(function(){
            let table = $('#admin-teacher-manage-table').DataTable();
            let name = table.rows({selected: true}).data()[0]['name'];
            let dept = outer.$admin_teacher_info_modify_dept.val();
            $.ajax({
                url: "http://43.138.22.107:8080/stu_sys/adminn/modify_teacher_info/",
                type: "GET",
                data: {
                    'name': name,
                    'dept': dept,
                },
                success: function(resp) {
                    if(resp.result === "success") {
                        confirm("修改成功！");
                        location.reload();
                    }else{
                        confirm(resp.result);
                    }
                }
            });
        });
    }

    add_listening_events_course() {
        let outer = this;

        this.$navigation_item_course.click(function(){
            outer.hide_all();
            outer.$stu_sys_right_admin_course_manage.show();
            $(document).ready(function(){
                $('#admin-course-manage-table').DataTable({
                    select: 'single',
                    ajax: {
                        url: "http://43.138.22.107:8080/stu_sys/course/get_course/",
                        type: "GET",
                        dataType: 'json',
                    },
                    "columns": [
                        {"data": "name"},
                        {"data": "tname"},
                        {"data": "period"},
                        {"data": "credit"},
                        {"data": "open_class"},
                    ],
                    language:{
                        zeroRecords:'抱歉,没有检索到数据',
                        search:'检索',  // 将英文search改为中文
                        searchPlaceholder:'请输入',//搜索框提示功能
                        lengthMenu:'每页显示_MENU_条记录',
                        info:'显示第_START_到第_END_条记录，共_TOTAL_条',
                        paginate:{'next':'下页','previous':'下页','first':'第一页','last':'最后一页'},
                        infoEmpty:'没有数据',
                        infoFiltered:"(从_MAX_条数据检索)",
                    },
                    /* scrollY: 150 */
                });
            });
        });
        this.$course_info_button_add.click(function(){
            outer.hide_all();
            outer.$stu_sys_right_admin_course_info_add.show();
        });
        this.$course_info_add_submit.click(function(){
            let course_name = outer.$admin_course_info_add_name.val();
            let course_tuser = outer.$admin_course_info_add_tuser.val();
            let course_period = outer.$admin_course_info_add_period.val();
            let course_credit = outer.$admin_course_info_add_credit.val();
            let course_open_class = outer.$admin_course_info_add_open_class.val();
            $.ajax({
                url: "http://43.138.22.107:8080/stu_sys/course/save_course/",
                data:{
                    name: course_name,
                    tuser: course_tuser,
                    period: course_period,
                    credit: course_credit,
                    open_class: course_open_class,
                },
                success: function(resp){
                    if (resp.result === "success"){
                        confirm("提交成功！");
                        location.reload();
                    }else {
                        confirm(resp.result);
                    }
                }
            });
        });
        this.$course_info_button_delete.click(function(){
            let table = $('#admin-course-manage-table').DataTable();
            let name = table.rows({selected: true}).data()[0]['name'];
            let tname = table.rows({selected: true}).data()[0]['tname'];
            $.ajax({
                url: "http://43.138.22.107:8080/stu_sys/course/delete_course/",
                data: {
                    name: name,
                    tname: tname,
                },
                success: function(resp) {
                    if(resp.result === "success"){
                        confirm("删除成功！");
                        location.reload();
                    }else{
                        confirm("删除失败！");
                    }
                }
            });
        });
    }

    add_listening_events_student() {
        let outer = this;
        this.$navigation_item_student.click(function(){
            outer.hide_all();
            outer.$stu_sys_right_admin_student_manage.show();
        });
        this.$admin_student_manage_search_button.click(function(){
            outer.admin_show_student_search_info();
        });
        this.$admin_student_manage_modify_button.click(function(){
            outer.admin_modify_student_info();
        });
        this.$student_info_submit.click(function(){
            outer.admin_modify_student_info_inremote();
        });
    }

    admin_modify_student_info_inremote() {
        let outer = this;
        let table = $('#admin-student-manage-table').DataTable();
        let name = table.rows({selected: true}).data()[0]['name'];
        let minor_subject = this.$admin_student_info_modify_minor.val();
        let minor_class = this.$admin_student_info_modify_class.val();
        console.log(minor_subject);
        console.log(minor_class);
        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/adminn/modify_student_info/",
            type: "GET",
            data: {
                'name': name,
                'minor_subject': minor_subject,
                'minor_class': minor_class,
            },
            success: function(resp) {
                if(resp.result === "success") {
                    confirm("修改成功！");
                    location.reload();
                }else{
                    confirm(resp.result);
                }
            }
        });
    }

    admin_modify_student_info() {
        let table = $('#admin-student-manage-table').DataTable();
        let name = table.rows({selected: true}).data()[0]['name'];
        let sex = table.rows({selected: true}).data()[0]['sex'];
        let age = table.rows({selected: true}).data()[0]['age'];
        let dept = table.rows({selected: true}).data()[0]['dept'];

        document.getElementById("admin-student-info-form-show-name").innerHTML = "姓名："+name;
        document.getElementById("admin-student-info-form-show-sex").innerHTML = "性别："+sex;
        document.getElementById("admin-student-info-form-show-age").innerHTML = "年龄："+age;
        document.getElementById("admin-student-info-form-show-dept").innerHTML = "学院："+dept;
        this.hide_all();
        this.$stu_sys_right_admin_student_manage_form.show();
    }

    admin_show_student_search_info() {
        this.$stu_sys_right_admin_student_manage_table.show();
        $(document).ready(function() {
            $('#admin-student-manage-table').DataTable({
                select: 'single',
                ajax: {
                    url: "http://43.138.22.107:8080/stu_sys/adminn/get_search_info/",
                    type: "GET",
                    dataType: 'json',
                    data: {
                        'minor': $("#admin-student-manage-select-minior").val(),
                        'class': $("#admin-student-manage-select-class").val(),
                        'dept': $("#admin-student-manage-select-dept").val(),
                    },
                },
                'columns': [
                    {"data": "name"},
                    {"data": "sex"},
                    {"data": "age"},
                    {"data": "dept"},
                    {"data": "minor_subject"},
                    {"data": "minor_class"},
                ],
                scrollY: 150,
            } );
        });
    }

    add_listening_events_logout(){
        let outer = this;
        this.$navigation_item_logout.click(function(){
            outer.root.account.logout_on_remote();
        });
    }

    add_listening_events_notification(){
        let outer = this;

        this.$navigation_item_notification.click(function() {
            outer.hide_all();
            outer.$stu_sys_right_admin_notification.show();
            $(document).ready(function(){
                $('#admin-notification-table').DataTable({
                    select: 'single',
                    ajax: {
                        url: "http://43.138.22.107:8080/stu_sys/notification/get_notification/",
                        type: "GET",
                        dataType: 'json',
                    },
                    "columns": [
                        {"data": "title"},
                        {"data": "create_time"},
                    ],
                    language: {
                        zeroRecords:'抱歉,没有检索到数据',
                        search:'检索',  // 将英文search改为中文
                        searchPlaceholder:'请输入',//搜索框提示功能
                        lengthMenu:'每页显示_MENU_条记录',
                        info:'显示第_START_到第_END_条记录，共_TOTAL_条',
                        paginate:{'next':'下页','previous':'下页','first':'第一页','last':'最后一页'},
                        infoEmpty:'没有数据',
                        infoFiltered:"(从_MAX_条数据检索)",
                    },
                    /* scrollY: 150 */
                });
            });
        });

        this.$admin_notification_detail.click(function(){
            outer.check_notification_detail();
        });

        this.$admin_notification_delete.click(function(){
            outer.delete_notification_to_remote();
        });
        this.$admin_notification_add.click(function(){
            outer.notification_add_form();
        });
        this.$notification_submit.click(function(){
            outer.add_notification_to_remote();
        });
    }

    add_notification_to_remote() {
        let outer = this;
        let title = this.$notification_title.val();
        let detail = this.$notification_detail.val();

        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/notification/add_notification/",
            type: "GET",
            data: {
                title: title,
                detail: detail,
            },
            success: function(resp) {
                console.log(resp);
                if(resp.result === "success") {
                    confirm("添加成功!");
                    location.reload();
                }else {
                    confirm(resp.result);
                }
            }
        });
    }

    notification_add_form() {
        this.$stu_sys_right_admin_notification.hide();
        this.$stu_sys_right_admin_notification_form.show();
    }

    check_notification_detail(){
        let outer = this;
        let table = $('#admin-notification-manage-table').DataTable();
        let title = table.rows({selected: true}).data()[0]['title'];
        console.log(title);
        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/notification/select_notification",
            type: "GET",
            data: {
                title: title
            },
            success: function openWindow(resp) {
                console.log(resp);
                new MyLayer({
                    top:"10%",
                    left:"10%",
                    width:"80%",
                    height:"80%",
                    title: resp.title,
                    content: resp.result
                }).openLayer();
            }
        });

    }

    delete_notification_to_remote(){
        let outer = this;
        let table = $('#admin-notification-table').DataTable();
        let title = table.rows({selected: true}).data()[0]['title'];

        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/notification/delete_notification/",
            type: "GET",
            data: {
                title: title,
            },
            success: function(resp) {
                console.log(resp);
                if(resp.result === "success") {
                    confirm("删除成功！");
                    location.reload();
                }else {
                    confirm("删除失败！");
                }
            }
        });
    }

    get_head_name(){
       // 需要学生表
    }

    get_foot_date(){
        document.getElementById("stu-sys-admin-foot-date").innerHTML = (new Date()).format1st("yyyyMd");
    }

    show(){
        this.$admin.show();
    }

    hide(){
        this.$admin.hide();
    }

    hide_all(){
        this.$stu_sys_right_graphfield.hide();
        this.$stu_sys_right_admin_notification.hide();
        this.$stu_sys_right_admin_notification_form.hide();
        this.$stu_sys_right_admin_student_manage.hide();
        this.$stu_sys_right_admin_student_manage_table.hide();
        this.$stu_sys_right_admin_student_manage_form.hide();
        this.$stu_sys_right_admin_course_manage.hide();
        this.$stu_sys_right_admin_course_info_add.hide();
        this.$stu_sys_right_admin_teacher_manage.hide();
        this.$stu_sys_right_admin_teacher_manage_table.hide();
        this.$stu_sys_right_admin_teacher_manage_modify.hide();
    }
}
class StuSysStudent{
    constructor(root){
        this.root = root;

        this.$student = $(`
<div class="stu-sys-student">
    <div class="stu-sys-head">
        <div class="stu-sys-head-logo"></div>
        <div class="stu-sys-head-welcome"></div>
    </div>
    <div class="stu-sys-content">
        <div class="stu-sys-left">
            <div class="stu-sys-navigation">
                <div class="stu-sys-navigation-item stu-sys-student-info">
                    个人信息
                </div>
                <div class="stu-sys-navigation-item">
                    网上选课
                </div>
                <div class="stu-sys-navigation-item">
                    培养方案
                </div>
                <div class="stu-sys-navigation-item">
                    课程信息
                </div>
                <div class="stu-sys-navigation-item">
                    考试成绩
                </div>
                <div class="stu-sys-navigation-item stu-sys-student-logout">
                    退出登录
                </div>
            </div>
        </div>
        <div class="stu-sys-right">
            <div class="stu-sys-right-graphfield">
                <div class="stu-sys-right-graphfield-graph"></div>
            </div>
            <div class="stu-sys-right-student-info-form">
                <form>
                    <div style="font-weight: bold;">个人信息</div>
                    <div class="stu-sys-right-form-item">
                        <label>姓名:</label>
                        <input type="text" class="student-info-input-name" placeholder="请输入您的姓名">
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>性别:</label>
                        <input type="text" class="student-info-input-sex" placeholder="请输入您的性别">
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>年龄:</label>
                        <input type="text" class="student-info-input-age" placeholder="请输入您的年龄">
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>所属院系:</label>
                        <input type="text" class="student-info-input-dept" placeholder="请输入您所属的院系">
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>辅修专业:</label>
                        <input type="text" class="student-info-input-minor" placeholder="请输入您的辅修专业">
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>辅修班级:</label>
                        <input type="text" class="student-info-input-class" placeholder="请输入您的辅修班级">
                    </div>
                    <span class="stu-sys-right-form-button student-info-form-submit">提交</span>
                </form>
            </div>
            <div class="stu-sys-right-student-info-show">
                <form>
                    <h3>个人信息</h3>
                    <div class="stu-sys-right-form-item">
                        <label id="student-info-form-show-name"></label>
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label id="student-info-form-show-sex"></label>
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label id="student-info-form-show-age"></label>
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label id="student-info-form-show-dept"></label>
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label id="student-info-form-show-minor"></label>
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label id="student-info-form-show-class"></label>
                    </div>
                    <span class="stu-sys-right-form-button student-info-form-show-submit">修改</span>
                </form>
            </div>
        </div>
    </div>
    <div class="stu-sys-foot">
        <div id="stu-sys-student-foot-date"></div>
    </div>
</div>
`)
        this.root.$stu_sys.append(this.$student);
        this.$head_welcome = this.$student.find(".stu-sys-head-welcome");
        //页面
        this.$right_graphfield = this.$student.find(".stu-sys-right-graphfield");
        this.$student_info_form = this.$student.find(".stu-sys-right-student-info-form");
        this.$student_info_form.hide();
        this.$student_info_show = this.$student.find(".stu-sys-right-student-info-show");
        this.$student_info_show.hide();
        //按钮
        this.$student_info = this.$student.find(".stu-sys-student-info");
        this.$student_info_form_submit = this.$student.find(".student-info-form-submit");
        this.$student_info_form_show_submit = this.$student.find(".student-info-form-show-submit");
        this.$student_logout = this.$student.find(".stu-sys-student-logout");
        //文本信息
        this.$student_info_name = this.$student.find(".student-info-input-name");
        this.$student_info_sex = this.$student.find(".student-info-input-sex");
        this.$student_info_age = this.$student.find(".student-info-input-age");
        this.$student_info_dept = this.$student.find(".student-info-input-dept");
        this.$student_info_minor = this.$student.find(".student-info-input-minor");
        this.$student_info_class = this.$student.find(".student-info-input-class");

        this.hide();
        this.start();
    }

    start(){
        this.get_foot_date();

        this.add_listening_events();
    }

    add_listening_events(){
        this.add_listening_events_student_info();
        this.add_listening_events_logout();
    }

    add_listening_events_student_info(){
        let outer = this;
        //导航栏个人信息
        this.$student_info.click(function(){
            outer.hide_all();
            outer.get_student_info();
        });
        //提交按钮
        this.$student_info_form_submit.click(function(){
            outer.save_student_info_to_remote();
        });
        //修改按钮
        this.$student_info_form_show_submit.click(function(){
            outer.delete_student_info_from_remote();
        });
    }



    save_student_info_to_remote(){    //将学生信息存入远程服务器
        let outer = this;
        let student_name = this.$student_info_name.val();
        let student_sex = this.$student_info_sex.val();
        let student_age = this.$student_info_age.val();
        let student_dept = this.$student_info_dept.val();
        let student_minor = this.$student_info_minor.val();
        let student_class = this.$student_info_class.val();
        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/student/saveinfo/",
            data: {
                name: student_name,
                sex: student_sex,
                age: student_age,
                dept: student_dept,
                minor: student_minor,
                'class': student_class,
            },
            success: function(resp) {
                if (resp.result === "success"){
                    confirm("提交成功!");
                    location.reload();
                }else{
                    confirm(resp.result);
                }
            }
        });
    }

    delete_student_info_from_remote(){   //将学生信息在远程服务器中删除
        let outer = this;

        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/student/delete_info/",
            type: "GET",
            success: function(resp) {
                if(resp.result === "success") {
                    location.reload();
                }else {
                    confirm("修改失败！");
                }
            }
        });
    }

    get_student_info(){
        let outer = this;

        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/student/checkinfo/",
            type: "GET",
            success: function(resp) {
                if(resp.result == "success"){
                    outer.hide_all();
                    outer.student_info_show();
                }else{
                    outer.hide_all();
                    outer.$student_info_form.show();
                }
            }
        });
    }

    student_info_show() {
        let outer = this;
        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/student/getinfo",
            type: "GET",
            success: function(resp) {
                if(resp.result == "success") {
                    document.getElementById("student-info-form-show-name").innerHTML = "姓名："+resp.name;
                    document.getElementById("student-info-form-show-sex").innerHTML = "性别："+resp.sex;
                    document.getElementById("student-info-form-show-age").innerHTML = "年龄："+resp.age;
                    document.getElementById("student-info-form-show-dept").innerHTML = "所属院系："+resp.dept;
                    document.getElementById("student-info-form-show-minor").innerHTML = "辅修专业："+resp.minor_subject;
                    document.getElementById("student-info-form-show-class").innerHTML = "辅修班级："+resp.minor_class;
                }
            }
        });
        this.$student_info_show.show();
    }

    add_listening_events_logout(){
        let outer = this;
        this.$student_logout.click(function(){
            outer.root.account.logout_on_remote();
        });
    }

    get_foot_date(){
        document.getElementById("stu-sys-student-foot-date").innerHTML = (new Date()).format1st("yyyyMd");
    }
    show(){
        this.$student.show();
    }

    hide_all(){
        this.$right_graphfield.hide();
        this.$student_info_show.hide();
        this.$student_info_form.hide();
    }

    hide(){
        this.$student.hide();
    }
}
class StuSysTeacher{
    constructor(root){
        this.root = root;

        this.$teacher = $(`
<div class="stu-sys-teacher">
    <div class="stu-sys-head">
        <div class="stu-sys-head-logo"></div>
        <div class="stu-sys-head-welcome"></div>
    </div>
    <div class="stu-sys-content">
        <div class="stu-sys-left">
            <div class="stu-sys-navigation">
                <div class="stu-sys-navigation-item stu-sys-teacher-info">
                    个人信息
                </div>
                <div class="stu-sys-navigation-item">
                    讲授课程
                </div>
                <div class="stu-sys-navigation-item">
                    班级管理
                </div>
                <div class="stu-sys-navigation-item">
                    作业考试
                </div>
                <div class="stu-sys-navigation-item stu-sys-teacher-logout">
                    退出登录
                </div>
            </div>
        </div>
        <div class="stu-sys-right">
            <div class="stu-sys-right-graphfield">
                <div class="stu-sys-right-graphfield-graph"></div>
            </div>
            <div class="stu-sys-right-teacher-info-form">
                <form>
                    <h3>个人信息</h3>
                    <div class="stu-sys-right-form-item">
                        <label>姓名:</label>
                        <input type="text" class="teacher-info-input-name" placeholder="请输入您的姓名">
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label>所属院系:</label>
                        <input type="text" class="teacher-info-input-dept" placeholder="请输入您所属的院系">
                    </div>
                    <span class="stu-sys-right-form-button teacher-info-form-submit">提交</span>
                </form>
            </div>
            <div class="stu-sys-right-teacher-info-show">
                <form>
                    <h3>个人信息</h3>
                    <div class="stu-sys-right-form-item">
                        <label id="teacher-info-form-show-name"></label>
                    </div>
                    <div class="stu-sys-right-form-item">
                        <label id="teacher-info-form-show-dept"></label>
                    </div>
                    <span class="stu-sys-right-form-button teacher-info-form-show-submit">修改</span>
                </form>
            </div>
        </div>
    </div>
    <div class="stu-sys-foot">
        <div id="stu-sys-teacher-foot-date"></div>
    </div>
</div>
`)
        this.root.$stu_sys.append(this.$teacher);
        this.$head_welcome = this.$teacher.find(".stu-sys-head-welcome");
        //页面
        this.$right_graphfield = this.$teacher.find(".stu-sys-right-graphfield");
        this.$teacher_info_form = this.$teacher.find(".stu-sys-right-teacher-info-form");
        this.$teacher_info_form.hide();
        this.$teacher_info_show = this.$teacher.find(".stu-sys-right-teacher-info-show");
        this.$teacher_info_show.hide();
        //按钮
        this.$teacher_info = this.$teacher.find(".stu-sys-teacher-info");
        this.$teacher_logout = this.$teacher.find(".stu-sys-teacher-logout");
        this.$teacher_info_form_submit = this.$teacher.find(".teacher-info-form-submit");
        this.$teacher_info_form_show_submit = this.$teacher.find(".teacher-info-form-show-submit");
        //文本信息
        this.$teacher_info_name = this.$teacher.find(".teacher-info-input-name");
        this.$teacher_info_dept = this.$teacher.find(".teacher-info-input-dept");
        this.hide();
        this.start();
    }

    start(){
        //

        this.get_foot_date();
        this.get_head_name();

        this.add_listening_events();
    }

    add_listening_events(){
        this.add_listening_events_teacher_info();
        this.add_listening_events_logout();
    }

    add_listening_events_logout(){
        let outer = this;
        this.$teacher_logout.click(function(){
            outer.root.account.logout_on_remote();
        });
    }

    add_listening_events_teacher_info(){
        let outer = this;
        //导航栏个人信息按钮
        this.$teacher_info.click(function(){
            outer.hide_all();
            outer.get_teacher_info();
        });
        //提交按钮
        this.$teacher_info_form_submit.click(function(){
            outer.save_teacher_info_to_remote();
        });
        //修改按钮
        this.$teacher_info_form_show_submit.click(function(){
            outer.delete_teacher_info_from_remote();
        });
    }

    delete_teacher_info_from_remote(){   //将老师信息在远程服务器中删除
        let outer = this;
        
        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/teacher/delete_info/",
            type: "GET",
            success: function(resp) {
                if(resp.result === "success") {
                    location.reload();
                }else {
                    confirm("修改失败！");
                }
            }
        });
    }

    save_teacher_info_to_remote(){    //将老师信息存入远程服务器
        let outer = this;
        let teacher_name = this.$teacher_info_name.val();
        let teacher_dept = this.$teacher_info_dept.val();

        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/teacher/saveinfo/",
            data: {
                name: teacher_name,
                dept: teacher_dept,
            },
            success: function(resp) {
                if (resp.result === "success"){
                    confirm("提交成功!");
                    location.reload();
                }else{
                    confirm(resp.result);
                }
            }
        });
    }

    get_teacher_info(){
        let outer = this;

        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/teacher/checkinfo/",
            type: "GET",
            success: function(resp) {
                if(resp.result == "success"){
                    outer.hide_all();
                    outer.teacher_info_show();
                }else{
                    outer.hide_all();
                    outer.$teacher_info_form.show();
                }
            }
        });
    }

    teacher_info_show() {
        let outer = this;
        $.ajax({
            url: "http://43.138.22.107:8080/stu_sys/teacher/getinfo",
            type: "GET",
            success: function(resp) {
                if(resp.result == "success") {
                    document.getElementById("teacher-info-form-show-name").innerHTML = "姓名："+resp.name;
                    document.getElementById("teacher-info-form-show-dept").innerHTML = "所属院系："+resp.dept;
                }
            }
        });
        this.$teacher_info_show.show();
    }

    get_foot_date(){
        document.getElementById("stu-sys-teacher-foot-date").innerHTML = (new Date()).format1st("yyyyMd");
    }

    get_head_name(){
    }

    show(){
        this.$teacher.show();
    }

    hide(){
        this.$teacher.hide();
    }

    hide_all(){
        this.$right_graphfield.hide();
        this.$teacher_info_show.hide();
        this.$teacher_info_form.hide();
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
