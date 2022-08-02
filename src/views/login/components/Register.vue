<template>
  <div class="box">
    <div class="title">注册</div>
    <el-form
      label-width="70px"
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="手机号" prop="account" rules="phone">
        <el-input v-model="ruleForm.account" maxlength="11">
          <template #append>
            <el-button
              @click="getCodeClick"
              type="info"
              link
              :loading="codeLoading"
            >
              {{ time ? time : '获取验证码' }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>
    </el-form>
    <div class="login_button">
      <el-button
        class="button"
        type="primary"
        @click="submitForm"
        :loading="loading"
      >
        注册
      </el-button>
    </div>
    <div class="footer">
      <el-button @click="goLoginClick" class="footer_button" type="info" link>
        使用已有手机号去登入
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { utilValidatePhone } from '@/utils/util'

const effectForm = () => {
  const loading = ref(false)
  const ruleForm = reactive({
    account: '',
    password: ''
  })

  const validatePhone = (rule: any, value: any, callback: any) => {
    if (!utilValidatePhone(ruleForm.account)) {
      callback(new Error('请输入正确的手机号'))
    }
    callback()
  }

  const rules = reactive<FormRules>({
    account: [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'change'
      },
      {
        validator: validatePhone,
        trigger: ['blur', 'change']
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'change'
      }
    ]
  })
  const ruleFormRef = ref<FormInstance>()
  const submitForm = async () => {
    if (!ruleFormRef.value) return
    await ruleFormRef.value.validate((valid) => {
      if (valid) {
        loading.value = true
        setTimeout(() => {
          loading.value = false
        }, 1500)
      }
    })
  }

  const time = ref(0)
  const codeLoading = ref(false)
  const getCodeClick = () => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.validateField('account', (valid) => {
      if (valid) {
        if (!time.value) {
          codeLoading.value = true
          setTimeout(() => {
            codeLoading.value = false
            ElMessage({
              message: '验证码发送成功，请注意查收',
              type: 'success'
            })
            time.value = 60
            const timer = setInterval(() => {
              time.value--
              if (!time.value) {
                clearInterval(timer)
              }
            }, 1000)
          }, 1000)
        }
      }
    })
  }

  return {
    loading,
    ruleForm,
    rules,
    ruleFormRef,
    time,
    codeLoading,
    submitForm,
    getCodeClick
  }
}

export default defineComponent({
  setup (props, ctx) {
    const {
      loading,
      ruleForm,
      rules,
      ruleFormRef,
      time,
      codeLoading,
      submitForm,
      getCodeClick
    } = effectForm()

    const goLoginClick = () => {
      ctx.emit('goLogin')
    }

    return {
      loading,
      ruleForm,
      rules,
      ruleFormRef,
      time,
      codeLoading,
      submitForm,
      goLoginClick,
      getCodeClick
    }
  }
})
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 28px;
    text-align: center;
    margin-bottom: 40px;
  }

  .demo-ruleForm {
    width: 400px;
  }

  .login_button {
    text-align: center;

    .button {
      width: 400px;
      margin-top: 20px;
    }
  }

  .footer {
    width: 400px;
    margin-top: 16px;
    text-align: right;
  }
}
</style>
