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
