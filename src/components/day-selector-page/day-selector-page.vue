<script setup>
import { computed, ref, defineEmits } from 'vue';
import { TRAINING_CALENDAR } from '../../models/training-days';
import MonthSelector from './selectors/month-selector.vue';
import DaySelector from './selectors/day-selector.vue';

const emits = defineEmits(['start']);

const selectedMonth = ref('Month 1');
const selectedDay = ref(1);

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
	<div>
		<month-selector @set-month="selectedMonth = $event" />
		<day-selector :month="selectedMonth" @set-day="selectedDay = $event" />
		<div class="d-flex justify-content-center m-1">
			<button
				type="button"
				class="btn btn-dark"
				data-test-id="start-button"
				@click="emits('start', trainingDay)"
			>
				Start
			</button>
		</div>
	</div>
</template>
