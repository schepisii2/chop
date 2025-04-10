<script setup>
import { ref, computed } from 'vue';
import DisclaimerInformation from '../components/disclaimer-information.vue';
import timerCard from '../components/timer-card.vue';
import { TRAINING_CALENDAR, ExerciseType } from '../models/training-days';

const showDisclaimer = ref(false);

const selectedMonth = ref('Month 1');
const months = [...new Set(TRAINING_CALENDAR.map((d) => d.month))];

const selectedDay = ref(1);
const days = computed(() => {
  return TRAINING_CALENDAR.filter((d) => d.month === selectedMonth.value).map((d) => d.day);
});

const trainingDay = computed(() => { return TRAINING_CALENDAR.find((d) => d.month === selectedMonth.value && d.day === selectedDay.value); } );
const typeText = computed(() => {
  let text = ''
  const type = trainingDay.value.type;
  if (type === ExerciseType.Rest) {
    text = 'Rest Day';
  }
  if (type === ExerciseType.Cardio) {
    text = 'Cardio Day';
  }
  if (type === ExerciseType.Strength) {
    text = 'Strength Training';
  }
  return text;
});

const timerIndex = ref(0);
const currentTimer = computed(() => { 
  if (trainingDay.value.timers && trainingDay.value.timers.length > timerIndex.value) {
    return trainingDay.value.timers[timerIndex.value];
  } 
  return null; 
});
const upcomingTimer = computed(() => { 
  if (trainingDay.value.timers && trainingDay.value.timers.length > timerIndex.value + 1) {
    return trainingDay.value.timers[timerIndex.value + 1];
  } 
  return null; 
});
</script>

<template>
  <disclaimer-information v-if="showDisclaimer" data-test-id="disclaimer-information" @close="showDisclaimer = false"/>
  <div v-else class="m-3">

    <div data-test-id="main-header" class="d-flex justify-content-between">
      <h2>POTS Exercise Program Timer</h2>
      <button type="button" class="btn btn-secondary" data-test-id="disclaimer-button" @click="showDisclaimer=true">See Disclaimer</button>
    </div>
    
    <div data-test-id="dropdowns" class="d-flex flex-row my-2">
      <div class="dropdown me-2" data-test-id="month-dropdown">
        <button class="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          {{ selectedMonth }}
        </button>
        <ul class="dropdown-menu">
          <li v-for="month in months" v-bind:key="month" :data-test-id="month + '-dropdown-option'" @click="selectedMonth = month"><a class="dropdown-item">{{ month }}</a></li>
        </ul>
      </div>

      <div class="dropdown" data-test-id="day-dropdown">
        <button class="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Day {{ selectedDay }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li v-for="day in days" v-bind:key="day" :data-test-id="day + '-dropdown-option'" @click="selectedDay = day"><a class="dropdown-item">Day {{ day }}</a></li>
        </ul>
      </div>
    </div>
     
    <h3 data-test-id="training-day-type">{{ typeText }}</h3>
    <div v-if="currentTimer">
    <timer-card v-show="timer === currentTimer" v-for="timer in trainingDay.timers" v-bind:key="timer" :duration="timer.duration" :zone="timer.zone" class="my-2" @close="timerIndex++"></timer-card>
    <p v-if="upcomingTimer" class="d-flex justify-content-end" data-test-id="upcoming-timer">Upcoming: {{ upcomingTimer.duration }} Minute Timer - {{ upcomingTimer.zone.label }}</p>
    </div>
  </div>
</template>