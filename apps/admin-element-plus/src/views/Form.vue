<template>
  <ElForm
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <ElFormItem label="Activity name" prop="name">
      <ElInput v-model="ruleForm.name" />
    </ElFormItem>
    <ElFormItem label="Activity zone" prop="region">
      <ElSelect v-model="ruleForm.region" placeholder="Activity zone">
        <ElOption label="Zone one" value="shanghai" />
        <ElOption label="Zone two" value="beijing" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem label="Activity count" prop="count">
      <ElSelectV2 v-model="ruleForm.count" placeholder="Activity count" :options="options" />
    </ElFormItem>
    <ElFormItem label="Activity time" required>
      <ElCol :span="11">
        <ElFormItem prop="date1">
          <ElDatePicker
            v-model="ruleForm.date1"
            type="date"
            label="Pick a date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </ElFormItem>
      </ElCol>
      <ElCol class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </ElCol>
      <ElCol :span="11">
        <ElFormItem prop="date2">
          <ElTimePicker v-model="ruleForm.date2" label="Pick a time" placeholder="Pick a time" style="width: 100%" />
        </ElFormItem>
      </ElCol>
    </ElFormItem>
    <ElFormItem label="Instant delivery" prop="delivery">
      <ElSwitch v-model="ruleForm.delivery" />
    </ElFormItem>
    <ElFormItem label="Activity location" prop="location">
      <ElSegmented v-model="ruleForm.location" :options="locationOptions" />
    </ElFormItem>
    <ElFormItem label="Activity type" prop="type">
      <ElCheckboxGroup v-model="ruleForm.type">
        <ElCheckbox value="Online activities" name="type"> Online activities </ElCheckbox>
        <ElCheckbox value="Promotion activities" name="type"> Promotion activities </ElCheckbox>
        <ElCheckbox value="Offline activities" name="type"> Offline activities </ElCheckbox>
        <ElCheckbox value="Simple brand exposure" name="type"> Simple brand exposure </ElCheckbox>
      </ElCheckboxGroup>
    </ElFormItem>
    <ElFormItem label="Resources" prop="resource">
      <ElRadioGroup v-model="ruleForm.resource">
        <ElRadio value="Sponsorship">Sponsorship</ElRadio>
        <ElRadio value="Venue">Venue</ElRadio>
      </ElRadioGroup>
    </ElFormItem>
    <ElFormItem label="Activity form" prop="desc">
      <ElInput v-model="ruleForm.desc" type="textarea" />
    </ElFormItem>
    <ElFormItem>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </ElFormItem>
  </ElForm>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  location: string
  type: string[]
  resource: string
  desc: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  location: '',
  type: [],
  resource: '',
  desc: '',
})

const locationOptions = ['Home', 'Company', 'School']

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  location: [
    {
      required: true,
      message: 'Please select a location',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>
