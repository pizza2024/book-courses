<template>
  <ElButton @click="openModal">Publish Course</ElButton>
  <ElDialog v-model="modalVisible" title="Publish Course">
    <ElForm ref="formRef" :modal="formData" :rules="rules">
      <ElFormItem label="course" prop="courseId">
        <ElSelect placeholder="search course" v-model="formData.courseId" remote :remoteMethod="queryCourseByName" filterable clearable>
          <ElOption
            v-for="course in courses"
            :key="course.id"
            :label="course.name"
            :value="course.id"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="teacher" prop="teacherId">
        <ElSelect placeholder="search teacher" v-model="formData.teacherId" remote :remoteMethod="queryTeachersByName" filterable clearable>
          <ElOption
            v-for="teacher in teachers"
            :key="teacher.id"
            :label="teacher.username"
            :value="teacher.id"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="classRoom" prop="classRoom">
        <ElInput v-model="formData.classRoom" prop="classRoom"></ElInput>
      </ElFormItem>
      <ElFormItem label="startTime" prop="startTime">
        <ElTimeSelect start="07:00" step="00:15" end="23:30" :max-time="formData.endTime" v-model="formData.startTime"/>
      </ElFormItem>
      <ElFormItem label="endTime" prop="endTime">
        <ElTimeSelect start="07:00" step="00:15" end="23:30" :min-time="formData.startTime" v-model="formData.endTime"/>
      </ElFormItem>
      <ElFormItem label="dateRange" prop="dateRange">
        <ElDatePicker
          :model="formData.dateRange"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </ElFormItem>
      <ElFormItem label="every day" prop="isEveryDay">
        <ElCheckbox v-model="formData.isEveryDay" :indeterminate="isIndeterminate" @change="handleCheckAllChange">EveryDay</ElCheckbox>
      </ElFormItem>
      <ElFormItem label="repeat days" prop="checkedDays">
        <ElCheckboxGroup v-model="formData.checkedDays" @change="handleCheckedCitiesChange">
          <ElCheckbox v-for="x in checkboxOptions" :key="x" :label="x" :value="x">星期{{x}}</ElCheckbox>
        </ElCheckboxGroup>
      </ElFormItem>
      <ElFormItem>
        <ElButton @click="publisCourse">
          publish
        </ElButton>
        <ElButton @click="resetForm(formRef)">Reset</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>
<script setup lang="ts">
import { apiQueryCourseByName, apiQueryTeachersByName } from '@/api';
import type { ModalCourse, ModalTeacher } from 'common';
import { type FormInstance, type FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
type TypeDays = (1|2|3|4|5|6|7)[]
interface RuleForm {
  courseId: number | undefined,
  teacherId: number | undefined,
  classRoom: string | undefined,
  startTime: Date | undefined,
  endTime: Date | undefined,
  dateRange: Date[] | undefined,
  isEveryDay: boolean,
  checkedDays: TypeDays,
}
const formRef = ref<FormInstance>()
const formData = reactive<RuleForm>({
  courseId: undefined,
  teacherId: undefined,
  classRoom: undefined,
  startTime: undefined,
  endTime: undefined,
  dateRange: undefined,
  isEveryDay: false,
  checkedDays: []
})
const rules = reactive<FormRules<RuleForm>>({
  courseId: [{type: 'number',required: true, trigger: 'blur'}],
  teacherId: [{type: 'number',required: true, trigger: 'blur'}],
  classRoom: [
    { type: 'string',required: true, trigger: 'blur' }
  ],
  startTime: [{required: true, trigger: 'blur'}],
  endTime: [{required: true, trigger: 'blur'}],
  dateRange: [{type: 'array',required: true, trigger: 'blur'}],
  isEveryDay: [{required: true, trigger: 'blur'}],
  checkedDays: [{required: true, trigger: 'blur'}],
})
const modalVisible = ref(false)
const openModal = () => {
  modalVisible.value = true;
}

const courses = ref<ModalCourse[]>([]);
const queryCourseByName = (query: string) => {
  if (query) {
    apiQueryCourseByName(query).then(res => {
      if (res.data.success) {
        courses.value = res.data.courses;
      }
    })
  } else {
    courses.value = []
  }
}

const teachers = ref<ModalTeacher[]>([]);
const queryTeachersByName = (query: string) => {
  if (query) {
    apiQueryTeachersByName(query).then(res => {
      if (res.data.success) {
        teachers.value = res.data.teachers;
      }
    })
  } else {
    teachers.value = []
  }
}

const daysArr: TypeDays = [1,2,3,4,5,6,7]
const isIndeterminate = ref(false)
const checkboxOptions = ref([
  1,2,3,4,5,6,7
])
const handleCheckAllChange = (val: boolean) => {
  formData.checkedDays = val ? daysArr : []
  isIndeterminate.value = false;
}
const handleCheckedCitiesChange = (value: number[]) => {
  const checkedCount = value.length
  formData.isEveryDay = checkedCount === daysArr.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < daysArr.length
}


const publisCourse = () => {
  console.log(form)
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields()
}
</script>