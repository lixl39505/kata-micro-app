<template>
  <div class="curd">
    <ElRow>
      <ElCol :span="12">
        <h1>ElMessage</h1>
        <ElButton plain @click="openMsg1">消息</ElButton>
        <ElButton plain @click="openMsg2">成功</ElButton>
        <ElButton plain @click="openMsg3">警告</ElButton>
        <ElButton plain @click="openMsg4">错误</ElButton>
      </ElCol>
      <ElCol :span="12">
        <h1>ElNotification</h1>
        <ElButton plain @click="openNoti1"> 右上角 </ElButton>
        <ElButton plain @click="openNoti2"> 右下角 </ElButton>
        <ElButton plain @click="openNoti3"> 左下角 </ElButton>
        <ElButton plain @click="openNoti4"> 左上角 </ElButton>
      </ElCol>
    </ElRow>
    <ElRow>
      <ElCol :span="12">
        <h1>Dialog</h1>
        <ElButton plain @click="d1 = true">普通</ElButton>
        <ElButton plain @click="d2 = true">全屏</ElButton>
        <ElDialog title="提示" v-model="d1" width="30%" append-to-body>
          <span>这是一段信息</span>
          <template #footer>
            <div class="dialog-footer">
              <ElButton @click="d1 = false">取 消</ElButton>
              <ElButton type="primary" @click="d1 = false">确 定</ElButton>
            </div>
          </template>
        </ElDialog>
        <ElDialog title="提示" v-model="d2" fullscreen append-to-body>
          <span>这是一段信息</span>
          <template #footer>
            <div class="dialog-footer">
              <ElButton @click="d2 = false">取 消</ElButton>
              <ElButton type="primary" @click="d2 = false">确 定</ElButton>
            </div>
          </template>
        </ElDialog>
      </ElCol>
      <ElCol :span="12">
        <h1>Popover</h1>
        <ElPopover
          placement="top-start"
          title="标题"
          width="200"
          trigger="hover"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
          <template #reference>
            <ElButton>hover 激活</ElButton>
          </template>
        </ElPopover>
        <ElPopover
          placement="bottom"
          title="标题"
          width="200"
          trigger="click"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
          <template #reference>
            <ElButton>click 激活</ElButton>
          </template>
        </ElPopover>
        <ElPopover
          ref="popover"
          placement="right"
          title="标题"
          width="200"
          trigger="focus"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
          <template #reference>
            <ElButton>focus 激活</ElButton>
          </template>
        </ElPopover>
        <ElPopover
          ref="popover"
          placement="right"
          title="标题"
          width="200"
          trigger="contextmenu"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
          <template #reference>
            <ElButton>contextmenu 激活</ElButton>
          </template>
        </ElPopover>
        <ElPopover
          :visible="visible"
          placement="bottom"
          title="标题"
          width="200"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
          <template #reference>
            <ElButton @click="visible = !visible">手动激活</ElButton>
          </template>
        </ElPopover>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElNotification } from 'element-plus'

const d1 = ref(false)
const d2 = ref(false)
const visible = ref(false)

function openMsg1() {
  ElMessage({
    showClose: true,
    message: '这是一条消息提示',
  })
}

function openMsg2() {
  ElMessage({
    showClose: true,
    message: '恭喜你，这是一条成功消息',
    type: 'success',
  })
}

function openMsg3() {
  ElMessage({
    showClose: true,
    message: '警告哦，这是一条警告消息',
    type: 'warning',
  })
}

function openMsg4() {
  ElMessage({
    showClose: true,
    message: '错了哦，这是一条错误消息',
    type: 'error',
  })
}

function openNoti1() {
  ElNotification({
    title: '自定义位置',
    message: '右上角弹出的消息',
  })
}

function openNoti2() {
  ElNotification({
    title: '自定义位置',
    message: '右下角弹出的消息',
    position: 'bottom-right',
  })
}

function openNoti3() {
  ElNotification({
    title: '自定义位置',
    message: '左下角弹出的消息',
    position: 'bottom-left',
  })
}

function openNoti4() {
  ElNotification({
    title: '自定义位置',
    message: '左上角弹出的消息',
    position: 'top-left',
  })
}
</script>

<style lang="scss"></style>
