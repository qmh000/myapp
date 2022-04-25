class StuSys{
    constructor(id){
        this.id = id;
        this.$stu_sys = $('#' + id);
        this.account = new StuSysAccount(this);

        this.start();
    }

    start(){
    }
}
