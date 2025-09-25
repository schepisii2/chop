<script setup>
import { ref, computed } from 'vue';
import { defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TrainingModeInformation from './training-mode-information.vue';
import TimerCard from './timer-card.vue';
import ZoneChart from './zone-chart.vue';
import rpeChart from './rpe-chart.vue';

const props = defineProps(['trainingDay']);

const showTrainingModeCard = ref(false);
const showZoneCard = ref(false);
const showRpeCard = ref(false);

function getRemainingTime(timer) {
	const currentIndex = props.trainingDay.timers.findIndex((t) => t === timer);
	let timerTotal = 0;
	for (let i = currentIndex; i < props.trainingDay.timers?.length; i++) {
		timerTotal = timerTotal + props.trainingDay.timers[i].duration;
	}
	return timerTotal;
}

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
		<div
			class="d-flex justify-content-end dropdown mb-2"
			data-test-id="list-dropdown"
		>
			<button
				class="btn btn-outline-dark dropdown-toggle"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<font-awesome-icon icon="list" />
			</button>
			<ul class="dropdown-menu">
				<li
					v-if="!showTrainingModeCard"
					data-test-id="training-mode-option"
					@click="showTrainingModeCard = true"
				>
					<a class="dropdown-item">Add Training Mode Card</a>
				</li>
				<li
					v-if="!showZoneCard"
					data-test-id="zone-option"
					@click="showZoneCard = true"
				>
					<a class="dropdown-item">Add Workout Zones Card</a>
				</li>
				<li
					v-if="!showRpeCard"
					data-test-id="rpe-option"
					@click="showRpeCard = true"
				>
					<a class="dropdown-item">Add RPE Card</a>
				</li>
			</ul>
		</div>
		<training-mode-information
			v-if="showTrainingModeCard"
			data-test-id="training-mode-information"
			:mode="props.trainingDay.mode"
			@close="showTrainingModeCard = false"
		/>
		<timer-card
			v-show="timer === currentTimer"
			v-for="timer in props.trainingDay.timers"
			v-bind:key="timer"
			:duration="timer.duration"
			:remaining-time="getRemainingTime(timer)"
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
		<zone-chart
			v-if="showZoneCard"
			data-test-id="zone-chart"
			@close="showZoneCard = false"
		/>
		<rpe-chart
			v-if="showRpeCard"
			data-test-id="rpe-chart"
			@close="showRpeCard = false"
		/>
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
