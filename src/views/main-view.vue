<script setup>
import { ref, computed } from 'vue';
import DisclaimerInformation from '../components/disclaimer-information.vue';
import { TRAINING_CALENDAR } from '../models/training-days';

const showDisclaimer = ref(false);

const selectedMonth = ref('Month 1');
const months = [...new Set(TRAINING_CALENDAR.map((d) => d.month))];

const selectedDay = ref(1);
const days = computed(() => {
  return TRAINING_CALENDAR.filter((d) => d.month === selectedMonth.value).map((d) => d.day);
});
</script>

<template>
  <disclaimer-information v-if="showDisclaimer" data-test-id="disclaimer-information" @close="showDisclaimer = false"/>
  <div v-else class="m-3">
    <div data-test-id="main-header" class="d-flex justify-content-between">
      <h2>POTS Exercise Program Timer</h2>
      <button type="button" class="btn btn-secondary" data-test-id="disclaimer-button" @click="showDisclaimer=true">See Disclaimer</button>
    </div>
    <h3>{{ selectedMonth }} - Day {{ selectedDay }}</h3>
    <div class="d-flex flex-row">
      <select class="form-select form-select-sm me-2" data-test-id="month-dropdown">
        <option v-for="month in months" v-bind:key="month" :data-test-id="month + '-dropdown-option'" @click="selectedMonth = selected">{{ month }}</option>
      </select>
      <select class="form-select form-select-sm" data-test-id="day-dropdown">
        <option v-for="day in days" v-bind:key="day" :data-test-id="day + '-dropdown-option'" @click="selectedDay = day">Day {{ day }}</option>
      </select>
    </div>
  </div>
</template>