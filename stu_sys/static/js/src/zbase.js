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
