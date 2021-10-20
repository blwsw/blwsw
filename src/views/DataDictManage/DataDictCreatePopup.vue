<template>
    <div ref="popup">
        <el-form
            class="hd-page"
            label-width="5em"
            :model="form"
            :rules="rules"
            ref="form"
            :disabled="busy"
        >
            <el-form-item
                label="代码"
                prop="code"
            >
                <el-input
                    v-model="form.code"
                    placeholder="请输入代码"
                    clearable
                />
            </el-form-item>

            <el-form-item
                label="名称"
                prop="name"
            >
                <el-input
                    v-model="form.name"
                    placeholder="请输入名称"
                    clearable
                />
            </el-form-item>

            <el-form-item
                label="类型"
                prop="type"
            >
                <el-input
                    v-model="form.type"
                    placeholder="请输入类型"
                    clearable
                />
            </el-form-item>

            <el-form-item
                label="路由"
                prop="router"
            >
                <el-input
                    v-model="form.router"
                    placeholder="请输入路由"
                    clearable
                />
            </el-form-item>

            <el-form-item
                label="模块"
                prop="pathName"
            >
                <el-input
                    v-model="form.moduleId"
                    placeholder="请输入模块"
                    clearable
                />
            </el-form-item>

            <el-form-item
                label="作用域"
                prop="router"
            >
                <el-input
                    v-model="form.dataPermOptions"
                    placeholder="请输入作用域"
                    clearable
                />
            </el-form-item>


        </el-form>

        <template #foot>
            <el-button
                    type="primary"
                    :loading="busy"
                    @click="onClickSave"
                    size="small"
            >保存</el-button>
            <el-button
                    :loading="busy"
                    @click="onClickCancel"
                    size="small"
            >取消</el-button>
        </template>
    </div>
</template>

<script src="./DataDictCreatePopup.js"></script>

<style scoped>
.div-overlay>>>.div {
    /* 屏幕百分比 */
    /*
    width: 80vw;
    height: 80vh;
    */
    /* 绝对值 */
    /*
    width: 800px;
    height: 500px;
    */
}
</style>
