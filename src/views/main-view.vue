<script setup>
import { ref, computed } from 'vue';
import DisclaimerInformation from '../components/disclaimer-information.vue';
import TitlePage from '../components/title-page.vue';
import TrainingDaySelector from '../components/training-day-selector.vue';
import TimerCard from '../components/timer-card.vue';
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
		<h3 data-test-id="training-day-type">{{ typeText }}</h3>
		<div v-if="currentTimer">
			<timer-card
				v-show="timer === currentTimer"
				v-for="timer in trainingDay.timers"
				v-bind:key="timer"
				:duration="timer.duration"
				:zone="timer.zone"
				class="my-2"
				@close="timerIndex++"
			></timer-card>
			<p
				v-if="upcomingTimer"
				class="d-flex justify-content-end"
				data-test-id="upcoming-timer"
			>
				Upcoming: {{ upcomingTimer.duration }} Minute Timer -
				{{ upcomingTimer.zone.label }}
			</p>
		</div>
	</div>
</template>
