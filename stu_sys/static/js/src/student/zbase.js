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
                <div class="stu-sys-navigation-item stu-sys-student-course-select">
                    网上选课
                </div>
                <div class="stu-sys-navigation-item">
                    培养方案
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
            <div class="stu-sys-right-student-select-course">
                <div class="stu-sys-right-student-select-course-title">网上选课</div>
                <div class="stu-sys-right-student-select-course-addition">您可以在此页面查看已选课程，选课</div>
                <div class="stu-sys-right-student-select-course-table">
                    <table style="width: 100% !important" id="student-select-course-table" class="row-border">
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
                    <input type="button" id="student-select-course-table-add" value="选课">
                </div>
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
        this.$student_select_course = this.$student.find(".stu-sys-right-student-select-course");
        this.$student_select_course.hide();
        //按钮
        this.$student_info = this.$student.find(".stu-sys-student-info");
        this.$student_course = this.$student.find(".stu-sys-student-course-select");
        this.$student_logout = this.$student.find(".stu-sys-student-logout");
        this.$student_info_form_submit = this.$student.find(".student-info-form-submit");
        this.$student_info_form_show_submit = this.$student.find(".student-info-form-show-submit");
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
        $(document).ready(function() {
            $('#student-select-course-table').DataTable({
                select: 'single',
                ajax: {
                    url: "http://43.138.22.107:8080/stu_sys/student/get_selected_course/",
                    type: "GET",
                    dataType: 'json',
                },
                'columns': [
                    {"data": "name"},
                    {"data": "tname"},
                    {"data": "period"},
                    {"data": "credit"},
                    {"data": "open_class"}
                ],
            } );
        });


        this.get_foot_date();

        this.add_listening_events();
    }

    add_listening_events(){
        this.add_listening_events_student_info();
        this.add_listening_events_course();
        this.add_listening_events_logout();
    }

    add_listening_events_course(){
        let outer = this;
        this.$student_course.click(function(){
            outer.hide_all();
            outer.$student_select_course.show();
        });
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
        this.$student_select_course.hide();
    }

    hide(){
        this.$student.hide();
    }
}
