<template>
  <ElButton @click="openModal">Publish Course</ElButton>
  <ElDialog v-model="modalVisible" title="Publish Course">
    <ElForm ref="formRef" :model="formData" :rules="rules" labelWidth="100px">
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
        <ElInput v-model="formData.classRoom" clearable></ElInput>
      </ElFormItem>
      <ElFormItem label="startTime" prop="startTime">
        <ElTimeSelect start="07:00" step="00:15" end="23:30" :max-time="formData.endTime" v-model="formData.startTime"/>
      </ElFormItem>
      <ElFormItem label="endTime" prop="endTime">
        <ElTimeSelect start="07:00" step="00:15" end="23:30" :min-time="formData.startTime" v-model="formData.endTime"/>
      </ElFormItem>
      <ElFormItem label="dateRange" prop="dateRange">
        <ElDatePicker
          v-model="formData.dateRange"
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
        <ElButton @click="publisCourse(formRef)">
          publish
        </ElButton>
        <ElButton @click="resetForm(formRef)">Reset</ElButton>
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>
<script setup lang="ts">
import { apiPublishCourses, apiQueryCourseByName, apiQueryTeachersByName } from '@/api';
import type { ModalCourse, ModalPublishedCourse, ModalTeacher } from 'common';
import { ElForm, ElFormItem, ElInput, type FormInstance, type FormRules } from 'element-plus';
import moment from 'moment';
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
const formData = ref<RuleForm>({
  courseId: undefined,
  teacherId: undefined,
  classRoom: undefined,
  startTime: undefined,
  endTime: undefined,
  dateRange: [],
  isEveryDay: false,
  checkedDays: []
})
const rules = reactive<FormRules<RuleForm>>({
  courseId: [{type: 'number',required: true, trigger: 'change'}],
  teacherId: [{type: 'number',required: true, trigger: 'change'}],
  classRoom: [
    { required: true, trigger: 'change' }
  ],
  startTime: [{required: true, trigger: 'change'}],
  endTime: [{required: true, trigger: 'change'}],
  // dateRange: [{type: 'array',required: true, trigger: 'change'}],
  // isEveryDay: [{required: true, trigger: 'change'}],
  // checkedDays: [{required: true, trigger: 'change'}],
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
  formData.value.checkedDays = val ? daysArr : []
  isIndeterminate.value = false;
}
const handleCheckedCitiesChange = (value: number[]) => {
  const checkedCount = value.length
  formData.value.isEveryDay = checkedCount === daysArr.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < daysArr.length
}


const publisCourse = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate().then(res => {
    console.log(formData.value)
    const dateRange = formData.value.dateRange || [];
    const now = Date.now();
    const _startDate = moment(dateRange[0] || now);
    const _endDate = moment(dateRange[1] || now);
    const isEveryDay = formData.value.isEveryDay;
    const checkedDays = formData.value.checkedDays;
    const _indexDate = _startDate.clone();
    const prepublishCourses: Omit<Omit<ModalPublishedCourse, 'id'>, 'adminId'>[] = [];
    if (!isEveryDay && !isIndeterminate.value) {
      const startTime = moment(_indexDate.format('YYYY-MM-DD') + ' ' + formData.value.startTime)
      const endTime = moment(_indexDate.format('YYYY-MM-DD') + ' ' + formData.value.endTime)
      prepublishCourses.push({
        courseId: formData.value.courseId as number,
        teacherId: formData.value.teacherId as number,
        classRoom: formData.value.classRoom || '',
        startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
        endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
        isOpen: true,
        canJoin: true,
      })
    } else {
      while (_indexDate.isSameOrBefore(_endDate)) {
        if ((isIndeterminate.value && checkedDays.includes(_indexDate.weekday() as any)) || isEveryDay) {
          const startTime = moment(_indexDate.format('YYYY-MM-DD') + ' ' + formData.value.startTime)
          const endTime = moment(_indexDate.format('YYYY-MM-DD') + ' ' + formData.value.endTime)
          prepublishCourses.push({
            courseId: formData.value.courseId as number,
            teacherId: formData.value.teacherId as number,
            classRoom: formData.value.classRoom || '',
            startTime: startTime.format('YYYY-MM-DD HH:mm:ss'),
            endTime: endTime.format('YYYY-MM-DD HH:mm:ss'),
            isOpen: true,
            canJoin: true,
          })
        }
        _indexDate.add(1, 'day');
      }
    }
    console.log(prepublishCourses)
    apiPublishCourses(prepublishCourses).then(res => {
      console.log('res is', res)
    })
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields()
}
</script>