<template>
  <ElForm :model="m" status-icon :rules="rules" ref="form" label-width="100px" class="login">
    <ElFormItem label="用户名" prop="username">
      <ElInput v-model="m.username" autocomplete="off"></ElInput>
    </ElFormItem>
    <ElFormItem label="密码" prop="pwd">
      <ElInput type="password" v-model="m.pwd" autocomplete="off"></ElInput>
    </ElFormItem>
    <ElFormItem label="确认密码" prop="pwd2">
      <ElInput type="password" v-model="m.pwd2" autocomplete="off"></ElInput>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="onSubmit">提交</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
import { type FormItemRule } from 'element-plus'
import { useUserStore } from '~/stores/user'

// 表单数据
const m = reactive({
  username: '',
  pwd: '',
  pwd2: '',
})
const form = ref<InstanceType<AutoComponentInstance['ElForm']> | null>(null)
// 验证规则
const checkUsername: FormItemRule['validator'] = (rule, value, callback) => {
  if (value.length < 1) {
    return callback(new Error('用户名不能为空'))
  }
  callback()
}
const checkPwd: FormItemRule['validator'] = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('请输入密码'))
  }
  callback()
}
const checkPwd2: FormItemRule['validator'] = (rule, value, callback) => {
  if (value === '') {
    return callback(new Error('请再次输入密码'))
  } else if (value !== m.pwd) {
    return callback(new Error('两次输入密码不一致!'))
  }
  callback()
}
const rules = reactive({
  username: [{ validator: checkUsername, trigger: 'blur' }],
  pwd: [{ validator: checkPwd, trigger: 'blur' }],
  pwd2: [{ validator: checkPwd2, trigger: 'blur' }],
})
// 登录逻辑
const user = useUserStore()
const refer = useSS('refer', '')
const router = useRouter()
function onSubmit() {
  form.value
    ?.validate()
    .then(() => user.login({ username: m.username, pwd: m.pwd }))
    .then(() => {
      if (refer.value) {
        router.push(refer.value)
      } else {
        router.push('/')
      }
    })
}
</script>

<style lang="scss">
.login {
  width: 300px;
  margin: auto;
  margin-top: 200px;
}
</style>
