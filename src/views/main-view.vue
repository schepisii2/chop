<script setup>
import { ref, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import DisclaimerInformation from '../components/disclaimer-information.vue';
import TitlePage from '../components/title-page.vue';
import TrainingDaySelector from '../components/training-day-selector.vue';
import TrainingModeCard from '../components/training-mode-card.vue';
import TimerCard from '../components/timer-card.vue';
import ZoneChart from '../components/zone-chart.vue';
import rpeChart from '../components/rpe-chart.vue';
import { ExerciseType } from '../models/training-days';

const showTitle = ref(true);
const showDisclaimer = ref(false);
const showTrainingDaySelector = ref(true);

const trainingDay = ref({});
function start(day) {
	trainingDay.value = day;
	showTrainingDaySelector.value = false;
}

const typeText = computed(() => {
	let text = '';
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
const trainingDayTitle = computed(() => {
	if (typeText.value === 'Cardio Day') {
		let timerTotal = 0;
		trainingDay.value.timers.forEach((timer) => {
			timerTotal = timerTotal + timer.duration;
		});
		return typeText.value + ' - ' + timerTotal + ' minutes';
	}
	return typeText.value;
});

const timerIndex = ref(0);
const currentTimer = computed(() => {
	if (
		trainingDay.value.timers &&
		trainingDay.value.timers.length > timerIndex.value
	) {
		return trainingDay.value.timers[timerIndex.value];
	}
	return null;
});
const upcomingTimer = computed(() => {
	if (
		trainingDay.value.timers &&
		trainingDay.value.timers.length > timerIndex.value + 1
	) {
		return trainingDay.value.timers[timerIndex.value + 1];
	}
	return null;
});
</script>

<template>
	<nav class="m-1" aria-label="breadcrumb">
		<ol class="breadcrumb">
			<li v-if="!showTitle" class="breadcrumb-item">
				<a href="#" data-test-id="title-breadcrumb" @click="showTitle = true"
					>Title Page</a
				>
			</li>
			<li
				v-if="!showTitle"
				class="breadcrumb-item"
				:class="{ showTrainingDaySelector: 'active' }"
			>
				<a
					href="#"
					data-test-id="selector-breadcrumb"
					@click="showTrainingDaySelector = true"
					>Day Selector</a
				>
			</li>
			<li
				v-if="!showTitle && !showTrainingDaySelector"
				class="breadcrumb-item active"
				data-test-id="selected-day-breadcrumb"
			>
				{{ trainingDay.month }} - Day {{ trainingDay.day }}
			</li>
		</ol>
	</nav>
	<disclaimer-information
		v-if="showDisclaimer"
		data-test-id="disclaimer-information"
		@close="showDisclaimer = false"
	/>
	<title-page
		v-else-if="showTitle"
		data-test-id="title-page"
		@get-started="showTitle = false"
		@show-disclaimer="showDisclaimer = true"
	/>
	<training-day-selector
		v-else-if="showTrainingDaySelector"
		data-test-id="training-day-selector"
		@start="start"
	/>
	<div v-else class="m-3">
		<h3 data-test-id="training-day-type">{{ trainingDayTitle }}</h3>
		<div v-if="currentTimer">
			<training-mode-card
				data-test-id="training-mode-card"
				:mode="trainingDay.mode"
			/>
			<timer-card
				v-show="timer === currentTimer"
				v-for="timer in trainingDay.timers"
				v-bind:key="timer"
				:duration="timer.duration"
				:zone="timer.zone"
				class="my-2"
				@close="timerIndex++"
			></timer-card>
			<div
				:class="timerIndex === 0 ? '' : 'd-flex justify-content-around mt-2'"
			>
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
						>Upcoming: {{ upcomingTimer.duration }} Minute Timer -
						{{ upcomingTimer.zone.label }}</a
					>
				</p>
			</div>
			<zone-chart />
			<rpe-chart />
		</div>
	</div>
</template>
