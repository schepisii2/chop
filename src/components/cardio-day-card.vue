<script setup>
import { ref, computed } from 'vue';
import { defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TrainingModeCard from './training-mode-card.vue';
import TimerCard from './timer-card.vue';
import ZoneChart from './zone-chart.vue';
import rpeChart from './rpe-chart.vue';

const props = defineProps(['trainingDay']);

const totalTimerDuration = computed(() => {
	let timerTotal = 0;
	props.trainingDay.timers?.forEach((timer) => {
		timerTotal = timerTotal + timer.duration;
	});
	return timerTotal;
});

const timerIndex = ref(0);
const currentTimer = computed(() => {
	if (
		props.trainingDay.timers &&
		props.trainingDay.timers.length > timerIndex.value
	) {
		return props.trainingDay.timers[timerIndex.value];
	}
	return null;
});
const upcomingTimer = computed(() => {
	if (
		props.trainingDay.timers &&
		props.trainingDay.timers.length > timerIndex.value + 1
	) {
		return props.trainingDay.timers[timerIndex.value + 1];
	}
	return null;
});
</script>
<template>
	<div v-if="props.trainingDay.timers.length > timerIndex">
		<training-mode-card
			data-test-id="training-mode-card"
			:mode="props.trainingDay.mode"
		/>
		<timer-card
			v-show="timer === currentTimer"
			v-for="timer in props.trainingDay.timers"
			v-bind:key="timer"
			:duration="timer.duration"
			:remaining-time="totalTimerDuration"
			:zone="timer.zone"
			class="my-2"
			@close="timerIndex++"
		></timer-card>
		<div :class="timerIndex === 0 ? '' : 'd-flex justify-content-around mt-2'">
			<a href="#">
				<font-awesome-icon
					v-if="timerIndex !== 0"
					icon="backward-step"
					data-test-id="back-button"
					@click="timerIndex--"
			/></a>
			<p
				v-if="upcomingTimer"
				:class="timerIndex === 0 ? 'd-flex justify-content-end' : ''"
				data-test-id="upcoming-timer"
				@click="timerIndex++"
			>
				<a href="#"
					>{{ upcomingTimer.duration }} Minutes -
					{{ upcomingTimer.zone.label }}
					<font-awesome-icon class="ms-2" icon="forward-step"
				/></a>
			</p>
		</div>
		<zone-chart />
		<rpe-chart />
	</div>
	<div v-else>
		<div
			data-test-id="success-message"
			class="alert alert-success"
			role="alert"
		>
			All timers are complete!
		</div>
	</div>
</template>
