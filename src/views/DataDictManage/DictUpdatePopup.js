export default {
    data() {
        return {
            form: {},
            rules: {},
            busy: false,
            tableData: [],
            modules: [],
            dictTypes:[],
        };
    },
    async created() {
        const items = await this.$hd.api.get({
            url: '/uc/dictTypes'
        });
        this.$data.dictTypes = items.map(({code, name}) => {
            return {code, name};
        });


    },
    computed: {

    },

    // watch: {
    //     'form.tailorNumber':function(val,oldval) {
    //         if (val == 'CJ190331001') {
    //             this.form.styleNumber = 'kh001';
    //             this.form.customer = 'TOMMY';
    //         } else if (val == 'CJ190331002') {
    //             this.form.styleNumber = 'kh002';
    //             this.form.customer = '阿迪达斯';
    //         } else {
    //             this.form.styleNumber = ' ';
    //             this.form.customer = '     ';
    //         }
    //     }
    // },
    methods: {
        /*inputTailrNumber(val) {
            this.form.tailorNumber = val;
            if (this.form.tailorNumber == 'CJ190331001') {
                this.form.styleNumber = 'kh001';
                this.form.customer = 'TOMMY';
            } else if (this.form.tailorNumber == 'CJ190331002') {
                this.form.styleNumber = 'kh002';
                this.form.customer = '阿迪达斯';
            }
        },*/
        tableAdd(index, row) {
            this.tableData.push({});
        },
        tableDel(index, row) {
            this.tableData.splice(index, 1);
        },
        async open(data) {
            const dicts = await this.$hd.api.get({
                url: '/uc/dicts',
                params: {typeCode: data.code,sort:'+sortSeq'
                }
            });

            this.$data.tableData = dicts.map(({code, name,sortSeq}) => {
                return {code, name,sortSeq};
            });

            this.$refs.popup.open({isModal: true});
            this.form = {typeCode:data.code};

            return new Promise((resolve, reject) => {
                this._resolve = resolve;
                this._reject = reject;
            });
        },

        onClickCancel() {
            this.$refs.popup.close();
            this._resolve(null);
        },


        onClickSave() {

            const save = (data) => {

                // data.dictVOS=JSON.stringify(this.$data.tableData);
                data.dictVOS=this.$data.tableData;
                return this.$hd.runAsync(async (options) => {
                    options.loadingMsg = '正在保存，请稍候...';
                    options.showOk = true;
                    options.okMsg = '保存成功！';
                    options.errorMsg = ({message}) => `保存失败: ${message}`;

                    return await this.$hd.api.post({
                        url: 'uc/dicts',
                        body: data,
                    });
                });
            };

            this.$refs.form.validate(async (isValid) => {
                const datas=this.$data.tableData;
                const codes=[];
                for(var n=0;n<datas.length;n++){
                    if(codes.indexOf(datas[n].code)> -1){
                        this.$message.error("代码不能相同");
                        isValid=false;
                    }else{
                        codes.push(datas[n].code);
                    }

                    if(typeof(datas[n].code)=="undefined"){
                        this.$message.error("代码不能为空");
                        isValid=false;
                    }
                    if(typeof(datas[n].name)=="undefined"){
                        this.$message.error("名称不能为空");
                        isValid=false;
                    }
                    if(typeof(datas[n].sortSeq)=="undefined"){
                        this.$message.error("排序不能为空");
                        isValid=false;
                    }
                }
                if (isValid) {
                    this.busy = true;

                    try {
                        this.form.id = await save(this.form);
                        this.$refs.popup.close();
                        this._resolve(this.form);
                        this.$emit('search');
                    } finally {
                        this.busy = false;
                    }
                } else {
                    return false;
                }
            });
        },
    },
};
