<script setup>
import { ref } from 'vue';
import DisclaimerInformation from '../components/disclaimer-information.vue';

const showDisclaimer = ref(false);

const selectedMonth = ref('');
const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8'];
</script>

<template>
  <disclaimer-information v-if="showDisclaimer" data-test-id="disclaimer-information" @close="showDisclaimer = false"/>
  <div v-else class="m-3">
    <div data-test-id="main-header" class="d-flex justify-content-between">
      <h2>POTS Exercise Program Timer</h2>
      <button type="button" class="btn btn-secondary" data-test-id="disclaimer-button" @click="showDisclaimer=true">See Disclaimer</button>
    </div>
    <div data-test-id="main-body">
      <select class="form-select form-select-sm my-3" data-test-id="month-dropdown">
        <option v-for="month in months" v-bind:key="month" :data-test-id="month + '-dropdown-option'" @click="selectedMonth = month">{{ month }}</option>
      </select>
    </div>
  </div>
</template>