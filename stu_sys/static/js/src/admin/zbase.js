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
