<script setup>
import { ref } from 'vue';
import DisclaimerInformation from '../components/disclaimer-information.vue';
const showDisclaimer = ref(false);
</script>

<template>
  <disclaimer-information v-if="showDisclaimer" data-test-id="disclaimer-information" @close="showDisclaimer = false"/>
  <div v-else class="m-3">
    <div class="d-flex justify-content-between">
      <h2>POTS Exercise Program Timer</h2>
      <button type="button" class="btn btn-secondary" data-test-id="disclaimer-button" @click="showDisclaimer=true">See Disclaimer</button>
    </div>
  </div>
</template>