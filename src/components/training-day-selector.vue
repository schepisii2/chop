<script setup>
import { computed, ref, defineEmits } from 'vue';
import { TRAINING_CALENDAR } from '../models/training-days';

const emits = defineEmits(['start']);

const selectedMonth = ref('Month 1');
const months = [...new Set(TRAINING_CALENDAR.map((d) => d.month))];

const selectedDay = ref(1);
const days = computed(() => {
	return TRAINING_CALENDAR.filter((d) => d.month === selectedMonth.value).map(
		(d) => d.day,
	);
});

const trainingDay = computed(() => {
	return getTrainingDay(selectedDay.value);
});
function getTrainingDay(day) {
	return TRAINING_CALENDAR.find(
		(d) => d.month === selectedMonth.value && d.day === day,
	);
}
</script>
<template>
	<h2 class="d-flex justify-content-center my-5" data-test-id="title">
		Select Training Day
	</h2>

	<div class="d-flex flex-column">
		<div class="d-flex flex-row justify-content-center mb-4">
			<div class="d-flex dropdown me-3" data-test-id="month-dropdown">
				<button
					class="btn btn-outline-dark dropdown-toggle"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					{{ selectedMonth }}
				</button>
				<ul class="dropdown-menu">
					<li
						v-for="month in months"
						v-bind:key="month"
						:data-test-id="month + '-dropdown-option'"
						@click="selectedMonth = month"
					>
						<a class="dropdown-item">{{ month }}</a>
					</li>
				</ul>
			</div>

			<div class="dropdown me-3" data-test-id="day-dropdown">
				<button
					class="btn btn-outline-dark dropdown-toggle"
					type="button"
					id="dropdownMenuButton1"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Day {{ selectedDay }}
				</button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					<li
						v-for="day in days"
						v-bind:key="day"
						:data-test-id="day + '-dropdown-option'"
						@click="selectedDay = day"
					>
						<a class="dropdown-item"
							>Day {{ day }} - {{ getTrainingDay(day).type }}</a
						>
					</li>
				</ul>
			</div>
		</div>

		<button
			type="button"
			class="btn btn-dark m-3"
			data-test-id="start-training-day-button"
			@click="emits('start', trainingDay)"
		>
			Start
		</button>
	</div>
</template>
