<script setup lang="ts">
import { apiPublishedCourseList } from '@/api';
import { useLoginStore } from '@/stores/login';
import { ElCol, ElLink, ElRow } from 'element-plus';
import { forEach } from 'lodash';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const loginStore = useLoginStore()
function signout() {
  loginStore.token = null;
  localStorage.clear();
  router.replace({
    name: 'login'
  })
}
const attributes = ref<{
  key: string | number;
  customData: {
    title: string;
    class: string;
    bgColor: string;
    textColor: string;
  },
  dates: Date | Date[]
}[]>([
  // {
  //   key: 1,
  //   customData: {
  //     title: 'Lunch with mom.',
  //     class: 'bg-red-600 text-white',
  //   },
  //   dates: [new Date(year, month, 1), new Date(year, month, 5)],
  // },
  // {
  //   key: 2,
  //   customData: {
  //     title: 'Take Noah to basketball practice',
  //     class: 'bg-blue-500 text-white',
  //   },
  //   dates: new Date(year, month, 2),
  // },
  // {
  //   key: 3,
  //   customData: {
  //     title: "Noah's basketball game.",
  //     class: 'bg-blue-500 text-white',
  //   },
  //   dates: new Date(year, month, 5),
  // },
  // {
  //   key: 4,
  //   customData: {
  //     title: 'Take car to the shop',
  //     class: 'bg-indigo-500 text-white',
  //   },
  //   dates: new Date(year, month, 5),
  // },
  // {
  //   key: 4,
  //   customData: {
  //     title: 'Meeting with new client.',
  //     class: 'bg-teal-500 text-white',
  //   },
  //   dates: new Date(year, month, 7),
  // },
  // {
  //   key: 5,
  //   customData: {
  //     title: "Mia's gymnastics practice.",
  //     class: 'bg-pink-500 text-white',
  //   },
  //   dates: new Date(year, month, 11),
  // },
  // {
  //   key: 6,
  //   customData: {
  //     title: 'Cookout with friends.',
  //     class: 'bg-orange-500 text-white',
  //   },
  //   // dates: { months: 5, ordinalWeekdays: { 2: 1 } },
  // },
  // {
  //   key: 7,
  //   customData: {
  //     title: "Mia's gymnastics recital.",
  //     class: 'bg-pink-500 text-white',
  //   },
  //   dates: new Date(year, month, 22),
  // },
  // {
  //   key: 8,
  //   customData: {
  //     title: 'Visit great grandma.',
  //     class: 'bg-red-600 text-white',
  //   },
  //   dates: new Date(year, month, 25),
  // },
]);
onMounted(() => {
  function getRandomColorAndComplement() {
    // 生成一个随机的主色调 (HSL 模型中的色调部分，范围为0-360)
    const mainHue = Math.floor(Math.random() * 360);
    
    // 饱和度和亮度可以固定为某些值，也可以随机生成
    const saturation = 40; // 固定为70%
    const lightness = 40; // 固定为50%

    // 计算互补色的色调
    const complementaryHue = (mainHue + 180) % 360;

    // 将HSL转换为CSS颜色字符串
    const mainColor = `hsl(${mainHue}, ${saturation}%, ${lightness}%)`;
    const complementaryColor = `hsl(${complementaryHue}, ${saturation}%, ${lightness}%)`;

    return {
        mainColor,
        complementaryColor
    };
}
  apiPublishedCourseList().then(res => {
    if (res.data.success) {
      const courses = res.data.rows;
      attributes.value = []
      forEach(courses, (x, index) => {
        const colors = getRandomColorAndComplement()
        const classInfo = `text-gray-100`;
        attributes.value.push({
          key: `${x.courseId}:${x.teacherId}:${index}`,
            customData: {
              title: x.courseName,
              class: classInfo,
              bgColor: colors.mainColor,
              textColor: colors.complementaryColor
            },
            dates: new Date(x.startTime)
        })
        
        
      })
    }

  })
})
const date = ref(new Date('2024-08-15'))
</script>

<template>
  <ElRow style="margin-bottom: 10px">
    <ElCol :span="12">
      <ElLink style="margin-right: 10px">{{ loginStore.username }}</ElLink>
      <ElButton @click="signout">sign out</ElButton>
    </ElCol>
  </ElRow>
  <ElRow>
    <ElCol :span="24">
      <VCalendar v-model="date" :attributes="attributes" class="custom-calendar max-w-full" color="sky-blue" expanded>
        <template v-slot:day-content="{ day, attributes }">
          <div class="flex flex-col h-full z-10 overflow-hidden p-1">
            <div class="border border-1 rounded p-1">
              <div class="px-1">{{ day.day }}</div>
              <div class="flex-grow overflow-y-auto overflow-x-auto h-[100px]">
                <p
                  v-for="attr in attributes"
                  :key="attr.key"
                  class="text-[1rem] leading-tight rounded-sm mb-1 p-1 font-bold"
                  :class="attr.customData.class"
                  :style="{backgroundColor: attr.customData.bgColor, color: '#FFF', }"
                >
                  {{ attr.customData.title }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </VCalendar>
    </ElCol>
  </ElRow>
</template>
<style scoped>
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}
.custom-calendar :deep(.vc-weekday-1, .vc-weekday-7) {
  color: #6366f1;
}
.vc-sky-blue {
  --vc-accent-50: #f0f9ff;
  --vc-accent-100: #e0f2fe;
  --vc-accent-200: #bae6fd;
  --vc-accent-300: #7dd3fc;
  --vc-accent-400: #38bdf8;
  --vc-accent-500: #0ea5e9;
  --vc-accent-600: #0284c7;
  --vc-accent-700: #0369a1;
  --vc-accent-800: #075985;
  --vc-accent-900: #0c4a6e;
}
</style>