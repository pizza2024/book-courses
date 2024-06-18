<script setup lang="ts">
import { apiPostCourse } from '@/api';
import type { FormCourseType } from 'common';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';

const emit = defineEmits(['addSuccess'])
const dialogFormVisible = ref(false)
const DEFAULT_FORM_COURSE: Omit<FormCourseType, 'adminId'> = {
  name: ''
}
const formCourse = reactive<Omit<FormCourseType, 'adminId'>>(DEFAULT_FORM_COURSE)
const formCourseRules = reactive<FormRules<typeof formCourse>>({
  name: [{ required: true, message: '请输入课程名', trigger: 'change' }],
})
const formRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const addCourse = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const isValid = await formEl.validate()
  if (isValid) {
    console.log(formCourse)
    apiPostCourse(formCourse).then(res => {
      if (res.data.success) {
        dialogFormVisible.value = false;
        emit('addSuccess')
      }
    })
  }
}
</script>
<template>
<ElButton @click="dialogFormVisible = true">New Course</ElButton>
<ElDialog v-model="dialogFormVisible" title="New Course" @close="resetForm(formRef)">
  <ElForm :model="formCourse" ref="formRef" label-width="100px" :rules="formCourseRules">
    <ElFormItem v-for="(val, key) in formCourse" :key="key" :prop="key" :label="key">
      <ElInput :placeholder="key" v-model="formCourse[key]"></ElInput>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="addCourse(formRef)">Submit</ElButton>
      <ElButton @click="resetForm(formRef)">reset</ElButton>
    </ElFormItem>
  </ElForm>
</ElDialog>
</template>