<script setup>
import { ref, computed } from 'vue';
import DisclaimerInformation from '../components/disclaimer-information.vue';
import TitlePage from '../components/title-page.vue';
import TrainingDaySelector from '../components/training-day-selector.vue';
import CardioDayCard from '../components/cardio-day-card.vue';
import GymExercisesCard from '../components/gym-exercises-card.vue';
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
		<h3 data-test-id="training-day-type">{{ typeText }}</h3>
		<cardio-day-card
			v-if="typeText === 'Cardio Day'"
			:training-day="trainingDay"
		/>
		<gym-exercises-card v-if="typeText === 'Strength Training'" />
	</div>
</template>
