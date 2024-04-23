<template>
  <div>
    <q-card>
      <q-card-section class="flex">
        <q-space />
        <q-btn
          @click="isDialog = true"
          outline
          color="teal"
          flat
          label="일정등록"
          dense
          :ripple="false"
          class="text-bold"
        />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <FullCalendar :options />
      </q-card-section>
    </q-card>

    <CalencatDialog
      v-model:isDialog="isDialog"
      v-model:form="form"
      @edit="editSchedule"
      @delete="deleteSchedule"
      @update:model-value="form = intlzCalendarForm()"
    />
  </div>
</template>
<script>
const intlzCalendarForm = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return {
    id: '',
    title: '',
    content: '',
    start: '',
    dayStart: `${year}-${month}-${day}`,
    timeStart: '12:00',
    end: '',
    dayEnd: '',
    timeEnd: '',
    display: 'block',
    color: '#3788d8',
    textColor: 'black',
  };
};
</script>
<script setup>
import { ref } from 'vue';
import { baseNotify } from 'src/utils/base-notify';

import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import CalencatDialog from 'src/components/common/calendar/CalendarDialog.vue';

const isDialog = ref(false);
const form = ref(intlzCalendarForm());
const displayEventTime = ref(false);
const day = ref({
  dayStart: '',
  dayEnd: '',
});
const events = ref([
  {
    id: 0,
    title: 'event 1',
    start: '2024-03-31T00:00:00+09:00',
    end: '2024-04-03T00:00:00+09:00',
    color: 'orange',
    textColor: 'white',
  },
  {
    id: 1,
    title: 'event 2',
    start: '2024-04-03',
    end: '2024-04-04',
    display: 'block',
  },
  {
    id: 2,
    title: 'event 3',
    start: '2024-04-21',
    end: '2024-04-23',
    display: 'block',
    color: 'red',
  },
  { id: 3, title: 'lunch', date: '2024-04-02', display: 'list-item' },
  {
    id: 4,
    title: 'vacation',
    start: '2024-04-11T12:00:00+09:00',
    end: '2024-04-13T14:15:00+09:00',
    color: 'purple',
    display: 'block',
  },
  {
    id: 5,
    title: 'metting',
    start: '2024-04-11T12:00:00+09:00',
    end: '',
    display: 'list-item',
  },
  {
    id: 6,
    title: 'work',
    start: '2024-04-23T09:00:00+09:00',
    end: '2024-04-23T18:00:00+09:00',
    color: 'teal',
    display: 'list-item',
  },
  {
    id: 7,
    title: 'dinner',
    start: '2024-04-23T19:00:00+09:00',
    end: '2024-04-23T20:00:00+09:00',
    color: 'red',
    display: 'list-item',
  },
  {
    id: 8,
    title: 'date',
    start: '2024-04-23T20:00:00+09:00',
    end: '2024-04-23T22:00:00+09:00',
    display: 'list-item',
  },
]);
const editSchedule = (id) => {
  form.value.start = `${form.value.dayStart}T${form.value.timeStart}:00+09:00`;
  form.value.end = form.value.dayEnd
    ? `${form.value.dayEnd}T${form.value.timeEnd}:00+09:00`
    : '';

  if (!id) {
    form.value.id = findMaxNum() + 1;
    events.value = [...events.value, { ...form.value }];
  } else
    for (let event of events.value)
      if (event.id == id) event = { ...form.value };

  baseNotify('일정이 등록되었습니다.');
  isDialog.value = false;
  form.value = intlzCalendarForm();
};

const deleteSchedule = (e) => {
  baseNotify(
    '일정을 삭제하시겠습니까?',
    null,
    () => {
      events.value = events.value.filter((data) => data.id != e);
      baseNotify('일정이 삭제되었습니다.');
      isDialog.value = false;
    },
    true,
  );
};
// ------------------------------------------------------------------------------
// calander

// id값 임의 생성
const findMaxNum = () => {
  const arr = [];
  for (let event of events.value) arr.push(event.id);
  return Math.max.apply(null, arr);
};
const options = ref({
  plugins: [dayGridPlugin, listPlugin, interactionPlugin],
  locale: 'ko', // 한국시간
  firstDay: 0, // 한 주의 시작을 일요일부터 (0 : 일요일, 1 : 월요일 ....)
  weekends: true, // 달력에 주말 포함여부
  nextDayThreshold: '00:00:00', // 해당 시간이 넘으면 다음 날짜로
  displayEventTime, // 달력에 시간포함 여부
  // editable: true, // false로 변경 시 draggable 작동 x
  initialView: 'dayGridMonth',
  // initialView: 'listWeek',
  dayMaxEvents: 3, // 하나의 cell에 표시될 이벤트 개수
  views: {
    dayGridMonth: { buttonText: '월' },
    listWeek: { buttonText: '주' },
    listDay: { buttonText: '일' },
  },
  headerToolbar: {
    start: 'prev,next today',
    center: 'title',
    end: 'dayGridMonth,listWeek,listDay',
  },
  noEventsContent: () => '등록된 일정이 없습니다.',
  /**
   * start : 시작날짜
   * end : 종료날짜
   * display : block : bar, list-item: dotted
   * color : background-color
   * textColor : text-color
   */
  events,
  dateClick: (arg) => {
    // 날짜 셀 클릭 시 발생하는 이벤트
    isDialog.value = true;
    // start를 오늘날짜로 변경
    form.value.start = arg.dateStr;
  },
  eventClick: ({ event }) => {
    // popover
    const popover = document.querySelector(
      `div[data-date="${event.startStr}"]`,
    );
    if (popover != null) popover.style.display = 'none';

    form.value = events.value.find((data) => data.id == event.id);
    isDialog.value = true;
  },
  /**
   * watch로 server에 데이터 요청하기
   * TODO: https://ko.vuejs.org/guide/built-ins/teleport
   *  -> 화면에 들어오면 데이터 요청 -> 데이터 받기 -> 랜더링 시간이 발생함,
   *  -> teleport로 App.vue, default.vue에 로딩바 보내기
   * prev, next 버튼 클릭 시 startDay, lastDay 받아오기
   * SELECT * FROM TABLE NAME
   * WHERE '2024-02-29T00:00:00+09:00' <= start_day AND '2024-04-09T00:00:00+09:00' >= end_day
   */
  datesSet: function ({ startStr, endStr }) {
    day.value.dayStart = startStr;
    day.value.dayEnd = endStr;
    console.log(`시작일 : ${startStr}`);
    console.log(`종료일 : ${endStr}`);
    console.log(day.value);
    console.log('---------------------------------');
  },
  // calendar의 view가 변경되면 실행되는 메서드
  viewDidMount: function ({ view }) {
    displayEventTime.value = view.type == 'dayGridMonth' ? false : true;
  },
});
// ------------------------------------------------------------------------------
</script>

<style>
/* 일요일 날짜 빨간색 */
.fc-day-sun div a {
  color: red;
  text-decoration: none;
}

/* 토요일 날짜 파란색 */
.fc-day-sat div a {
  color: #3788d8;
  text-decoration: none;
}
</style>

<!--
  fullcalendar
  https://velog.io/@chloeun/FullCalendar 참고
  
  
  install
  ...
  -  npm i --save @fullcalendar/list
  -  npm i --save @fullcalendar/core
  -  npm i --save @fullcalendar/daygrid
  -  npm i --save @fullcalendar/interaction
  -  npm i --save @fullcalendar/vue3
  ...
  
  ###########################################
  chart.js
  TODO: https://velog.io/@ptq124/Vue-Chart.js-%EC%82%AC%EC%9A%A9%EB%B2%95
  
  
  
  -->
