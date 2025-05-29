<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import NotificationSound from '../../audio/notification.mp3';

const props = defineProps(['duration', 'zone', 'remainingTime']);
const emits = defineEmits(['close']);

const showStartButton = ref(true);

const totalMinutesLeft = ref(props.remainingTime);
const minutesLeft = ref(props.duration);
const secondsLeft = ref(0);
let timer = {};
function startTimer() {
	showStartButton.value = false;
	timer = setInterval(() => {
		if (secondsLeft.value > 0) {
			secondsLeft.value = secondsLeft.value - 1;
		} else if (minutesLeft.value > 0) {
			minutesLeft.value = minutesLeft.value - 1;
			secondsLeft.value = 59;
			totalMinutesLeft.value = totalMinutesLeft.value - 1;
		} else {
			endTimer();
		}
	}, 1000);
}
function pauseTimer() {
	clearInterval(timer);
	showStartButton.value = true;
}
function endTimer() {
	try {
		var audio = new Audio(NotificationSound);
		audio.play();
	} catch {
		alert('Timer finished!');
	}
	clearInterval(timer);
	emits('close');
}
</script>

<template>
	<div class="card">
		<div class="card-header">
			<div class="d-flex justify-content-between">
				<h5 class="card-title" data-test-id="timer-title">
					{{ props.duration }} Minutes - {{ props.zone.label }}
				</h5>
				<h5 class="card-title" data-test-id="total-time-remaining">
					<font-awesome-icon icon="hourglass-half" />
					{{ totalMinutesLeft }}:{{
						secondsLeft.toLocaleString('en-US', {
							minimumIntegerDigits: 2,
							useGrouping: false,
						})
					}}
				</h5>
			</div>
		</div>
		<div class="card-body d-flex flex-column">
			<h1 class="d-flex justify-content-center" data-test-id="time-remaining">
				{{ minutesLeft }}:{{
					secondsLeft.toLocaleString('en-US', {
						minimumIntegerDigits: 2,
						useGrouping: false,
					})
				}}
			</h1>
			<button
				v-if="showStartButton"
				type="button"
				class="btn btn-outline-dark"
				data-test-id="start-button"
				@click="startTimer"
			>
				Start
			</button>
			<button
				v-if="!showStartButton"
				type="button"
				class="btn btn-outline-dark"
				data-test-id="stop-button"
				@click="pauseTimer"
			>
				Stop
			</button>
			<hr v-if="props.zone.heartRate || props.zone.perceivedExertion" />
			<div class="d-flex justify-content-around">
				<p v-if="props.zone.heartRate" data-test-id="heart-rate">
					<font-awesome-icon icon="heart-pulse" />
					{{ props.zone.heartRate }} BPM
				</p>
				<p
					v-if="props.zone.perceivedExertion"
					data-test-id="perceived-exertion"
				>
					<font-awesome-icon icon="dumbbell" />
					{{ props.zone.perceivedExertion }}
				</p>
			</div>
		</div>
	</div>
</template>
