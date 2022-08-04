<template>
  <el-dialog v-model="dialogVisible" title="创建" width="30%" @close="closeDialog">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="学科" prop="subject">
        <el-select v-model="ruleForm.subject" class="m-2" placeholder="请选择老师教授科目">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-select v-model="ruleForm.class" class="m-2" placeholder="请选择老师教授班级">
          <el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const options = [{ label: '语文', value: '1' }, { label: '数学', value: '2' }, { label: '英语', value: '3' }]
const classList = [{ label: '一班', value: '1' }, { label: '二班', value: '2' }, { label: '三班', value: '3' }]

export default defineComponent({
  name: 'CreateOrEdit',
  emits: ['closeCreateOrEdit'],
  setup (_, ctx: SetupContext) {
    const dialogVisible = ref<boolean>(true)
    const closeDialog = () => {
      ctx.emit('closeCreateOrEdit')
    }
    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive({
      name: '',
      subject: [],
      class: []
    })
    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入姓名', trigger: 'blur' }
      ],
      subject: [
        { required: true, message: '请选择学科', trigger: 'blur' }
      ]
    })
    const confirmClick = async () => {
      if (!ruleFormRef.value) return
      await ruleFormRef.value.validate((valid) => {
        if (valid) {
          setTimeout(() => {
            ctx.emit('closeCreateOrEdit', true)
          }, 1000)
        }
      })
    }
    return { dialogVisible, ruleForm, rules, options, classList, closeDialog, confirmClick }
  }
})
</script>

<style>
</style>
