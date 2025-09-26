<script setup>
import { ref, computed } from 'vue';
import TitlePage from '../components/title-page/title-page.vue';
import TrainingDaySelector from '../components/day-selector-page/day-selector-page.vue';
import CardioDayCard from '../components/cardio-day/cardio-day-card.vue';
import GymExercisesCard from '../components/gym-exercises-card.vue';
import { ExerciseType } from '../models/training-days';
import { Page } from '../models/page-enum';

const currentPage = ref(Page.TitlePage);

const trainingDay = ref({});
function start(day) {
	trainingDay.value = day;
	currentPage.value = Page.TrainingDay;
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
			<li
				v-if="currentPage != Page.TitlePage && currentPage != Page.Disclaimer"
				class="breadcrumb-item"
			>
				<a
					href="#"
					data-test-id="title-breadcrumb"
					@click="currentPage = Page.TitlePage"
					>Title Page</a
				>
			</li>
			<li
				v-if="
					currentPage === Page.DaySelector || currentPage === Page.TrainingDay
				"
				class="breadcrumb-item"
				:class="{ showTrainingDaySelector: 'active' }"
			>
				<a
					href="#"
					data-test-id="selector-breadcrumb"
					@click="currentPage = Page.DaySelector"
					>Day Selector</a
				>
			</li>
			<li
				v-if="currentPage === Page.TrainingDay"
				class="breadcrumb-item active"
				data-test-id="selected-day-breadcrumb"
			>
				{{ trainingDay.month }} - Day {{ trainingDay.day }}
			</li>
		</ol>
	</nav>
	<title-page
		v-if="currentPage === Page.TitlePage"
		data-test-id="title-page"
		@get-started="currentPage = Page.DaySelector"
	/>
	<training-day-selector
		v-if="currentPage === Page.DaySelector"
		data-test-id="training-day-selector"
		@start="start"
	/>
	<div v-if="currentPage === Page.TrainingDay" class="m-3">
		<h3 data-test-id="training-day-type">{{ typeText }}</h3>
		<cardio-day-card
			v-if="typeText === 'Cardio Day'"
			:training-day="trainingDay"
		/>
		<gym-exercises-card v-if="typeText === 'Strength Training'" />
	</div>
</template>
