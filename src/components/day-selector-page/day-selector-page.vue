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

function getPreviousMonth() {
	switch (selectedMonth.value) {
		case 'Month 8':
			return 'Month 7';
		case 'Month 7':
			return 'Month 6';
		case 'Month 6':
			return 'Month 5';
		case 'Month 5':
			return 'Month 4';
		case 'Month 4':
			return 'Month 3';
		case 'Month 3':
			return 'Month 2';
		default:
			return 'Month 1';
	}
}
function getDaysInMonth(month) {
	const allDays = TRAINING_CALENDAR.filter((d) => d.month === month).map(
		(d) => d.day,
	);
	return allDays.at(-1);
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
function markDayIncomplete() {
	if (selectedDay.value === 1) {
		lastCompletedDay.value.month = getPreviousMonth();
		lastCompletedDay.value.day = getDaysInMonth(lastCompletedDay.value.month);
	} else {
		lastCompletedDay.value.month = selectedMonth.value;
		lastCompletedDay.value.day = selectedDay.value - 1;
	}
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
		<div v-if="isDayComplete" class="d-flex justify-content-center m-1">
			<button
				type="button"
				class="btn btn btn-outline-dark"
				data-test-id="mark-incomplete-button"
				@click="markDayIncomplete"
			>
				Mark Incomplete
			</button>
		</div>
		<div v-else class="d-flex justify-content-center m-1">
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
