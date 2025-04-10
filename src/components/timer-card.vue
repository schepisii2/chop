<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps(['duration'])
const emits = defineEmits(['close'])

const showStartButton = ref(true);

const minutesLeft = ref(props.duration);
const secondsLeft = ref(0);
function startTimer() {
    showStartButton.value = false;
    let timer = setInterval(() => {
        if (secondsLeft.value > 0) {
            secondsLeft.value = secondsLeft.value - 1;
        }
        else if (minutesLeft.value > 0) {
            minutesLeft.value = minutesLeft.value - 1;
            secondsLeft.value = 59;
        }
        else {
            alert(`${props.duration} minute timer complete!`);
            clearInterval(timer);
            emits('close');
        }
    }, 1000);
}
</script>

<template>
  <div class="card">
    <div class="card-header"> 
      <div class="d-flex justify-content-between">
        <h5 class="card-title" data-test-id="timer-title">{{ props.duration }} Minute Timer</h5>
      </div>
    </div>
    <div class="card-body d-flex flex-column">
       <h1 class="d-flex justify-content-center" data-test-id="time-remaining">{{ minutesLeft }}:{{ secondsLeft.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}}</h1> 
       <button v-if="showStartButton" type="button" class="btn btn-outline-dark" data-test-id="start-button" @click="startTimer">Start</button>
    </div>
  </div>
</template>