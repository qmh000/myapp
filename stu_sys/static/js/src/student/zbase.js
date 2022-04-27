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
