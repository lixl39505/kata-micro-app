<template>
  <ElForm :model="fdata" :rules="rules" ref="mform" label-width="100px" class="demo-ruleForm">
    <ElFormItem label="活动名称" prop="name">
      <ElInput v-model="fdata.name"></ElInput>
    </ElFormItem>
    <ElFormItem label="活动区域" prop="region">
      <ElSelect v-model="fdata.region" placeholder="请选择活动区域">
        <ElOption label="区域一" value="shanghai"></ElOption>
        <ElOption label="区域二" value="beijing"></ElOption>
      </ElSelect>
    </ElFormItem>
    <ElFormItem label="活动时间" required>
      <ElCol :span="11">
        <ElFormItem prop="date1">
          <ElDatePicker type="date" placeholder="选择日期" v-model="fdata.date1" style="width: 100%"></ElDatePicker>
        </ElFormItem>
      </ElCol>
      <ElCol class="line" :span="2">-</ElCol>
      <ElCol :span="11">
        <ElFormItem prop="date2">
          <ElTimePicker placeholder="选择时间" v-model="fdata.date2" style="width: 100%"></ElTimePicker>
        </ElFormItem>
      </ElCol>
    </ElFormItem>
    <ElFormItem label="即时配送" prop="delivery">
      <ElSwitch v-model="fdata.delivery"></ElSwitch>
    </ElFormItem>
    <ElFormItem label="活动性质" prop="type">
      <ElCheckboxGroup v-model="fdata.type">
        <ElCheckbox label="美食/餐厅线上活动" name="type"></ElCheckbox>
        <ElCheckbox label="地推活动" name="type"></ElCheckbox>
        <ElCheckbox label="线下主题活动" name="type"></ElCheckbox>
        <ElCheckbox label="单纯品牌曝光" name="type"></ElCheckbox>
      </ElCheckboxGroup>
    </ElFormItem>
    <ElFormItem label="特殊资源" prop="resource">
      <ElRadioGroup v-model="fdata.resource">
        <ElRadio label="线上品牌商赞助"></ElRadio>
        <ElRadio label="线下场地免费"></ElRadio>
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem label="活动形式" prop="desc">
      <ElInput type="textarea" v-model="fdata.desc"></ElInput>
    </ElFormItem>
    <ElFormItem>
      <el-button type="primary" @click="submitForm">立即创建</el-button>
      <el-button @click="resetForm">重置</el-button>
    </ElFormItem>
  </ElForm>
</template>
<script lang="ts" setup>
import type { Form as ElForm } from 'element-ui'

const fdata = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const rules = reactive({
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
  ],
  region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
  date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
  date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
  type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
  resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
  desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
})
const mform = ref<ElForm>()

function submitForm() {
  mform.value?.validate((valid) => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
function resetForm() {
  mform.value?.resetFields()
}
</script>
<style lang="scss"></style>
