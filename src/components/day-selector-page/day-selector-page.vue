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

const lastCompletedDay = ref({
	month: 'Month 1',
	day: 1,
});
const isDayComplete = computed(() => {
	if (selectedMonth.value.slice(-1) > lastCompletedDay.value.month.slice(-1)) {
		return false;
	}
	return selectedDay.value <= lastCompletedDay.value.day;
});
function markDayComplete() {
	lastCompletedDay.value.month = selectedMonth.value;
	lastCompletedDay.value.day = selectedDay.value;
}
</script>
<template>
	<div>
		<month-selector @set-month="selectedMonth = $event" />
		<day-selector
			:month="selectedMonth"
			:last-completed-day="lastCompletedDay"
			@set-day="selectedDay = $event"
		/>
		<div v-if="!isDayComplete" class="d-flex justify-content-center m-1">
			<button
				type="button"
				class="btn btn-dark me-2"
				data-test-id="start-button"
				@click="emits('start', trainingDay)"
			>
				Start
			</button>
			<button
				type="button"
				class="btn btn-outline-dark"
				data-test-id="mark-complete-button"
				@click="markDayComplete"
			>
				Mark Day Complete
			</button>
		</div>
	</div>
</template>
