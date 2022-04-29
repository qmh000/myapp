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
                <div class="stu-sys-navigation-item stu-sys-navigation-item-logout">
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
                    <span class="stu-sys-right-form-button">提交</span>
                </form>
            </div>
        </div>
    </div>
    <div class="stu-sys-foot">
        <div id="stu-sys-admin-foot-date"></div>
    </div>
</div>
`)

        this.$stu_sys_right_graphfield = this.$admin.find(".stu-sys-right-graphfield");
        this.$stu_sys_right_admin_notification = this.$admin.find(".stu-sys-right-admin-notification");
        this.$stu_sys_right_admin_notification.hide();
        this.root.$stu_sys.append(this.$admin);
        this.$navigation_item_logout = this.$admin.find(".stu-sys-navigation-item-logout");

        this.$head_welcome = this.$admin.find(".stu-sys-head-welcome");
        this.$foot_date = this.$admin.find(".stu-sys-foot-date");

        this.$admin_notification = this.$admin.find(".stu-sys-navigation-item-notification");
        this.$admin_notification_add = this.$admin.find(".admin-notification-add");
        this.$admin_notification_detail = this.$admin.find(".admin-notification-detail");
        this.$admin_notification_delete = this.$admin.find(".admin-notification-delete");
        this.$stu_sys_right_admin_notification_form = this.$admin.find(".stu-sys-right-admin-notification-form");
        this.$stu_sys_right_admin_notification_form.hide();
        this.$notification_title = this.$admin.find(".stu-sys-right-admin-notification-form-item input");
        this.$notification_detail = this.$admin.find(".stu-sys-right-admin-notification-form-item textarea");
        this.$notification_submit = this.$admin.find(".stu-sys-right-admin-notification-form-button");
        this.hide();
        this.start();

    }

    start(){

        $(document).ready(function(){
            $('#table-notification').DataTable({
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

            });
        });

        this.get_foot_date();
        this.get_head_name();

        this.add_listening_events();
    }

    add_listening_events(){
        this.add_listening_events_notification();
        this.add_listening_events_logout();
    }

    add_listening_events_logout(){
        let outer = this;
        this.$navigation_item_logout.click(function(){
            outer.root.account.logout_on_remote();
        });
    }

    add_listening_events_notification(){
        let outer = this;

        this.$admin_notification.click(function() {
            outer.$stu_sys_right_graphfield.hide();
            outer.$stu_sys_right_admin_notification_form.hide();
            outer.$stu_sys_right_admin_notification.show();
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
        let table = $('#table-notification').DataTable();
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
        let table = $('#table-notification').DataTable();
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
}
