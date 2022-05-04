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
                <div class="stu-sys-navigation-item teacher-navigation-item-info">
                    个人信息
                </div>
                <div class="stu-sys-navigation-item teacher-navigation-item-course">
                    讲授课程
                </div>
                <div class="stu-sys-navigation-item teacher-navigation-item-class">
                    班级管理
                </div>
                <div class="stu-sys-navigation-item">
                    作业考试
                </div>
                <div class="stu-sys-navigation-item teacher-navigation-item-logout">
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
            <div class="stu-sys-right-teacher-course-manage">
                <div class="stu-sys-right-teacher-course-manage-title">讲授管理</div>
                <div class="stu-sys-right-teacher-course-manage-addition">您可以在此页面查询您所讲授的课程</div>
                <div class="stu-sys-right-teacher-course-manage-table">
                    <table style="width: 100% !important;" id="teacher-course-manage-table" class="row-border">
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
                </div>
            </div>
            <div class="stu-sys-right-teacher-class-manage">
                <div class="stu-sys-right-teacher-class-manage-title">班级管理</div>
                <div class="stu-sys-right-teacher-class-manage-addition">您可以在此页面检索您所任课班级的学生信息</div>
                <div class="stu-sys-right-teacher-class-manage-search">
                    <select class="stu-sys-right-admin-student-manage-select" id="teacher-class-manage-select-class">
                        <option>所有班级</option>
                        <option>2018级1班</option>
                        <option>2019级1班</option>
                        <option>2020级1班</option>
                    </select>
                    <input type="button" value="检索" class="stu-sys-right-teacher-class-manage-select-button">
                </div>
                <div class="stu-sys-right-teacher-class-manage-table">
                    <table style="width: 100% !important;" id="teacher-class-manage-table" class="display">
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
                </div>
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
        this.$teacher_course_manage = this.$teacher.find(".stu-sys-right-teacher-course-manage");
        this.$teacher_course_manage.hide();
        this.$teacher_class_manage = this.$teacher.find(".stu-sys-right-teacher-class-manage");
        this.$teacher_class_manage.hide();
        this.$teacher_class_manage_table = this.$teacher.find(".stu-sys-right-teacher-class-manage-table");
        this.$teacher_class_manage_table.hide();
        //按钮
        this.$teacher_info = this.$teacher.find(".teacher-navigation-item-info");
        this.$teacher_course = this.$teacher.find(".teacher-navigation-item-course");
        this.$teacher_class = this.$teacher.find(".teacher-navigation-item-class");
        this.$teacher_logout = this.$teacher.find(".teacher-navigation-item-logout");
        this.$teacher_info_form_submit = this.$teacher.find(".teacher-info-form-submit");
        this.$teacher_info_form_show_submit = this.$teacher.find(".teacher-info-form-show-submit");
        this.$teacher_class_manage_select_button = this.$teacher.find(".stu-sys-right-teacher-class-manage-select-button");

        //文本信息
        this.$teacher_info_name = this.$teacher.find(".teacher-info-input-name");
        this.$teacher_info_dept = this.$teacher.find(".teacher-info-input-dept");
        this.hide();
        this.start();
    }

    start(){
        $(document).ready(function(){
            $('#teacher-class-manage-table').DataTable({
                select: 'single',
                ajax: {
                    url: "http://43.138.22.107:8080/stu_sys/teacher/get_class/",
                    type: "GET",
                    dataType: 'json',
                    data: {
                        'class': $("#teacher-class-manage-select-class").val(),
                    },
                },
                "columns": [
                    {"data": "name"},
                    {"data": "sex"},
                    {"data": "age"},
                    {"data": "dept"},
                    {"data": "minor_subject"},
                    {"data": "minor_class"},
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
                /* scrollY: 150  */
            });
        });

        $(document).ready(function(){
            $('#teacher-course-manage-table').DataTable({
                select: 'single',
                ajax: {
                    url: "http://43.138.22.107:8080/stu_sys/teacher/get_course/",
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
                /* scrollY: 150  */
            });
        });

        this.get_foot_date();
        this.get_head_name();

        this.add_listening_events();
    }

    add_listening_events(){
        this.add_listening_events_teacher_info();
        this.add_listening_events_teacher_course();
        this.add_listening_events_teacher_class();
        this.add_listening_events_logout();
    }

    add_listening_events_teacher_class(){
        let outer = this;
        this.$teacher_class.click(function(){
            outer.hide_all();
            outer.$teacher_class_manage.show();
        });
        this.$teacher_class_manage_select_button.click(function(){
            
            outer.$teacher_class_manage_table.show();
        });
    }

    add_listening_events_teacher_course(){
        let outer = this;
        this.$teacher_course.click(function(){
            outer.hide_all();
            outer.$teacher_course_manage.show();

        });
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
        this.$teacher_course_manage.hide();
        this.$teacher_class_manage.hide();
        this.$teacher_class_manage_table.hide();
    }
}
